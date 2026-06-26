import React from "react";

/**
 * Primary action button for the Piat Booking system.
 */
export function Button({
  variant = "primary",
  size = "md",
  block = false,
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  type = "button",
  onClick,
  children,
  style,
  ...rest
}) {
  const sizes = {
    sm: { padding: "0 14px", height: 38, font: 13, radius: "var(--radius-sm)", gap: 6 },
    md: { padding: "0 18px", height: 46, font: 15, radius: "var(--radius-md)", gap: 8 },
    lg: { padding: "0 24px", height: 54, font: 16, radius: "var(--radius-md)", gap: 10 },
  };
  const s = sizes[size] || sizes.md;

  const variants = {
    primary: { background: "var(--color-primary)", color: "var(--color-primary-on)", border: "1px solid transparent", boxShadow: "var(--shadow-sm)" },
    secondary: { background: "var(--color-secondary)", color: "var(--color-secondary-on)", border: "1px solid transparent", boxShadow: "var(--shadow-sm)" },
    outline: { background: "var(--surface-card)", color: "var(--color-primary)", border: "1.5px solid var(--blue-200)", boxShadow: "none" },
    ghost: { background: "transparent", color: "var(--color-primary)", border: "1px solid transparent", boxShadow: "none" },
    danger: { background: "var(--status-danger)", color: "#fff", border: "1px solid transparent", boxShadow: "var(--shadow-sm)" },
  };
  const v = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: s.gap,
        width: block ? "100%" : "auto",
        height: s.height,
        padding: s.padding,
        font: `var(--fw-semibold) ${s.font}px/1 var(--font-body)`,
        letterSpacing: "0.01em",
        borderRadius: s.radius,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "filter var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard)",
        ...v,
        ...style,
      }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.98)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...rest}
    >
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
