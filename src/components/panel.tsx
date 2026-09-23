import type { CSSProperties, ReactNode } from "react";

type PanelProps = {
  children?: ReactNode;
  /** How many viewports wide this section is on desktop. */
  span?: number;
  /** Marks the screen the sheet turns over on. There is only one. */
  turn?: boolean;
  /** Takes only the height its content needs. For a panel read as part of a
   *  column, where a full screen given to three lines of type leaves most of a
   *  screen of nothing before the content it introduces. */
  compact?: boolean;
  /** Breathing room on the sideways canvas. Dropped where there is no canvas:
   *  stacked, an empty panel is a blank screen rather than a gap. */
  gap?: boolean;
  className?: string;
};

export function Panel({
  children,
  span = 1,
  turn,
  gap,
  compact,
  className = "",
}: PanelProps) {
  return (
    <section
      data-panel
      data-turn={turn ? "" : undefined}
      data-gap={gap ? "" : undefined}
      data-compact={compact ? "" : undefined}
      style={{ "--panel-span": span } as CSSProperties}
      className={`panel-grid relative min-h-dvh w-full overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * The breath between two sections of the sheet. One fifth of a screen, the same
 * everywhere: sections that butt up against each other read as one long spread,
 * and the eye needs somewhere to land between the end of an argument and the
 * start of the next.
 */
export function PanelGap() {
  return <Panel span={0.2} gap />;
}
