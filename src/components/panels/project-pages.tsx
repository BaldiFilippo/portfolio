import { Fragment } from "react";

import Image from "next/image";

import { ClipFrame } from "@/components/clip";
import { Comparison } from "@/components/comparison";
import { Flow } from "@/components/flow";
import {
  BAND,
  BAND_MEDIA,
  BAND_MEDIA_INSET,
  frameSizes,
  FrameRow as Row,
} from "@/components/frame-row";
import { Panel } from "@/components/panel";
import { PROJECT_PAGES, type Frame, type ProjectPage } from "@/lib/projects";

function ConceptPanel({ project }: { project: ProjectPage }) {
  return (
    <Panel>
      <ul className="label col-span-full row-start-1 flex flex-col lg:col-span-3">
        {project.meta.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {/* Top-left, under the meta list, so the whole opening of a project reads
          as one column down the left edge rather than as two blocks facing each
          other across an empty middle. */}
      <div className="col-span-full row-start-2 flex items-start justify-start">
        <div className="max-w-reading">
          <h2 className="headline text-project">
            {project.name}
          </h2>
          <p className="label mt-hairline">{project.label}</p>
          <div className="label mt-rhythm flex flex-col">
            {project.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          {project.pdf ? (
            <a
              href={project.pdf.href}
              download
              className="label tap-safe mt-rhythm underline underline-offset-4 hover:no-underline focus-visible:no-underline"
            >
              {project.pdf.label}
            </a>
          ) : null}
        </div>
      </div>
    </Panel>
  );
}

/** A frame keeps its own proportions where it declares them, so a render that
 *  was composed carefully is not re-cropped to fit a nominal 3:2. */
function ratioOf(frame: Frame) {
  return frame.ratio ?? (frame.orientation === "landscape" ? 1.5 : 2 / 3);
}

function FrameRow({
  frames,
  rowHeight,
  className = "",
}: {
  frames: Frame[];
  /** A plain CSS length, not a custom property: `sizes` has to read it too. */
  rowHeight?: string;
  className?: string;
}) {
  const height =
    rowHeight ?? (frames.some((f) => f.tall) ? BAND : BAND_MEDIA);

  return (
    <Row ratios={frames.map(ratioOf)} rowHeight={height} className={className}>
      {frames.map((frame, i) => (
        <figure key={frame.src ?? i}>
          <div
            /* The plate marks a slot with nothing in it yet. Left under a real
               picture it shows through wherever that picture is transparent. */
            className={`relative w-full ${frame.src ? "" : "bg-accent/15"}`}
            style={{ aspectRatio: ratioOf(frame) }}
          >
            {frame.src ? (
              <Image
                src={frame.src}
                alt={frame.alt ?? ""}
                fill
                sizes={frameSizes(ratioOf(frame), height)}
                className="object-cover"
              />
            ) : null}
          </div>
          {frame.caption ? (
            <figcaption className="label mt-hairline opacity-70">
              {frame.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </Row>
  );
}

/**
 * Sits between the concept and the interaction: the concept states an opening,
 * this page shows the opening was real. Set as type, so it needs no asset and
 * stays legible at any size.
 */
function ComparisonPanel({ project }: { project: ProjectPage }) {
  if (!project.rivals) return null;

  return (
    <Panel>
      <div className="col-span-full row-start-2 flex flex-col justify-center">
        <Comparison
          rivals={project.rivals}
          heading={project.rivalsHeading}
          intro={project.rivalsIntro}
          gap={project.gap}
        />
      </div>
    </Panel>
  );
}

/**
 * Where the argument is that the interaction costs no time, a still cannot make
 * it — so this page runs it twice: once as drawn, once on a real court.
 */
function ClipsPanel({ project }: { project: ProjectPage }) {
  if (!project.clips) return null;

  return (
    <Panel>
      {project.clipsHeading ? (
        <div className="label col-span-full row-start-1 max-w-reading lg:col-span-5">
          <h3>{project.clipsHeading}</h3>
          <div className="mt-hairline flex flex-col opacity-70">
            {project.clipsLines?.map((line) => <p key={line}>{line}</p>)}
          </div>
        </div>
      ) : null}

      <Row
        ratios={project.clips.map((c) => c.ratio)}
        className="col-span-full row-start-2"
      >
        {project.clips.map((clip) => (
          <ClipFrame key={clip.src} clip={clip} />
        ))}
      </Row>
    </Panel>
  );
}

function FlowPanel({ project }: { project: ProjectPage }) {
  if (!project.flow) return null;

  return (
    <Panel>
      <div className="col-span-full row-start-2 flex flex-col justify-center gap-near">
        {/* Held to a narrow measure: these two sit with the chain rather than
            carrying a page of their own, so they read as evidence for it. */}
        {project.flowFrames ? (
          <FrameRow
            frames={project.flowFrames}
            rowHeight={BAND_MEDIA_INSET}
          />
        ) : null}
        <Flow steps={project.flow} loops={project.flowLoops} />
      </div>
    </Panel>
  );
}

function VisualsPanel({
  project,
  frames,
  isLast,
}: {
  project: ProjectPage;
  frames: Frame[];
  isLast: boolean;
}) {
  return (
    <Panel>
      <FrameRow frames={frames} className="col-span-full row-start-2" />

      {/* Only on a project's closing page: repeating it on every spread turned a
          sign-off into a running header. */}
      {isLast ? (
        <p className="label col-span-full row-start-3 self-end justify-self-end uppercase">
          {project.tagline}
        </p>
      ) : null}
    </Panel>
  );
}

export function ProjectPages() {
  return (
    <>
      {PROJECT_PAGES.map((project, i) => (
        <Fragment key={project.name}>
          {i > 0 ? (
            <div
              aria-hidden
              className="shrink-0"
              style={{ height: "var(--gap-project)" }}
            />
          ) : null}
          <ConceptPanel project={project} />
          <ComparisonPanel project={project} />
          <ClipsPanel project={project} />
          <FlowPanel project={project} />
          {project.visualPages.map((frames, i) => (
            <VisualsPanel
              key={i}
              project={project}
              frames={frames}
              isLast={i === project.visualPages.length - 1}
            />
          ))}
        </Fragment>
      ))}
    </>
  );
}
