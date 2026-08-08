"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook via useSyncExternalStore (React's own
 * recommended pattern for this) — server and client's first render
 * both use getServerSnapshot ("false"/desktop), so hydration never
 * mismatches; the real value takes over on the client once subscribed.
 * The one-frame flash this can cause is masked by the full-viewport
 * Loader, which covers the page for the first ~4s regardless of which
 * layout renders underneath.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}
