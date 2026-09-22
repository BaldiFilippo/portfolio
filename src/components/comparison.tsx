import type { Rival } from "@/lib/projects";

/**
 * The field the project had to enter, set in type rather than imported as a
 * table from the deck. Each column carries what a rival does well and where it
 * stops, so the opening the project takes is visible in the columns themselves
 * rather than asserted underneath them.
 *
 * Built from the same parts as the interaction chain: a bordered box, a quiet
 * marker, a line at full strength. Hierarchy comes from opacity, not weight.
 */
export function Comparison({
  rivals,
  heading,
  intro,
  gap,
}: {
  rivals: Rival[];
  heading?: string;
  intro?: string;
  gap?: string;
}) {
  return (
    <div className="flex w-full flex-col gap-far">
      {heading ? (
        <div className="label max-w-reading">
          <h3>{heading}</h3>
          {intro ? <p className="mt-hairline opacity-70">{intro}</p> : null}
        </div>
      ) : null}

      <ul className="label grid gap-rhythm lg:grid-cols-3">
        {rivals.map((rival) => (
          <li
            key={rival.name}
            className="flex flex-col border border-ink/25 p-rhythm"
          >
            <p>{rival.name}</p>
            <p className="opacity-70">{rival.premise}</p>

            <div className="mt-rhythm">
              <p className="opacity-70">strength</p>
              <p>{rival.strength}</p>
            </div>

            {/* Pinned to the foot of the card so the limits line up across the
                three columns however the strengths above them wrap. */}
            <div className="mt-auto pt-rhythm">
              <p className="opacity-70">limit</p>
              <p>{rival.limit}</p>
            </div>
          </li>
        ))}
      </ul>

      {gap ? <p className="label max-w-reading">{gap}</p> : null}
    </div>
  );
}
