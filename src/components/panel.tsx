import type { CSSProperties, ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  /** How many viewports wide this section is on desktop. */
  span?: number;
  className?: string;
};

export function Panel({ children, span = 1, className = "" }: PanelProps) {
  return (
    <section
      data-panel
      style={{ "--panel-span": span } as CSSProperties}
      className={`panel-grid relative min-h-dvh w-full overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}
