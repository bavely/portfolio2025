// Server-only contact persistence and email helpers.
//
// This is deliberately a plain module, not a `"use server"` action module.
// Every export of a `"use server"` file is published as a callable HTTP
// endpoint, so the previous `src/actions/action.ts` let anyone write to
// Firestore directly — skipping the API route's reCAPTCHA check, validation and
// rate limit entirely. Keeping these functions as ordinary imports means the
// API route is the only way in.
import nodemailer, { type Transporter } from "nodemailer";
import { FieldValue } from "firebase-admin/firestore";
import htmltemplate from "../app/contactme/html";
import { getAdminDb } from "@/lib/firebaseAdmin";
import type { ContactInput, ContactRecord } from "@/lib/contact-input";

const COLLECTION = "contacts";

export async function saveContactForm(data: ContactInput) {
  try {
    const document = await getAdminDb()
      .collection(COLLECTION)
      .add({
        name: data.name,
        email: data.email,
        message: data.message,
        // Server-assigned, so it is useful when reviewing suspected abuse.
        createdAt: FieldValue.serverTimestamp(),
      });

    return { ok: true as const, id: document.id };
  } catch (error) {
    // Logged without the submission itself: server logs are widely readable and
    // should not become a second copy of visitors' personal data.
    console.error("Failed to save contact submission:", error);
    return { ok: false as const };
  }
}

export async function listContactForms(): Promise<ContactRecord[]> {
  const snapshot = await getAdminDb().collection(COLLECTION).get();

  const records = snapshot.docs.map((document) => {
    const data = document.data();
    const createdAt = data.createdAt;

    return {
      id: document.id,
      // Coerced rather than trusted: older documents predate validation.
      name: typeof data.name === "string" ? data.name : "",
      email: typeof data.email === "string" ? data.email : "",
      message: typeof data.message === "string" ? data.message : "",
      createdAt:
        createdAt && typeof createdAt.toDate === "function"
          ? (createdAt.toDate() as Date).toISOString()
          : null,
    };
  });

  // Sorted in memory rather than with `orderBy`, because a Firestore `orderBy`
  // silently drops documents that lack the field — which would hide every
  // submission saved before `createdAt` was added.
  return records.sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""));
}

let transporter: Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;

  // Whitespace copied alongside either credential is enough for Brevo to
  // reject AUTH with 535, so normalize the environment values at the boundary.
  const user = process.env.BREVO_SMTP_USER?.trim();
  const pass = process.env.BREVO_SMTP_KEY?.trim();

  if (!user || !pass) {
    throw new Error(
      "Missing BREVO_SMTP_USER / BREVO_SMTP_KEY. See README.md > Environment Variables."
    );
  }

  transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    // Port 587 starts unencrypted and upgrades via STARTTLS. Without
    // requireTLS, nodemailer will fall back to sending in the clear if the
    // upgrade is unavailable — which would expose these credentials.
    requireTLS: true,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
  });

  return transporter;
}

/** Must be a sender address verified in Brevo, or the relay rejects the mail. */
function fromAddress() {
  return process.env.CONTACT_FROM_EMAIL || "bavelytawfik@gmail.com";
}

/** The submitted text is untrusted, so escape it before embedding in HTML. */
function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

type SmtpError = Error & {
  code?: string;
  responseCode?: number;
  command?: string;
};

function isSmtpAuthenticationError(error: unknown) {
  const smtpError = error as SmtpError;
  return (
    smtpError.code === "EAUTH" ||
    smtpError.responseCode === 525 ||
    smtpError.responseCode === 535
  );
}

function logMailError(action: string, error: unknown) {
  const smtpError = error as SmtpError;

  if (smtpError.responseCode === 525) {
    console.error(
      `Failed to ${action}: Brevo rejected this server's outbound IP address ` +
        "(525). Authorize the IP in Brevo Settings > Security > Authorized IPs, " +
        "or review the SMTP IP-blocking policy.",
    );
    return;
  }

  if (smtpError.responseCode === 535 || smtpError.code === "EAUTH") {
    console.error(
      `Failed to ${action}: Brevo rejected the SMTP credentials (535). ` +
        "Confirm BREVO_SMTP_USER matches the Login shown in Brevo and that " +
        "BREVO_SMTP_KEY is an active SMTP key (not an API key).",
    );
    return;
  }

  const details =
    error instanceof Error ? error.message : "Unknown SMTP transport error";
  const code = smtpError.code ? ` [${smtpError.code}]` : "";
  console.error(`Failed to ${action}${code}: ${details}`);
}

export type MailOutcome = {
  ok: boolean;
  skipped?: boolean;
  authenticationFailed?: boolean;
};

/**
 * Tells the site owner that a message arrived.
 *
 * Without this, submissions only landed in Firestore and the only way to notice
 * one was to remember to open /private.
 */
export async function notifyOwnerOfSubmission(data: ContactInput): Promise<MailOutcome> {
  const to = process.env.CONTACT_NOTIFY_TO;

  if (!to) {
    console.warn(
      "CONTACT_NOTIFY_TO is not set, so no notification was sent for a new contact submission."
    );
    return { ok: false, skipped: true };
  }

  try {
    await getTransporter().sendMail({
      from: fromAddress(),
      to,
      // Lets you reply straight to the sender from your inbox.
      replyTo: data.email,
      subject: `New portfolio message from ${data.name}`,
      text: `From: ${data.name} <${data.email}>\n\n${data.message}`,
      html:
        `<p><strong>From:</strong> ${escapeHtml(data.name)} ` +
        `&lt;${escapeHtml(data.email)}&gt;</p>` +
        `<p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
    });

    return { ok: true };
  } catch (error) {
    const authenticationFailed = isSmtpAuthenticationError(error);
    logMailError("send owner notification", error);
    return { ok: false, authenticationFailed };
  }
}

/** Sends the submitter a "thanks for your message" acknowledgement. */
export async function sendAcknowledgementEmail(data: ContactInput): Promise<MailOutcome> {
  try {
    await getTransporter().sendMail({
      from: fromAddress(),
      to: data.email,
      subject: "Thanks for your message",
      html: htmltemplate(data.name),
    });

    return { ok: true };
  } catch (error) {
    const authenticationFailed = isSmtpAuthenticationError(error);
    logMailError("send acknowledgement email", error);
    return { ok: false, authenticationFailed };
  }
}
