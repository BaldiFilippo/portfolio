import { Panel } from "@/components/panel";

// A draft in his register, not a statement of fact: it names no cameras, no
// countries and no dates, because I do not know them. The two claims it does
// make — that this is personal rather than commissioned, and that the travelling
// and the photographing are the same habit — are his. Rewrite freely.
const LINES = [
  "shot : noun ; a single frame, and the most reliable thing anyone brings home.",
  "Travelling and photographing are not two habits here. They are one, and neither survives the other being removed.",
  "Somewhere you do not know yet forces you to look properly: you have no idea what counts as ordinary, so for a while nothing is.",
  "None of this was commissioned. No client, no brief, no deliverable — which is exactly why it stays apart from the work.",
  "What follows is a record of where the looking happened, named underneath each frame.",
];

export function PhotographyPanel() {
  return (
    <Panel>
      <div className="col-span-full row-start-2 flex flex-col justify-center">
        <div className="text-center">
          <h2 className="headline text-title">
            shots.
          </h2>
          <p className="label mt-hairline">photography</p>
        </div>

        <div className="label mx-auto mt-far flex w-full max-w-lines flex-col items-center text-center">
          {LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

    </Panel>
  );
}
