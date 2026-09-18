import { BlurText } from "@/components/blur-text";
import { Panel } from "@/components/panel";

const DISCIPLINES = [
  { label: "UX/UI Design", placement: "lg:col-start-1 lg:col-span-4" },
  {
    label: "Interaction Design",
    placement: "lg:col-start-5 lg:col-span-4 lg:text-center",
  },
  {
    label: "Front-end Development",
    placement: "lg:col-start-9 lg:col-span-4 lg:text-right",
  },
];

export function HeroPanel() {
  return (
    <Panel>
      <div className="col-span-full row-start-2 grid grid-cols-subgrid content-center gap-y-8">
        {/* Left of the wordmark and on its axis. Declared before it so grid
            auto-placement keeps both on one row: the cursor only moves forward,
            so a col-1 item written after a col-8 one gets pushed to the next. */}
        <p className="label col-span-full uppercase lg:col-span-3 lg:col-start-1 lg:self-center">
          Filippo Baldi
        </p>

        <h1 className="headline col-span-full text-[clamp(3.5rem,11vw,14rem)] leading-[0.8] lg:col-span-4 lg:col-start-8">
          <span className="sr-only">Portfolio</span>
          <span aria-hidden>
            <BlurText>
              <span className="block">portf</span>
              <span className="block">olio</span>
            </BlurText>
          </span>
        </h1>
      </div>

      <div className="col-span-full row-start-3 grid grid-cols-subgrid gap-y-2">
        {DISCIPLINES.map((discipline) => (
          <span
            key={discipline.label}
            className={`label col-span-full ${discipline.placement}`}
          >
            {discipline.label}
          </span>
        ))}
      </div>
    </Panel>
  );
}
