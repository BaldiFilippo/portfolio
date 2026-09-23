import Image from "next/image";

import { frameSizes, FrameRow } from "@/components/frame-row";
import { Panel } from "@/components/panel";
import { SHOTS } from "@/lib/cv";

const RATIO = { landscape: 3 / 2, portrait: 2 / 3 } as const;

/**
 * The one section that is not a single screen: four viewports of photographs
 * read as one continuous strip.
 *
 * Four and not three because the span has to be whatever lets the frames stand
 * at the band's own height. At three the row ran out of width and shrank, and
 * the photographs — alone on the site — came out 4px shorter than every other
 * frame, with their captions 4px higher.
 *
 * On desktop, column widths are proportional to each frame's own aspect ratio, so
 * the row always divides the section exactly and every frame still resolves to
 * the same height. On a phone the row becomes one column: eight frames side by
 * side on 390px is not a strip, it is a clipped edge. Sizing the frames in `vh` instead looks right at 16:9 and overruns the
 * section on anything taller — a 16:10 laptop clipped the last photograph
 * outright — because the height and the width were being measured against
 * different axes.
 */
export function PhotographyStrip() {
  return (
    <Panel span={4}>
      <FrameRow
        ratios={SHOTS.map((shot) => RATIO[shot.orientation])}
        className="col-span-full row-start-2"
      >
        {SHOTS.map((shot, i) => (
          <figure key={shot.src ?? `slot-${i}`}>
            {/* One statement of the ratio, not two: the class used to repeat
                what RATIO already says, and the two could drift apart. */}
            <div
              className="relative w-full"
              style={{ aspectRatio: RATIO[shot.orientation] }}
            >
              {shot.src ? (
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes={frameSizes(RATIO[shot.orientation])}
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-accent/15" />
              )}
            </div>
            <figcaption className="label mt-hairline text-accent">
              {shot.location}
            </figcaption>
          </figure>
        ))}
      </FrameRow>
    </Panel>
  );
}
