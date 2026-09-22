"use client";

import { useEffect } from "react";

const FLAGS = ["noclips", "noimg", "noblur", "nograin", "noshadowless"] as const;

/**
 * A diagnostic switch, mounted only in development.
 *
 * Scroll smoothness on a retina display lives entirely in the compositor, where
 * a headless browser has nothing to measure: the main thread profiles at 98%
 * idle and every frame counter is capped by the harness. So the instrument has
 * to be a person. Each flag removes one suspect; whichever one brings the
 * scroll back is the answer.
 *
 *   ?noclips   the two videos
 *   ?noimg     every photograph and render
 *   ?noblur    every CSS filter, including the hero wordmark
 *   ?nograin   the paper texture overlay
 *   ?band=44   shrink the content band, and every image with it
 */
export function PerfProbe() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    for (const flag of FLAGS) {
      if (params.has(flag)) document.documentElement.setAttribute(`data-${flag}`, "");
    }
    const band = params.get("band");
    if (band) document.documentElement.style.setProperty("--band", `${band}vh`);
  }, []);

  return null;
}
