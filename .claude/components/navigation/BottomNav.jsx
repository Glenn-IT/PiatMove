import React from "react";

/**
 * Mobile bottom navigation bar. Pass items with icon nodes.
 */
export function BottomNav({ items = [], activeKey, onChange, style, ...rest }) {
  return (
    <nav style={{
      display: "flex",
      alignItems: "stretch",
      justifyContent: "space-around",
      height: "var(--bottomnav-h)",
      paddingBottom: "env(safe-area-inset-bottom, 0px)",
      background: "var(--surface-card)",
      borderTop: "1px solid var(--border-subtle)",
      boxShadow: "var(--shadow-nav)",
      ...style,
    }} {...rest}>
      {items.map((it) => {
        const active = it.key === activeKey;
        return (
          <button
            key={it.key}
            type="button"
            onClick={() => onChange && onChange(it.key)}
            style={{
              flex: 1, border: "none", background: "transparent", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4,
              color: active ? "var(--color-primary)" : "var(--text-subtle)",
              transition: "color var(--dur-fast)",
              position: "relative",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 24 }}>{it.icon}</span>
            <span style={{ font: `${active ? "var(--fw-bold)" : "var(--fw-medium)"} 11px/1 var(--font-body)` }}>{it.label}</span>
            {it.badge ? (
              <span style={{
                position: "absolute", top: 6, right: "50%", marginRight: -18,
                minWidth: 16, height: 16, padding: "0 4px", borderRadius: 8,
                background: "var(--status-danger)", color: "#fff",
                font: "var(--fw-bold) 10px/16px var(--font-body)", textAlign: "center",
              }}>{it.badge}</span>
            ) : null}
          </button>
        );
      })}
    </nav>
  );
}
