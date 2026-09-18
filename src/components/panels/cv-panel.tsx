import { Panel } from "@/components/panel";
import {
  BIO,
  CONTACTS,
  EDUCATION,
  EXPERIENCE,
  INTERESTS,
  LANGUAGES,
  PERSONAL_SKILLS,
  PROFESSIONAL_SKILLS,
  PROJECTS,
  type Entry,
} from "@/lib/cv";

function SectionHeading({ children }: { children: string }) {
  return <h3 className="label mb-rhythm font-bold text-ink">{children}</h3>;
}

function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ul className="label flex flex-col gap-rhythm text-accent">
      {entries.map((entry) => (
        <li key={`${entry.role}-${entry.place}`}>
          <p className="font-bold">{entry.role}</p>
          <p>{entry.place}</p>
          <p className="opacity-80">{entry.period}</p>
          {entry.detail ? <p className="opacity-80">{entry.detail}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function SkillList({
  items,
  tone = "text-accent",
}: {
  items: string[];
  tone?: string;
}) {
  return (
    <ul className={`label flex flex-col ${tone}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function CvPanel() {
  return (
    <Panel>
      <div className="col-span-full row-start-1 row-end-4 grid grid-cols-subgrid gap-y-16 lg:gap-y-0">
        {/* Left: contacts, name, portraits, bio */}
        <div className="col-span-full flex flex-col lg:col-span-4 lg:col-start-1 lg:pt-[4vh]">
          <ul className="label flex flex-col text-accent">
            {CONTACTS.map((contact) => (
              <li key={contact}>{contact}</li>
            ))}
          </ul>

          {/* Lifted above the portraits so the name and its tag sit on top of the
              photographs rather than stacking clear of them. */}
          <div className="relative z-10 mt-10 lg:mt-[6vh]">
            <h2 className="font-display text-[clamp(2.5rem,4.6vw,6rem)] leading-[0.85] font-bold tracking-[-0.035em]">
              <span className="block">filippo</span>
              <span className="block">baldi</span>
            </h2>
            <p className="label mt-2">UX/UI Designer</p>
          </div>

          {/* Portrait slots — real photography replaces these, at which point they
              become next/image with explicit sizes. */}
          <div className="-mt-12 grid grid-cols-2 gap-2 lg:-mt-16" aria-hidden>
            {[0, 1, 2, 3].map((slot) => (
              <div key={slot} className="aspect-[8/5] bg-accent/20" />
            ))}
          </div>

          {/* No max-width: the measure is the portrait grid above it, so the two
              share an edge. */}
          <p className="label mt-rhythm">{BIO}</p>
        </div>

        {/* Middle: education over experience */}
        <div className="col-span-full lg:col-span-5 lg:col-start-6">
          <SectionHeading>education</SectionHeading>
          <EntryList entries={EDUCATION} />

          {/* Two headed sections side by side rather than one list split in half:
              the real CV has five roles, not the nine the reference spread was
              drawn around, and the projects are what legitimately fill the
              second column. */}
          <div className="mt-12 grid gap-x-rhythm gap-y-12 sm:grid-cols-2 lg:mt-[13vh]">
            <div>
              <SectionHeading>experience</SectionHeading>
              <EntryList entries={EXPERIENCE} />
            </div>
            <div>
              <SectionHeading>selected projects</SectionHeading>
              <EntryList entries={PROJECTS} />
            </div>
          </div>
        </div>

        {/* Right: the four stacked lists */}
        <div className="col-span-full flex flex-col gap-12 lg:col-span-2 lg:col-start-11 lg:gap-[4.5vh] lg:pt-[4vh]">
          <div>
            <SectionHeading>professional skills</SectionHeading>
            <SkillList items={PROFESSIONAL_SKILLS} />
          </div>
          <div>
            <SectionHeading>personal skills</SectionHeading>
            <SkillList items={PERSONAL_SKILLS} />
          </div>
          <div>
            <SectionHeading>languages</SectionHeading>
            <SkillList items={LANGUAGES} />
          </div>
          <div>
            <SectionHeading>other interests</SectionHeading>
            <SkillList items={INTERESTS} tone="text-ink" />
          </div>
        </div>
      </div>
    </Panel>
  );
}
