"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Desktop: the track is pinned and slid sideways in step with vertical scrolling.
 *
 * Travel is measured from the track's own width rather than counted in panels,
 * which is what lets a section be wider than one screen. Expressing it as "shift
 * each panel by N times its own width" only holds while every panel is the same
 * width: a three-screen section would move three times as far as its neighbours
 * and tear away from them, and the scroll would run out before reaching the end.
 *
 * Below `lg`, and under reduced motion, none of this attaches and the panels stay
 * a plain vertical stack.
 */
export function HorizontalScroll({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const el = track.current;
          if (!el) return;

          const overflow = () => el.scrollWidth - window.innerWidth;
          if (overflow() <= 0) return;

          const lenis = new Lenis();
          lenis.on("scroll", ScrollTrigger.update);

          const raf = (time: number) => lenis.raf(time * 1000);
          gsap.ticker.add(raf);
          gsap.ticker.lagSmoothing(0);

          gsap.to(el, {
            x: () => -overflow(),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              pin: true,
              scrub: 1,
              end: () => `+=${overflow()}`,
              invalidateOnRefresh: true,
            },
          });

          return () => {
            gsap.ticker.remove(raf);
            lenis.destroy();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="panel-viewport">
      <div ref={track} className="panel-track">
        {children}
      </div>
    </div>
  );
}
