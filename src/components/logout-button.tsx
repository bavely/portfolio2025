"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/actions/auth";

/** Ends the admin session by clearing the cookie server-side. */
export function LogoutButton() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await logout();
          router.refresh();
        })
      }
    >
      {pending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
