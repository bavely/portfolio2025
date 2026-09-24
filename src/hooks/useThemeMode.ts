"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export type ThemeMode = "light" | "dark";

/** Must match `defaultTheme` on the ThemeProvider in app/layout.tsx. */
const DEFAULT_MODE: ThemeMode = "dark";

/**
 * The resolved theme, safe to branch on during render.
 *
 * `useTheme().theme` is `undefined` on the first render — next-themes only knows
 * the stored preference after mount. Components that branched on it directly
 * therefore painted the *light* assets for a frame on a dark-default site (the
 * white logo, light gauge tracks) before snapping to dark.
 *
 * Until mounted this returns the configured default, which is what the
 * pre-paint next-themes script has already applied to <html>, so the first
 * painted frame agrees with the document.
 */
export function useThemeMode(): ThemeMode {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return DEFAULT_MODE;
  return resolvedTheme === "light" ? "light" : "dark";
}
