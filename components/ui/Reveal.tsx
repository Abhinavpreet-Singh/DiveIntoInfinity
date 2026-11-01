"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-triggered reveal. Elements start translated and transparent
 * (styled by `[data-reveal]` in globals.css) and settle once in view.
 * Reveals once — nothing re-animates on the way back up.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "span" | "p";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      node.setAttribute("data-reveal", "in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "in");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      data-reveal=""
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}

/**
 * Splits a line into characters so it can rise into place letter by letter.
 * Spaces are preserved and the whole string stays readable to screen readers.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  step = 28,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  return (
    <span className={cn("inline-block", className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split("").map((char, i) => (
          <span
            key={`${char}-${i}`}
            className="char"
            style={{ "--char-delay": `${delay + i * step}ms` } as React.CSSProperties}
          >
            {char === " " ? " " : char}
          </span>
        ))}
      </span>
    </span>
  );
}
