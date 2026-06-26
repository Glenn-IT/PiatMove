import React from "react";

/**
 * Selectable chip — vehicle type, filters, quick options.
 */
export function Chip({ selected = false, leadingIcon = null, onClick, children, style, ...rest }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        height: 38, padding: "0 14px",
        borderRadius: "var(--radius-pill)",
        font: "var(--fw-semibold) 13px/1 var(--font-body)",
        cursor: "pointer",
        background: selected ? "var(--blue-50)" : "var(--surface-card)",
        color: selected ? "var(--blue-700)" : "var(--text-body)",
        border: selected ? "1.5px solid var(--blue-500)" : "1.5px solid var(--border-subtle)",
        transition: "all var(--dur-fast) var(--ease-standard)",
        ...style,
      }}
      {...rest}
    >
      {leadingIcon}
      {children}
    </button>
  );
}
