// The coaster's light in its two states, as in the 2024 presentation: white while the alarm
// rings, green once the glass is lifted. The colours are the product's, not the interface's.
const states = [
  {
    name: "The alarm rings",
    note: "White, to find the glass in the dark",
    dot: "bg-[#fff] ring-1 ring-ink-faint",
    glow: "bg-[radial-gradient(closest-side,rgb(255_236_190/.8),transparent)] motion-safe:animate-[led-ring_1.6s_ease-in-out_infinite]",
  },
  {
    name: "The alarm stops",
    note: "Green, with a short sound",
    dot: "bg-[#3ddc6a]",
    glow: "bg-[radial-gradient(closest-side,rgb(61_220_106/.5),transparent)]",
  },
];

function State({ name, note, dot, glow }: (typeof states)[number]) {
  return (
    <div className="grid justify-items-center gap-4 text-center">
      <span aria-hidden className="relative block size-4">
        <span className={`absolute -inset-4 rounded-full ${glow}`} />
        <span className={`relative block size-4 rounded-full ${dot}`} />
      </span>
      <p>
        {name}
        <span className="block text-label text-ink-soft">{note}</span>
      </p>
    </div>
  );
}

export function LightStates() {
  const stroke = { stroke: "currentColor", vectorEffect: "non-scaling-stroke" } as const;
  return (
    <div className="grid justify-items-center gap-4 py-4 columns:grid-cols-[1fr_9rem_1fr] columns:items-start columns:gap-0">
      <State {...states[0]} />
      <div className="grid justify-items-center gap-3 text-center text-label text-ink-soft columns:pt-1">
        {/* down the page on phones, across it from the breakpoint */}
        <svg viewBox="0 0 12 40" aria-hidden className="h-10 w-3 text-ink-faint columns:hidden">
          <line x1="6" y1="2" x2="6" y2="38" {...stroke} />
          <path d="M1 33 L6 39 L11 33" fill="none" {...stroke} />
        </svg>
        <svg viewBox="0 0 144 12" aria-hidden className="hidden h-3 w-full text-ink-faint columns:block">
          <line x1="2" y1="6" x2="140" y2="6" {...stroke} />
          <path d="M135 1 L141 6 L135 11" fill="none" {...stroke} />
        </svg>
        {/* on phones the words come before the arrow they name */}
        <span className="-order-1 columns:order-none">The glass is lifted</span>
      </div>
      <State {...states[1]} />
    </div>
  );
}
