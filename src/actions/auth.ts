"use server";

import { cookies, headers } from "next/headers";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_TTL_SECONDS,
  createSessionToken,
  verifyAdminPassword,
} from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { clientIpFromHeaders } from "@/lib/request";

const MAX_ATTEMPTS = 5;
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;

export type LoginResult = { ok: boolean; error?: string };

export async function login(password: unknown): Promise<LoginResult> {
  const ip = clientIpFromHeaders(headers());

  // Throttled before the password is checked, so this cannot be used as an
  // unlimited guessing oracle.
  const limit = rateLimit(`admin-login:${ip}`, MAX_ATTEMPTS, ATTEMPT_WINDOW_MS);
  if (!limit.allowed) {
    const minutes = Math.ceil(limit.retryAfterSeconds / 60);
    return {
      ok: false,
      error: `Too many attempts. Try again in ${minutes} minute${minutes === 1 ? "" : "s"}.`,
    };
  }

  if (typeof password !== "string" || !password || !verifyAdminPassword(password)) {
    // Deliberately identical for every failure reason — no hints.
    return { ok: false, error: "Incorrect password." };
  }

  cookies().set(ADMIN_COOKIE_NAME, createSessionToken(), {
    httpOnly: true, // unreadable from JavaScript, so XSS cannot exfiltrate it
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });

  return { ok: true };
}

export async function logout() {
  cookies().delete(ADMIN_COOKIE_NAME);
}
