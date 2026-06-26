import React from "react";

/**
 * Mobile app top bar / header.
 */
export function TopBar({ title, subtitle, leading = null, trailing = null, variant = "default", style, ...rest }) {
  const onBrand = variant === "brand";
  return (
    <header style={{
      display: "flex", alignItems: "center", gap: 12,
      minHeight: "var(--header-h)", padding: "0 16px",
      background: onBrand ? "transparent" : "var(--surface-card)",
      borderBottom: onBrand ? "none" : "1px solid var(--border-subtle)",
      color: onBrand ? "#fff" : "var(--text-strong)",
      ...style,
    }} {...rest}>
      {leading}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ font: "var(--fw-bold) 17px/1.2 var(--font-display)", color: "inherit", letterSpacing: "-0.01em" }}>{title}</div>}
        {subtitle && <div style={{ font: "var(--fw-regular) 12px/1.3 var(--font-body)", color: onBrand ? "rgba(255,255,255,.8)" : "var(--text-muted)", marginTop: 2 }}>{subtitle}</div>}
      </div>
      {trailing}
    </header>
  );
}
