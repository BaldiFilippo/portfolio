import { ViewTransition } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { CourtShots } from "@/components/court-shots";
import { NextProject, ProjectHeader, Section } from "@/components/project";
import { ProjectName } from "@/components/shared-title";
import { GestureFlow } from "@/components/project-diagrams";
import { Video } from "@/components/video";

export const metadata: Metadata = {
  title: "Flick · Filippo Baldi",
  description: "A wristband that keeps the score on the court.",
};

// Screens exported from the Figma file, each flattened into the official Apple bezel. The app
// was designed in light only, so there is one image per screen.
function Iphone({ name, alt, sizes }: { name: string; alt: string; sizes: string }) {
  return (
    <Image
      src={`/wristband/wristband-${name}.webp`}
      alt={alt}
      sizes={sizes}
      width={800}
      height={1636}
      className="w-full"
    />
  );
}

const setup = [
  {
    name: "pair",
    alt: "Pairing screen: hold the button on the wristband until its light turns blue.",
  },
  {
    name: "hoop",
    alt: "Hoop position screen: stand under the basket and press the button on the wristband.",
  },
  {
    name: "live",
    alt: "A session in progress, with time, shots, baskets and each player’s score.",
  },
];

// The hand with transparency: VP9 for most browsers, HEVC for Safari (chosen in Video).
const SOURCES = [
  { src: "/wristband/wristband-hand.webm", type: 'video/webm; codecs="vp9"' },
  { src: "/wristband/wristband-hand-hevc.mp4", type: 'video/mp4; codecs="hvc1"' },
];

export default function FlickPage() {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <main id="content" className="story gap-y-16 py-16 columns:py-32">
        <ProjectHeader
          name="Flick"
          slug="flick"
          credits="UX/UI and interaction design, 2025"
        >
          <p>
            A wristband and an app that log your shots on a neighborhood court. You turn your hand to
            tell it you scored.
          </p>
        </ProjectHeader>

        <Section title="The brief">
          <p>
            Flick was the final project of the Human–computer interaction course at the University of
            Trento, made with my team and presented in January 2025.
          </p>
        </Section>

        <Section title="The need">
          <p>
            We looked at amateur basketball. Players between 14 and 30 meet on neighborhood courts and
            school gyms, without a coach and without any numbers. The score lives in their memory, which
            leads to arguments, and nothing tells them whether they are getting better.
          </p>
          <p>
            Soccer already has GPS trackers and smart balls. Basketball has a few devices too, but these
            players cannot afford expensive ones.
          </p>
        </Section>

        <Section title="What existed">
          <p>
            Wilson’s connected ball counts shots, but only for training alone, and it costs more than a
            normal ball. HomeCourt films you with a phone, so its accuracy depends on where the phone
            stands. ShotTracker covers a whole team, with a setup of several pieces and a higher price.
          </p>
          <p>None of them fit a game with friends on a public court.</p>
        </Section>

        <Section title="The idea">
          <p>
            The wristband has motion sensors, a light, a vibration motor and a single button. The app
            keeps the sessions, the challenges, the teams and the progress over time.
          </p>
          <p>
            We set its limits with people who know the sport: under 250 grams, so it never gets in the
            way of a shot, and built to take rain, dust and knocks on an outdoor court.
          </p>
        </Section>

        <Section title="Turn your hand">
          <div className="media-side">
            <div className="grid content-start gap-7">
              <p>
                The wristband does not try to guess whether a ball went in. After a basket you turn your
                hand, and the motion sensors record it. The wristband gives feedback with its light and
                a vibration.
              </p>
              <p>The game goes on, and the score no longer depends on anyone’s memory.</p>
            </div>
            <div className="mx-auto w-1/2 columns:w-full">
              <Video
                src={SOURCES}
                poster="/wristband/wristband-hand-poster.webp"
                label="the animation of the hand turning"
                className="aspect-[2/3] w-full"
                loop
                themed={false}
              />
            </div>
          </div>
          <GestureFlow />
        </Section>

        <Section title="A session">
          <p>
            Pairing takes one button, held until the light turns blue. Before playing, you stand under
            the hoop and press it again, so the wristband knows where the basket is and can measure the
            distance of every shot.
          </p>
          <p>
            A session has a mode, such as free throws, long range or one on one, and friends join by
            email or with a code. While you play, the app shows the time left, the shots and each
            player’s score.
          </p>
          <p>
            We mapped every screen in FigJam before drawing it in Figma, and checked each one against
            the parts of the screen the thumb reaches easily.
          </p>
          <div className="media-wide grid grid-cols-3 gap-4 columns:gap-8">
            {setup.map(({ name, alt }) => (
              <div key={name}>
                <Iphone name={name} alt={alt} sizes="(min-width: 50rem) 16rem, 30vw" />
              </div>
            ))}
          </div>
        </Section>

        <Section title="After the game">
          <p>
            At the end the players stand on a podium, with the totals of the session and a note on
            shooting technique.
          </p>
          <p>
            Because the wristband knows where the basket is, every shot has a distance. This is the
            session from our Figma file on the court: 50 shots, 34 baskets, taken 6 meters from the
            basket on average.
          </p>
          <CourtShots />
          <p>
            Groups of friends become teams with their own rankings, and goals such as 100 baskets in a
            week give a reason to come back to the court.
          </p>
        </Section>

        <Section title="Where it stands">
          <p>
            <ProjectName slug="flick" name="Flick" /> ended with the presentation, with the app designed screen by screen and the wristband
            as a render. The decision I would defend again is the one at its center: one small gesture
            from the player is more reliable than a sensor trying to see the ball.
          </p>
        </Section>

        <NextProject
          from="flick"
          name="Known"
          slug="known"
          href="/building/known"
          description="The food diary you can trust."
        />
      </main>
    </ViewTransition>
  );
}
