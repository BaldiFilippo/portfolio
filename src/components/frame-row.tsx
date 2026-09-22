import type { CSSProperties, ReactNode } from "react";

/* Mirrors --band-media and --band-media-inset in globals.css. `sizes` cannot
   read a custom property, so the band is spelled out again here — keep the two
   in step. It matters: a frame's width is its ratio times this height, and a
   `sizes` hint that claims otherwise makes the browser fetch and upload a
   texture several times larger than anything it will draw. */
export const BAND_MEDIA = "calc(56vh - 2.5rem)";
export const BAND_MEDIA_INSET = "calc((56vh - 2.5rem) * 0.58)";

/** What a frame of this ratio actually occupies on the band. */
export function frameSizes(ratio: number, height: string = BAND_MEDIA) {
  return `(min-width: 1024px) calc(${height} * ${ratio}), 90vw`;
}

/**
 * A row of media on the content band.
 *
 * Columns are proportional to each frame's own ratio, so every frame in the row
 * resolves to the same height and the row divides its container exactly. The
 * row then asks for the width those ratios need *at the band's height*, rather
 * than being handed a width and ending up whatever height falls out — which is
 * what made one page's images stand taller than the next one's. Where the row
 * would be wider than the space it has, the cap in `.frame-row` shrinks it
 * instead of letting it overflow.
 */
export function FrameRow({
  ratios,
  rowHeight,
  className = "",
  children,
}: {
  ratios: number[];
  /** Overrides the band's media height where a row shares the band. */
  rowHeight?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`frame-row ${className}`}
      style={
        {
          "--strip-columns": ratios.map((r) => `${r}fr`).join(" "),
          "--strip-sum": ratios.reduce((sum, r) => sum + r, 0),
          "--strip-gaps": `calc(${ratios.length - 1} * var(--grid-gutter))`,
          ...(rowHeight ? { "--row-height": rowHeight } : {}),
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
