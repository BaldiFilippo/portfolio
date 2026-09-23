export type FlowStep = {
  /** Small marker above the step — a time, a state, a step number. */
  marker?: string;
  label: string;
};

/**
 * Drawn rather than set as characters. As type, the two marks came out at very
 * different weights — the mono face carries an arrow but not a return glyph, so
 * the browser substituted a fallback font and the loop rendered at under half
 * the arrow's width. Drawn, they share a box, a stroke and a colour by
 * construction, and no longer depend on what a font happens to cover.
 */
function Mark({ loop = false }: { loop?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden
    >
      {loop ? (
        <>
          <path d="M20.5 12a8.5 8.5 0 1 1-2.6-6.1" />
          <path d="M20.5 3.5v4.2h-4.2" />
        </>
      ) : (
        <>
          <path d="M3.5 12h17" />
          <path d="M14.5 6l6 6-6 6" />
        </>
      )}
    </svg>
  );
}

/**
 * A sequence drawn in the site's own type rather than imported as a picture.
 * An interaction is a chain of states, and a chain is structure, not an image:
 * set as boxes and rules it stays crisp at any size, matches the paper exactly,
 * and costs nothing in assets.
 */
export function Flow({
  steps,
  loops = false,
}: {
  steps: FlowStep[];
  loops?: boolean;
}) {
  return (
    <ol className="flex w-full flex-col gap-rhythm lg:flex-row lg:items-stretch lg:gap-0">
      {steps.map((step, i) => (
        <li
          key={step.label}
          /* stretch, not center: centring leaves each box at its own text's
             height, so a step that wraps to three lines stands taller than its
             neighbours. The mark between them centres itself. */
          className="flex flex-1 flex-col lg:flex-row lg:items-stretch"
        >
          <div className="flex-1 border border-ink/25 p-rhythm">
            {step.marker ? (
              <p className="label mb-hairline opacity-70">{step.marker}</p>
            ) : null}
            <p className="label">{step.label}</p>
          </div>

          {/* The rule between steps, and the turn back to the start when the
              interaction is a loop rather than a line. */}
          {i < steps.length - 1 || loops ? (
            <span className="flex shrink-0 self-center py-hairline opacity-50 lg:px-rhythm lg:py-0">
              <Mark loop={i === steps.length - 1} />
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
