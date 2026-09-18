import Image from "next/image";

import { ContactList } from "@/components/contact-list";
import { Panel } from "@/components/panel";
import {
  BIO,
  EDUCATION,
  EXPERIENCE,
  INTERESTS,
  LANGUAGES,
  PERSONAL_SKILLS,
  PROFESSIONAL_SKILLS,
  PORTRAITS,
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
          <ContactList />

          {/* Lifted above the portraits so the name and its tag sit on top of the
              photographs rather than stacking clear of them. */}
          <div className="relative z-10 mt-10 lg:mt-[3vh]">
            <h2 className="headline text-[clamp(2.5rem,4.6vw,6rem)] leading-[0.85]">
              <span className="block">filippo</span>
              <span className="block">baldi</span>
            </h2>
          </div>

          {/* Duotone: the cell is painted in the accent, the photo is desaturated
              and screened over it, so blacks land on the accent and whites stay
              white. `isolate` keeps the blend inside the cell instead of reaching
              the paper behind it. */}
          <div className="-mt-3 grid grid-cols-2 gap-2 lg:-mt-4">
            {PORTRAITS.map((portrait) => (
              <div
                key={portrait.src}
                className="relative isolate aspect-[4/3] overflow-hidden bg-accent"
              >
                <Image
                  src={portrait.src}
                  alt={portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 16vw, 45vw"
                  className="object-cover grayscale mix-blend-screen"
                />
              </div>
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
