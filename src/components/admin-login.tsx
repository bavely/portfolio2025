"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "@/actions/auth";

/**
 * Password prompt for the admin routes.
 *
 * This form is only a convenience for signing in — it is not the access
 * control. The password is verified on the server and the protected data is
 * fetched on the server behind the resulting session cookie, so rendering this
 * component says nothing about what the visitor can reach.
 */
export function AdminLogin({ heading = "Authorized personnel only" }: { heading?: string }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    startTransition(async () => {
      const result = await login(password);

      if (result.ok) {
        setPassword("");
        // Re-runs the server component, which now sees the session cookie.
        router.refresh();
      } else {
        setError(result.error ?? "Sign in failed.");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xs flex-col items-center gap-3"
    >
      <h1 className="text-lg font-bold md:text-2xl">
        <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
          {heading}
        </span>
      </h1>

      <Input
        type="password"
        name="password"
        autoComplete="current-password"
        placeholder="Password"
        className="bg-slate-200 text-black border-slate-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? "admin-login-error" : undefined}
        required
      />

      <Button type="submit" className="w-full" disabled={pending || !password}>
        {pending ? "Checking..." : "Sign in"}
      </Button>

      {error && (
        <p id="admin-login-error" role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
    </form>
  );
}
