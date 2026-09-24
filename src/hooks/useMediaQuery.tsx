import { useEffect, useState } from 'react';

/**
 * Tracks a media query.
 *
 * The initial value is read from `matchMedia` synchronously rather than
 * defaulting to `false`. Defaulting to false meant phones rendered the desktop
 * branch on the first paint and only corrected after the effect ran — a visible
 * layout shift on every mobile visit.
 *
 * `serverFallback` is used where there is no `window` (server render and the
 * initial hydration pass). Consumers that render inside a client-only boundary
 * never see it.
 */
export function useMediaQuery(query: string, serverFallback = false) {
  const [value, setValue] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return serverFallback;
    }
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const result = window.matchMedia(query);

    const onChange = (event: MediaQueryListEvent) => setValue(event.matches);

    result.addEventListener('change', onChange);
    // Re-sync in case the query changed or the viewport moved before this ran.
    setValue(result.matches);

    return () => result.removeEventListener('change', onChange);
  }, [query]);

  return value;
}
