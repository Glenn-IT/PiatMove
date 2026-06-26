import * as React from "react";

/**
 * @startingPoint section="Core" subtitle="Surface container with elevation" viewport="700x150"
 */
export interface CardProps {
  /** @default "md" */
  padding?: "none" | "sm" | "md" | "lg";
  /** @default "sm" */
  elevation?: "none" | "xs" | "sm" | "md";
  /** Adds hover lift + pointer cursor. @default false */
  interactive?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Rounded white surface — the base building block for dashboards and lists.
 * @startingPoint section="Core" subtitle="Surface container with elevation" viewport="700x150"
 */
export function Card(props: CardProps): JSX.Element;
