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

const CORE_PATH =
  "M150 55 C85 55 40 100 40 150 C40 200 85 245 150 245 C215 245 255 185 300 150 C345 115 385 55 450 55 C515 55 560 100 560 150 C560 200 515 245 450 245 C385 245 345 185 300 150 C255 115 215 55 150 55 Z";

/**
 * The hero centrepiece. The core path draws itself on load, a light pulse
 * runs the loop forever, and everything is ink on paper — no hue.
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
        className="relative w-full h-auto text-[var(--ink)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="inf-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.12" />
          </linearGradient>

          <linearGradient id="inf-pulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Reference geometry */}
        <g stroke="currentColor" opacity="0.14">
          <circle cx="150" cy="150" r="118" strokeDasharray="2 8" />
          <circle cx="450" cy="150" r="118" strokeDasharray="2 8" />
          <circle cx="300" cy="150" r="148" strokeDasharray="1 10" />
          <line x1="300" y1="4" x2="300" y2="296" strokeDasharray="4 7" />
          <line x1="12" y1="150" x2="588" y2="150" strokeDasharray="4 7" />
        </g>

        {/* Echo */}
        <path
          d="M150 40 C75 40 20 95 20 150 C20 205 75 260 150 260 C220 260 265 195 300 150 C335 105 380 40 450 40 C525 40 580 95 580 150 C580 205 525 260 450 260 C380 260 335 195 300 150 C265 105 220 40 150 40 Z"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 7"
          opacity="0.22"
        />

        {/* Core — draws itself in */}
        <path
          d={CORE_PATH}
          stroke="url(#inf-fade)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="2600"
          className="animate-draw"
        />

        {/* Travelling pulse */}
        <path
          d={CORE_PATH}
          stroke="url(#inf-pulse)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="70 2530"
          className="animate-trace"
          opacity="0.8"
        />

        {/* Inner counter loop */}
        <path
          d="M150 72 C97 72 62 109 62 150 C62 191 97 228 150 228 C209 228 247 179 300 150 C353 121 391 72 450 72 C503 72 538 109 538 150 C538 191 503 228 450 228 C391 228 353 179 300 150 C247 121 209 72 150 72 Z"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.3"
        />

        {/* Focal nodes */}
        <circle cx="150" cy="55" r="3" fill="currentColor" />
        <circle cx="450" cy="245" r="3" fill="currentColor" />

        {/* Technical annotations */}
        <g fill="currentColor" opacity="0.4" fontSize="8.5" fontFamily="monospace" letterSpacing="1.2">
          <text x="20" y="288">DEPTH ∞ · NO FLOOR</text>
          <text x="452" y="26">STUDIO REF · DI-26</text>
        </g>
      </svg>
    </div>
  );
}
