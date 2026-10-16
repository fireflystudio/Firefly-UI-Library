"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { CatalogueItem } from "@/lib/types";
import { BASE_ITEM_ID, installCommand } from "@/lib/registry-url";
import { ComponentPreview } from "./component-preview";
import { InstallCommand } from "./install-command";
import { useSelection } from "./selection";

/**
 * The assembled page: ordered sections (move / remove), the live preview and one install command.
 * Sections come from the builder chat (with content) or from "Add to build" on the cards (wireframe).
 */
export function BuildList({ items }: { items: CatalogueItem[] }) {
  const { plan, sections, ready, move, remove } = useSelection();
  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);

  if (!ready) return <div className="h-40" aria-busy />;

  if (sections.length === 0) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-card border border-dashed border-border-16 bg-surface-primary p-8 md:p-12">
        <p className="text-[18px] font-medium text-text-primary">No sections yet.</p>
        <p className="max-w-[520px] text-[14px] leading-[1.55] text-text-nav">
          Describe the site in the chat and the planner will propose a page, or tick &ldquo;Add to build&rdquo; on component cards to assemble one by hand.
        </p>
        <Link href="/" className="inline-flex h-[34px] items-center rounded-pill border border-border-light bg-surface-primary px-3.5 text-[13px] font-medium text-text-primary transition-opacity duration-200 ease-out hover:opacity-70">
          Browse components
        </Link>
      </div>
    );
  }

  const componentIds = Array.from(new Set(sections.map((s) => s.component).filter((c) => byId.has(c))));
  const installIds = [BASE_ITEM_ID, ...componentIds];

  return (
    <div className="flex flex-col gap-8">
      {plan?.summary ? (
        <div className="flex flex-col gap-1">
          <h2 className="text-[20px] font-medium leading-[1.2] text-text-primary">{plan.title}</h2>
          <p className="text-[14px] leading-[1.5] text-text-nav">{plan.summary}</p>
        </div>
      ) : null}

      <ComponentPreview src="/preview/plan" title="Assembled page" />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_380px] xl:gap-10">
        <section aria-labelledby="order-heading" className="flex flex-col gap-3">
          <h2 id="order-heading" className="text-[16px] font-medium text-text-primary">
            Page order <span className="font-mono text-[12px] font-normal text-text-quaternary">{sections.length}</span>
          </h2>
          <ol className="flex flex-col divide-y divide-border-06 rounded-card border border-border-06 bg-surface-primary">
            {sections.map((section, i) => {
              const item = byId.get(section.component);
              const headline = section.props?.headline ? [section.props.headline, section.props.headlineMuted].filter(Boolean).join(" ") : null;
              return (
                <li key={section.id} className="group flex items-center gap-3 px-4 py-3">
                  <span className="w-5 shrink-0 font-mono text-[12px] text-text-quaternary">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <Link href={`/components/${section.component}`} className="truncate text-[14px] font-medium text-text-primary transition-[translate] duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transition-none">
                      {item?.name ?? section.component}
                    </Link>
                    {headline ? <span className="truncate text-[12.5px] text-text-nav">{headline}</span> : section.reason ? <span className="truncate text-[12.5px] text-text-quaternary">{section.reason}</span> : null}
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <IconButton label={`Move ${item?.name ?? section.component} up`} disabled={i === 0} onClick={() => move(section.id!, -1)}>
                      ↑
                    </IconButton>
                    <IconButton label={`Move ${item?.name ?? section.component} down`} disabled={i === sections.length - 1} onClick={() => move(section.id!, 1)}>
                      ↓
                    </IconButton>
                    <IconButton label={`Remove ${item?.name ?? section.component}`} onClick={() => remove(section.id!)}>
                      ×
                    </IconButton>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <aside className="flex flex-col gap-3 rounded-card border border-border-06 bg-surface-primary p-4">
          <InstallCommand label="Install the components (base included)" command={installCommand(installIds)} />
          <p className="text-[13px] leading-[1.55] text-text-nav">
            Run it inside the site&rsquo;s folder, then compose the sections in <code className="rounded-chip bg-catalogue-code px-1 font-mono text-[12px]">app/page.tsx</code> in this order with the copy from the plan.
          </p>
        </aside>
      </div>
    </div>
  );
}

function IconButton({ label, onClick, disabled, children }: { label: string; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex size-7 cursor-pointer items-center justify-center rounded-pill border border-border-06 bg-surface-primary font-mono text-[13px] text-text-nav transition-[opacity,background-color] duration-200 ease-out hover:bg-surface-muted hover:text-text-primary disabled:cursor-default disabled:opacity-30 disabled:hover:bg-surface-primary"
    >
      {children}
    </button>
  );
}
