import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Compact card used for the in-house grid, where three products sit side by
 * side rather than as full case-study rows.
 */
export function ProjectTile({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "panel panel-hover group flex flex-col overflow-hidden rounded-3xl",
        className
      )}
    >
      {/* Shot opens the live product */}
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open the live ${project.title} site`}
        className="block cursor-pointer p-3 pb-0"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
          <Image
            src={project.image}
            alt={`The ${project.title} homepage`}
            fill
            sizes="(min-width: 1024px) 30vw, 92vw"
            className="object-cover object-top grayscale transition-[filter,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02] group-hover:grayscale-0"
          />
          <span className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--bg)]/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink)] opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
            Visit
            <ArrowUpRight className="h-3 w-3" />
          </span>
        </div>
      </a>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink)]">
            In-house
          </span>
          <span className="text-[11px] text-[var(--dim)]">{project.sector}</span>
        </div>

        <h3 className="mt-4 text-xl font-semibold tracking-tight text-[var(--ink)]">
          {project.title}
        </h3>
        <p className="mt-1 text-[0.8rem] text-[var(--muted)]">{project.category}</p>

        <p className="mt-4 flex-1 text-[0.875rem] leading-relaxed text-[var(--body)]">
          {project.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-[var(--line)] px-2 py-0.5 text-[10px] text-[var(--muted)]"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-[var(--line)] pt-5">
          <Link
            href={`/work/${project.slug}`}
            className="link-underline inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-[var(--ink)]"
          >
            Case study
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-1.5 text-[0.8rem] text-[var(--muted)] hover:text-[var(--ink)]"
          >
            Live site
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </article>
  );
}
