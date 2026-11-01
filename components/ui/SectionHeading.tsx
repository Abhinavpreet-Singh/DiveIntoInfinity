import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  depth?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  depth,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-5",
        align === "center" ? "text-center mx-auto max-w-3xl" : "text-left",
        className
      )}
    >
      {(eyebrow || depth) && (
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" ? "justify-center" : "justify-start"
          )}
        >
          <span
            className="h-px w-8 bg-gradient-to-r from-transparent to-[var(--ink)]"
            aria-hidden="true"
          />
          {eyebrow && <span className="eyebrow text-[var(--ink)]">{eyebrow}</span>}
          {depth && (
            <span className="font-mono text-[10px] tracking-[0.2em] text-[var(--dim)]">
              {depth}
            </span>
          )}
        </div>
      )}

      <h2 className="text-[2rem] sm:text-4xl md:text-[3.25rem] font-semibold tracking-[-0.035em] leading-[1.06] text-[var(--ink)] text-balance">
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "text-base sm:text-[1.0625rem] leading-relaxed text-[var(--muted)] max-w-2xl",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
