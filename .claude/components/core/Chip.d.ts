import * as React from "react";

export interface ChipProps {
  selected?: boolean;
  leadingIcon?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

/** Selectable pill for vehicle types, filters, and quick options. */
export function Chip(props: ChipProps): JSX.Element;
