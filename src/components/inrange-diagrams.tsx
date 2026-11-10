// The diagrams of the inRange page. They are built in HTML, not drawn as pictures, so their words
// keep the size of the page's labels on any screen. The only colours are the meanings the report
// gives them: red for a critical alarm, amber for a temporary change, green for running well.
const RED = "bg-[#d93a2b]";
const AMBER = "bg-[#e6a23c]";
const GREEN = "bg-[#3aa55d]";

const at = (hours: number) => `${(hours / 24) * 100}%`;

// A typical day, not recorded data: an alarm at night, three boluses, an hour of sport.
export function DayTimeline() {
  const above = [
    { label: "Alarm", hour: 3.4, dot: "size-3 rounded-full border-2 border-[#d93a2b]" },
    { label: "Bolus", hour: 8, dot: "size-2.5 rounded-full bg-ink" },
    { label: "Bolus", hour: 13, dot: "size-2.5 rounded-full bg-ink" },
    { label: "Bolus", hour: 20.5, dot: "size-2.5 rounded-full bg-ink" },
  ];
  return (
    <figure className="text-label">
      <div className="relative h-20" aria-hidden>
        {/* sleep, broken in two by the alarm, then the line of the day */}
        <div className="absolute top-8 h-4 -translate-y-1/2 rounded-full bg-fill" style={{ left: 0, width: at(2.9) }} />
        <div
          className="absolute top-8 h-4 -translate-y-1/2 rounded-full bg-fill"
          style={{ left: at(3.9), width: at(3.1) }}
        />
        <div className="absolute inset-x-0 top-8 h-px bg-ink-faint" />
        {above.map(({ label, hour, dot }) => (
          <div key={hour} className="absolute top-8 -translate-x-1/2" style={{ left: at(hour) }}>
            <span className="absolute bottom-5 left-1/2 -translate-x-1/2">{label}</span>
            <span className={`block -translate-y-1/2 ${dot}`} />
          </div>
        ))}
        <div className="absolute top-8" style={{ left: at(18), width: at(1) }}>
          <span className={`block h-3 -translate-y-1/2 rounded-full ${AMBER}`} />
          <span className="absolute top-3 left-1/2 -translate-x-1/2">Sport</span>
        </div>
        <span className="absolute top-full -mt-5 left-0 text-ink-soft">Sleep, broken by an alarm</span>
      </div>
      <div className="mt-2 flex justify-between text-ink-soft tabular-nums" aria-hidden>
        <span>00</span>
        <span>06</span>
        <span>12</span>
        <span>18</span>
        <span>24</span>
      </div>
      <figcaption className="sr-only">
        A typical day: sleep broken by an alarm for a high or a low, a bolus before each of three meals,
        and an hour of sport in the evening.
      </figcaption>
    </figure>
  );
}

// The thirteen pain points against the three personas, as the report assigns them.
const painPoints = [
  "Changing the set",
  "Alarms",
  "Meals out",
  "Sport",
  "The night",
  "Technical faults",
  "Materials to carry",
  "Hypervigilance",
  "Forgotten bolus",
  "Access to the device",
  "Glucose in sight",
  "Trends over time",
  "Unintended actions",
];
const personas = [
  { name: "Mara", points: [2, 5, 6, 8, 10, 13] },
  { name: "Noemi", points: [1, 3, 7, 9, 10, 11] },
  { name: "Cristiano", points: [4, 6, 8, 10, 11, 12] },
];

export function PainPointMatrix() {
  return (
    <table className="w-full border-collapse text-label">
      <caption className="sr-only">The thirteen pain points and the personas who feel each one.</caption>
      <thead>
        <tr>
          <th scope="col" className="pb-3 text-left font-normal text-ink-soft">
            Pain point
          </th>
          {personas.map(({ name }) => (
            <th key={name} scope="col" className="w-16 pb-3 text-center font-normal columns:w-24">
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {painPoints.map((point, index) => (
          <tr key={point} className="border-t border-line">
            <th scope="row" className="py-1.5 text-left font-normal">
              <span className="inline-block w-8 text-ink-soft tabular-nums">{index + 1}</span>
              {point}
            </th>
            {personas.map(({ name, points }) => {
              const felt = points.includes(index + 1);
              return (
                <td key={name} className="text-center">
                  <span
                    className={`inline-block rounded-full align-middle ${felt ? "size-2.5 bg-ink" : "size-1 bg-ink-faint"}`}
                  />
                  <span className="sr-only">{felt ? "Yes" : "No"}</span>
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// The order of the home, as a drawing: not the interface, only what comes first.
const homeQuestions = ["How am I doing now?", "Is everything working?", "What did I just do?", "What can I do?"];

export function HomeOrder() {
  const mark = (n: number, x: number, y: number) => (
    <g>
      <circle cx={x} cy={y} r={9} className="fill-paper stroke-ink" vectorEffect="non-scaling-stroke" />
      <text x={x} y={y + 4} textAnchor="middle" className="fill-ink text-[11px]">
        {n}
      </text>
    </g>
  );
  const bar = "fill-fill";
  const line = { className: "fill-none stroke-ink-faint", vectorEffect: "non-scaling-stroke" } as const;
  return (
    <figure className="grid items-center gap-8 columns:grid-cols-[13rem_1fr]">
      <svg viewBox="0 9 240 302" aria-hidden className="mx-auto block h-auto w-52">
        <rect x={20} y={10} width={200} height={300} rx={22} {...line} />
        <text x={120} y={48} textAnchor="middle" className="fill-ink-soft text-[10px]">
          Delivery running
        </text>
        <text x={112} y={104} textAnchor="middle" className="fill-ink text-[56px] font-light">
          110
        </text>
        <text x={168} y={90} className="fill-ink text-[18px]">
          ↑
        </text>
        {[130, 168].map((y) => (
          <g key={y}>
            <rect x={36} y={y} width={168} height={30} rx={8} {...line} />
            <circle cx={52} cy={y + 15} r={6} className="fill-[#3aa55d]" />
            <rect x={66} y={y + 12} width={64} height={6} rx={3} className={bar} />
          </g>
        ))}
        {[214, 228, 242].map((y, i) => (
          <rect key={y} x={36} y={y} width={[118, 92, 106][i]} height={6} rx={3} className={bar} />
        ))}
        <circle cx={190} cy={276} r={13} {...line} />
        <text x={190} y={281} textAnchor="middle" className="fill-ink text-[15px]">
          +
        </text>
        {mark(1, 20, 90)}
        {mark(2, 20, 160)}
        {mark(3, 20, 228)}
        {mark(4, 220, 276)}
      </svg>
      <ol className="grid gap-3 text-label">
        {homeQuestions.map((question, index) => (
          <li key={question} className="flex gap-3">
            <span className="w-4 text-ink-soft tabular-nums">{index + 1}</span>
            {question}
          </li>
        ))}
      </ol>
    </figure>
  );
}

// Three levels of alarm, with notifications from the prototype as examples.
const alarms = [
  { level: "Urgent", example: "Hypoglycemia, 80 mg/dL. Take carbohydrates.", dot: RED },
  { level: "To handle", example: "Replace the sensor. 10 hours left.", dot: AMBER },
  { level: "For information", example: "Bolus delivered. 9 units.", dot: GREEN },
];

export function AlarmLevels() {
  return (
    <ul className="grid gap-5 text-label">
      {alarms.map(({ level, example, dot }) => (
        <li key={level} className="flex gap-4">
          <span aria-hidden className={`mt-1 size-3.5 shrink-0 rounded-full ${dot}`} />
          <p>
            {level}
            <span className="block text-ink-soft">{example}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

// The reminder comes only where the three conditions meet.
export function ReminderConditions() {
  const circle = {
    r: 70,
    className: "fill-none stroke-ink-faint",
    vectorEffect: "non-scaling-stroke",
  } as const;
  return (
    <figure className="grid justify-items-center gap-6 text-label">
      <div className="relative w-full max-w-80">
        <svg viewBox="0 0 300 290" aria-hidden className="block h-auto w-full">
          <circle cx={115} cy={110} {...circle} />
          <circle cx={185} cy={110} {...circle} />
          <circle cx={150} cy={172} {...circle} />
          <circle cx={150} cy={131} r={8} className="fill-ink" />
        </svg>
        <span className="absolute top-0 left-0">In a meal window</span>
        <span className="absolute top-0 right-0 text-right">Glucose rising</span>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap">No bolus recorded</span>
      </div>
      <figcaption className="text-center">
        “Eating? Your glucose is rising. Did you handle the meal?”
      </figcaption>
    </figure>
  );
}

// Sport mode in three phases, as the design space lays them out.
const phases = [
  { name: "Before", notes: ["Pump on or off", "Fewer notifications", "Basal rate changed", "Start and end"] },
  { name: "During", notes: ["Only what matters", "Fast carbs at hand"], active: true },
  { name: "After", notes: ["What happened", "Back to routine"] },
];

export function SportPhases() {
  return (
    <div className="grid grid-cols-3 gap-4 text-label columns:gap-8">
      {phases.map(({ name, notes, active }) => (
        <div key={name} className="grid content-start gap-3">
          <p>{name}</p>
          <span
            aria-hidden
            className={`block h-3 rounded-full ${active ? AMBER : "border border-ink-faint"}`}
          />
          <ul className="grid gap-1 text-ink-soft">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
