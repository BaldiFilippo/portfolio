export type Entry = {
  role: string;
  place: string;
  period: string;
  detail?: string;
};

export type Contact = {
  label: string;
  /** Present when the line is somewhere to go, absent when it is just a fact. */
  href?: string;
};

export const CONTACTS: Contact[] = [
  { label: "baldi.filippo@icloud.com", href: "mailto:baldi.filippo@icloud.com" },
  { label: "+39 320 794 1193", href: "tel:+393207941193" },
  { label: "@filippobaldi" },
  { label: "Brescia, Italy" },
  {
    label: "linkedin.com/in/filippobaldi",
    href: "https://linkedin.com/in/filippobaldi",
  },
  { label: "github.com/BaldiFilippo", href: "https://github.com/BaldiFilippo" },
  { label: "projects/visuals" },
];

export const EDUCATION: Entry[] = [
  {
    role: "BSc Interfaces and Communication Technologies",
    place: "University of Trento, Rovereto, Italy",
    period: "2024 - 2027",
    detail: "GPA 28.8/30 — minor in Artificial Intelligence",
  },
  {
    role: "Exchange Programme, Computer Science",
    place: "University of Milan, Milan, Italy",
    period: "March - August 2026",
    detail: "Computer Graphics 30/30 — Law of Digital Products and AI 30/30 cum laude",
  },
  {
    role: "Technical Diploma, Computer Science",
    place: "Istituto Tecnico Benedetto Castelli, Brescia",
    period: "2018 - 2023",
  },
];

export const EXPERIENCE: Entry[] = [
  {
    role: "UX/UI Designer",
    place: "SAT — Società Alpinisti Tridentini, Trento",
    period: "February - December 2025",
  },
  {
    role: "Web Designer and Developer",
    place: "LOUREN, Brescia",
    period: "January 2026 - Ongoing",
  },
  {
    role: "Software Developer",
    place: "OCS S.p.A., Brescia",
    period: "September 2023 - September 2024",
  },
  {
    role: "Selected Solver, UX Challenge",
    place: "Fondazione Hub Innovazione Trentino",
    period: "February 2025",
  },
  {
    role: "Participant, UX Design Master",
    place: "Talent Garden, Milan",
    period: "November 2023",
  },
];

export const PROJECTS: Entry[] = [
  {
    role: "inRange",
    place: "Sole designer — insulin pump companion app",
    period: "2026",
  },
  {
    role: "scoreband",
    place: "UX/UI and interaction lead — smart basketball wristband",
    period: "January 2025",
  },
  {
    role: "waterAlarm",
    place: "Product and interaction lead — smart alarm clock against dehydration",
    period: "November 2024",
  },
  {
    role: "bblog",
    place: "Personal design blog, Next.js and TypeScript",
    period: "Ongoing",
  },
];

export const PROFESSIONAL_SKILLS = [
  "User Research",
  "Usability Testing",
  "Design Thinking",
  "Design Sprints",
  "Personas and User Flows",
  "Wireframing",
  "Interaction Design",
  "Figma - Advanced",
  "Blender - Intermediate",
  "Adobe Lightroom - Advanced",
  "React and Next.js - Advanced",
  "TypeScript - Advanced",
  "Git - Intermediate",
];

export const PERSONAL_SKILLS = [
  "Curiosity",
  "Creative Problem Solving",
  "Adaptability",
  "Visual Thinking",
  "Self-management",
  "Collaboration",
  "Iterative Mindset",
];

export const LANGUAGES = ["Italian (Native)", "English (C1)"];

export const INTERESTS = [
  "Photography",
  "Artificial Intelligence",
  "Fashion",
  "Travelling",
];

export const BIO =
  "I design end to end — user interviews, usability testing, high-fidelity prototypes — around health and well-being, smart objects and human–AI interaction. A year spent as a software developer means I also build the interfaces I draw, which keeps the handoff honest. Every project shifts how I think and what I reach for next.";

export type Portrait = {
  src: string;
  alt: string;
};

// Original framing, uncropped. The 4:3 cells are close to these photos' own
// proportions, so covering them costs only a few percent at the edges.
export const PORTRAITS: Portrait[] = [
  { src: "/cv/baby.jpg", alt: "Filippo as a toddler, waving at the camera" },
  { src: "/cv/child.jpg", alt: "Filippo as a child, pulling a face" },
  { src: "/cv/park.jpg", alt: "Filippo in a park in Milan" },
  { src: "/cv/sea.jpg", alt: "Filippo in the sea" },
];

export type Shot = {
  /** Absent on a slot still waiting for its photograph. */
  src?: string;
  alt: string;
  location: string;
  orientation: "landscape" | "portrait";
};

// Ordered to alternate the two formats rather than to follow the trip.
export const SHOTS: Shot[] = [
  {
    src: "/shots/parga.jpg",
    alt: "Rocks and pine trees above still water at dusk",
    location: "Parga, Greece",
    orientation: "landscape",
  },
  {
    src: "/shots/milan-doorway.jpg",
    alt: "A doorway framing an avenue of clipped trees",
    location: "Milan, Italy",
    orientation: "portrait",
  },
  {
    src: "/shots/tokyo.jpg",
    alt: "Two figures crossing a lit street, caught in a long exposure",
    location: "Tokyo, Japan",
    orientation: "landscape",
  },
  {
    src: "/shots/sahara.jpg",
    alt: "A camel standing in open desert under scattered cloud",
    location: "Sahara Desert, Morocco",
    orientation: "portrait",
  },
  {
    src: "/shots/milan-metro.jpg",
    alt: "A man on a platform watching a train pull through",
    location: "Milan, Italy",
    orientation: "landscape",
  },
  {
    src: "/shots/tokyo-koi.jpg",
    alt: "Koi crowding the surface of a dark pond",
    location: "Tokyo, Japan",
    orientation: "portrait",
  },
  {
    src: "/shots/statue.jpg",
    alt: "A weathered bronze figure standing among rose bushes",
    location: "Milan, Italy",
    orientation: "landscape",
  },
  {
    src: "/shots/beijing.jpg",
    alt: "A shopkeeper resting at the counter of a narrow shop",
    location: "Beijing, China",
    orientation: "portrait",
  },
];
