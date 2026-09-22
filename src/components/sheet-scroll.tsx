"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * One sheet, two directions, one scrollbar.
 *
 * The gesture never changes — it is always an ordinary downward scroll. What
 * changes is what the sheet does with it: between sections it travels sideways,
 * and inside a section marked as a column it travels down. So arriving at the
 * projects reads as entering them, and the projects themselves read as pages
 * under that opening rather than as more rooms along the same corridor.
 *
 * Both distances are read live on every update rather than baked into tween
 * durations, which cannot be functions: a window resized mid-journey would
 * otherwise keep spending scroll on a distance that no longer exists.
 *
 * Travel is measured from the track's real width, never counted in panels. A
 * section may be three screens wide (the photographs are), and "shift each
 * panel by its own width" only holds while every panel is the same size.
 *
 * Below `lg`, and under reduced motion, none of this attaches: the panels and
 * the column alike are a plain vertical stack, which is the same journey.
 */
export function SheetScroll({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Written only when it actually moves: this one property is mixed into
      // every colour on the page, so each write restyles the document.
      let tinted = -1;
      const setTint = (value: number) => {
        const stepped = Math.round(value * 200) / 200;
        if (stepped === tinted) return;
        tinted = stepped;
        document.documentElement.style.setProperty(
          "--sheet-tint",
          String(stepped),
        );
      };

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const el = track.current;
          if (!el) return;

          const column = el.querySelector<HTMLElement>("[data-column]");
          const turn = el.querySelector<HTMLElement>("[data-turn]");
          const inner =
            column?.querySelector<HTMLElement>("[data-column-inner]") ?? null;

          /** How far the sheet slides sideways in total. */
          const across = () => el.scrollWidth - window.innerWidth;
          /** How far the column's stack rises once the sheet stops. */
          const down = () =>
            inner ? Math.max(0, inner.scrollHeight - window.innerHeight) : 0;
          /** Sideways distance covered before the column fills the screen. */
          const toColumn = () =>
            column ? column.offsetLeft - el.offsetLeft : 0;

          if (across() <= 0) return;

          const lenis = new Lenis();
          lenis.on("scroll", ScrollTrigger.update);

          const raf = (time: number) => lenis.raf(time * 1000);
          gsap.ticker.add(raf);
          gsap.ticker.lagSmoothing(0);

          /** Where the empty screen begins, in track coordinates. */
          const turnAt = () => (turn ? turn.offsetLeft - el.offsetLeft : 0);

          const setX = gsap.quickSetter(el, "x", "px");
          const setY = inner ? gsap.quickSetter(inner, "y", "px") : null;

          const progress = { at: 0 };

          gsap.to(progress, {
            at: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              pin: true,
              scrub: 1,
              end: () => `+=${across() + down()}`,
              invalidateOnRefresh: true,
            },
            onUpdate: () => {
              const pause = toColumn();
              const rise = down();
              const gone = progress.at * (across() + rise);

              // Sideways travel holds still for exactly the stretch the column
              // is rising, then picks up where it left off.
              const x = Math.min(gone, pause) + Math.max(0, gone - pause - rise);
              setX(-x);
              setY?.(-Math.min(Math.max(gone - pause, 0), rise));

              // The turn runs across the one screen of travel that brings the
              // empty panel from the right edge to filling the view, so it is
              // complete the moment there is nothing else on screen.
              if (turn) {
                const screen = window.innerWidth;
                setTint(gsap.utils.clamp(0, 1, (x - turnAt() + screen) / screen));
              }
            },
          });

          return () => {
            gsap.ticker.remove(raf);
            lenis.destroy();
            document.documentElement.style.removeProperty("--sheet-tint");
          };
        },
      );

      /* On a phone, and wherever motion is unwelcome, the panels are a plain
         vertical stack — but the sheet still turns over. The empty screen does
         the same work it does sideways: the fade runs while it rises into view,
         and is complete once it holds the viewport on its own. */
      mm.add(
        "(max-width: 1023px), (prefers-reduced-motion: reduce)",
        () => {
          const turn = root.current?.querySelector("[data-turn]");
          if (!turn) return;

          const trigger = ScrollTrigger.create({
            trigger: turn,
            start: "top bottom",
            end: "top top",
            onUpdate: (self) => setTint(self.progress),
          });

          return () => {
            trigger.kill();
            document.documentElement.style.removeProperty("--sheet-tint");
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
