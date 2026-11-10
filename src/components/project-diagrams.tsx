// Diagrams for the project pages, built in HTML so their words keep the size of the page's labels
// on any screen. Colours appear only where they are the product's own, such as Sip's light.

const arrow = "text-ink-faint";

// Known: five ways to write a meal, one diary.
const ways = ["A typed line", "Your voice", "A barcode", "A label", "A photo of the plate"];

export function ManyWaysIn() {
  return (
    <figure className="grid items-center gap-4 text-label columns:grid-cols-[auto_1fr_auto] columns:gap-0">
      <ul className="flex flex-wrap gap-2 columns:grid columns:gap-3">
        {ways.map((way) => (
          <li key={way} className="rounded-full border border-line px-3 py-1 columns:border-0 columns:p-0">
            {way}
          </li>
        ))}
      </ul>
      {/* the five lines meeting, across on wide screens, an arrow down on phones */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
        className="hidden h-36 w-full text-ink-faint columns:block"
      >
        {[10, 30, 50, 70, 90].map((y) => (
          <path
            key={y}
            d={`M 4 ${y} C 50 ${y} 50 50 96 50`}
            fill="none"
            stroke="currentColor"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <span aria-hidden className={`justify-self-center columns:hidden ${arrow}`}>
        ↓
      </span>
      <p className="justify-self-center rounded-m border border-ink px-4 py-2 columns:justify-self-start">
        The diary
        <span className="block text-ink-soft">one quiet list</span>
      </p>
    </figure>
  );
}

// Desk: the still render at the bottom, what the browser draws on top of it.
const drawn = ["The polaroids", "The ink in the notebook", "The list on the Post-it", "The time on the clock", "The page on the screen"];

function Layer({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 64 20" aria-hidden className="h-10 w-32 shrink-0">
      <path
        d="M 2 10 L 34 2 L 62 10 L 30 18 Z"
        className={filled ? "fill-fill stroke-ink" : "fill-none stroke-ink-faint"}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function DeskLayers() {
  return (
    <figure className="grid gap-6 justify-self-center">
      <div className="grid gap-3">
        <p className="text-ink-soft">Drawn live by the browser</p>
        <ul className="grid gap-2">
          {drawn.map((layer) => (
            <li key={layer} className="flex items-center gap-6">
              <Layer />
              {layer}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-6">
        <Layer filled />
        <p>
          The render from Blender
          <span className="block text-ink-soft">one of 23 still pictures</span>
        </p>
      </div>
    </figure>
  );
}

// Sip: the morning, from the glass on the coaster to the water in your hand.
const morning = [
  { step: "The glass waits on the coaster", note: "capped, all night", dot: "bg-fill ring-1 ring-ink-faint" },
  {
    step: "The alarm rings",
    note: "white light",
    dot: "bg-[#fff] ring-1 ring-ink-faint shadow-[0_0_14px_4px_rgb(255_236_190/.8)]",
  },
  {
    step: "You lift the glass",
    note: "green light, a short sound",
    dot: "bg-[#3ddc6a] shadow-[0_0_14px_4px_rgb(61_220_106/.45)]",
  },
  { step: "The water is in your hand", note: "", dot: "ring-1 ring-ink" },
];

export function SipMorning() {
  return (
    <ol className="grid grid-cols-2 gap-x-6 gap-y-8 text-label columns:grid-cols-4">
      {morning.map(({ step, note, dot }) => (
        <li key={step} className="grid content-start gap-3">
          <span aria-hidden className={`block size-3 rounded-full ${dot}`} />
          <p>
            {step}
            {note && <span className="block text-ink-soft">{note}</span>}
          </p>
        </li>
      ))}
    </ol>
  );
}

// Smart wristband: what happens after each shot.
const scored = ["A shot", "In?", "Turn your hand", "Light and vibration", "Logged"];

export function GestureFlow() {
  return (
    <figure className="grid gap-3 text-label">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-3">
        {scored.map((step, index) => (
          <li key={step} className="flex items-center gap-2">
            {index > 0 && (
              <span aria-hidden className={arrow}>
                {index === 2 ? "yes →" : "→"}
              </span>
            )}
            <span
              className={`rounded-full border px-3 py-1 ${index === scored.length - 1 ? "border-ink" : "border-line"}`}
            >
              {step}
            </span>
          </li>
        ))}
      </ol>
      <p className="flex items-center gap-2">
        <span aria-hidden className={arrow}>
          ↳ no →
        </span>
        <span className="text-ink-soft">nothing to do, keep playing</span>
      </p>
    </figure>
  );
}
