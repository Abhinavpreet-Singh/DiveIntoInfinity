import React from "react";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "@/components/portfolio/ProjectVisual";
import { cn } from "@/lib/utils";

/**
 * One case-study card. Designed to work both standing alone and as a layer
 * in the stacking scroll on the homepage, so the surface is fully opaque.
 */
export function ProjectCard({
  project,
  index = 0,
  className,
}: {
  project: Project;
  index?: number;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "panel panel-hover group relative overflow-hidden rounded-3xl",
        className
      )}
    >
      {/* Header rail */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-6 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          <span className="mono text-[11px] tracking-[0.24em] text-[var(--dim)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="h-3 w-px bg-[var(--line-strong)]" aria-hidden="true" />
          <span className="eyebrow text-[var(--muted)]">{project.sector}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--ink)]">
            {project.kind === "client" ? "Client project" : "In-house product"}
          </span>
          <span className="mono text-[11px] text-[var(--dim)]">{project.year}</span>
        </div>
      </div>

      <div className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
        {/* Copy */}
        <div className="min-w-0">
          <h3 className="text-[1.75rem] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--ink)] sm:text-[2.25rem]">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-[var(--muted)]">{project.category}</p>
          <p className="mt-3 text-[0.8rem] leading-relaxed text-[var(--dim)]">
            {project.business}
          </p>

          <p className="mt-5 text-[0.95rem] leading-relaxed text-[var(--body)]">
            {project.summary}
          </p>

          {/* Highlights */}
          <dl className="mt-7 grid grid-cols-3 gap-4 border-y border-[var(--line)] py-5">
            {project.highlights.map((h) => (
              <div key={h.label} className="min-w-0">
                <dt className="truncate text-[10px] uppercase tracking-[0.16em] text-[var(--dim)]">
                  {h.label}
                </dt>
                <dd className="mt-1 text-xl font-medium tracking-tight text-[var(--ink)]">
                  {h.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Stack */}
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-[var(--line)] px-2.5 py-1 text-[11px] text-[var(--muted)] transition-colors duration-300 group-hover:border-[var(--line-strong)]"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link
              href={`/work/${project.slug}`}
              className="link-underline inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink)]"
            >
              Read the case study
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--ink)]"
            >
              Visit live site
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Visual */}
        <div className="min-w-0">
          <ProjectVisual project={project} />
        </div>
      </div>
    </article>
  );
}
