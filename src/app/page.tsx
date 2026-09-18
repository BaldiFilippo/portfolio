import { HorizontalScroll } from "@/components/horizontal-scroll";
import { Panel } from "@/components/panel";
import { CvPanel } from "@/components/panels/cv-panel";
import { HeroPanel } from "@/components/panels/hero-panel";

// Placeholder panels — they exist only so the horizontal snap has somewhere to
// travel. Replaced as each real section gets built.
function PlaceholderPanel({ title, index }: { title: string; index: string }) {
  return (
    <Panel>
      <div className="col-span-full row-start-2 flex items-end justify-end">
        <h2 className="font-display text-[clamp(2.5rem,7vw,8rem)] leading-none font-bold tracking-[-0.03em]">
          {title}
        </h2>
      </div>
      <div className="label col-span-full row-start-3 flex justify-between">
        <span>placeholder</span>
        <span>{index}</span>
      </div>
    </Panel>
  );
}

export default function Home() {
  return (
    <main className="relative z-10">
      <HorizontalScroll>
        <HeroPanel />
        <CvPanel />
        <PlaceholderPanel title="projects" index="03" />
      </HorizontalScroll>
    </main>
  );
}
