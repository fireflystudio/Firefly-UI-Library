import type { Metadata } from "next";
import { Intro, Specimen } from "@/components/catalogue/design-system/specimen";
import { PageHeader } from "@/components/catalogue/page-header";
import { colourGroups, shortName } from "@/lib/design-system/tokens";

export const metadata: Metadata = { title: "Colours · Design system" };

export default function ColoursPage() {
  const groups = colourGroups();
  return (
    <div className="flex flex-col gap-6 pb-24">
      <PageHeader title="Colours" />
      <Intro>
        Every colour below is read from the token file the Base installs into each site. Components never use a hex value: they use the token name,
        so changing a value here (or in a client&rsquo;s copy) recolours every section at once.
      </Intro>
      {groups.map((group) => (
        <Specimen key={group.title} title={group.title} note={group.note}>
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
            {group.tokens.map((t) => (
              <li key={t.name} className="flex flex-col gap-2">
                <div
                  aria-hidden
                  className="h-14 rounded-tile border border-border-06"
                  style={{ background: `var(${t.name})` }}
                />
                <div className="flex flex-col gap-0.5">
                  <p className="truncate text-[13px] font-medium leading-[normal] text-text-primary">{shortName(t.name)}</p>
                  <p className="font-mono text-[12px] leading-[normal] text-text-quaternary">{t.value}</p>
                  {t.note ? <p className="text-[12px] leading-[1.45] text-text-nav">{t.note}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </Specimen>
      ))}
    </div>
  );
}
