import { ViewTransition } from "react";
import type { Metadata } from "next";
import {
  AlarmLevels,
  DayTimeline,
  HomeOrder,
  PainPointMatrix,
  ReminderConditions,
  SportPhases,
} from "@/components/inrange-diagrams";
import { NextProject, ProjectHeader, Section } from "@/components/project";
import { ProjectName } from "@/components/shared-title";

export const metadata: Metadata = {
  title: "inRange · Filippo Baldi",
  description: "An insulin pump app that says how you are doing.",
};

export default function InRangePage() {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <main id="content" className="story gap-y-16 py-16 columns:py-32">
        <ProjectHeader name="inRange" slug="inrange" credits="UX/UI design, 2026">
          <p>
            A redesign of the app that goes with an insulin pump, for people with type 1 diabetes. It
            answers one question first: how am I doing right now?
          </p>
        </ProjectHeader>

        <Section title="The brief">
          <p>
            inRange was my final project for the Graphical interface design course at the University of
            Trento, in the 2025–2026 academic year. I worked on it alone.
          </p>
          <p>
            The brief imagined a pump maker that wants to improve daily life for the people who already
            use its device: less friction, fewer people giving up, more trust in the therapy.
          </p>
        </Section>

        <Section title="The need">
          <p>
            A person with type 1 diabetes on a pump wears it 24 hours a day, and the day is a chain of
            decisions. Before every meal they estimate the carbohydrates and give a bolus. During sport
            they change the basal rate or stop it. At night the pump can wake them with an alarm.
          </p>
          <p>
            None of it stays the same for long. Food, exercise, stress, timing and even the weather move
            the glucose, so what worked yesterday may not work today.
          </p>
          <DayTimeline />
        </Section>

        <Section title="13 pain points">
          <p>
            I modeled the domain before drawing anything: the recurring activities, the states a day
            goes through, from routine to alarm to the low attention of the night, and the situations
            that strain it most, such as meals out, sport, water, technical faults and the set change.
          </p>
          <p>
            That gave 13 pain points. Among them: alarms that sound in the wrong place, the fear
            of lows at night, a bolus forgotten before a meal, the fear of delivering insulin by mistake
            when tired, and never having the glucose in sight when it matters.
          </p>
          <p>
            From them I built 3 personas, bottom up. Mara, 58, wants to feel in control at all times.
            Noemi, 20, lives in a rush and forgets things. Cristiano, 28, trains often and does not want
            to lose control while he does. They are not real people but attitudes, chosen to cover the
            night, the meals and the sport without overlapping.
          </p>
          <PainPointMatrix />
        </Section>

        <Section title="What I left out">
          <p>
            A step-by-step guide to changing the infusion set: after a few days it becomes routine. A
            daily checklist: days with diabetes are never standard, and an unticked list only blames.
            Advice on counting carbohydrates: food apps already do it, and it would move the focus from
            the pump to the plate.
          </p>
          <p>
            The app also gives no clinical advice. It never calculates a dose and never decides the
            therapy on its own, and it is not a tool for the doctor.
          </p>
        </Section>

        <Section title="State first">
          <p>
            From the pain points came a few rules: clarity first, detail after; an alarm understood in
            a few seconds; few steps when it matters; and always knowing what is happening and what
            you just did.
          </p>
          <p>
            So the home is a control panel. The glucose is the largest thing on the screen, with
            its trend. Below it, whether delivery is running, the pump and the sensor in 2 cards,
            and the last actions taken. A single button opens the actions: a bolus, sport mode,
            night mode.
          </p>
          <HomeOrder />
        </Section>

        <Section title="3 moments">
          <p>
            At night, Mara’s alarms say how serious they are before she opens anything: an icon, a color
            and one line. A low that needs action looks nothing like a sensor battery at half.
          </p>
          <AlarmLevels />
          <p>
            At lunch, Noemi picks a saved meal and the dose she used last time is already there. She can
            change it, and a dialog asks her to confirm before any insulin is delivered. If she forgets
            the bolus, a reminder comes only in her meal hours, and only if the glucose is rising with
            nothing recorded.
          </p>
          <ReminderConditions />
          <p>
            Before training, Cristiano sets sport mode: whether the pump stays on him, whether to quiet
            the notifications, a temporary change to the basal rate, and when it starts and ends. A
            note reminds him to keep fast carbohydrates at hand.
          </p>
          <SportPhases />
        </Section>

        <Section title="Color that means something">
          <p>
            The interface is built on Material 3, with a palette of my own. Material’s colors are
            accessible, but they do not carry a medical meaning, and here color is not decoration. Green
            means the therapy is running as it should, yellow and orange a temporary change such as sport
            or night mode, and red a critical alarm.
          </p>
          <p>
            I also sketched the essential numbers outside the app: a lock-screen widget, a watch face
            and a car display, for the moments when the phone cannot be opened.
          </p>
        </Section>

        <Section title="Where it stands">
          <p>
            <ProjectName slug="inrange" name="inRange" /> ended as a report and a Figma prototype, one moment for each persona. What I keep
            from it is what I left out: in an app about insulin, every feature you add is one more
            thing to get wrong.
          </p>
        </Section>

        <NextProject
          from="inrange"
          name="Flick"
          slug="flick"
          href="/projects/flick"
          description="A wristband that keeps the score on the court."
        />
      </main>
    </ViewTransition>
  );
}
