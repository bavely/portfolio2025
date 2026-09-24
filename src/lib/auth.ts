// Server-only. Imports `next/headers`, which makes this module unusable from a
// client component (Next throws at build time if you try).
//
// Admin access is a signed, httpOnly session cookie. The password is never sent
// to the browser and never compared in the browser: a client-side comparison is
// unenforceable, because anyone can render whatever UI they like locally.
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "admin_session";
export const ADMIN_SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required server environment variable ${name}. See README.md > Environment Variables.`
    );
  }
  return value;
}

/**
 * Constant-time comparison of two strings of any length.
 *
 * `timingSafeEqual` throws when its inputs differ in length, and returning
 * early on a length mismatch would leak the secret's length. Hashing both
 * sides first gives two equal-length digests to compare.
 */
function safeEqual(a: string, b: string) {
  const digest = (value: string) =>
    createHmac("sha256", "constant-time-compare").update(value).digest();
  return timingSafeEqual(digest(a), digest(b));
}

function sign(value: string) {
  return createHmac("sha256", requireEnv("ADMIN_SESSION_SECRET"))
    .update(value)
    .digest("base64url");
}

/** Token is `<expiry seconds>.<HMAC of expiry>` — unforgeable without the secret. */
export function createSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + ADMIN_SESSION_TTL_SECONDS;
  return `${expiresAt}.${sign(String(expiresAt))}`;
}

function isValidSessionToken(token: string | undefined) {
  if (!token) return false;

  const separator = token.indexOf(".");
  if (separator <= 0) return false;

  const expiresAt = token.slice(0, separator);
  const signature = token.slice(separator + 1);
  if (!signature) return false;

  // Verify the signature before trusting the expiry it carries.
  if (!safeEqual(signature, sign(expiresAt))) return false;

  const expirySeconds = Number(expiresAt);
  return Number.isFinite(expirySeconds) && expirySeconds * 1000 > Date.now();
}

export function verifyAdminPassword(password: string) {
  return safeEqual(password, requireEnv("ADMIN_PASSWORD"));
}

export async function isAdmin() {
  return isValidSessionToken(cookies().get(ADMIN_COOKIE_NAME)?.value);
}

/**
 * Guard for privileged server actions.
 *
 * Every export of a `"use server"` module is a public HTTP endpoint that anyone
 * can invoke by its action id — the UI that normally calls it is not a control.
 * So each privileged action has to check authorisation itself; gating only the
 * page that renders it protects nothing.
 */
export async function requireAdmin() {
  if (!(await isAdmin())) {
    throw new Error("Unauthorized");
  }
}
