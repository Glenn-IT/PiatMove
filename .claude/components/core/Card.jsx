import React from "react";

/**
 * Surface container. The base layout block for the system.
 */
export function Card({
  padding = "md",
  elevation = "sm",
  interactive = false,
  style,
  children,
  ...rest
}) {
  const pads = { none: 0, sm: "var(--space-4)", md: "var(--space-5)", lg: "var(--space-6)" };
  const shadows = { none: "none", xs: "var(--shadow-xs)", sm: "var(--shadow-sm)", md: "var(--shadow-md)" };
  return (
    <div
      style={{
        background: "var(--surface-card)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: pads[padding] ?? pads.md,
        boxShadow: shadows[elevation] ?? shadows.sm,
        transition: "box-shadow var(--dur-base) var(--ease-standard), transform var(--dur-base) var(--ease-standard)",
        cursor: interactive ? "pointer" : "default",
        ...style,
      }}
      onMouseEnter={interactive ? (e) => { e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateY(-2px)"; } : undefined}
      onMouseLeave={interactive ? (e) => { e.currentTarget.style.boxShadow = shadows[elevation] ?? shadows.sm; e.currentTarget.style.transform = "translateY(0)"; } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
