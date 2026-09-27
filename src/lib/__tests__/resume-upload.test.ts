import {
  hasPdfSignature,
  MAX_RESUME_BYTES,
  validateResumeMetadata,
} from "@/lib/resume-upload";

describe("resume upload validation", () => {
  it("accepts valid PDF metadata and a PDF signature", () => {
    expect(
      validateResumeMetadata({ size: 1024, type: "application/pdf" }),
    ).toEqual({ ok: true });
    expect(hasPdfSignature(Buffer.from("%PDF-1.7\n"))).toBe(true);
  });

  it.each([
    [{ size: 0, type: "application/pdf" }, "No file provided."],
    [
      { size: MAX_RESUME_BYTES + 1, type: "application/pdf" },
      "File is larger than 5 MB.",
    ],
    [{ size: 1024, type: "text/plain" }, "Only PDF files are accepted."],
  ])("rejects invalid metadata %#", (metadata, error) => {
    expect(validateResumeMetadata(metadata)).toEqual({ ok: false, error });
  });

  it("rejects a file whose bytes do not contain the PDF signature", () => {
    expect(hasPdfSignature(Buffer.from("not a pdf"))).toBe(false);
  });
});
