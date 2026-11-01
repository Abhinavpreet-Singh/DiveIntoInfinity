import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "glow" | "outline" | "solid";
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[var(--surface-2)] text-[var(--muted)] border border-[var(--line)]",
    glow: "bg-[var(--ink)]/10 text-[var(--ink)] border border-[var(--ink)]/30",
    outline:
      "bg-transparent text-[var(--dim)] border border-[var(--line)] uppercase tracking-[0.22em] text-[10px] font-semibold",
    solid: "bg-[var(--ink)] text-[var(--bg)] border border-transparent font-medium",
  };

  const sizeStyles = {
    sm: "px-2.5 py-1 text-[11px] rounded-full",
    md: "px-3.5 py-1.5 text-xs rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 transition-colors whitespace-nowrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
