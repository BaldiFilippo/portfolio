import type { ReactNode } from "react";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { NextProjectName } from "./next-project-name";
import { BottomBack, ProjectTitle } from "./shared-title";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="story-section gap-y-7">
      <h2 className="font-medium">{title}</h2>
      {children}
    </section>
  );
}

export function ProjectHeader({
  name,
  slug,
  site,
  status,
  credits,
  children,
}: {
  name: string;
  slug: string;
  site?: string;
  status?: string;
  credits: string;
  children: ReactNode;
}) {
  return (
    <header className="grid gap-7 border-b border-line pb-7">
      <div className="flex items-baseline justify-between gap-6">
        <ProjectTitle slug={slug} name={name} />
        <nav aria-label={`${name} links`} className="flex flex-wrap items-baseline justify-end gap-x-6">
          {site && (
            <a href={site} className="min-h-12 columns:min-h-0">
              <span className="link">Visit the site</span>
              <MoveUpRight
                size={16}
                strokeWidth={1}
                absoluteStrokeWidth
                aria-hidden
                className="ml-2 inline align-[-0.125rem] text-ink-faint"
              />
            </a>
          )}
          {status && <span className="text-ink-soft">{status}</span>}
          <Link href="/" className="link min-h-12 columns:min-h-0">
            Back
          </Link>
        </nav>
      </div>
      {children}
      <p className="text-ink-soft">{credits}</p>
    </header>
  );
}

export function NextProject({
  from,
  name,
  slug,
  href,
  description,
}: {
  /** The slug of the page this sits on, whose name the Back carries home. */
  from: string;
  name: string;
  slug: string;
  href: string;
  description: string;
}) {
  return (
    <nav aria-label="Next project" className="border-t border-line pt-7">
      <div className="flex items-baseline justify-between gap-6">
        <div>
          <p className="text-label text-ink-soft">Next</p>
          <NextProjectName name={name} slug={slug} href={href} description={description} />
        </div>
        <BottomBack slug={from} />
      </div>
    </nav>
  );
}
