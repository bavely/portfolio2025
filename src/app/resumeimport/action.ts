"use server";

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { requireAdmin } from "@/lib/auth";

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB
const PDF_SIGNATURE = "%PDF-";

export type UploadResult = { ok: true; path: string } | { ok: false; error: string };

/**
 * Replaces the published resume.
 *
 * `"use server"` exports are public HTTP endpoints invocable by action id, so
 * the password prompt on the page is not a control here — without this
 * `requireAdmin()` check anyone could overwrite the resume with arbitrary bytes.
 */
export async function upload(formData: FormData): Promise<UploadResult> {
  await requireAdmin();

  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No file provided." };
  }

  if (file.size > MAX_BYTES) {
    return { ok: false, error: "File is larger than 5 MB." };
  }

  if (file.type !== "application/pdf") {
    return { ok: false, error: "Only PDF files are accepted." };
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // The declared MIME type is caller-controlled, so confirm the actual bytes.
  if (buffer.subarray(0, PDF_SIGNATURE.length).toString("latin1") !== PDF_SIGNATURE) {
    return { ok: false, error: "That file is not a valid PDF." };
  }

  // The destination name is fixed and never derived from the upload, so a
  // crafted filename cannot traverse out of the uploads directory.
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, "resume.pdf"), buffer);

  return { ok: true, path: "/uploads/resume.pdf" };
}
