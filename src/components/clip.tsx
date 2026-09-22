"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

import type { Clip } from "@/lib/projects";

const REDUCED = "(prefers-reduced-motion: reduce)";

/** Subscribed rather than read once, so changing the setting takes effect
 *  without a reload — and so the server renders the still, never the loop. */
function usePrefersStillness() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(REDUCED);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED).matches,
    () => true,
  );
}

/**
 * A short silent loop, treated like a frame rather than a player: no chrome, no
 * sound, nothing to operate. It carries an argument a still cannot — that the
 * interaction costs no time — so it has to start on its own.
 *
 * It runs without interruption, including while the sheet is travelling. An
 * earlier version stopped it during a scroll, on the theory that two decodes
 * under a transform were what made the page stutter; the stutter turned out to
 * be a laptop throttling itself at ten percent charge, and a loop that freezes
 * whenever you move reads as a bug.
 *
 * Two things keep it cheap anyway. It plays only while it is on screen — a loop
 * running off to the side of a sixteen-panel sheet is pure waste — and the file
 * is fetched a screen early rather than on arrival, so a few megabytes never
 * land in the middle of the motion. No blend is ever laid over a playing clip
 * either, since that takes the video off the compositor's overlay path.
 *
 * Where motion is unwelcome it never plays at all: the poster stays and the
 * controls appear, so it can still be watched deliberately.
 */
export function ClipFrame({ clip }: { clip: Clip }) {
  const ref = useRef<HTMLVideoElement>(null);
  const still = usePrefersStillness();

  useEffect(() => {
    const el = ref.current;
    if (!el || still) return;

    // A screen of lead time: start fetching while the panel is still off to
    // the side, so arriving at it costs a decode and not a download.
    const ahead = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.preload = "auto";
        el.load();
        ahead.disconnect();
      },
      { rootMargin: "0px 100%" },
    );

    const playing = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.25 },
    );

    ahead.observe(el);
    playing.observe(el);
    return () => {
      ahead.disconnect();
      playing.disconnect();
    };
  }, [still]);

  return (
    <figure>
      <div
        /* No plate behind a clip whose own ground is the paper. */
        className={`relative w-full overflow-hidden ${
          clip.onPaper ? "" : "bg-accent/15"
        }`}
        style={{ aspectRatio: clip.ratio }}
      >
        <video
          ref={ref}
          src={clip.src}
          poster={clip.poster}
          muted
          loop
          playsInline
          preload="none"
          controls={still}
          aria-label={clip.alt}
          className="h-full w-full object-cover"
          /* Not mix-blend-mode: a video gets its own compositing layer and
             Chromium quietly drops the blend. The footage is greyscale line
             art on white, so scaling brightness by the paper's own value
             (232/255) lands the white ground on the sheet and leaves black
             at black. */
          style={clip.onPaper ? { filter: "brightness(0.9098)" } : undefined}
        />
      </div>
      {clip.caption ? (
        <figcaption className="label mt-hairline opacity-70">
          {clip.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
