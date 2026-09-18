import { HorizontalScroll } from "@/components/horizontal-scroll";
import { BlogPanel } from "@/components/panels/blog-panel";
import { ClosingPanel } from "@/components/panels/closing-panel";
import { CvPanel } from "@/components/panels/cv-panel";
import { HeroPanel } from "@/components/panels/hero-panel";
import { ProjectsPanel } from "@/components/panels/projects-panel";

export default function Home() {
  return (
    <main className="relative z-10">
      <HorizontalScroll>
        <HeroPanel />
        <CvPanel />
        <BlogPanel />
        <ProjectsPanel />
        <ClosingPanel />
      </HorizontalScroll>
    </main>
  );
}
