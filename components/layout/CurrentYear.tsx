"use client";

import { useSyncExternalStore } from "react";

const FALLBACK_YEAR = 2026;

const subscribe = () => () => {};
const getClientYear = () => new Date().getFullYear();
const getServerYear = () => FALLBACK_YEAR;

/**
 * Resolved on the client so the prerendered output stays static, because Next.js
 * treats `new Date()` during prerender as an unstable value.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(subscribe, getClientYear, getServerYear);
  return <>{year}</>;
}
