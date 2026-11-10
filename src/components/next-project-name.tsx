"use client";

import { useState, ViewTransition } from "react";
import { flushSync } from "react-dom";
import Link from "next/link";

// The name moves to the top of the next page only when this link is the one clicked.
// With a fixed name it would also pair with the home index when going Back.
export function NextProjectName({
  name,
  slug,
  href,
  description,
}: {
  name: string;
  slug: string;
  href: string;
  description: string;
}) {
  const [leaving, setLeaving] = useState(false);

  return (
    <Link href={href} className="grid" onClick={() => flushSync(() => setLeaving(true))}>
      <span>
        <ViewTransition name={leaving ? `title-${slug}` : undefined} share="title" default="none">
          <span className="link inline-block">{name}</span>
        </ViewTransition>
      </span>
      <span className="text-ink-soft">{description}</span>
    </Link>
  );
}
