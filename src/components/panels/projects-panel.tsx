import { Panel } from "@/components/panel";

const DISCIPLINES = [
  "Research and Interviews",
  "Interaction Design",
  "Prototyping",
];

export function ProjectsPanel() {
  return (
    <Panel>
      <ul className="label col-span-full row-start-1 flex flex-col lg:col-span-3">
        {DISCIPLINES.map((discipline) => (
          <li key={discipline}>{discipline}</li>
        ))}
      </ul>

      <div className="col-span-full row-start-2 flex items-end justify-end">
        <div className="mb-far max-w-reading">
          <h2 className="headline text-project">
            <span className="block">selected</span>
            <span className="block">projects</span>
          </h2>
          <p className="label mt-rhythm">
            Four projects across health and well-being, smart objects and
            human–AI interaction — from user interviews through to high-fidelity
            prototypes.
          </p>
        </div>
      </div>
    </Panel>
  );
}
