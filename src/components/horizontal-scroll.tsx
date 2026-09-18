"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Desktop: the panels are pinned and translated sideways in step with vertical
 * scrolling, free to stop anywhere. Lenis smooths the scroll itself; `scrub`
 * lets the track ease in behind it.
 *
 * Below `lg`, and whenever reduced motion is requested, none of this attaches and
 * the panels stay a plain vertical stack.
 */
export function HorizontalScroll({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
          if (panels.length < 2) return;

          const lenis = new Lenis();
          lenis.on("scroll", ScrollTrigger.update);

          const raf = (time: number) => lenis.raf(time * 1000);
          gsap.ticker.add(raf);
          gsap.ticker.lagSmoothing(0);

          gsap.to(panels, {
            xPercent: -100 * (panels.length - 1),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              pin: true,
              scrub: 1,
              end: () => `+=${window.innerWidth * (panels.length - 1)}`,
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
    <div ref={root} className="lg:h-screen lg:overflow-hidden">
      <div className="flex flex-col lg:h-screen lg:w-max lg:flex-row">
        {children}
      </div>
    </div>
  );
}
