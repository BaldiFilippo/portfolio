import { ViewTransition, type ReactNode } from "react";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
import { IndexProjectLink } from "@/components/shared-title";

type Entry = { name: string; description: string; href: string };

const building: Entry[] = [
  {
    name: "Known",
    description: "The food diary you can trust.",
    href: "/building/known",
  },
];

const projects: Entry[] = [
  {
    name: "Desk",
    description: "An alternative portfolio that lives on my desk.",
    href: "/projects/desk",
  },
  {
    name: "Sip",
    description: "A dehydration alarm silenced only by water.",
    href: "/projects/sip",
  },
  {
    name: "inRange",
    description: "An insulin pump app that says how you are doing.",
    href: "/projects/inrange",
  },
  {
    name: "Flick",
    description: "A wristband that keeps the score on the court.",
    href: "/projects/flick",
  },
];

const writing: Entry[] = [
  {
    name: "Advancing is not progressing",
    description: "Nov 2026",
    href: "https://bblog.blog/blog/advancing-is-not-progressing",
  },
  {
    name: "The design you can’t take off, and what it does to a life",
    description: "Aug 2026",
    href: "https://bblog.blog/blog/the-design-you-cant-take-off",
  },
  {
    name: "All writing",
    description: "My design blog, bblog.",
    href: "https://bblog.blog/blog",
  },
];

const experience = [
  [
    { name: "Louren", role: "Freelance web designer and developer", period: "2026–now" },
    { name: "SAT", role: "UX/UI designer", period: "2025" },
    { name: "Finomnia (formerly OCS)", role: "Software developer", period: "2023–2024" },
  ],
  [
    { name: "University of Milan", role: "Computer science exchange", period: "2026" },
    {
      name: "University of Trento",
      role: "B.Sc. Interfaces and Communication Technologies",
      period: "2024–2027",
    },
    { name: "Istituto Tecnico Benedetto Castelli", role: "Diploma in computer science", period: "2023" },
  ],
];

// The arrow stays on the same line as the last word.
function ExternalLabel({ text }: { text: string }) {
  const lastWord = text.lastIndexOf(" ") + 1;

  return (
    <>
      <span className="link">{text.slice(0, lastWord)}</span>
      <span className="whitespace-nowrap">
        <span className="link">{text.slice(lastWord)}</span>
        <MoveUpRight size={16} strokeWidth={1} absoluteStrokeWidth aria-hidden className="ml-2 inline align-[-0.125rem] text-ink-faint" />
      </span>
    </>
  );
}

function IndexColumn({
  label,
  entries,
  external = false,
}: {
  label: string;
  entries: Entry[];
  external?: boolean;
}) {
  return (
    <section className="grid content-start gap-5">
      <h2 className="text-label text-ink-soft">{label}</h2>
      <ul className="grid gap-6">
        {entries.map(({ name, description, href }) => (
          <li key={href}>
            {external ? (
              <Link href={href} className="grid">
                <span>
                  <ExternalLabel text={name} />
                </span>
                <span className="text-ink-soft">{description}</span>
              </Link>
            ) : (
              <IndexProjectLink slug={href.split("/").pop() ?? href} href={href} name={name}>
                <span className="text-ink-soft">{description}</span>
              </IndexProjectLink>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid gap-7">
      <h2 className="font-medium">{label}</h2>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <main id="content" className="gutter">
        <div className="mx-auto grid max-w-grid gap-16 py-16 columns:py-32">
          <header className="grid gap-7">
            <h1 className="font-medium">Filippo Baldi</h1>
            <p>
              Designing interfaces for health, smart objects and human–AI interaction. Paying close
              attention to how the world is changing.
            </p>
            <p>Building Known, a food diary that tells you where every number comes from.</p>
          </header>

          <nav aria-label="Building, projects and writing" className="index grid gap-x-8 gap-y-16 columns:grid-cols-3">
            <IndexColumn label="Building" entries={building} />
            <IndexColumn label="Projects" entries={projects} />
            <IndexColumn label="Writing" entries={writing} external />
          </nav>

          <Section label="Experience">
            <div className="grid gap-7 columns:gap-4">
              {experience.map((group) => (
                <ul key={group[0].name} className="grid gap-3 columns:gap-0">
                  {group.map(({ name, role, period }) => (
                    <li key={name} className="flex justify-between gap-8">
                      <p>
                        {role}, <span className="text-ink-soft">{name}</span>
                      </p>
                      <p className="shrink-0 text-ink-soft tabular-nums">{period}</p>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </Section>

          <Section label="Connect">
            {/* Every piece is an element, so each one fades like the rest of the page. */}
            <p className="connect">
              <span>Reach me at</span>{" "}
              <a href="mailto:baldi.filippo@icloud.com" className="link">
                baldi.filippo@icloud.com
              </a>{" "}
              <span>or on</span>{" "}
              <a href="https://x.com/baldifilippo_" className="link">
                X
              </a>
              <span>,</span>{" "}
              <a href="https://github.com/BaldiFilippo" className="link">
                GitHub
              </a>{" "}
              <span>and</span>{" "}
              <a href="https://www.instagram.com/baldifilippo_" className="link">
                Instagram
              </a>
              <span>.</span>
            </p>
          </Section>
        </div>
      </main>
    </ViewTransition>
  );
}
