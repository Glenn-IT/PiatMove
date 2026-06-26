import React from "react";

/**
 * Labeled text input with optional leading icon and helper/error text.
 */
export function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  leadingIcon = null,
  trailingIcon = null,
  helperText,
  error = false,
  disabled = false,
  required = false,
  style,
  ...rest
}) {
  const borderColor = error ? "var(--status-danger)" : "var(--border-subtle)";
  return (
    <label style={{ display: "block", width: "100%", ...style }}>
      {label && (
        <span style={{
          display: "block",
          font: "var(--fw-semibold) 13px/1.2 var(--font-body)",
          color: "var(--text-strong)",
          marginBottom: 7,
        }}>
          {label}{required && <span style={{ color: "var(--status-danger)" }}> *</span>}
        </span>
      )}
      <span style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        height: 48,
        padding: "0 14px",
        background: disabled ? "var(--surface-sunken)" : "var(--surface-card)",
        border: `1.5px solid ${borderColor}`,
        borderRadius: "var(--radius-md)",
        transition: "border-color var(--dur-fast), box-shadow var(--dur-fast)",
      }}>
        {leadingIcon && <span style={{ color: "var(--text-subtle)", display: "flex" }}>{leadingIcon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={{
            flex: 1,
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            font: "var(--fw-medium) 15px/1.4 var(--font-body)",
            color: "var(--text-strong)",
          }}
          onFocus={(e) => {
            const w = e.currentTarget.parentElement;
            if (!error) { w.style.borderColor = "var(--border-focus)"; w.style.boxShadow = "var(--shadow-focus)"; }
          }}
          onBlur={(e) => {
            const w = e.currentTarget.parentElement;
            w.style.borderColor = borderColor; w.style.boxShadow = "none";
          }}
          {...rest}
        />
        {trailingIcon && <span style={{ color: "var(--text-subtle)", display: "flex" }}>{trailingIcon}</span>}
      </span>
      {helperText && (
        <span style={{
          display: "block",
          marginTop: 6,
          font: "var(--fw-regular) 12px/1.4 var(--font-body)",
          color: error ? "var(--status-danger)" : "var(--text-muted)",
        }}>{helperText}</span>
      )}
    </label>
  );
}
