"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type VideoProps = {
  /** One file, or several formats for the browser to choose from, such as video with transparency. */
  src: string | { src: string; type: string }[];
  poster: string;
  label: string;
  className: string;
  loop?: boolean;
  /** Made on black and inverted in the light theme. False keeps the video as it was made. */
  themed?: boolean;
};

export function Video({ src, poster, label, className, loop = false, themed = true }: VideoProps) {
  const video = useRef<HTMLVideoElement>(null);
  const pausedByReader = useRef(false);
  const [playing, setPlaying] = useState(false);

  // Plays when at least half of it is on screen, and pauses when it leaves.
  useEffect(() => {
    const element = video.current;
    if (!element) return;

    // Video with transparency comes as VP9 for Chromium and Firefox, listed first, and as HEVC
    // for Safari, which shows VP9's transparent parts as black. Chromium browsers can decode
    // HEVC too, but not its transparency, so only Safari is sent to it.
    const safari = /^((?!chrome|chromium|android).)*safari/i.test(navigator.userAgent);
    const hevc = typeof src === "string" ? undefined : src.find((source) => source.type.includes("hvc1"));
    if (safari && hevc) element.src = hevc.src;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) element.pause();
        else if (!pausedByReader.current) element.play().catch(() => {});
      },
      { threshold: 0.5 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [src]);

  function toggle() {
    const element = video.current;
    if (!element) return;
    pausedByReader.current = !element.paused;
    if (element.paused) element.play().catch(() => {});
    else element.pause();
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <video
        ref={video}
        src={typeof src === "string" ? src : undefined}
        poster={poster}
        aria-label={label}
        muted
        playsInline
        loop={loop}
        preload="metadata"
        className={`size-full object-cover ${themed ? "video-themed" : ""}`}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      >
        {typeof src !== "string" &&
          src.map((source) => <source key={source.src} src={source.src} type={source.type} />)}
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
        className="absolute right-2 bottom-2 grid size-12 place-items-center text-ink"
      >
        {playing ? (
          <Pause size={24} strokeWidth={1} absoluteStrokeWidth aria-hidden />
        ) : (
          <Play size={24} strokeWidth={1} absoluteStrokeWidth aria-hidden />
        )}
      </button>
    </div>
  );
}
