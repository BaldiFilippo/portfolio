// Half a court from above, to FIBA measures in metres, with the basket at the top. The shots are
// the session drawn in the Figma file: 50 shots, 34 baskets, 6 metres from the basket on average.
// Each is [x, y, scored].
const shots: [number, number, 0 | 1][] = [
  [13.91, 6.17, 1], [11.37, 2.28, 1], [9.34, 5.14, 1], [9.64, 4.02, 1], [9.52, 4.67, 1],
  [12.89, 7.45, 1], [12.5, 4.63, 1], [13.65, 3.42, 1], [6.25, 9.56, 1], [12.11, 3.03, 1],
  [9.63, 3.97, 1], [0.6, 6.69, 0], [4.91, 5.86, 1], [5.1, 7.74, 0], [11.89, 3.8, 1],
  [4.72, 2.9, 1], [13.08, 6.63, 0], [2.05, 8.71, 0], [14.4, 4.62, 1], [7.45, 4.84, 1],
  [4.38, 3.59, 1], [10.31, 7.04, 1], [13.73, 2.72, 0], [8.24, 9.82, 0], [9.07, 5.66, 1],
  [9.27, 5.73, 1], [5.29, 8.64, 0], [5.24, 9.77, 0], [12.35, 5.22, 1], [4.09, 4.41, 1],
  [6.26, 8.31, 0], [1.64, 8.52, 0], [2.46, 3.33, 0], [4.54, 6.71, 1], [11.48, 5.95, 1],
  [10.29, 2.15, 1], [13.52, 6.66, 1], [8.89, 8.01, 0], [5.89, 6.96, 1], [5.3, 5.17, 1],
  [5.4, 5.84, 1], [14.3, 7.85, 0], [0.7, 3.2, 1], [8.04, 6.07, 1], [5.77, 9.11, 0],
  [14.09, 4.68, 0], [6.02, 5.89, 1], [3.5, 8.78, 0], [5.25, 9.2, 1], [7.22, 4.27, 1],
];

// The court in metres: 15 wide, 14 deep to the half-way line.
const BASKET = { x: 7.5, y: 1.575 };
const THREE = 6.75;
const CORNER = 0.9;
const cornerY = BASKET.y + Math.sqrt(THREE ** 2 - (BASKET.x - CORNER) ** 2);

export function CourtShots() {
  const line = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    vectorEffect: "non-scaling-stroke",
  } as const;
  return (
    <svg
      viewBox="-0.2 -0.2 15.4 14.4"
      role="img"
      aria-label="Half a basketball court from above with 50 shots around the basket: 34 baskets and 16 misses."
      className="mx-auto block h-auto w-full max-w-[26rem]"
    >
      <g className="text-ink-faint">
        <rect x={0} y={0} width={15} height={14} {...line} />
        {/* the key, the free-throw circle and the restricted area */}
        <rect x={5.05} y={0} width={4.9} height={5.8} {...line} />
        <path d="M 5.7 5.8 A 1.8 1.8 0 0 0 9.3 5.8" {...line} />
        <path d="M 6.25 1.575 A 1.25 1.25 0 0 0 8.75 1.575" {...line} />
        {/* the three-point line */}
        <path
          d={`M ${CORNER} 0 V ${cornerY} A ${THREE} ${THREE} 0 0 0 ${15 - CORNER} ${cornerY} V 0`}
          {...line}
        />
        {/* the centre circle, cut by the half-way line */}
        <path d="M 5.7 14 A 1.8 1.8 0 0 1 9.3 14" {...line} />
        {/* the backboard and the ring */}
        <line x1={6.6} y1={1.2} x2={8.4} y2={1.2} {...line} />
        <circle cx={BASKET.x} cy={BASKET.y} r={0.225} {...line} />
      </g>
      {shots.map(([x, y, scored], index) =>
        scored ? (
          <circle key={index} cx={x} cy={y} r={0.17} className="fill-ink" />
        ) : (
          <circle key={index} cx={x} cy={y} r={0.15} className="text-ink-soft" {...line} />
        ),
      )}
    </svg>
  );
}
