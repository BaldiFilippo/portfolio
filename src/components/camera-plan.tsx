"use client";

import Image from "next/image";
import { useState, type KeyboardEvent, type PointerEvent } from "react";

// A render of the desk from straight above, turned so that the camera sits on the right. The
// viewBox is drawn at the render's scale, so the fan lands on the real objects.
const WIDTH = 800;
// what is drawn runs from 24 to 344: the figure starts and ends there, so its space to the text
// around it is the same as any other image's
const TOP = 24;
const VIEW = 320;
const DESK = { x: 150, y: 178 };
const RENDER = { x: 55, y: 52, width: 250, height: 290 };
const percent = (value: number, of: number) => `${(value / of) * 100}%`;

// The site's real numbers: 23 renders 0.1875° apart around 20°.
const COUNT = 23;
const FIRST_YAW = 17.9375;
const STEP = 0.1875;
const CAMERA_DISTANCE = 482;
const STRIP = { x: 740, gap: 10 };
const MAX = COUNT - 1;

const radians = (index: number) => ((FIRST_YAW + STEP * index - 20) * Math.PI) / 180;
const onFan = (index: number) => ({
  x: DESK.x + CAMERA_DISTANCE * Math.cos(radians(index)),
  y: DESK.y - CAMERA_DISTANCE * Math.sin(radians(index)),
});
const onStrip = (index: number) => DESK.y + ((MAX / 2 - index) * STRIP.gap);
const clamp = (value: number) => Math.max(0, Math.min(MAX - 0.001, value));

const labels = [
  { text: "Camera", x: 622, y: 142 },
  { text: "22.06°", x: WIDTH, y: 40 },
  { text: "17.94°", x: WIDTH, y: 316 },
];

export function CameraPlan() {
  // Between two positions, so that the first thing shown is the pair the page mixes.
  const [position, setPosition] = useState(11.35);
  const below = Math.floor(position);
  const weight = (index: number) =>
    index === below ? 1 - (position - below) : index === below + 1 ? position - below : 0;

  // The pointer's height in the figure, so the dot follows it along the enlarged strip.
  const follow = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const y = TOP + ((event.clientY - box.top) / box.height) * VIEW;
    setPosition(clamp(MAX / 2 - (y - DESK.y) / STRIP.gap));
  };
  const step = (event: KeyboardEvent<HTMLDivElement>) => {
    const change = { ArrowLeft: -0.25, ArrowDown: -0.25, ArrowRight: 0.25, ArrowUp: 0.25 }[event.key];
    if (change === undefined) return;
    event.preventDefault();
    setPosition((current) => clamp(current + change));
  };

  const camera = { fan: onFan(position), strip: onStrip(position) };

  return (
    <figure className="media-wide">
      <div
        role="slider"
        tabIndex={0}
        aria-label="Camera position"
        aria-orientation="vertical"
        aria-valuemin={1}
        aria-valuemax={COUNT}
        aria-valuenow={Math.round(position) + 1}
        aria-valuetext={`Between positions ${below + 1} and ${below + 2} of ${COUNT}`}
        onPointerDown={follow}
        onPointerMove={follow}
        onKeyDown={step}
        className="relative touch-pan-y rounded-m"
      >
        <svg
          viewBox={`0 ${TOP} ${WIDTH} ${VIEW}`}
          aria-hidden
          className="block h-auto w-full [&_*]:[vector-effect:non-scaling-stroke]"
        >
          {Array.from({ length: COUNT }, (_, index) => {
            const end = onFan(index);
            const active = weight(index);
            return (
              <line
                key={index}
                x1={DESK.x}
                y1={DESK.y}
                x2={end.x}
                y2={end.y}
                stroke={active ? "var(--ink)" : "var(--line)"}
                strokeOpacity={active ? 0.35 + 0.65 * active : 1}
              />
            );
          })}

          <g stroke="var(--line)" fill="none">
            <line x1={onFan(MAX).x} y1={onFan(MAX).y} x2={STRIP.x} y2={onStrip(MAX)} />
            <line x1={onFan(0).x} y1={onFan(0).y} x2={STRIP.x} y2={onStrip(0)} />
          </g>

          {Array.from({ length: COUNT }, (_, index) => {
            const active = weight(index);
            return (
              <line
                key={index}
                x1={STRIP.x - (active ? 12 : 6)}
                x2={STRIP.x + (active ? 12 : 6)}
                y1={onStrip(index)}
                y2={onStrip(index)}
                stroke={active ? "var(--ink)" : "var(--ink-faint)"}
              />
            );
          })}

          <circle cx={camera.fan.x} cy={camera.fan.y} r={4} fill="var(--ink)" />
          <circle cx={STRIP.x + 24} cy={camera.strip} r={4} fill="var(--ink)" />
        </svg>

        <Image
          src="/desk/desk-from-above.webp"
          alt="The desk from straight above: computer, phone, clock, open notebook and a pile of polaroids."
          width={500}
          height={580}
          sizes="(min-width: 50rem) 16rem, 32vw"
          draggable={false}
          className="pointer-events-none absolute"
          style={{
            left: percent(RENDER.x, WIDTH),
            top: percent(RENDER.y - TOP, VIEW),
            width: percent(RENDER.width, WIDTH),
          }}
        />

        <div aria-hidden className="text-label text-ink-soft">
          {labels.map(({ text, x, y }) => (
            <span
              key={text}
              className="absolute -translate-y-1/2"
              style={{
                top: percent(y - TOP, VIEW),
                right: percent(WIDTH - x, WIDTH),
              }}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
