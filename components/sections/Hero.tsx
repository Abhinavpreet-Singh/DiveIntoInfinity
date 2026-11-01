import React from "react";
import { ArrowDown, CalendarDays } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { InfinityHeroGraphic } from "@/components/ui/InfinitySymbol";
import { ParticleField, LightShafts, Marquee } from "@/components/ui/Atmosphere";
import { Reveal, SplitText } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";

const TICKER = [
  "Web platforms",
  "Android apps",
  "Internal tools",
  "Design systems",
  "AI & automation",
  "Launch & care",
];

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* ---- Atmosphere ---- */}
      <div aria-hidden="true" className="absolute inset-0 -z-30 bg-[var(--bg)]" />
      <div aria-hidden="true" className="grid-field absolute inset-0 -z-20" />
      <LightShafts className="-z-20" />
      <ParticleField className="-z-10" />

      {/* ---- Centre stage ---- */}
      <div className="relative flex flex-1 items-center justify-center px-5 pt-28 pb-16 sm:px-8">
        <div className="relative flex w-full max-w-6xl flex-col items-center text-center">
          {/* The mark, with the wordmark seated at its centre */}
          <div className="relative w-full">
            <InfinityHeroGraphic className="mx-auto w-full max-w-[min(100%,62rem)]" />

            <div className="pointer-events-none absolute inset-0">
              {/* Seated in the open gap above the crossing, where the two
                  lobes have already curved away from the centre line. */}
              <span className="absolute left-1/2 top-[15%] -translate-x-1/2 whitespace-nowrap text-[0.5rem] font-semibold uppercase tracking-[0.42em] text-[var(--muted)] sm:top-[25%] sm:text-[0.6875rem] sm:tracking-[0.62em]">
                <SplitText text="Dive into" delay={260} step={34} />
              </span>
              <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(2.75rem,12.5vw,8rem)] font-semibold leading-[0.88] tracking-[-0.05em] text-[var(--ink)]">
                <SplitText text="Infinity" delay={620} step={52} />
              </h1>
            </div>
          </div>

          {/* Promise. Pulled up into the empty space the mark leaves below
              its lobes, so the actions stay above the fold. */}
          <Reveal delay={120}>
            <p className="-mt-1 max-w-xl text-balance text-base leading-relaxed text-[var(--muted)] sm:-mt-14 sm:text-lg">
              {siteConfig.tagline} Web platforms, mobile apps and the internal software
              that keeps them running.
            </p>
          </Reveal>

          {/* Actions */}
          <Reveal delay={220}>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
              <Button href="/#work" size="lg" icon={<ArrowDown className="h-4 w-4" />}>
                Begin the dive
              </Button>
              <Button
                href={siteConfig.schedulingUrl}
                external
                size="lg"
                variant="secondary"
                icon={<CalendarDays className="h-4 w-4" />}
                iconPosition="left"
              >
                Schedule a meeting
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ---- Ticker ---- */}
      <div className="relative border-t border-[var(--line)] py-5">
        <Marquee items={TICKER} />
      </div>

      {/* ---- Instrument strip ---- */}
      <div className="relative border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 divide-x divide-[var(--line)] px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
          <Readout label="Depth" value="0 m" note="Surface" />
          <Readout
            label="Live client platforms"
            value={String(projects.length)}
            note="Shipped and in production"
          />
          <Readout
            label="Surfaces"
            value="Web · Android"
            note="Plus dashboards and admin tooling"
            className="hidden lg:flex"
          />
          <Readout
            label="Studio"
            value={siteConfig.availability.label}
            note={siteConfig.availability.period}
            className="hidden lg:flex"
          />
        </div>
      </div>
    </section>
  );
}

function Readout({
  label,
  value,
  note,
  className = "",
}: {
  label: string;
  value: string;
  note: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 px-4 py-5 sm:px-6 ${className}`}>
      <span className="mono text-[10px] uppercase tracking-[0.22em] text-[var(--dim)]">
        {label}
      </span>
      <span className="text-lg font-medium tracking-tight text-[var(--ink)]">{value}</span>
      <span className="text-xs text-[var(--dim)]">{note}</span>
    </div>
  );
}
