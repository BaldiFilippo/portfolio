import type { CSSProperties, ReactNode } from "react";

type PanelProps = {
  children?: ReactNode;
  /** How many viewports wide this section is on desktop. */
  span?: number;
  /** Marks the screen the sheet turns over on. There is only one. */
  turn?: boolean;
  className?: string;
};

export function Panel({ children, span = 1, turn, className = "" }: PanelProps) {
  return (
    <section
      data-panel
      data-turn={turn ? "" : undefined}
      style={{ "--panel-span": span } as CSSProperties}
      className={`panel-grid relative min-h-dvh w-full overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}
