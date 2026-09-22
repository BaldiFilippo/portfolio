import { BlurText } from "@/components/blur-text";
import { ContactList } from "@/components/contact-list";
import { Panel } from "@/components/panel";

/**
 * Bookend to the hero: same blurred wordmark treatment, mirrored to the far side
 * of the sheet. "ciao." rather than a sign-off, because this is where someone
 * decides whether to get in touch.
 */
export function ClosingPanel() {
  return (
    <Panel>
      <div className="col-span-full row-start-2 flex items-end justify-end">
        <div className="mb-far">
          <h2 className="headline text-closing">
            <span className="sr-only">Ciao</span>
            <span aria-hidden>
              {/* Gentler than the hero's ramp: the full-strength tail lands on
                  the final stop, and a mark that small dissolves entirely. */}
              <BlurText focus={0.32} from={0.045} to={0.075}>
                ciao.
              </BlurText>
            </span>
          </h2>

          <ContactList className="mt-rhythm" />
        </div>
      </div>
    </Panel>
  );
}
