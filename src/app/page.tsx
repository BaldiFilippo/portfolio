import { Panel, PanelGap } from "@/components/panel";
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
        <PanelGap />
        <CvPanel />
        <PanelGap />
        <BlogPanel />
        <PanelGap />
        {/* Read downward: the opening and the projects under it are one
            section, not four rooms along the corridor. */}
        <PanelColumn>
          <ProjectsPanel />
          <ProjectPages />
          {/* A screen of nothing at the foot of the column. Turning the sheet
              from paper to ink takes a full screen of travel, and doing it
              under content would drag the photographs through a muddy middle.
              It belongs here, at the end of the descent, so the turn is the
              last thing the section does rather than the first thing the
              corridor does. */}
          <Panel turn />
        </PanelColumn>
        <PanelGap />
        <PhotographyPanel />
        <PhotographyStrip />
        <PanelGap />
        <ClosingPanel />
      </SheetScroll>
    </main>
  );
}
