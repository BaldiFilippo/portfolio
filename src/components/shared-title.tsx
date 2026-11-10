"use client";

import { useEffect, useSyncExternalStore, ViewTransition, type ReactNode } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";

// Which project's name may travel between the home index and its page. Only one entry on the
// home carries a shared name at a time: pages visited earlier stay mounted, hidden, and a name
// on every entry would pair with them and animate a title that is not the one being opened.
let active: string | null = null;
// The project left with the Back at the bottom of its page. The title at the top is scrolled
// away by then, so the project's name in the last section carries the shared name home instead.
let fromBottom: string | null = null;
const listeners = new Set<() => void>();

function update(next: { active?: string; fromBottom?: string | null }) {
  if (next.active !== undefined) active = next.active;
  if (next.fromBottom !== undefined) fromBottom = next.fromBottom;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const useActive = () => useSyncExternalStore(subscribe, () => active, () => null);
const useFromBottom = () => useSyncExternalStore(subscribe, () => fromBottom, () => null);

// An entry of the home index that opens a project page.
export function IndexProjectLink({
  slug,
  href,
  name,
  children,
}: {
  slug: string;
  href: string;
  name: string;
  children: ReactNode;
}) {
  const current = useActive();
  return (
    <Link
      href={href}
      className="grid"
      onClick={() => flushSync(() => update({ active: slug, fromBottom: null }))}
    >
      <span>
        <ViewTransition name={current === slug ? `title-${slug}` : undefined} share="title" default="none">
          <span className="link inline-block">{name}</span>
        </ViewTransition>
      </span>
      {children}
    </Link>
  );
}

// The title of a project page. The page shown is the one whose name goes back to the home.
// Handing the name over remounts the element (the key), because React forgets a name only when
// its element goes away, and would otherwise see the same name twice.
export function ProjectTitle({ slug, name }: { slug: string; name: string }) {
  const handedOver = useFromBottom() === slug;
  useEffect(() => update({ active: slug, fromBottom: null }), [slug]);
  return (
    <ViewTransition
      key={handedOver ? "plain" : "shared"}
      name={handedOver ? undefined : `title-${slug}`}
      share="title"
      default="none"
    >
      <h1 className="font-medium">{name}</h1>
    </ViewTransition>
  );
}

// The project's name inside its last section. It takes the shared name when the Back at the
// bottom is clicked, and moves to its entry on the home.
export function ProjectName({ slug, name }: { slug: string; name: string }) {
  const carried = useFromBottom() === slug;
  return (
    <ViewTransition
      key={carried ? "shared" : "plain"}
      name={carried ? `title-${slug}` : undefined}
      share="title"
      default="none"
    >
      <span className="inline-block">{name}</span>
    </ViewTransition>
  );
}

// The Back at the bottom of a project page.
export function BottomBack({ slug }: { slug: string }) {
  return (
    <Link href="/" className="link" onClick={() => flushSync(() => update({ fromBottom: slug }))}>
      Back
    </Link>
  );
}
