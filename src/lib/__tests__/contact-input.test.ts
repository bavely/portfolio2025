import { CONTACT_LIMITS, validateContactInput } from "@/lib/contact-input";

describe("contact input validation", () => {
  it("trims and accepts a valid submission", () => {
    expect(
      validateContactInput({
        name: "  Ada Lovelace  ",
        email: "  ada@example.com  ",
        message: "  Hello  ",
      }),
    ).toEqual({
      ok: true,
      data: { name: "Ada Lovelace", email: "ada@example.com", message: "Hello" },
    });
  });

  it.each([
    null,
    {},
    { name: "Ada", email: "invalid", message: "Hello" },
    { name: "", email: "ada@example.com", message: "Hello" },
    {
      name: "Ada",
      email: "ada@example.com",
      message: "x".repeat(CONTACT_LIMITS.message + 1),
    },
  ])("rejects invalid input %#", (input) => {
    expect(validateContactInput(input).ok).toBe(false);
  });
});
