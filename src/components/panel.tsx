import type { ReactNode } from "react";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export function Panel({ children, className = "" }: PanelProps) {
  return (
    <section
      data-panel
      className={`panel-grid relative min-h-dvh w-full shrink-0 lg:h-screen lg:min-h-0 lg:w-screen ${className}`}
    >
      {children}
    </section>
  );
}
