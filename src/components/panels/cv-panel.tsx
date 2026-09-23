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
      <div className="col-span-full row-start-1 row-end-4 grid grid-cols-subgrid gap-y-stack lg:gap-y-0">
        {/* Left: contacts, name, portraits, bio */}
        <div className="col-span-full flex flex-col lg:col-span-4 lg:col-start-1 lg:pt-near">
          <ContactList />

          <div className="relative z-10 mt-stack lg:mt-near">
            <h2 className="headline text-title">
              Filippo
            </h2>
          </div>

          {/* No max-width: the measure is the column it sits in, which is the
              same one the name above it runs to. */}
          <p className="label mt-stack">{BIO}</p>
        </div>

        {/* Middle: education over experience */}
        <div className="col-span-full lg:col-span-5 lg:col-start-6">
          <SectionHeading>education</SectionHeading>
          <EntryList entries={EDUCATION} />

          {/* Two headed sections side by side rather than one list split in half:
              the real CV has five roles, not the nine the reference spread was
              drawn around, and the projects are what legitimately fill the
              second column. */}
          <div className="mt-stack grid gap-x-rhythm gap-y-stack sm:grid-cols-2 lg:mt-apart">
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
        <div className="col-span-full flex flex-col gap-stack lg:col-span-2 lg:col-start-11 lg:gap-near lg:pt-near">
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
