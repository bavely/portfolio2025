export const MAX_RESUME_BYTES = 5 * 1024 * 1024;

const PDF_SIGNATURE = "%PDF-";

type ResumeFileMetadata = {
  size: number;
  type: string;
};

export type ResumeValidationResult =
  | { ok: true }
  | { ok: false; error: string };

/** Validates caller-controlled file metadata before reading the upload body. */
export function validateResumeMetadata(
  file: ResumeFileMetadata,
): ResumeValidationResult {
  if (file.size === 0) {
    return { ok: false, error: "No file provided." };
  }

  if (file.size > MAX_RESUME_BYTES) {
    return { ok: false, error: "File is larger than 5 MB." };
  }

  if (file.type !== "application/pdf") {
    return { ok: false, error: "Only PDF files are accepted." };
  }

  return { ok: true };
}

/** MIME types are caller-controlled, so the file must also begin with `%PDF-`. */
export function hasPdfSignature(buffer: Uint8Array) {
  return Buffer.from(buffer.subarray(0, PDF_SIGNATURE.length)).toString("latin1") === PDF_SIGNATURE;
}
