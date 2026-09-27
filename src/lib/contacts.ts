// Server-only contact persistence and email helpers.
//
// This is deliberately a plain module, not a `"use server"` action module.
// Every export of a `"use server"` file is published as a callable HTTP
// endpoint, so the previous `src/actions/action.ts` let anyone write to
// Firestore directly — skipping the API route's reCAPTCHA check, validation and
// rate limit entirely. Keeping these functions as ordinary imports means the
// API route is the only way in.
import { FieldValue } from "firebase-admin/firestore";
import htmltemplate from "../app/contactme/html";
import { getAdminDb } from "@/lib/firebaseAdmin";
import type { ContactInput, ContactRecord } from "@/lib/contact-input";
import { escapeHtml } from "@/lib/escape-html";

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

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_TIMEOUT_MS = 10_000;

// Sent over HTTPS rather than SMTP because DigitalOcean blocks outbound SMTP
// ports (25/465/587) on droplets, which made every send time out.
function brevoApiKey() {
  // Whitespace copied alongside the key is enough for Brevo to reject it with
  // 401, so normalize the environment value at the boundary.
  const key = process.env.BREVO_API_KEY?.trim();

  if (!key) {
    throw new Error("Missing BREVO_API_KEY. See README.md > Environment Variables.");
  }

  return key;
}

/** Must be a sender address verified in Brevo, or the API rejects the mail. */
function fromAddress() {
  return process.env.CONTACT_FROM_EMAIL || "bavelytawfik@gmail.com";
}

type BrevoEmail = {
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
  text?: string;
};

class BrevoError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

async function sendMail(email: BrevoEmail) {
  const response = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "api-key": brevoApiKey(),
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: { email: fromAddress() },
      to: [{ email: email.to }],
      replyTo: email.replyTo ? { email: email.replyTo } : undefined,
      subject: email.subject,
      htmlContent: email.html,
      textContent: email.text,
    }),
    signal: AbortSignal.timeout(BREVO_TIMEOUT_MS),
  });

  if (!response.ok) {
    // Brevo reports failures as { code, message }; fall back to the status line.
    const body = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new BrevoError(response.status, body?.message || response.statusText);
  }
}

function isAuthenticationError(error: unknown) {
  return error instanceof BrevoError && error.status === 401;
}

function logMailError(action: string, error: unknown) {
  if (error instanceof BrevoError) {
    const hint =
      error.status === 401
        ? " Confirm BREVO_API_KEY is an active API key (xkeysib-..., not an SMTP key) " +
          "and that this server's IP is allowed in Brevo Settings > Security > Authorized IPs."
        : "";
    console.error(`Failed to ${action} [HTTP ${error.status}]: ${error.message}.${hint}`);
    return;
  }

  const details = error instanceof Error ? error.message : "Unknown Brevo API error";
  const name = error instanceof Error ? ` [${error.name}]` : "";
  console.error(`Failed to ${action}${name}: ${details}`);
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
    await sendMail({
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
    const authenticationFailed = isAuthenticationError(error);
    logMailError("send owner notification", error);
    return { ok: false, authenticationFailed };
  }
}

/** Sends the submitter a "thanks for your message" acknowledgement. */
export async function sendAcknowledgementEmail(data: ContactInput): Promise<MailOutcome> {
  try {
    await sendMail({
      to: data.email,
      subject: "Thanks for your message",
      html: htmltemplate(data.name),
    });

    return { ok: true };
  } catch (error) {
    const authenticationFailed = isAuthenticationError(error);
    logMailError("send acknowledgement email", error);
    return { ok: false, authenticationFailed };
  }
}
