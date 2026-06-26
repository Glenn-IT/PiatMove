import * as React from "react";

export interface ListItemProps {
  /** Leading slot — icon tile or avatar. */
  leading?: React.ReactNode;
  title: string;
  subtitle?: string;
  /** Right-aligned meta text (e.g. timestamp). */
  meta?: React.ReactNode;
  /** Trailing slot — chevron, switch, badge. */
  trailing?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  /** @default true */
  divider?: boolean;
  style?: React.CSSProperties;
}

/** List row for notifications, trips, and settings menus. */
export function ListItem(props: ListItemProps): JSX.Element;
