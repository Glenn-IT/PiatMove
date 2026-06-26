import * as React from "react";

/**
 * @startingPoint section="Core" subtitle="Action button — 5 variants, 3 sizes" viewport="700x150"
 */
export interface ButtonProps {
  /** Visual style. @default "primary" */
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  /** @default "md" */
  size?: "sm" | "md" | "lg";
  /** Stretch to full width of container. @default false */
  block?: boolean;
  disabled?: boolean;
  /** Icon node rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Icon node rendered after the label. */
  trailingIcon?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Core action button. Primary = blue, Secondary = green.
 * @startingPoint section="Core" subtitle="Action button — 5 variants, 3 sizes" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
