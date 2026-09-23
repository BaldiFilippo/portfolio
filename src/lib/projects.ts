export type Rival = {
  name: string;
  /** What the thing is, in one clause — sits under the name like a label. */
  premise: string;
  strength: string;
  limit: string;
};

export type Clip = {
  src: string;
  poster: string;
  /** Read out where the motion itself cannot be seen. */
  alt: string;
  caption?: string;
  ratio: number;
  /** Line art on white: its ground is the paper, so map it onto the paper. */
  onPaper?: boolean;
};

export type Frame = {
  src?: string;
  alt?: string;
  /** Small note under the frame, in the manner of the photography strip. */
  caption?: string;
  orientation: "landscape" | "portrait";
  /** The frame's own width/height. Falls back to the orientation's default. */
  ratio?: number;
  /** Takes the whole band rather than leaving the caption's allowance inside
   *  it. Worth about 8%: the band is the ceiling, and it is shared. */
  tall?: boolean;
};

export type ProjectPage = {
  name: string;
  /** Sits under the title, where the reference spread says "concept". */
  label: string;
  /** Footer right, set in caps. */
  tagline: string;
  /** Top-left list: role, discipline, date. */
  meta: string[];
  /** The description under the title. */
  lines: string[];
  /**
   * The full presentation, served from public/projects/<name>/. Omitted where
   * there is no file yet, so the link never points at a missing download.
   */
  pdf?: { href: string; label: string };
  /**
   * One entry per visual page, each holding the frames on it. A frame without a
   * src is a slot still waiting for its image.
   */
  visualPages: Frame[][];
  /** The field the project entered, and the opening it took. */
  rivals?: Rival[];
  rivalsHeading?: string;
  rivalsIntro?: string;
  gap?: string;
  /** The interaction, running. Shown where a still would only describe it. */
  clips?: Clip[];
  clipsHeading?: string;
  clipsLines?: string[];
  /** Drawn in type rather than imported: the interaction, as a sequence. */
  flow?: { marker?: string; label: string }[];
  flowLoops?: boolean;
  /** Shown above the chain: the same argument, in images. */
  flowFrames?: Frame[];
};

/**
 * Factual summaries drawn from the CV — what each project is, who he was on it
 * and when. Deliberately not written in a manifesto voice: the reference spread
 * opens with a dictionary definition and builds an argument, and that argument
 * has to be his. Rewrite the lines; the structure will hold.
 */
export const PROJECT_PAGES: ProjectPage[] = [
  {
    name: "webapp redesign: SAT",
    // The others are university briefs; this one was paid for. The label is
    // the only place on the page where that distinction can be made.
    label: "commissioned work",
    tagline: "sat web app, membership redesign",
    meta: [
      "UX/UI design, team of four",
      "SAT — Società Alpinisti Tridentini, Trento",
      "February – December 2025",
    ],
    lines: [
      "SAT commissioned the work after a UX Challenge, and it ran on for the rest of the year.",
      "We restructured how the app is used, starting from research and interviews rather than from screens: joining, renewing, carrying a card, and looking after a whole family's memberships.",
      "Much of what the app needed, the association already had and was not using. The stamp a member collects for every year they renew is the clearest case — paperwork, until it became the part of the screen that says how long you have belonged.",
      "One finding needed no prototype at all. On a phone, the only way into the existing app was to scroll to the foot of SAT's own homepage: the way in was not in the menu.",
    ],
    visualPages: [
      [
        {
          src: "/projects/sat-redesign/sat-redesign-screens.jpg",
          alt: "The redesigned mobile web app, laid out across a grid of phones: registration, joining, family management, and the digital card with its year stamps",
          caption: "the mobile web app",
          orientation: "landscape",
          ratio: 2000 / 1660,
          tall: true,
        },
      ],
    ],
  },
  {
    name: "inRange.",
    label: "concept",
    tagline: "inrange, insulin pump companion app",
    meta: ["Sole designer", "User Research", "2026"],
    lines: [
      "A companion app for an insulin micro-infusion pump, redesigned around the people who carry one.",
      "Fourteen pain points surfaced through research, then mapped across three personas rather than averaged into one.",
      "Each persona kept its own flow, because a person managing a chronic condition and a person newly diagnosed are not the same user.",
    ],
    visualPages: [[{ orientation: "landscape" }, { orientation: "portrait" }]],
  },
  {
    name: "scoreband.",
    label: "concept",
    tagline: "smart basketball wristband, gesture logging",
    meta: [
      "UX/UI and interaction lead",
      "Human–machine interaction, University of Trento",
      "January 2025",
    ],
    lines: [
      "Football handed amateurs GPS trackers and instrumented balls. A game on a neighbourhood court still runs on what the players remember.",
      "Memory is the flaw. The score lives in four heads at once, and that is where the arguments start.",
      "The brief was a device for the people who play outside any structure — no coach, no scoreboard, nobody keeping the book.",
      "So the count comes off the gesture itself and stays on the wrist. The moment it moves to a screen, the game stops.",
    ],
    pdf: {
      href: "/projects/scoreband/scoreband-presentation.pdf",
      label: "full presentation, pdf",
    },
    rivalsHeading: "what was already on the market",
    rivalsIntro:
      "Three products had claimed the space by 2025. Each one is good at something, and each one solves a different game to the one being played in the park.",
    rivals: [
      {
        name: "Wilson X Connected Basketball",
        premise: "sensors built into the ball",
        strength: "Nothing extra to wear or install, and the stats arrive live.",
        limit:
          "Individual training only — it cannot read a team game — and the sensor's battery is sealed in.",
      },
      {
        name: "HomeCourt",
        premise: "a phone camera and computer vision",
        strength: "No hardware at all: the phone is already in everyone's pocket.",
        limit:
          "Accuracy follows the camera, the space and the light. The real analysis sits behind a subscription.",
      },
      {
        name: "ShotTracker",
        premise: "wrist sensor, hoop sensor, connected ball",
        strength: "Detailed shot and position data across a whole team at once.",
        limit:
          "Three components to install on a court nobody owns, at a price no pickup game will pay — and one failure takes the system down.",
      },
    ],
    gap:
      "Nothing in the field served the ordinary case: four friends, a public hoop, and no agreement on the score.",
    clipsHeading: "the gesture",
    clipsLines: [
      "The hand closes. That is the whole input.",
      "Nothing to press, nothing to unlock, nobody stepping off the court to key in a number. An interaction that interrupts the game does not get used — so this one had to disappear into it.",
    ],
    clips: [
      {
        src: "/projects/scoreband/gesture-designed.mp4",
        poster: "/projects/scoreband/gesture-designed-poster.png",
        alt: "An illustrated forearm wearing the band; the hand closes into a fist",
        caption: "as designed",
        ratio: 3 / 4,
        onPaper: true,
      },
      {
        src: "/projects/scoreband/gesture-court.mp4",
        poster: "/projects/scoreband/gesture-court-poster.png",
        alt: "First-person view on an outdoor court: a shot goes up, then the hand closes into a fist",
        caption: "prototype, public court",
        ratio: 3 / 4,
      },
    ],
    visualPages: [
      [
        {
          src: "/projects/scoreband/app-screens.png",
          alt: "The full screen inventory of the companion app, around fifty screens",
          caption: "companion app, every screen",
          orientation: "landscape",
          ratio: 4096 / 2306,
          tall: true,
        },
      ],
    ],
  },
  {
    name: "waterAlarm.",
    label: "concept",
    tagline: "smart alarm clock against dehydration",
    meta: [
      "Product and interaction lead",
      "Human–machine interaction, University of Trento",
      "November 2024",
    ],
    lines: [
      "The brief was an everyday object that answers a health problem.",
      "Studies put it at 40%: the share of people who wake already dehydrated.",
      "So the alarm lives in a wooden coaster, under a glass of water kept covered overnight by its own cap. Lifting the glass is the only thing that stops it.",
      "The second answer fell out of the first. Snoozing is a decision made half asleep — so the design removes the decision. The only way to silence the alarm is to drink, and drinking is itself an act that wakes you.",
    ],
    pdf: {
      href: "/projects/water-alarm/water-alarm-presentation.pdf",
      label: "full presentation, pdf",
    },
    visualPages: [
      // One page, matched proportions: the app and the finishes are two views of
      // the same object, so they are set as a pair rather than two lone plates.
      [
        {
          src: "/projects/water-alarm/water-alarm-app.webp",
          alt: "The companion app open in a hand, showing the device and its alarms",
          orientation: "landscape",
          ratio: 4 / 3,
        },
        {
          src: "/projects/water-alarm/water-alarm-finishes.webp",
          alt: "The coaster in white, walnut and black finishes",
          caption: "made with Blender",
          orientation: "landscape",
          ratio: 4 / 3,
        },
      ],
    ],
    flow: [
      { marker: "07:00", label: "The alarm rings from inside the coaster" },
      {
        marker: "white LED",
        label: "A light marks where the glass is, so a dark room needs no other lamp",
      },
      {
        marker: "proximity sensor",
        label: "Lift the glass — the only way to stop it",
      },
      {
        marker: "green LED, short tone",
        label: "The alarm stops and says so. Then you drink",
      },
    ],
    flowLoops: true,
    flowFrames: [
      {
        src: "/projects/water-alarm/water-alarm-armed.webp",
        alt: "A glass of water resting on the wooden coaster, indicator lit white",
        orientation: "landscape",
        ratio: 1473 / 1068,
      },
      {
        src: "/projects/water-alarm/water-alarm-lifted.webp",
        alt: "The glass lifted clear of the coaster, indicator lit green",
        orientation: "landscape",
        ratio: 1413 / 1113,
      },
    ],
  },
];
