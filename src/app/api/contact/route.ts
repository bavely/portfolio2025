// app/api/contact/route.ts
import { NextResponse } from "next/server";
import {
  saveContactForm,
  notifyOwnerOfSubmission,
  sendAcknowledgementEmail,
} from "@/lib/contacts";
import { validateContactInput } from "@/lib/contact-input";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { rateLimit } from "@/lib/rate-limit";
import { clientIpFromRequest } from "@/lib/request";

const RECAPTCHA_ACTION = "contact_form";
const MAX_SUBMISSIONS_PER_HOUR = 5;
const WINDOW_MS = 60 * 60 * 1000;

/** Caps the request body so a huge payload cannot be streamed in. */
const MAX_BODY_BYTES = 16 * 1024;

function fail(error: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ success: false, error }, { status, headers });
}

export async function POST(req: Request) {
  const ip = clientIpFromRequest(req);

  const limit = rateLimit(`contact:${ip}`, MAX_SUBMISSIONS_PER_HOUR, WINDOW_MS);
  if (!limit.allowed) {
    return fail("Too many messages sent. Please try again later.", 429, {
      "Retry-After": String(limit.retryAfterSeconds),
    });
  }

  const declaredLength = Number(req.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return fail("Request body is too large.", 413);
  }

  let body: unknown;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY_BYTES) {
      return fail("Request body is too large.", 413);
    }
    body = JSON.parse(raw);
  } catch {
    return fail("Invalid request body.", 400);
  }

  const token = (body as Record<string, unknown> | null)?.token;
  if (typeof token !== "string" || !token) {
    return fail("Missing reCAPTCHA token.", 400);
  }

  // Validated before spending a round trip to Google.
  const validated = validateContactInput(body);
  if (!validated.ok) {
    return fail(validated.error, 400);
  }

  // The token is only evidence once the server has exchanged it with Google.
  // Previously it was accepted, logged and discarded, which left this endpoint
  // open to anyone willing to send a POST.
  const captcha = await verifyRecaptcha(token, RECAPTCHA_ACTION, ip);
  if (!captcha.ok) {
    console.warn("Rejected contact submission, reCAPTCHA:", captcha.reason);
    return fail("We couldn't verify that you're human. Please try again.", 403);
  }

  const saved = await saveContactForm(validated.data);
  if (!saved.ok) {
    // The underlying error is logged server-side by saveContactForm; the client
    // gets a generic message so internals are not disclosed.
    return fail("Could not send your message. Please try again later.", 500);
  }

  // Best effort, and deliberately after the save: the message is already stored,
  // so a mail failure must not make the visitor resubmit and duplicate it. Send
  // the owner notification first so a rejected login is attempted and logged
  // only once instead of producing two identical AUTH failures in parallel.
  const notification = await notifyOwnerOfSubmission(validated.data);
  if (!notification.authenticationFailed) {
    await sendAcknowledgementEmail(validated.data);
  }

  return NextResponse.json({ success: true });
}
