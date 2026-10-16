"use client";

import { useSearchParams } from "next/navigation";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import type { CatalogueItem, Category } from "@/lib/types";
import { ComponentCard } from "./component-card";
import { ViewSwitch } from "./view-mode";

/** Category groups of component cards. The category menu filters via `?category=<id>`. */
export function Dashboard({
  items,
  categories,
}: {
  items: CatalogueItem[];
  categories: Category[];
}) {
  const params = useSearchParams();
  const filter = params.get("category") ?? "all";
  const groups = categories
    .filter((c) => c.id !== "base")
    .map((c) => ({
      category: c,
      items: items.filter((i) => i.category === c.id),
    }))
    .filter((g) => g.items.length > 0);
  const visible =
    filter === "all" ? groups : groups.filter((g) => g.category.id === filter);

  return (
    <div className="flex flex-col gap-14 pb-24 md:gap-16">
      {visible.map((g, i) => (
        <Reveal
          key={`${g.category.id}-${filter}`}
          as="section"
          id={g.category.id}
          aria-labelledby={`${g.category.id}-heading`}
          amount={0.05}
          className="flex scroll-mt-28 flex-col gap-5"
        >
          <div {...reveal} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2
                id={`${g.category.id}-heading`}
                className="text-[22px] font-normal leading-[1.1] tracking-[-0.02em] text-text-primary md:text-[24px]"
              >
                {g.category.name}
              </h2>
              <span
                aria-label={`${g.items.length} ${g.items.length === 1 ? "component" : "components"}`}
                className="inline-flex h-7 min-w-7 items-center justify-center rounded-pill border border-border-10 bg-surface-primary px-2 text-[13px] font-medium leading-none text-text-primary"
              >
                {g.items.length}
              </span>
            </div>
            {i === 0 ? <ViewSwitch /> : null}
          </div>
          <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
            {g.items.map((item) => (
              <li key={item.id} {...reveal} className="min-w-0">
                <ComponentCard item={item} />
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
      {visible.length === 0 ? (
        <p className="text-[14px] text-text-nav">
          No components in this category yet.
        </p>
      ) : null}
    </div>
  );
}
