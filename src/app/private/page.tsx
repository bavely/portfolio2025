import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { listContactForms } from "@/lib/contacts";
import { AdminLogin } from "@/components/admin-login";
import { LogoutButton } from "@/components/logout-button";
import { ContactsTable } from "./contacts-table";

export const metadata: Metadata = {
  title: "Private",
  robots: { index: false, follow: false },
};

// Admin data must never be cached or prerendered. Reading cookies already opts
// this route into dynamic rendering; stated explicitly so it cannot regress.
export const dynamic = "force-dynamic";

/**
 * Server component: the submissions are read *after* the session check, so an
 * unauthenticated visitor's response contains no contact data at all.
 *
 * The previous version fetched every submission in a `useEffect` on mount and
 * only used the password to decide whether to paint the table — the data was
 * already in the browser's network response for anyone who opened the page.
 */
export default async function PrivatePage() {
  const authorized = await isAdmin();

  if (!authorized) {
    return (
      <section className="z-10 flex min-h-screen animate-fadein items-center justify-center p-10 duration-1000">
        <AdminLogin heading="Authorized personnel only" />
      </section>
    );
  }

  const contacts = await listContactForms();

  return (
    <section className="z-10 flex min-h-screen animate-fadein flex-col items-center justify-center gap-4 p-10 duration-1000">
      <div className="container mx-auto flex w-full items-center justify-between gap-4">
        <h1 className="text-lg font-bold md:text-2xl">
          Contact messages{" "}
          <span className="text-sm font-normal text-neutral-500 dark:text-neutral-400">
            ({contacts.length})
          </span>
        </h1>
        <LogoutButton />
      </div>

      <div className="container mx-auto w-full">
        <ContactsTable data={contacts} />
      </div>
    </section>
  );
}
