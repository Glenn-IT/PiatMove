import * as React from "react";

export interface TimelineStep {
  label: string;
  time?: string;
  /** @default "pending" */
  state?: "done" | "active" | "pending";
}

/**
 * @startingPoint section="Feedback" subtitle="Booking status tracker" viewport="380x320"
 */
export interface StatusTimelineProps {
  steps: TimelineStep[];
  style?: React.CSSProperties;
}

/**
 * Vertical progress timeline for booking status & active trips.
 * @startingPoint section="Feedback" subtitle="Booking status tracker" viewport="380x320"
 */
export function StatusTimeline(props: StatusTimelineProps): JSX.Element;
