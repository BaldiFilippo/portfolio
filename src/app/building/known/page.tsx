import { ViewTransition } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { NextProject, ProjectHeader, Section } from "@/components/project";
import { ProjectName } from "@/components/shared-title";
import { ManyWaysIn } from "@/components/project-diagrams";
import { Video } from "@/components/video";

export const metadata: Metadata = {
  title: "Known · Filippo Baldi",
  description: "The food diary you can trust.",
};

const moments = [
  {
    name: "write",
    alt: "Typing a food into the Known diary.",
  },
  {
    name: "voice",
    alt: "Saying a meal aloud in Known.",
  },
  {
    name: "snap",
    alt: "A photographed burger and fries with its estimated values.",
  },
];

// Each image is the official Apple bezel with the screen already inside it, one per theme.
function Iphone({ name, alt, sizes }: { name: string; alt: string; sizes: string }) {
  const image = { sizes, width: 800, height: 1636 };

  return (
    <>
      <Image src={`/known/iphone-${name}.webp`} alt={alt} {...image} className="w-full dark:hidden" />
      <Image src={`/known/iphone-${name}-dark.webp`} alt={alt} {...image} className="hidden w-full dark:block" />
    </>
  );
}

// Images follow the three columns of the index: one, two or all three.

export default function KnownPage() {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <main id="content" className="story gap-y-16 py-16 columns:py-32">
        <ProjectHeader
          name="Known"
          slug="known"
          site="https://tryknown.app"
          status="App Store soon"
          credits="Design and development, 2026"
        >
          <p>
            Known is a food diary for iPhone that tells you exactly what you eat. It starts from the
            values declared on the label, and it marks every number by how far you can trust it.
          </p>
        </ProjectHeader>

        <Section title="The need">
          <p>
            Known began with a need of my own. I have diabetes, so every day I have to count the carbs
            in what I eat, and I need the precise number, not a guess. Rough numbers and cluttered apps
            are not enough for that.
          </p>
        </Section>

        <Section title="The idea">
          <p>
            Most packaged food already has that number printed on it. The brand declares it on the
            pack. So the idea was simple: a diary that starts from the label, estimates only when no
            declared value exists, and always tells you which is which.
          </p>
          <p>
            It began with carbs, but people count different things: protein at the gym, calories on a
            diet. So the app counts everything, and you choose what leads.
          </p>
          <Video
            src="/known/film.mp4"
            poster="/known/film-poster.webp"
            label="the Known launch film"
            className="media-wide aspect-video rounded-m"
          />
        </Section>

        <Section title="The diary">
          <div className="media-side">
            <div className="grid content-start gap-7">
            <p>
                The main screen is one page for the day. At the top, the number against your goal and
                the 3 macros. Below, the meals in the order you ate them, each food with its mark
                beside it. At the bottom, a line that is always ready for the next food.
              </p>
              <p>
                I kept out what does not help you log the next meal. There is no account, because the
                diary syncs through iCloud. There are no counters or leaderboards, and the voice stays
                calm: short sentences, facts, no exclamation marks, no guilt.
              </p>
              <p>You open it many times a day, so on my iPhone it opens in under half a second.</p>
              </div>
            <div className="mx-auto w-1/2 columns:w-full">
              <Iphone
                name="today"
                alt="The Known diary for a day, with meals, foods and their marks."
                sizes="(min-width: 43em) 16rem, 50vw"
              />
            </div>
          </div>
        </Section>

        <Section title="3 marks">
          <p>
            A number on a screen always looks certain, even when it is a guess. I wanted the diary to
            say where each value comes from, so that you always know what you are looking at.
          </p>
          <p>
            A full blue dot means the values come from the label. A half dot means they still have to
            be matched with the pack. An empty ring means no declared value exists, so the most advanced
            AI models estimate it. An estimate is still a strong number. The ring says how it was made,
            and nothing more.
          </p>
          <div className="w-full max-w-[26rem] justify-self-center">
            <Image
              src="/known/marks-light.svg"
              alt="The 3 marks of Known: an empty ring, a half dot and a full blue dot."
              width={400}
              height={100}
              className="w-full dark:hidden"
            />
            <Image
              src="/known/marks-dark.svg"
              alt="The 3 marks of Known: an empty ring, a half dot and a full blue dot."
              width={400}
              height={100}
              className="hidden w-full dark:block"
            />
          </div>
        </Section>

        <Section title="Verified together">
          <p>
            The critical point of food apps is often the catalog they rely on. An app can only be as
            exact as the data behind it, and product nutrition data is a private market, hard to reach
            and often out of date. A polished diary on a wrong number is still a wrong number.
          </p>
          <p>
            That is why I built Known around one mission: verified together. Instead of trusting a
            database, Known asks people to check each food against the real pack, one by one, until
            every food is verified.
          </p>
          <p>
            I started the catalog myself. I read the values from the producers’ own sites whenever
            possible, and I went to supermarkets to check the real values on the packs by hand. When you
            scan a barcode, Known looks there first.
          </p>
          <p>
            Even a verified product can be wrong. The real pack is the only truth, so values and
            portions stay correctable on every product.
          </p>
          <p>
            A half dot is a food still waiting for someone to check it. When you check it against its
            pack, it turns blue on your phone right away. The correction is reviewed, then added for
            everyone.
          </p>
          <Video
            src="/known/loop.mp4"
            poster="/known/loop-poster.webp"
            label="the Verified together animation"
            className="media-wide aspect-video rounded-m"
            loop
          />
        </Section>

        <Section title="Many ways in">
          <p>
            A diary only works if you keep writing in it, and a meal rarely happens at a desk. So the
            same meal can be typed in a line, said aloud, scanned from a barcode or a label, or
            photographed on the plate. Whichever way it comes in, it ends in the same quiet list.
          </p>
          <ManyWaysIn />
          <div className="media-wide grid grid-cols-3 gap-4 columns:gap-8">
            {moments.map(({ name, alt }) => (
              <div key={name}>
                <Iphone name={name} alt={alt} sizes="(min-width: 50rem) 16rem, 30vw" />
              </div>
            ))}
          </div>
        </Section>

        <Section title="Where it stands">
          <p>
            <ProjectName slug="known" name="Known" /> started with one number I needed to get right. It became a diary that says where
            every number comes from, and a catalog that people check together.
          </p>
          <p>
            It is in its last steps before the App Store, and the launch is only the start of the
            mission: every food someone checks against its pack makes the next person’s number more
            exact.
          </p>
        </Section>

        <NextProject
          from="known"
          name="Desk"
          slug="desk"
          href="/projects/desk"
          description="An alternative portfolio that lives on my desk."
        />
      </main>
    </ViewTransition>
  );
}
