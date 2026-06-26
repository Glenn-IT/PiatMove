import * as React from "react";

export interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  style?: React.CSSProperties;
}

/** Labeled text field with icon slots, focus ring, and helper/error text. */
export function Input(props: InputProps): JSX.Element;
