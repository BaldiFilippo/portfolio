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
        <h1 className="col-span-full font-display text-[clamp(3.5rem,11vw,14rem)] leading-[0.8] font-bold tracking-[-0.03em] lg:col-span-4 lg:col-start-8">
          <span className="sr-only">Portfolio</span>
          <span aria-hidden>
            <BlurText>
              <span className="block">portf</span>
              <span className="block">olio</span>
            </BlurText>
          </span>
        </h1>

        <p className="label col-span-full uppercase lg:col-span-1 lg:col-start-12 lg:self-center lg:text-right">
          Filippo Baldi
        </p>
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
