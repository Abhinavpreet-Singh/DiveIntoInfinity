import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "light";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external = false,
  icon,
  iconPosition = "right",
  className,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const baseStyles =
    "group relative inline-flex items-center justify-center overflow-hidden font-medium tracking-tight transition-[color,background-color,border-color,transform,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--ink)] disabled:opacity-50 disabled:pointer-events-none active:scale-[0.985] select-none";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 rounded-full gap-1.5",
    md: "text-sm px-6 py-3 rounded-full gap-2",
    lg: "text-[0.95rem] px-8 py-4 rounded-full gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-[var(--ink)] text-[var(--bg)] font-semibold border border-[var(--ink)] hover:shadow-[0_18px_40px_-22px_var(--ink)]",
    secondary:
      "bg-transparent text-[var(--ink)] border border-[var(--line-strong)] hover:border-[var(--ink)]",
    ghost:
      "bg-transparent text-[var(--muted)] border border-transparent hover:text-[var(--ink)] hover:bg-[var(--surface-2)]",
    light:
      "bg-[var(--bg)] text-[var(--ink)] font-semibold border border-[var(--line)] hover:border-[var(--ink)]",
  };

  /* A wash that sweeps across on hover — same ink, different weight. */
  const sweep =
    variant === "primary" || variant === "secondary" ? (
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 -translate-x-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0",
          variant === "primary" ? "bg-[var(--bg)]/15" : "bg-[var(--ink)]/[0.06]"
        )}
      />
    ) : null;

  const content = (
    <>
      {sweep}
      {icon && iconPosition === "left" && (
        <span className="relative shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
      <span className="relative">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="relative shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  const combinedClass = cn(baseStyles, sizeStyles[size], variantStyles[variant], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClass}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={combinedClass}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClass} disabled={disabled} onClick={onClick} {...props}>
      {content}
    </button>
  );
}
