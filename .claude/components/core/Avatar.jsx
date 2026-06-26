import React from "react";

/**
 * User avatar — image or initials fallback, with optional status ring.
 */
export function Avatar({ src, name = "", size = 44, status, style, ...rest }) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  const statusColors = { online: "var(--green-500)", busy: "var(--amber-500)", offline: "var(--gray-400)" };
  return (
    <span style={{ position: "relative", display: "inline-flex", flex: "none", ...style }} {...rest}>
      <span style={{
        width: size, height: size, borderRadius: "50%",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        background: src ? "var(--surface-sunken)" : "var(--blue-100)",
        color: "var(--blue-700)",
        font: `var(--fw-bold) ${Math.round(size * 0.38)}px/1 var(--font-display)`,
        border: "2px solid var(--surface-card)",
        boxShadow: "var(--shadow-xs)",
      }}>
        {src ? <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : initials}
      </span>
      {status && (
        <span style={{
          position: "absolute", right: -1, bottom: -1,
          width: Math.max(10, size * 0.26), height: Math.max(10, size * 0.26),
          borderRadius: "50%", background: statusColors[status] || statusColors.offline,
          border: "2px solid var(--surface-card)",
        }} />
      )}
    </span>
  );
}
