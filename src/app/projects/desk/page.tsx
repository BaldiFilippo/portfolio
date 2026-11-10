import { ViewTransition } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { CameraPlan } from "@/components/camera-plan";
import { NextProject, ProjectHeader, Section } from "@/components/project";
import { ProjectName } from "@/components/shared-title";
import { DeskLayers } from "@/components/project-diagrams";

export const metadata: Metadata = {
  title: "Desk · Filippo Baldi",
  description: "An alternative portfolio that lives on my desk.",
};

export default function DeskPage() {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <main id="content" className="story gap-y-16 py-16 columns:py-32">
        <ProjectHeader
          name="Desk"
          slug="desk"
          status="Online soon"
          credits="Design, 3D and development, 2026"
        >
          <p>
            An alternative portfolio that lives on my desk. Instead of a list of pages there is a room
            you can look around: a computer you can zoom into, polaroids you can pick up, a notebook and
            a phone that still dials.
          </p>
        </ProjectHeader>

        <Section title="The idea">
          <p>
            A portfolio has to be clear, immediate and to the point. That is often what makes it boring:
            it shows the work and loses the personality of the person who made it.
          </p>
          <p>
            So I made a second one that behaves like a place, where the work sits inside the computer,
            the photos on polaroids and the notes in a notebook.
          </p>
          <p>
            It is deliberately hard to find your way around, because it is meant to be a game. The
            serious portfolio is the one you are reading.
          </p>
          <p>
            I hid easter eggs that nobody explains how to find. Only a creative and curious visitor will
            see them all.
          </p>
          <Image
            src="/desk/desk-live.webp"
            alt="The desk with its computer on, a phone, a clock showing the time, a notebook and polaroids."
            width={1600}
            height={718}
            sizes="(min-width: 50rem) 50rem, 100vw"
            className="media-wide w-full"
          />
        </Section>

        <Section title="Made in Blender">
          <p>
            Every object on the desk is made in Blender: the computer, the phone, the clock and the
            notebook.
          </p>
          <p>
            The rest is not in Blender. The polaroids, the time on the clock, the writing on the Post-it
            and in the notebook, and the page on the screen are drawn live by the browser, on top of the
            render.
          </p>
          <DeskLayers />
        </Section>

        <Section title="Rendered ahead of time">
          <p>
            Nothing on the desk is a real-time model. The scene is rendered in Blender from 23 camera
            positions, on a transparent background, with a floor that only catches shadows. A script
            converts the renders for the web.
          </p>
          <p>
            As the mouse moves, the page moves between the 2 renders closest to it. The browser never
            computes the light, so the room keeps the shadows of a full render and still follows the
            cursor.
          </p>
          <CameraPlan />
        </Section>

        <Section title="Drawing on a picture">
          <p>
            A render is only a picture, so each one is exported with its geometry: where the glass of
            the screen lies, as a grid of points, and how the camera projects the desk, as a matrix.
          </p>
          <p>
            With those numbers the browser can draw on exact places of the render. The polaroids can be
            dragged and piled up, the ink paints the notebook’s page, the phone’s dial turns and the
            Post-it carries a list, all on top of an image that never changes.
          </p>
        </Section>

        <Section title="Through the screen">
          <p>
            Clicking the screen pushes the camera through the glass, and what was a picture on a tube
            becomes a page you can use. On the desk that page is drawn with a CRT shader, so it belongs
            to the room before you enter it.
          </p>
          <p>
            Inside there is a desktop in the style of Mac OS X Tiger. Its controls follow a small design
            system, with menu bar, windows, buttons and tabs measured on Tiger’s own screens.
          </p>
          <Image
            src="/desk/desktop.webp"
            alt="The Tiger-style desktop that opens inside the computer."
            width={1920}
            height={1200}
            sizes="(min-width: 43em) 40rem, 100vw"
            className="w-full rounded-m bg-fill"
          />
        </Section>

        <Section title="Camera flights">
          <p>
            Every object you can approach has its own camera move. The polaroids and the notebook are
            flights of 90 rendered frames, played from a single click. The phone and the Post-it beside
            it get a close-up, a separate render that grows until it fills the window in 1.1 seconds. The
            computer is the 1.4-second push through the glass.
          </p>
          <p>
            The hard part was making the flights feel like one movement. Blending 2 frames left a double
            image, because the picture moves up to 43 pixels between them, so each tick now shows one
            sharp frame. Frames are sent to the graphics card ahead of the camera, and the picture grows
            along one continuous path until it fills the window.
          </p>
        </Section>

        <Section title="The sounds">
          <p>
            The objects you touch on the desk make sounds. Only 2 are audio files: a rotary phone being
            dialed, cut into clips for each digit, and the sweep of going inside the computer. All the
            others are made in the page from noise and tones, and every level was chosen by ear.
          </p>
          <p>
            The polaroids are soft hits of paper on wood, the pen hisses like a felt-tip as fast as your
            hand moves, and the computer switches on with the clack of a relay and a rising hum. Even the
            camera moves air, strongest in the middle of a move.
          </p>
          <p>How it feels should not be spoiled. It has to be tried.</p>
        </Section>

        <Section title="Where it stands">
          <p>
            <ProjectName slug="desk" name="Desk" /> is close to finished and will go online soon.
          </p>
        </Section>

        <NextProject
          from="desk"
          name="Sip"
          slug="sip"
          href="/projects/sip"
          description="A dehydration alarm silenced only by water."
        />
      </main>
    </ViewTransition>
  );
}
