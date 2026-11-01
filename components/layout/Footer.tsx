import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { InfinitySymbol } from "@/components/ui/InfinitySymbol";
import { CurrentYear } from "@/components/layout/CurrentYear";

export function Footer() {

  return (
    <footer className="relative overflow-hidden border-t border-[var(--line-soft)] bg-[var(--bg)]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[var(--line)]"
      />

      <Container size="wide" className="relative py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" className="group inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface-2)] transition-colors group-hover:border-[var(--ink)]/50">
                <InfinitySymbol size={20} strokeWidth={1.6} className="w-5 text-[var(--ink)]" />
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

            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
              {siteConfig.description}
            </p>

            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-[var(--ink)] transition-colors hover:text-[var(--ink)]"
            >
              {siteConfig.email}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Navigate */}
          <nav className="lg:col-span-2">
            <h2 className="eyebrow mb-5 text-[var(--dim)]">Navigate</h2>
            <ul className="space-y-3">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#contact"
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Work */}
          <nav className="lg:col-span-2">
            <h2 className="eyebrow mb-5 text-[var(--dim)]">Work</h2>
            <ul className="space-y-3">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/work/${project.slug}`}
                    className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                  >
                    {project.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/work"
                  className="text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                >
                  All work
                </Link>
              </li>
            </ul>
          </nav>

          {/* Elsewhere */}
          <nav className="lg:col-span-3">
            <h2 className="eyebrow mb-5 text-[var(--dim)]">Elsewhere</h2>
            <ul className="space-y-3">
              {siteConfig.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
                  >
                    {social.name}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center gap-2.5 text-xs text-[var(--dim)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--ink)] opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--ink)]" />
              </span>
              {siteConfig.availability.label}
            </div>
          </nav>
        </div>

        {/* Baseline */}
        <div className="mt-14 flex flex-col gap-4 border-t border-[var(--line-soft)] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--dim)]">
            © <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--dim)]">
            {siteConfig.location} · Depth ∞
          </p>
        </div>
      </Container>

      {/* Oversized watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none overflow-hidden px-5 pb-6 sm:px-8 lg:px-12"
      >
        <p className="bg-gradient-to-b from-[var(--line-strong)] to-transparent bg-clip-text text-center text-[clamp(2.5rem,13vw,11rem)] font-semibold leading-[0.85] tracking-[-0.05em] text-transparent">
          Dive into Infinity
        </p>
      </div>
    </footer>
  );
}
