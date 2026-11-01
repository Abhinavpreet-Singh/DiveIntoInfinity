"use client";

import React, { useCallback, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const STORAGE_KEY = "di-theme";

function resolveTheme(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Re-read whenever the OS preference flips or the attribute changes. */
function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);

  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });

  return () => {
    media.removeEventListener("change", onChange);
    observer.disconnect();
  };
}

const getServerSnapshot = (): Theme => "light";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, resolveTheme, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = resolveTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage can be blocked — the attribute is enough for this session */
    }
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors duration-300 hover:border-[var(--ink)] hover:text-[var(--ink)] ${className}`}
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-500 ${
          isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-50 opacity-0"
        }`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-500 ${
          isDark ? "rotate-90 scale-50 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}
