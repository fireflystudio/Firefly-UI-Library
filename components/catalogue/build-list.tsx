"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { CatalogueItem } from "@/lib/types";
import { categoryById } from "@/lib/categories";
import { BASE_ITEM_ID, installCommand } from "@/lib/registry-url";
import { ComponentPreview } from "./component-preview";
import { InstallCommand } from "./install-command";
import { useSelection } from "./selection";
import { VersionPill } from "./version-pill";

/**
 * Build page body: the ordered selection (move up/down, remove), the combined install
 * command and a stacked preview of the chosen sections in page order.
 */
export function BuildList({ items }: { items: CatalogueItem[] }) {
  const { selected, ready, move, remove, clear } = useSelection();
  const byId = useMemo(() => new Map(items.map((i) => [i.id, i])), [items]);
  const chosen = selected.map((id) => byId.get(id)).filter((x): x is CatalogueItem => Boolean(x));

  if (!ready) {
    return <div className="h-40" aria-busy />;
  }

  if (chosen.length === 0) {
    return (
      <div className="mx-auto flex max-w-[1392px] flex-col items-start gap-4 rounded-card border border-dashed border-border-16 p-8 md:p-12">
        <p className="text-[18px] font-medium text-text-primary">Nothing selected yet.</p>
        <p className="max-w-[480px] text-[14px] leading-[1.55] text-text-nav">
          Tick &ldquo;Add to build&rdquo; on any component card. The sections will stack here in the order you pick them, with one
          command that installs them all.
        </p>
        <Link href="/" className="inline-flex h-[43px] items-center rounded-pill bg-button-primary px-5 text-[14px] font-medium text-button-content-primary transition-opacity duration-200 ease-out hover:opacity-85">
          Browse components
        </Link>
      </div>
    );
  }

  const sectionIds = chosen.filter((c) => c.id !== BASE_ITEM_ID).map((c) => c.id);
  const previewSrc = `/preview/build?items=${sectionIds.join(",")}`;
  const installIds = [BASE_ITEM_ID, ...sectionIds];

  return (
    <div className="mx-auto flex max-w-[1392px] flex-col gap-10 xl:grid xl:grid-cols-[380px_minmax(0,1fr)] xl:items-start xl:gap-12">
      <aside className="flex flex-col gap-6 xl:sticky xl:top-24">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-medium text-text-primary">
            Page order <span className="font-mono text-[12px] font-normal text-text-quaternary">{chosen.length}</span>
          </h2>
          <button type="button" onClick={clear} className="cursor-pointer text-[13px] font-medium text-text-nav transition-opacity duration-200 ease-out hover:opacity-60">
            Clear all
          </button>
        </div>
        <ol className="flex flex-col divide-y divide-border-06 rounded-card border border-border-06 bg-surface-primary">
          {chosen.map((item, i) => (
            <li key={item.id} className="group flex items-center gap-3 px-4 py-3">
              <span className="w-5 shrink-0 font-mono text-[12px] text-text-quaternary">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <Link href={`/components/${item.id}`} className="truncate text-[14px] font-medium text-text-primary transition-[translate] duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transition-none">
                    {item.name}
                  </Link>
                  <VersionPill version={item.version} />
                </div>
                <span className="text-[12px] text-text-quaternary">{categoryById(item.category).name}</span>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <IconButton label={`Move ${item.name} up`} disabled={i === 0} onClick={() => move(item.id, -1)}>
                  ↑
                </IconButton>
                <IconButton label={`Move ${item.name} down`} disabled={i === chosen.length - 1} onClick={() => move(item.id, 1)}>
                  ↓
                </IconButton>
                <IconButton label={`Remove ${item.name}`} onClick={() => remove(item.id)}>
                  ×
                </IconButton>
              </div>
            </li>
          ))}
        </ol>
        <InstallCommand label="Install everything (base included)" command={installCommand(installIds)} />
        <p className="text-[13px] leading-[1.55] text-text-nav">
          Run it inside the site&rsquo;s folder. Each section lands in <code className="rounded-chip bg-catalogue-code px-1 font-mono text-[12px]">components/sections/</code>; then
          compose them in <code className="rounded-chip bg-catalogue-code px-1 font-mono text-[12px]">app/page.tsx</code> in this order.
        </p>
      </aside>

      <div className="min-w-0">
        {sectionIds.length > 0 ? (
          <ComponentPreview src={previewSrc} title="Assembled page" />
        ) : (
          <p className="text-[14px] text-text-nav">Add at least one section to preview the page.</p>
        )}
      </div>
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
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
