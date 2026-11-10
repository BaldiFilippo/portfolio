import { ViewTransition } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { LightStates } from "@/components/light-states";
import { NextProject, ProjectHeader, Section } from "@/components/project";
import { ProjectName } from "@/components/shared-title";

export const metadata: Metadata = {
  title: "Sip · Filippo Baldi",
  description: "A dehydration alarm silenced only by water.",
};

// The renders from the 2024 presentation, made in Blender.
const render = { sizes: "(min-width: 43em) 40rem, 100vw", className: "w-full rounded-m bg-fill" };

export default function SipPage() {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <main id="content" className="story gap-y-16 py-16 columns:py-32">
        <ProjectHeader name="Sip" slug="sip" credits="Product and interaction design, 2024">
          <p>
            An alarm clock that lives in a coaster. It stops only when you lift the glass of water
            standing on it.
          </p>
        </ProjectHeader>

        <Section title="The brief">
          <p>
            Sip was a project for the Human–computer interaction course at the University of Trento,
            made with my team. The brief asked for an alarm clock that, besides waking you up, solves a
            health problem.
          </p>
        </Section>

        <Section title="The need">
          <p>
            We chose dehydration. Many people wake up already short of water, and feel it as tiredness,
            poor concentration and cramps.
          </p>
        </Section>

        <Section title="What existed">
          <p>
            Hydration reminders already existed, like Ulla, which clips onto a bottle. We found none that
            tied drinking to the moment you wake up.
          </p>
        </Section>

        <Section title="The idea">
          <p>
            The alarm sits inside a coaster, with a glass of water on it. When it rings in the
            morning, the only way to stop it is to lift the glass, and a sensor inside the coaster
            notices.
          </p>
          <p>
            The set is 3 pieces: the coaster with the alarm inside, a glass, and a cap that keeps
            the water clean through the night.
          </p>
          <Image
            src="/sip/sip-2024-parts.webp"
            alt="A white coaster with a green light, and beside it a glass of water and its cap."
            width={1280}
            height={960}
            {...render}
          />
        </Section>

        <Section title="Lift to stop">
          <p>
            When the alarm rings, a white light comes on at the front of the coaster. It shows where the
            glass is in a dark room, without turning on another light.
          </p>
          <p>
            Lifting the glass turns the light green and plays a short sound, so you know the alarm is off
            without looking for a button.
          </p>
          <LightStates />
        </Section>

        <Section title="The app">
          <p>
            The alarms are set from a companion app. We mapped every screen in a user flow first:
            signing in, pairing a coaster, the alarms of each coaster, and a new alarm with its time,
            days, coaster and ringtone. A coaster pairs when its button is held until the light turns
            blue.
          </p>
        </Section>

        <Section title="Where it stands">
          <p>
            <ProjectName slug="sip" name="Sip" /> stayed a concept, shown with renders and the app’s screens. What I keep from it is the
            move at its center: the gesture that silences the alarm is the habit itself, so the water
            is already in your hand.
          </p>
        </Section>

        <NextProject
          from="sip"
          name="inRange"
          slug="inrange"
          href="/projects/inrange"
          description="An insulin pump app that says how you are doing."
        />
      </main>
    </ViewTransition>
  );
}
