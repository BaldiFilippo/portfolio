import type { ReactNode } from "react";

type BlurTextProps = {
  /**
   * Where along the ramp the text is in focus, 0–1. Everything before it picks up
   * the light `from` blur, everything after falls off into `to`.
   */
  focus?: number;
  /** Blur at the leading edge, before the focal point, in em. */
  from?: number;
  /** Blur at the trailing edge, in em. */
  to?: number;
  /**
   * How late the blur arrives. 1 ramps evenly, which reads as uniformly soft;
   * higher values hold focus longer and push the falloff into the tail.
   */
  curve?: number;
  /** Direction the blur ramps along, in degrees (CSS gradient convention). */
  angle?: number;
  layers?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Progressive blur: stacked copies of the same text, each blurred a little more
 * and masked to its own band, with adjacent masks cross-fading over identical
 * ranges so their alphas sum to 1.
 *
 * The layers composite with `plus-lighter` inside an isolated group, which is
 * load-bearing rather than cosmetic. Stacking translucent copies the normal way
 * leaves `(1 - a)(1 - b)` of the paper showing through, so two layers meeting at
 * half alpha let 25% of the background bleed into what should be solid ink — a
 * pale seam straight across the letterforms. `plus-lighter` adds in premultiplied
 * space instead, so masks that sum to 1 reconstruct the glyph exactly.
 */
export function BlurText({
  children,
  focus = 0.28,
  from = 0.07,
  to = 0.15,
  curve = 2,
  angle = 118,
  layers = 9,
  className = "",
}: BlurTextProps) {
  // A gaussian halo reaches roughly 3x its radius. The mask is sized to the
  // layer's box, so the box has to out-grow the halo or the softest edge gets
  // sliced off square.
  const bleed = Math.max(0.35, to * 3.5);

  // That bleed also pushes the gradient's own 0% out into the empty padding,
  // which is far enough at display sizes that the whole lead-in ramp lands off
  // the glyphs. Pulling the stops back in by the bleed — projected onto the
  // gradient axis — re-anchors the ramp to the text itself. Beyond the first and
  // last stop a gradient holds its end colour, so the halo still gets painted.
  const radians = (angle * Math.PI) / 180;
  const inset =
    bleed * (Math.abs(Math.sin(radians)) + Math.abs(Math.cos(radians)));

  const stopAt = (fraction: number) => {
    const offset = (1 - 2 * fraction) * inset;
    const sign = offset < 0 ? "-" : "+";
    return `calc(${(fraction * 100).toFixed(3)}% ${sign} ${Math.abs(offset).toFixed(4)}em)`;
  };

  const steps = Array.from({ length: layers }, (_, i) => {
    const t = i / (layers - 1);
    const blur =
      t < focus
        ? from * ((focus - t) / focus) ** curve
        : to * ((t - focus) / (1 - focus)) ** curve;
    const span = 1 / (layers - 1);
    const stops: string[] = [];

    if (i > 0) stops.push(`transparent ${stopAt((i - 1) * span)}`);
    stops.push(`#000 ${stopAt(i * span)}`);
    if (i < layers - 1) stops.push(`transparent ${stopAt((i + 1) * span)}`);

    return {
      blur,
      mask: `linear-gradient(${angle}deg, ${stops.join(", ")})`,
    };
  });

  return (
    <span className={`relative isolate inline-block ${className}`}>
      {/* Sizes the box and carries the accessible text; the painted layers are
          decorative duplicates. */}
      <span className="opacity-0">{children}</span>

      {steps.map((step, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            inset: `-${bleed}em`,
            padding: `${bleed}em`,
            mixBlendMode: "plus-lighter",
            filter: `blur(${step.blur}em)`,
            maskImage: step.mask,
            WebkitMaskImage: step.mask,
          }}
        >
          {children}
        </span>
      ))}
    </span>
  );
}
