import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { AdminLogin } from "@/components/admin-login";
import { LogoutButton } from "@/components/logout-button";
import { UploadForm } from "./upload-form";

export const metadata: Metadata = {
  title: "Resume Import | Bavely Tawfik",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function ResumeImportPage() {
  const authorized = await isAdmin();

  if (!authorized) {
    return (
      <section className="z-10 flex min-h-screen animate-fadein items-center justify-center p-10 duration-1000">
        <AdminLogin heading="Authorized personnel only" />
      </section>
    );
  }

  return (
    <section className="z-10 flex min-h-screen animate-fadein flex-col items-center justify-center gap-4 p-10 duration-1000">
      <div className="flex w-full max-w-4xl items-center justify-between gap-4">
        <h1 className="text-lg font-bold md:text-2xl">Replace resume</h1>
        <LogoutButton />
      </div>
      <UploadForm />
    </section>
  );
}
