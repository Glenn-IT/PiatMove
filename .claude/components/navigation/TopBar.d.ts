import * as React from "react";

export interface TopBarProps {
  title?: string;
  subtitle?: string;
  /** Leading slot — usually a back IconButton or avatar. */
  leading?: React.ReactNode;
  /** Trailing slot — actions. */
  trailing?: React.ReactNode;
  /** "brand" for transparent header over a blue hero. @default "default" */
  variant?: "default" | "brand";
  style?: React.CSSProperties;
}

/** App header with leading/trailing action slots. */
export function TopBar(props: TopBarProps): JSX.Element;
