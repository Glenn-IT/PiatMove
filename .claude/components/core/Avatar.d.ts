import * as React from "react";

export interface AvatarProps {
  src?: string;
  /** Full name — used for initials fallback + alt text. */
  name?: string;
  /** Pixel diameter. @default 44 */
  size?: number;
  status?: "online" | "busy" | "offline";
  style?: React.CSSProperties;
}

/** Circular user avatar with initials fallback and optional presence dot. */
export function Avatar(props: AvatarProps): JSX.Element;
