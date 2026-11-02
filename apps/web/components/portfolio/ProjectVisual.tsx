import React from "react";
import Image from "next/image";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * A real screenshot of the shipped product, framed with room around it and
 * contained rather than cropped, so no edge is ever cut off. The whole frame
 * opens the live site. It sits desaturated so it does not fight the
 * monochrome palette, and returns to full colour when the card it belongs
 * to is hovered anywhere, not only the image itself.
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
        "group/vis block cursor-pointer rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-3 transition-[border-color,box-shadow] duration-500 hover:border-[var(--line-strong)] group-hover:border-[var(--line-strong)] sm:p-4",
        className
      )}
    >
      {/* The shot, contained so every edge of the capture stays visible. */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--surface)]">
        <Image
          src={project.image}
          alt={`The ${project.title} homepage`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 45vw, 92vw"
          className="object-contain object-top grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/vis:scale-[1.015] group-hover/vis:grayscale-0 group-hover:scale-[1.015] group-hover:grayscale-0"
        />
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
