// Validation for untrusted contact-form payloads.
//
// Shared by the API route and the Firestore write. Caps exist so a caller
// cannot push unbounded data into Firestore (storage cost is the attack here,
// not code execution).

export type ContactInput = {
  name: string;
  email: string;
  message: string;
};

export const CONTACT_LIMITS = {
  name: 100,
  email: 254, // RFC 5321 maximum path length
  message: 5000,
} as const;

// Deliberately permissive: enough to reject obvious junk without bouncing
// unusual-but-valid addresses. Real validation is whether a reply arrives.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export type ValidationResult =
  | { ok: true; data: ContactInput }
  | { ok: false; error: string };

function readField(source: Record<string, unknown>, field: string) {
  const value = source[field];
  return typeof value === "string" ? value.trim() : null;
}

export function validateContactInput(raw: unknown): ValidationResult {
  if (typeof raw !== "object" || raw === null) {
    return { ok: false, error: "Invalid request body." };
  }

  const source = raw as Record<string, unknown>;
  const name = readField(source, "name");
  const email = readField(source, "email");
  const message = readField(source, "message");

  if (name === null || email === null || message === null) {
    return { ok: false, error: "Name, email and message are required." };
  }

  if (!name || !email || !message) {
    return { ok: false, error: "Name, email and message cannot be empty." };
  }

  if (name.length > CONTACT_LIMITS.name) {
    return { ok: false, error: `Name must be ${CONTACT_LIMITS.name} characters or fewer.` };
  }

  if (email.length > CONTACT_LIMITS.email || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  if (message.length > CONTACT_LIMITS.message) {
    return {
      ok: false,
      error: `Message must be ${CONTACT_LIMITS.message} characters or fewer.`,
    };
  }

  return { ok: true, data: { name, email, message } };
}

/** A stored submission, as returned to the admin table. */
export type ContactRecord = ContactInput & {
  id: string;
  /** ISO 8601, or null for documents saved before timestamps were recorded. */
  createdAt: string | null;
};
