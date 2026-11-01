"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { InfinitySymbol } from "@/components/ui/InfinitySymbol";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            "transition-all duration-500",
            scrolled
              ? "border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur-xl"
              : "border-b border-transparent bg-transparent"
          )}
        >
          <nav className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-12">
            {/* Brand */}
            <Link
              href="/"
              className="group flex items-center gap-2.5"
              aria-label={`${siteConfig.name} home`}
            >
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] transition-colors duration-300 group-hover:border-[var(--ink)]">
                <InfinitySymbol
                  size={20}
                  strokeWidth={1.6}
                  className="w-5 h-auto text-[var(--ink)] transition-transform duration-500 group-hover:scale-110"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[11px] uppercase tracking-[0.26em] text-[var(--dim)]">
                  {siteConfig.wordmark.first}
                </span>
                <span className="text-[15px] font-semibold tracking-tight text-[var(--ink)]">
                  {siteConfig.wordmark.second}
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-1 lg:flex">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition-colors duration-200 hover:bg-[var(--surface-2)] hover:text-[var(--ink)]"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />

              <Button
                href="/#contact"
                size="sm"
                className="hidden sm:inline-flex"
                icon={<ArrowUpRight className="h-3.5 w-3.5" />}
              >
                Start a project
              </Button>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)] lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </nav>

          {/* Scroll depth gauge */}
          <div
            aria-hidden="true"
            className={cn(
              "h-px origin-left bg-[var(--ink)] transition-opacity duration-500",
              scrolled ? "opacity-100" : "opacity-0"
            )}
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>

        {/* Curved lower edge, visible once the bar has a background */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          className={cn(
            "block h-[22px] w-full transition-opacity duration-500 sm:h-[30px]",
            scrolled ? "opacity-100" : "opacity-0"
          )}
        >
          <path
            d="M0 0H1440V2C1080 34 820 40 720 40C620 40 360 34 0 2V0Z"
            fill="var(--bg)"
            fillOpacity="0.85"
          />
          <path
            d="M0 2C360 34 620 40 720 40C820 40 1080 34 1440 2"
            fill="none"
            stroke="var(--line)"
            strokeWidth="1"
          />
        </svg>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "absolute inset-0 bg-[var(--bg)]/80 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0"
          )}
        />
        <aside
          className={cn(
            "absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col border-l border-[var(--line)] bg-[var(--surface)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            open ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex h-[68px] items-center justify-between border-b border-[var(--line)] px-6">
            <span className="eyebrow text-[var(--dim)]">Navigate</span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-1 overflow-y-auto px-6 py-8">
            {siteConfig.navigation.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 border-b border-[var(--line-soft)] py-4 text-2xl font-medium tracking-tight text-[var(--ink)] transition-colors hover:text-[var(--muted)]"
              >
                <span className="mono text-[10px] tracking-[0.2em] text-[var(--dim)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="space-y-4 border-t border-[var(--line)] px-6 py-7">
            <Button
              href="/#contact"
              size="lg"
              className="w-full"
              onClick={() => setOpen(false)}
              icon={<ArrowUpRight className="h-4 w-4" />}
            >
              Start a project
            </Button>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block text-center text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
            >
              {siteConfig.email}
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
