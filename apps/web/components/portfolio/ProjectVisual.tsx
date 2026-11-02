import React from "react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * An abstract per-project schematic, with no fake screenshots. One node per
 * shipped surface, wired to a common core. Ink on paper, like the rest.
 */
export function ProjectVisual({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group/vis relative aspect-[16/11] w-full overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-2)]",
        className
      )}
    >
      <div aria-hidden="true" className="grid-field absolute inset-0" />

      <svg
        viewBox="0 0 400 275"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 h-full w-full text-[var(--ink)]"
        aria-hidden="true"
      >
        {/* Orbit rings */}
        <g stroke="currentColor">
          <circle cx="200" cy="130" r="104" opacity="0.12" strokeDasharray="2 8" />
          <circle cx="200" cy="130" r="72" opacity="0.2" strokeDasharray="2 6" />
          <circle
            cx="200"
            cy="130"
            r="40"
            opacity="0.34"
            className="origin-[200px_130px] transition-transform duration-700 group-hover/vis:scale-110"
          />
        </g>

        {/* One spoke per shipped surface */}
        {project.platforms.map((_, i) => {
          const angle = (-90 + (360 / project.platforms.length) * i) * (Math.PI / 180);
          const x = 200 + Math.cos(angle) * 104;
          const y = 130 + Math.sin(angle) * 104;
          return (
            <g key={i}>
              <line
                x1="200"
                y1="130"
                x2={x}
                y2={y}
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
              <circle
                cx={x}
                cy={y}
                r="5"
                fill="var(--bg-2)"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <circle cx={x} cy={y} r="2" fill="currentColor" />
            </g>
          );
        })}

        <circle cx="200" cy="130" r="7" fill="currentColor" opacity="0.18" />
        <circle cx="200" cy="130" r="3" fill="currentColor" />
      </svg>

      {/* Platform labels */}
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-2 border-t border-[var(--line)] bg-[var(--surface)] px-4 py-3">
        {project.platforms.map((platform) => (
          <span
            key={platform}
            className="rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--muted)]"
          >
            {platform}
          </span>
        ))}
      </div>

      {/* Depth stamp */}
      <span className="mono absolute right-4 top-4 text-[10px] tracking-[0.2em] text-[var(--dim)]">
        {project.depth}m
      </span>
    </div>
  );
}
