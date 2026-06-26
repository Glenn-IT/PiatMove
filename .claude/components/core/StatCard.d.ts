import * as React from "react";

/**
 * @startingPoint section="Dashboard" subtitle="KPI metric card with icon + delta" viewport="320x150"
 */
export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  /** @default "primary" */
  tone?: "primary" | "success" | "warning" | "info" | "neutral";
  /** Optional change indicator text, e.g. "12%". */
  delta?: string;
  /** @default "up" */
  deltaDir?: "up" | "down";
  style?: React.CSSProperties;
}

/**
 * Analytics metric card for admin & driver dashboards.
 * @startingPoint section="Dashboard" subtitle="KPI metric card with icon + delta" viewport="320x150"
 */
export function StatCard(props: StatCardProps): JSX.Element;
