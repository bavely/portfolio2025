"use client";

// Error boundaries in the App Router must be client components.
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // `error.message` is redacted in production builds; `digest` is the handle
    // that ties this to the real stack trace in the server logs.
    console.error("Route error:", error.digest ?? error.message);
  }, [error]);

  return (
    <section className="z-10 flex min-h-screen animate-fadein flex-col items-center justify-center gap-6 p-10 text-center duration-1000">
      <h1 className="text-2xl font-bold tracking-tighter md:text-4xl">
        <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
          Something went wrong
        </span>
      </h1>

      <p className="max-w-md text-sm font-bold md:text-lg dark:text-slate-400">
        This page failed to load. Trying again often fixes it.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <button type="button" onClick={reset} className="text-blue-500 underline">
          Try again
        </button>
        <Link href="/" className="text-blue-500 underline">
          Back to home
        </Link>
      </div>

      {error.digest && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Reference: {error.digest}
        </p>
      )}
    </section>
  );
}
