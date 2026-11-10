@AGENTS.md

# Portfolio

Filippo Baldi's main professional portfolio: serious, clear and minimal, with small hidden details. The focus is on telling the projects: a visually strong project list on the home page and a dedicated storytelling page for each project. The playful counterpart is baldifilippo.com, which is a separate repository.

## Status

The site is intentionally blank while Filippo works out the structure and design. Do not add content, fonts, components or dependencies until he asks.

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
