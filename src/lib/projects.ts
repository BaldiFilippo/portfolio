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
    name: "wristband.",
    label: "concept",
    tagline: "smart basketball wristband, gesture logging",
    meta: ["UX/UI and interaction lead", "Interaction Design", "January 2025"],
    lines: [
      "A wristband that logs a basketball shot from the gesture itself — no phone, no tapping, no break in play.",
    ],
    visualPages: [[{ orientation: "landscape" }, { orientation: "landscape" }]],
  },
  {
    name: "coaster.",
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
      href: "/projects/coaster/coaster-presentation.pdf",
      label: "full presentation, pdf",
    },
    visualPages: [
      // One page, matched proportions: the app and the finishes are two views of
      // the same object, so they are set as a pair rather than two lone plates.
      [
        {
          src: "/projects/coaster/coaster-app.webp",
          alt: "The companion app open in a hand, showing the device and its alarms",
          orientation: "landscape",
          ratio: 4 / 3,
        },
        {
          src: "/projects/coaster/coaster-finishes.webp",
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
        src: "/projects/coaster/coaster-armed.webp",
        alt: "A glass of water resting on the wooden coaster, indicator lit white",
        orientation: "landscape",
        ratio: 1473 / 1068,
      },
      {
        src: "/projects/coaster/coaster-lifted.webp",
        alt: "The glass lifted clear of the coaster, indicator lit green",
        orientation: "landscape",
        ratio: 1413 / 1113,
      },
    ],
  },
];
