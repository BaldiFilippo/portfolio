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
 * Four things keep that from costing the scroll. A clip holds still while the
 * sheet is moving and resumes once it settles: nobody watches a four-second
 * loop while travelling past it, and decoding two of them under a transform
 * that runs every frame is exactly what makes a sideways scroll stutter.
 * Nothing is ever drawn on top of a playing clip — no blend, no filter —
 * because either one takes the video off the compositor's overlay path and
 * makes every frame pay for it. The file is fetched a screen early rather than
 * on arrival, so a few megabytes never land in the middle of the motion. And
 * where motion is unwelcome it never plays at all: the poster stays and the
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

    let onPanel = false;
    let settle: number | undefined;

    const resume = () => {
      if (onPanel && el.paused) void el.play().catch(() => {});
    };

    const playing = new IntersectionObserver(
      ([entry]) => {
        onPanel = entry.isIntersecting;
        if (onPanel) resume();
        else el.pause();
      },
      { threshold: 0.25 },
    );

    const onScroll = () => {
      if (!el.paused) el.pause();
      window.clearTimeout(settle);
      settle = window.setTimeout(resume, 140);
    };

    ahead.observe(el);
    playing.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ahead.disconnect();
      playing.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(settle);
    };
  }, [still]);

  return (
    <figure>
      <div
        className="relative w-full overflow-hidden bg-accent/15"
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
