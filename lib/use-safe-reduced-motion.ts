"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// The server has no `window`, so it can't know the visitor's OS preference.
// Reporting `false` here keeps the server-rendered HTML and the client's
// first paint identical, avoiding a hydration mismatch; React then
// re-syncs to the real value via the subscription above.
function getServerSnapshot() {
  return false;
}

export function useSafeReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
