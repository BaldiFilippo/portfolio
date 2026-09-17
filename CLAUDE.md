# portfolio

Filippo Baldi's personal portfolio: CV, projects, and a dedicated photography page. Next.js 16 App Router, React 19, TypeScript, Tailwind v4 (CSS-first — no `tailwind.config.*`, tokens live in `src/app/globals.css`). Deployed on Vercel. Sibling project: `bblog` (the blog), which stays a separate site.

## Commands

- `pnpm typecheck` — `tsc --noEmit`
- `pnpm lint` — ESLint 9 flat config
- Dev server: `pnpm dev` (assume it's already running; don't start it)

## Versions

- TypeScript is pinned to **6.0.3**, not 7.x: `typescript-eslint` declares peer `typescript <6.1.0` and `eslint-config-next` depends on it. Revisit when typescript-eslint supports 7.
- Use the **`motion`** package (import from `motion/react`), not the legacy `framer-motion` name, when animation is added.

## Structure

- `src/app/` — routes (App Router)
- `src/components/` — shared components, kebab-case filenames
- `src/lib/` — data loading and helpers, server-side
- Path alias: `@/*` → `./src/*`

## Conventions

- Interactive components are `"use client"`; data loading stays server-side
- Never `any` in TypeScript unless genuinely unavoidable
- pnpm only — never npm or yarn
- Responsive mobile-first (~360px up), keyboard navigable, `prefers-reduced-motion` respected, images via `next/image` with proper `sizes`, every page gets metadata

## Workflow

- Work happens on dedicated branches; Filippo reviews the diff and merges `main` himself. Production deploys need his explicit visual approval.
- Visual checks use Playwright's headless Chromium — never his browser (Dia) and never Chrome.
