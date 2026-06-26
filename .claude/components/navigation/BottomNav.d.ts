import * as React from "react";

export interface BottomNavItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  /** Optional notification count bubble. */
  badge?: number | string;
}

/**
 * @startingPoint section="Navigation" subtitle="Mobile bottom tab bar" viewport="430x96"
 */
export interface BottomNavProps {
  items: BottomNavItem[];
  activeKey?: string;
  onChange?: (key: string) => void;
  style?: React.CSSProperties;
}

/**
 * Fixed mobile bottom navigation (4-5 tabs).
 * @startingPoint section="Navigation" subtitle="Mobile bottom tab bar" viewport="430x96"
 */
export function BottomNav(props: BottomNavProps): JSX.Element;
