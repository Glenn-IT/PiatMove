import React from "react";

/**
 * Compact analytics stat card for dashboards.
 */
export function StatCard({ label, value, icon = null, tone = "primary", delta, deltaDir = "up", style, ...rest }) {
  const tones = {
    primary: { soft: "var(--blue-50)", fg: "var(--blue-600)" },
    success: { soft: "var(--green-50)", fg: "var(--green-600)" },
    warning: { soft: "var(--amber-50)", fg: "var(--amber-700)" },
    info:    { soft: "var(--cyan-50)", fg: "var(--cyan-700)" },
    neutral: { soft: "var(--gray-100)", fg: "var(--gray-600)" },
  };
  const t = tones[tone] || tones.primary;
  const up = deltaDir === "up";
  return (
    <div style={{
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: "var(--space-5)",
      boxShadow: "var(--shadow-sm)",
      ...style,
    }} {...rest}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
        <span style={{
          width: 44, height: 44, borderRadius: "var(--radius-md)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          background: t.soft, color: t.fg,
        }}>{icon}</span>
        {delta != null && (
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 3,
            font: "var(--fw-semibold) 12px/1 var(--font-body)",
            color: up ? "var(--green-600)" : "var(--red-500)",
          }}>{up ? "▲" : "▼"} {delta}</span>
        )}
      </div>
      <div style={{ font: "var(--fw-extrabold) 30px/1 var(--font-display)", color: "var(--text-strong)", letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ marginTop: 6, font: "var(--fw-medium) 13px/1.3 var(--font-body)", color: "var(--text-muted)" }}>{label}</div>
    </div>
  );
}
