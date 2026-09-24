import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found | Bavely Tawfik",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="z-10 flex min-h-screen animate-fadein flex-col items-center justify-center gap-6 p-10 text-center duration-1000">
      {/* Referenced by public path, matching how the rest of the site loads
          these screenshots. Previously unused despite existing in the repo. */}
      <Image
        src="/images/404.png"
        alt=""
        width={1424}
        height={956}
        // Decorative: the heading below carries the meaning.
        aria-hidden="true"
        className="h-auto w-full max-w-md"
        priority
      />

      <h1 className="text-2xl font-bold tracking-tighter md:text-4xl">
        <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
          This page doesn&apos;t exist
        </span>
      </h1>

      <p className="max-w-md text-sm font-bold md:text-lg dark:text-slate-400">
        The link may be out of date, or the page may have moved.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="text-blue-500 underline">
          Back to home
        </Link>
        <Link href="/portfolio" className="text-blue-500 underline">
          See my work
        </Link>
        <Link href="/contactme" className="text-blue-500 underline">
          Get in touch
        </Link>
      </div>
    </section>
  );
}
