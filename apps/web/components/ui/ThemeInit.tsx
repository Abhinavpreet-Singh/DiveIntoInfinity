"use client";

import { useInsertionEffect } from "react";

// Run synchronously the instant the client bundle evaluates in browser
if (typeof window !== "undefined") {
  try {
    if (localStorage.getItem("di-theme") === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  } catch {}

  // Filter out the React 19 dev false-positive warning for script tags if any component triggers it
  if (process.env.NODE_ENV === "development") {
    const origError = console.error;
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes("Encountered a script tag")) {
        return;
      }
      origError.apply(console, args);
    };
  }
}

export function ThemeInit() {
  useInsertionEffect(() => {
    try {
      if (localStorage.getItem("di-theme") === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    } catch {}
  }, []);

  return null;
}

