import React from "react";

/**
 * Generic list row — notifications, settings, trips.
 */
export function ListItem({ leading = null, title, subtitle, meta = null, trailing = null, onClick, divider = true, style, ...rest }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "14px 4px",
        borderBottom: divider ? "1px solid var(--border-subtle)" : "none",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
      {...rest}
    >
      {leading}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ font: "var(--fw-semibold) 15px/1.3 var(--font-body)", color: "var(--text-strong)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
        {subtitle && <div style={{ font: "var(--fw-regular) 13px/1.4 var(--font-body)", color: "var(--text-muted)", marginTop: 2 }}>{subtitle}</div>}
      </div>
      {meta && <div style={{ font: "var(--fw-medium) 12px/1 var(--font-body)", color: "var(--text-subtle)", whiteSpace: "nowrap" }}>{meta}</div>}
      {trailing}
    </div>
  );
}
