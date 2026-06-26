import React from "react";

/**
 * Status badge / pill used for booking states and labels.
 */
export function Badge({ tone = "neutral", soft = true, size = "md", dot = false, children, style, ...rest }) {
  const tones = {
    neutral: { fg: "var(--gray-600)", soft: "var(--gray-100)", solid: "var(--gray-600)" },
    primary: { fg: "var(--blue-700)", soft: "var(--blue-50)", solid: "var(--blue-600)" },
    success: { fg: "var(--green-700)", soft: "var(--green-50)", solid: "var(--green-500)" },
    warning: { fg: "var(--amber-700)", soft: "var(--amber-50)", solid: "var(--amber-500)" },
    danger:  { fg: "var(--red-700)",  soft: "var(--red-50)",  solid: "var(--red-500)" },
    info:    { fg: "var(--cyan-700)", soft: "var(--cyan-50)", solid: "var(--cyan-500)" },
  };
  const t = tones[tone] || tones.neutral;
  const sizes = { sm: { f: 11, p: "3px 8px", g: 5 }, md: { f: 12, p: "4px 10px", g: 6 } };
  const s = sizes[size] || sizes.md;
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: s.g,
      padding: s.p,
      borderRadius: "var(--radius-pill)",
      font: `var(--fw-semibold) ${s.f}px/1 var(--font-body)`,
      letterSpacing: "0.01em",
      background: soft ? t.soft : t.solid,
      color: soft ? t.fg : "#fff",
      whiteSpace: "nowrap",
      ...style,
    }} {...rest}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: "50%", background: soft ? t.solid : "#fff" }} />}
      {children}
    </span>
  );
}
