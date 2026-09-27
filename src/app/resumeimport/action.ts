"use server";

import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { requireAdmin } from "@/lib/auth";
import { hasPdfSignature, validateResumeMetadata } from "@/lib/resume-upload";

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

  const metadataValidation = validateResumeMetadata(file);
  if (!metadataValidation.ok) return metadataValidation;

  const buffer = Buffer.from(await file.arrayBuffer());

  // The declared MIME type is caller-controlled, so confirm the actual bytes.
  if (!hasPdfSignature(buffer)) {
    return { ok: false, error: "That file is not a valid PDF." };
  }

  // The destination name is fixed and never derived from the upload, so a
  // crafted filename cannot traverse out of the uploads directory.
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, "resume.pdf"), buffer);

  return { ok: true, path: "/uploads/resume.pdf" };
}
