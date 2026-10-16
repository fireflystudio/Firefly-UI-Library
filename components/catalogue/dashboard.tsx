"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import type { CatalogueItem, Category, CategoryId } from "@/lib/types";
import { ComponentCard } from "./component-card";

type Filter = CategoryId | "all";

export function Dashboard({ items, categories }: { items: CatalogueItem[]; categories: Category[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const groups = categories
    .map((c) => ({ category: c, items: items.filter((i) => i.category === c.id) }))
    .filter((g) => g.items.length > 0);
  const visible = filter === "all" ? groups : groups.filter((g) => g.category.id === filter);

  return (
    <>
      {/* Filter chips: sticky under the top bar */}
      <div className="sticky top-16 z-40 -mx-5 bg-surface-page/85 px-5 py-3 backdrop-blur-xl md:-mx-8 md:px-8">
        <div
          role="tablist"
          aria-label="Filter by category"
          className="mx-auto flex max-w-[1392px] gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <Chip active={filter === "all"} onClick={() => setFilter("all")} count={items.length}>
            All
          </Chip>
          {groups.map((g) => (
            <Chip
              key={g.category.id}
              active={filter === g.category.id}
              onClick={() => setFilter(g.category.id)}
              count={g.items.length}
            >
              {g.category.name}
            </Chip>
          ))}
        </div>
      </div>

      <div className="mx-auto flex max-w-[1392px] flex-col gap-16 pb-24 pt-10 md:gap-20 md:pt-12">
        {visible.map((g) => (
          <Reveal
            key={`${g.category.id}-${filter}`}
            as="section"
            id={g.category.id}
            aria-labelledby={`${g.category.id}-heading`}
            amount={0.05}
            className="flex flex-col gap-6 scroll-mt-32"
          >
            <div {...reveal} className="flex flex-col gap-1.5">
              <div className="flex items-baseline gap-3">
                <h2 id={`${g.category.id}-heading`} className="text-[24px] font-normal leading-[1.1] tracking-[-0.02em] text-text-primary md:text-[28px]">
                  {g.category.name}
                </h2>
                <span className="font-mono text-[12px] text-text-quaternary">
                  {g.items.length} {g.items.length === 1 ? "component" : "components"}
                </span>
              </div>
              <p className="max-w-[640px] text-[14px] leading-[1.5] text-text-nav">{g.category.description}</p>
            </div>
            <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
              {g.items.map((item) => (
                <li key={item.id} {...reveal} className="min-w-0">
                  <ComponentCard item={item} />
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </>
  );
}

function Chip({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 rounded-pill border px-3.5 text-[13px] font-medium leading-none transition-[background-color,color,border-color,translate] duration-200 ease-out hover:-translate-y-px motion-reduce:transition-none ${
        active
          ? "border-button-primary bg-button-primary text-button-content-primary"
          : "border-border-light bg-surface-primary text-text-nav hover:text-text-primary"
      }`}
    >
      {children}
      <span className={`font-mono text-[11px] ${active ? "text-button-content-primary/70" : "text-text-quaternary"}`}>{count}</span>
    </button>
  );
}
