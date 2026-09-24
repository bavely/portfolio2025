import { createPageMetadata } from "@/lib/metadata";

// Served straight from public/. The previous version read the file on the server,
// base64-encoded it and shipped a ~139 KB data URL on every visit (+33% encoding
// overhead) — for a file the browser can already fetch, cache and range-request
// from this path.
const RESUME_PATH = "/uploads/resume.pdf";

export const metadata = createPageMetadata(
  "Resume",
  "Resume of Bavely Tawfik, full-stack web developer.",
  "/resume",
);

export default function Resume() {
  return (
    <section className="z-10 flex h-screen min-h-screen w-full animate-fadein flex-col items-center justify-center p-5 duration-1000">
      <object
        data={RESUME_PATH}
        type="application/pdf"
        aria-label="Resume of Bavely Tawfik"
        className="h-full w-full"
      >
        {/* Fallback content: <object> renders this when it cannot display the
            PDF itself, which is the common case on mobile browsers. The old
            <embed> had no fallback and simply showed an empty grey box. */}
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
          <p className="text-sm font-bold md:text-lg dark:text-slate-400">
            Your browser can&apos;t display this PDF inline.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              Open in a new tab
            </a>
            <a href={RESUME_PATH} download className="text-blue-500 underline">
              Download the PDF
            </a>
          </div>
        </div>
      </object>
    </section>
  );
}
