import React from "react";
import { cn } from "@/lib/utils";

/**
 * Deterministic particle field, using fixed values so server and client render
 * identically (no Math.random, no hydration mismatch). Ink on paper.
 */
const PARTICLES = [
  { left: "6%", size: 2, duration: 30, delay: 0, drift: 24, opacity: 0.22 },
  { left: "14%", size: 1, duration: 36, delay: 6, drift: -18, opacity: 0.16 },
  { left: "23%", size: 3, duration: 26, delay: 12, drift: 30, opacity: 0.2 },
  { left: "31%", size: 1, duration: 40, delay: 3, drift: -26, opacity: 0.14 },
  { left: "39%", size: 2, duration: 32, delay: 17, drift: 16, opacity: 0.18 },
  { left: "47%", size: 3, duration: 28, delay: 9, drift: -34, opacity: 0.2 },
  { left: "55%", size: 1, duration: 38, delay: 21, drift: 22, opacity: 0.14 },
  { left: "63%", size: 2, duration: 31, delay: 2, drift: -14, opacity: 0.2 },
  { left: "71%", size: 3, duration: 34, delay: 14, drift: 28, opacity: 0.18 },
  { left: "79%", size: 1, duration: 42, delay: 7, drift: -20, opacity: 0.14 },
  { left: "87%", size: 2, duration: 29, delay: 19, drift: 18, opacity: 0.2 },
  { left: "94%", size: 1, duration: 37, delay: 11, drift: -24, opacity: 0.16 },
];

export function ParticleField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={
            {
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              "--p-duration": `${p.duration}s`,
              "--p-delay": `${p.delay}s`,
              "--p-drift": `${p.drift}px`,
              "--p-opacity": p.opacity,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/**
 * Soft contrast wash behind a band, the monochrome stand-in for light
 * shafts. Two slow-drifting radial fades, no colour.
 */
export function LightShafts({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute -top-1/3 left-[6%] h-[140%] w-[40vw] animate-drift-slow opacity-60"
        style={{
          background: "radial-gradient(closest-side, var(--veil), transparent 72%)",
        }}
      />
      <div
        className="absolute -top-1/4 left-[52%] h-[130%] w-[46vw] animate-drift opacity-50"
        style={{
          background: "radial-gradient(closest-side, var(--veil), transparent 70%)",
        }}
      />
    </div>
  );
}

/**
 * The curved lower edge used under the navigation bar and between bands,
 * a nod to the arc that frames the reference site's header.
 */
export function CurvedEdge({
  className,
  fill = "var(--bg)",
  flip = false,
}: {
  className?: string;
  fill?: string;
  flip?: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={cn("block w-full h-[28px] sm:h-[44px]", flip && "rotate-180", className)}
    >
      <path d="M0 0H1440V4C1080 42 820 48 720 48C620 48 360 42 0 4V0Z" fill={fill} />
    </svg>
  );
}

/** Thin rule used to separate bands. */
export function Hairline({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn("hairline w-full", className)} />;
}

/**
 * Infinite horizontal ticker. The children are rendered twice so the loop
 * is seamless at -50%.
 */
export function Marquee({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap px-7 text-[clamp(1.1rem,2.6vw,1.9rem)] font-medium tracking-[-0.02em] text-[var(--muted)]">
            {item}
          </span>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-[var(--line-strong)]"
          />
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("marquee-mask overflow-hidden", className)} aria-hidden="true">
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
