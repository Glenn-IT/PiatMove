import React from "react";

/**
 * Vertical status timeline for booking / trip tracking.
 * steps: [{ label, time?, state: "done"|"active"|"pending" }]
 */
export function StatusTimeline({ steps = [], style, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }} {...rest}>
      {steps.map((st, i) => {
        const last = i === steps.length - 1;
        const done = st.state === "done";
        const active = st.state === "active";
        const dot = done ? "var(--green-500)" : active ? "var(--blue-600)" : "var(--gray-300)";
        return (
          <div key={i} style={{ display: "flex", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <span style={{
                width: 24, height: 24, borderRadius: "50%", flex: "none",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                background: (done || active) ? dot : "var(--surface-card)",
                border: (done || active) ? "none" : "2px solid var(--gray-300)",
                color: "#fff", font: "var(--fw-bold) 12px/1 var(--font-body)",
                boxShadow: active ? "0 0 0 4px var(--blue-50)" : "none",
              }}>{done ? "✓" : ""}</span>
              {!last && <span style={{ width: 2, flex: 1, minHeight: 28, background: done ? "var(--green-300)" : "var(--gray-200)", marginTop: 2 }} />}
            </div>
            <div style={{ paddingBottom: last ? 0 : 18, marginTop: 1 }}>
              <div style={{
                font: `${active ? "var(--fw-bold)" : "var(--fw-semibold)"} 14px/1.3 var(--font-body)`,
                color: (done || active) ? "var(--text-strong)" : "var(--text-subtle)",
              }}>{st.label}</div>
              {st.time && <div style={{ font: "var(--fw-regular) 12px/1.3 var(--font-body)", color: "var(--text-muted)", marginTop: 2 }}>{st.time}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
