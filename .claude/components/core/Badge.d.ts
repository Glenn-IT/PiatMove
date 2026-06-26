import * as React from "react";

export interface BadgeProps {
  /** @default "neutral" */
  tone?: "neutral" | "primary" | "success" | "warning" | "danger" | "info";
  /** Soft tinted bg (true) vs solid fill. @default true */
  soft?: boolean;
  /** @default "md" */
  size?: "sm" | "md";
  /** Show a leading status dot. @default false */
  dot?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Pill badge for booking statuses, counts, and labels. */
export function Badge(props: BadgeProps): JSX.Element;
