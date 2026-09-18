import { Panel } from "@/components/panel";

const BLOG_URL = "https://www.bblog.blog";

// Drawn from the blog's opening piece, "2026 Is the Worst Time in History to
// Start a Blog, So I Did". Set as discrete lines rather than one wrapping
// paragraph, which is what gives the centred ragged block its shape.
const LINES = [
  "pensiero : noun ; a thought held long enough to be examined, written down not to be published but to be understood.",
  "bblog is a place for working through ideas rather than presenting finished conclusions.",
  "It opened in 2026, once search and social had quietly stopped sending anyone anywhere — by every measure the worst moment to start.",
  "That was the point. Writing here is a thinking tool, not a bid for readers.",
  "In an age where a machine hands you a polished answer instantly, sitting with a question is a quiet, small, human thing.",
];

export function BlogPanel() {
  return (
    <Panel>
      <div className="col-span-full row-start-2 flex flex-col justify-center">
        <div className="text-center">
          <h2 className="headline text-[clamp(3rem,6.5vw,9rem)] leading-none">
            pensieri.
          </h2>
          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="label mt-2 inline-block underline-offset-4 hover:underline focus-visible:underline"
          >
            www.bblog.blog
          </a>
        </div>

        {/* Wide enough that each line sits on one line, which is what gives the
            block its centred ragged shape. */}
        <div className="label mx-auto mt-[8vh] flex w-full max-w-[1360px] flex-col items-center text-center">
          {LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <div className="label col-span-full row-start-3 flex items-end justify-between gap-8">
        <span className="headline text-[clamp(1rem,1.4vw,1.5rem)]">
          personal blog
        </span>
        <span className="uppercase">bblog, writing as a thinking tool</span>
      </div>
    </Panel>
  );
}
