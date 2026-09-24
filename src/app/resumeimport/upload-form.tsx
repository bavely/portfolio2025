"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { upload } from "./action";

const MAX_BYTES = 5 * 1024 * 1024;

type Status = { kind: "idle" } | { kind: "busy" } | { kind: "ok" } | { kind: "error"; message: string };

export function UploadForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    // Mirrors the server-side rules purely for fast feedback. The server
    // re-checks everything, since these checks are trivially bypassed.
    if (file.type !== "application/pdf") {
      setStatus({ kind: "error", message: "Only PDF files are accepted." });
      return;
    }

    if (file.size > MAX_BYTES) {
      setStatus({ kind: "error", message: "File is larger than 5 MB." });
      return;
    }

    setStatus({ kind: "busy" });

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await upload(formData);
      setStatus(
        result.ok ? { kind: "ok" } : { kind: "error", message: result.error }
      );
    } catch {
      setStatus({
        kind: "error",
        message: "Upload failed. Your session may have expired — reload and sign in again.",
      });
    }
  };

  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-3">
      <div className="min-h-96 w-full rounded-lg border border-dashed border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
        <FileUpload onChange={handleFileUpload} />
      </div>

      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        PDF only, up to 5 MB. Replaces the resume shown at /resume.
      </p>

      {status.kind === "busy" && <p className="text-sm">Uploading...</p>}

      {status.kind === "ok" && (
        <p role="status" className="text-sm text-green-600 dark:text-green-400">
          Resume replaced successfully.
        </p>
      )}

      {status.kind === "error" && (
        <p role="alert" className="text-sm text-red-500">
          {status.message}
        </p>
      )}
    </div>
  );
}
