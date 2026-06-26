import * as React from "react";

export interface IconButtonProps {
  /** @default "soft" */
  variant?: "soft" | "ghost" | "outline" | "primary";
  /** Pixel size of the square. @default 40 */
  size?: number;
  /** Accessible label (aria-label). */
  label?: string;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Square icon-only button for headers and toolbars. */
export function IconButton(props: IconButtonProps): JSX.Element;
