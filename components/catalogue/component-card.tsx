"use client";

import Link from "next/link";
import type { CatalogueItem } from "@/lib/types";
import { CardPreview } from "./card-preview";
import { useSelection } from "./selection";
import { VersionPill } from "./version-pill";

export function ComponentCard({ item }: { item: CatalogueItem }) {
  const { isSelected, toggle, ready } = useSelection();
  const href = `/components/${item.id}`;
  const checked = ready && isSelected(item.id);

  return (
    <article
      className={`group relative flex h-full flex-col overflow-clip rounded-card border bg-surface-primary transition-[translate,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-card-drop motion-reduce:transition-none ${
        checked ? "border-text-primary/40" : "border-border-06"
      }`}
    >
      <Link href={href} aria-label={`Open ${item.name} v${item.version}`} className="block border-b border-border-06">
        <CardPreview src={`/preview/${item.id}`} short={item.previewSize === "short"} label={item.name} />
      </Link>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[16px] font-medium leading-[normal] text-text-primary">
            <Link href={href} className="rounded-chip">
              {item.name}
            </Link>
          </h3>
          <VersionPill version={item.version} />
        </div>
        <p className="line-clamp-2 text-[14px] leading-[1.5] text-text-nav">{item.description}</p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <label className="flex cursor-pointer items-center gap-2 text-[13px] font-medium text-text-nav">
            <input
              type="checkbox"
              className="catalogue-checkbox"
              checked={checked}
              onChange={() => toggle(item.id)}
              aria-label={`Add ${item.name} v${item.version} to the build`}
            />
            {checked ? "In build" : "Add to build"}
          </label>
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-text-primary transition-opacity duration-200 ease-out hover:opacity-60"
          >
            Open
            <span aria-hidden className="inline-block transition-[translate] duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transition-none">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
