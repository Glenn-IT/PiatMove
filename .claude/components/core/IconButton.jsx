import React from "react";

/**
 * Square icon-only button (header actions, toolbars).
 */
export function IconButton({ variant = "soft", size = 40, label, onClick, children, style, ...rest }) {
  const variants = {
    soft: { background: "var(--surface-sunken)", color: "var(--text-body)", border: "1px solid transparent" },
    ghost: { background: "transparent", color: "var(--text-body)", border: "1px solid transparent" },
    outline: { background: "var(--surface-card)", color: "var(--text-body)", border: "1px solid var(--border-subtle)" },
    primary: { background: "var(--color-primary)", color: "#fff", border: "1px solid transparent" },
  };
  const v = variants[variant] || variants.soft;
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      style={{
        width: size, height: size, flex: "none",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        borderRadius: "var(--radius-md)", cursor: "pointer",
        transition: "filter var(--dur-fast), transform var(--dur-fast)",
        ...v, ...style,
      }}
      onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.93)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...rest}
    >
      {children}
    </button>
  );
}
