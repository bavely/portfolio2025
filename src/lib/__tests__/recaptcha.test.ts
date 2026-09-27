import { verifyRecaptcha } from "@/lib/recaptcha";

const fetchMock = jest.fn();

describe("reCAPTCHA verification", () => {
  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock;
    process.env.RECAPTCHA_SECRET_KEY = "test-secret";
    delete process.env.RECAPTCHA_EXPECTED_HOSTNAME;
  });

  function respondWith(payload: object) {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => payload,
    });
  }

  it("accepts a successful response with the expected action and score", async () => {
    respondWith({ success: true, action: "contact_form", score: 0.9 });

    await expect(verifyRecaptcha("token", "contact_form")).resolves.toEqual({
      ok: true,
      score: 0.9,
    });
  });

  it.each([
    [{ success: false }, "rejected"],
    [{ success: true, score: 0.9 }, "action-mismatch"],
    [{ success: true, action: "other", score: 0.9 }, "action-mismatch"],
    [{ success: true, action: "contact_form" }, "missing-score"],
    [{ success: true, action: "contact_form", score: 0.2 }, "low-score"],
  ])("rejects an invalid verification response %#", async (payload, reason) => {
    respondWith(payload as object);

    await expect(verifyRecaptcha("token", "contact_form")).resolves.toEqual({
      ok: false,
      reason,
    });
  });

  it("checks the hostname when one is configured", async () => {
    process.env.RECAPTCHA_EXPECTED_HOSTNAME = "pavli-tawfik.com";
    respondWith({
      success: true,
      action: "contact_form",
      score: 0.9,
      hostname: "example.com",
    });

    await expect(verifyRecaptcha("token", "contact_form")).resolves.toEqual({
      ok: false,
      reason: "hostname-mismatch",
    });
  });
});
