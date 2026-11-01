import React from "react";
import { cn } from "@/lib/utils";

interface InfinitySymbolProps {
  className?: string;
  size?: number | string;
  strokeWidth?: number;
  animated?: boolean;
}

export function InfinitySymbol({
  className = "w-6 h-6 text-current",
  size = 24,
  strokeWidth = 2,
  animated = false,
}: InfinitySymbolProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block transition-transform duration-300", className)}
      aria-hidden="true"
    >
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5 22 21 17 24 12C27 7 30.5 2 36 2C41.5228 2 46 6.47715 46 12C46 17.5228 41.5228 22 36 22C30.5 22 27 17 24 12C21 7 17.5 2 12 2Z"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "animate-pulse" : ""}
      />
    </svg>
  );
}

/** Outer loop. The travelling highlight runs on this one. */
const OUTER_PATH =
  "M150 55 C85 55 40 100 40 150 C40 200 85 245 150 245 C215 245 255 185 300 150 C345 115 385 55 450 55 C515 55 560 100 560 150 C560 200 515 245 450 245 C385 245 345 185 300 150 C255 115 215 55 150 55 Z";

/** Inner counter loop, sitting just inside the outer one. */
const INNER_PATH =
  "M150 72 C97 72 62 109 62 150 C62 191 97 228 150 228 C209 228 247 179 300 150 C353 121 391 72 450 72 C503 72 538 109 538 150 C538 191 503 228 450 228 C391 228 353 179 300 150 C247 121 209 72 150 72 Z";

/** Both paths are normalised to this length, so dash values read as a share
 * of the loop and the keyframes stay plain, interpolatable numbers. */
const PATH_LEN = 1000;

/** Length of the travelling segment, as a share of the loop. */
const SEGMENT = 110;

/** When both loops have finished drawing: 3.4s draw plus the inner delay. */
const DRAW_TOTAL = 3.85;

/**
 * The hero mark: two infinity lines, with a single brighter segment gliding
 * around the outer one forever. Nothing else.
 */
export function InfinityHeroGraphic({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center select-none pointer-events-none",
        className
      )}
    >
      <svg
        viewBox="0 0 600 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-auto w-full text-[var(--ink)]"
        aria-hidden="true"
      >
        {/* Outer loop, drawn in on load */}
        <path
          d={OUTER_PATH}
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
          pathLength={PATH_LEN}
          strokeDasharray={PATH_LEN}
          className="animate-draw"
        />

        {/* Inner loop, following a beat behind */}
        <path
          d={INNER_PATH}
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.2"
          pathLength={PATH_LEN}
          strokeDasharray={PATH_LEN}
          className="animate-draw"
          style={{ animationDelay: "350ms" }}
        />

        {/* The travelling line, on the outer loop. It holds off until both
            loops have finished drawing themselves in. */}
        <path
          d={OUTER_PATH}
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={PATH_LEN}
          strokeDasharray={`${SEGMENT} ${PATH_LEN - SEGMENT}`}
          className="trace-line"
          style={{ "--trace-delay": `${DRAW_TOTAL}s` } as React.CSSProperties}
        />
      </svg>
    </div>
  );
}
