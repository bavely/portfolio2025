// Server-side reCAPTCHA v3 verification.
//
// A token generated in the browser proves nothing on its own — it has to be
// exchanged with Google from the server, using the secret key. Without this
// step the widget is decorative and the form is an open write endpoint.

const VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

/** reCAPTCHA v3 scores 0.0 (likely bot) to 1.0 (likely human). */
const MIN_SCORE = 0.5;

type VerifyResponse = {
  success?: boolean;
  score?: number;
  action?: string;
  "error-codes"?: string[];
};

export type RecaptchaResult =
  | { ok: true; score: number | null }
  | { ok: false; reason: string };

export async function verifyRecaptcha(
  token: string,
  expectedAction: string,
  remoteIp?: string
): Promise<RecaptchaResult> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    throw new Error(
      "Missing required server environment variable RECAPTCHA_SECRET_KEY. " +
        "See README.md > Environment Variables."
    );
  }

  const body = new URLSearchParams({ secret, response: token });
  if (remoteIp && remoteIp !== "unknown") body.set("remoteip", remoteIp);

  let payload: VerifyResponse;
  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });

    if (!response.ok) {
      return { ok: false, reason: `verify-http-${response.status}` };
    }

    payload = (await response.json()) as VerifyResponse;
  } catch {
    // Fail closed: if the check cannot be completed, the request is not
    // verified, so it is rejected rather than waved through.
    return { ok: false, reason: "verify-unreachable" };
  }

  if (!payload.success) {
    return {
      ok: false,
      reason: payload["error-codes"]?.join(",") || "rejected",
    };
  }

  // Guards against a token minted for a different action being replayed here.
  if (payload.action && payload.action !== expectedAction) {
    return { ok: false, reason: "action-mismatch" };
  }

  const score = typeof payload.score === "number" ? payload.score : null;
  if (score !== null && score < MIN_SCORE) {
    return { ok: false, reason: "low-score" };
  }

  return { ok: true, score };
}
