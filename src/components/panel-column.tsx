import type { ReactNode } from "react";

/**
 * A section that reads downward instead of sideways.
 *
 * It occupies one screen of the horizontal track like any other panel, but the
 * panels inside it are stacked and clipped: travelling through them moves the
 * stack up rather than moving the sheet across. The sideways journey separates
 * the sections of the site; this is what it looks like to be inside one.
 *
 * The scroll machinery finds it by attribute rather than by ref, so composing a
 * section into a column is a matter of wrapping it here and nothing else.
 */
export function PanelColumn({ children }: { children: ReactNode }) {
  return (
    <div className="panel-column" data-column>
      <div className="panel-column-inner" data-column-inner>
        {children}
      </div>
    </div>
  );
}
