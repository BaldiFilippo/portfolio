import { Panel } from "@/components/panel";
import { PanelColumn } from "@/components/panel-column";
import { SheetScroll } from "@/components/sheet-scroll";
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
      <SheetScroll>
        <HeroPanel />
        {/* Half a screen of paper, so the cover is not read as the CV's first
            column and the sheet has somewhere to breathe between them. */}
        <Panel span={0.5} gap />
        <CvPanel />
        <BlogPanel />
        {/* Read downward: the opening and the projects under it are one
            section, not four rooms along the corridor. */}
        <PanelColumn>
          <ProjectsPanel />
          <ProjectPages />
        </PanelColumn>
        {/* A screen of nothing. It is not a pause for its own sake: turning the
            sheet from paper to ink takes a full screen of travel, and doing it
            under content would drag the photographs through a muddy middle. */}
        <Panel turn />
        <PhotographyPanel />
        <PhotographyStrip />
        <ClosingPanel />
      </SheetScroll>
    </main>
  );
}
