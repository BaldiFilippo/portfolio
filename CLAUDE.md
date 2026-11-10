@AGENTS.md

# Portfolio

Filippo Baldi's main professional portfolio: serious, clear and minimal, with small hidden details. The focus is on telling the projects: a visually strong project list on the home page and a dedicated storytelling page for each project. The playful counterpart is baldifilippo.com, which is a separate repository.

## Status

Filippo is building the site page by page, starting from the home. Add a page or dependency only when he asks. Never invent facts about his work: if something is missing, leave it out and tell him.

The design system is the Filippo Baldi Design System at https://claude.ai/artifact/Xvo7k2182KcMccypzw5yRK, and its tokens live in `src/app/globals.css`. Every measure is a multiple of the 4px unit, the Tailwind default, and one line of body text is 28px.

## Writing

Every piece of copy follows these rules: pages, labels, alt text and metadata.

- American English: color, neighborhood, meters, modeled, catalog, soccer.
- First person: "I" on solo work, "we" on team work. The one exception is the home intro, written as short fragments led by a verb, like paco.me. Short declarative sentences, present tense for what a thing does, past tense for how it was made. No contractions, no exclamation marks, no em dashes.
- People first: "people with type 1 diabetes", never "diabetics".
- Sentence case for every title, label, link and button. Names keep their own casing: inRange, iPhone, FigJam, Post-it.
- No serial comma: "health, smart objects and human–AI interaction".
- Numbers always in digits, titles included: "3 marks", "13 pain points", "more than 9,000". Words stay only for ordinals (first, second), fractions (half a second) and "one" meaning "a single" or in set phrases (one by one, one on one).
- Measures: digit, space, unit in full ("6 meters", "1.1 seconds"), hyphenated before a noun ("a 1.4-second push"). Degrees without a space: "22.06°".
- En dash without spaces for ranges and paired terms: 2023–2024, human–computer. Year ranges in full.
- Dates: month in full in prose (January 2025), abbreviated in lists (Nov 2026).
- Typographic apostrophes and quotes: ’ “ ”. Compound modifiers before a noun are hyphenated: lock-screen widget, real-time model.
- A full stop ends sentences, project descriptions and alt text. Labels, credits, statuses, dates and link text have none.
- A project’s description is one sentence, identical in the home index, the page metadata and the Next link, and never longer than 2 lines in the home column at any width (about 47 characters). Measure it, do not guess.
- Credits: roles from one vocabulary (design, UX/UI design, interaction design, product design, 3D, development), then the year: "UX/UI and interaction design, 2025".
- Project page arc: The brief (course projects only), The need, What existed (when it matters), The idea, then free sections, and always Where it stands last, saying how the project ended or where it is now.

## Stack

Now: Next.js App Router, React, TypeScript, Tailwind CSS, pnpm, Vercel.

Agreed for when the design starts, to be added only when needed: MDX in the repository for the project stories, React `ViewTransition` from the home list to the project page, Motion for microinteractions, GSAP ScrollTrigger only for sequences that require it.

## Commands

- `pnpm dev` runs on port 3002, because 3000 and 3001 belong to his other sites. Assume it is already running.
- Check with `pnpm lint` and `pnpm typecheck`.

## Git workflow

- `main` is what ships and `develop` is where finished work comes together. Never commit or push straight to either, and never force-push them. A GitHub ruleset enforces this.
- Each change gets its own branch from an up-to-date `develop`, named `feature/…`, `fix/…`, `chore/…` or `docs/…`, on one topic. A commit message says what the site does now, as a sentence.
- A long-lived branch picks up `develop` with a merge, never a rebase of pushed commits.
- Into `develop`: PR, green CI, merge commit, and the branch is deleted automatically. Claude may merge once CI is green. Red CI is fixed on the branch.
- Into `main`: PR from `develop`. Only Filippo merges into `main`, and then tags the release. Run `/security-review` first when a change touches auth, payments or user data.
- Urgent fix to what is live: `fix/…` from `main`, PR to `main`, which Filippo merges, then PR `main` into `develop`.
- Production deploys need Filippo's explicit visual approval.
