import {
  createSessionToken,
  isValidSessionToken,
  verifyAdminPassword,
} from "@/lib/auth";

describe("admin authentication", () => {
  beforeEach(() => {
    process.env.ADMIN_PASSWORD = "correct horse battery staple";
    process.env.ADMIN_SESSION_SECRET = "test-session-secret-at-least-32-characters";
  });

  it("accepts only the configured password", () => {
    expect(verifyAdminPassword("correct horse battery staple")).toBe(true);
    expect(verifyAdminPassword("incorrect")).toBe(false);
  });

  it("creates a valid signed session token", () => {
    expect(isValidSessionToken(createSessionToken())).toBe(true);
  });

  it("rejects malformed and tampered session tokens", () => {
    const token = createSessionToken();

    expect(isValidSessionToken(undefined)).toBe(false);
    expect(isValidSessionToken("not-a-token")).toBe(false);
    expect(isValidSessionToken(`${token}tampered`)).toBe(false);
  });
});
