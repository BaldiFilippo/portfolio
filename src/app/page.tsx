import { HorizontalScroll } from "@/components/horizontal-scroll";
import { BlogPanel } from "@/components/panels/blog-panel";
import { ClosingPanel } from "@/components/panels/closing-panel";
import { CvPanel } from "@/components/panels/cv-panel";
import { HeroPanel } from "@/components/panels/hero-panel";
import { PhotographyPanel } from "@/components/panels/photography-panel";
import { PhotographyStrip } from "@/components/panels/photography-strip";
import { ProjectPages } from "@/components/panels/project-pages";
import { ProjectsPanel } from "@/components/panels/projects-panel";

export default function Home() {
  return (
    <main className="relative z-10">
      <HorizontalScroll>
        <HeroPanel />
        <CvPanel />
        <BlogPanel />
        <ProjectsPanel />
        <ProjectPages />
        <PhotographyPanel />
        <PhotographyStrip />
        <ClosingPanel />
      </HorizontalScroll>
    </main>
  );
}
