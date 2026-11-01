import React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * A real screenshot of the shipped product, framed with room around it so
 * nothing is cropped. The whole frame opens the live site. It sits
 * desaturated so it does not fight the monochrome palette, and returns to
 * full colour on hover.
 */
export function ProjectVisual({
  project,
  className,
  priority = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  return (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open the live ${project.title} site`}
      className={cn(
        "group/vis block cursor-pointer rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-3 transition-[border-color,box-shadow] duration-500 hover:border-[var(--line-strong)] sm:p-4",
        className
      )}
    >
      {/* The shot. 16/10 matches the capture, so it is never cropped. */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]">
        <Image
          src={project.image}
          alt={`The ${project.title} homepage`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 45vw, 92vw"
          className="object-cover object-top grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/vis:scale-[1.015] group-hover/vis:grayscale-0"
        />

        {/* Visit affordance, revealed on hover */}
        <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--bg)]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink)] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover/vis:opacity-100">
          Visit site
          <ArrowUpRight className="h-3 w-3" />
        </span>

        <span className="mono absolute left-3 top-3 rounded-full bg-[var(--bg)]/80 px-2 py-1 text-[10px] tracking-[0.2em] text-[var(--muted)] backdrop-blur-sm">
          {project.depth}m
        </span>
      </div>

      {/* Platform labels, below the shot rather than over it */}
      <div className="flex flex-wrap items-center gap-2 pt-3">
        {project.platforms.map((platform) => (
          <span
            key={platform}
            className="rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--muted)]"
          >
            {platform}
          </span>
        ))}
      </div>
    </a>
  );
}
