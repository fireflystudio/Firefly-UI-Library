"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import type { CategoryId } from "@/lib/types";

export type SidebarCategory = { id: CategoryId; name: string; count: number };

type Props = {
  categories: SidebarCategory[];
  total: number;
  /** component id → category, so a component page highlights its category */
  itemCategories: Record<string, CategoryId>;
};

function useActiveCategory(itemCategories: Record<string, CategoryId>): CategoryId | "all" {
  const pathname = usePathname();
  const params = useSearchParams();
  const match = pathname.match(/^\/components\/([^/]+)/);
  if (match) return itemCategories[match[1]] ?? "all";
  const c = params.get("category");
  return c && c !== "all" ? (c as CategoryId) : "all";
}

/** Left menu with every category (desktop). Links filter the dashboard. */
export function Sidebar({ categories, total, itemCategories }: Props) {
  const active = useActiveCategory(itemCategories);
  return (
    <nav aria-label="Categories" className="flex flex-col gap-0.5">
      <SidebarLink href="/" active={active === "all"} count={total}>
        All components
      </SidebarLink>
      <div aria-hidden className="my-3 h-px bg-border-06" />
      {categories.map((c) => (
        <SidebarLink key={c.id} href={`/?category=${c.id}`} active={active === c.id} count={c.count}>
          {c.name}
        </SidebarLink>
      ))}
    </nav>
  );
}

function SidebarLink({ href, active, count, children }: { href: string; active: boolean; count: number; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`group flex items-center justify-between gap-3 rounded-tile px-3 py-[7px] text-[14px] font-medium leading-[normal] transition-[background-color,color] duration-200 ease-out ${
        active ? "bg-surface-muted text-text-primary" : "text-text-nav hover:bg-surface-muted/60 hover:text-text-primary"
      }`}
    >
      <span className="truncate transition-[translate] duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transition-none">{children}</span>
      <span className={`font-mono text-[11px] ${active ? "text-text-tertiary" : "text-text-quaternary"}`}>{count}</span>
    </Link>
  );
}

/** Same categories as a horizontal row for tablet and mobile (no room for a side menu). */
export function CategoryBar({ categories, total, itemCategories }: Props) {
  const active = useActiveCategory(itemCategories);
  const pill = (isActive: boolean) =>
    `inline-flex h-8 shrink-0 items-center gap-1.5 rounded-pill border px-3.5 text-[13px] font-medium leading-none transition-[background-color,color,border-color] duration-200 ease-out ${
      isActive ? "border-button-primary bg-button-primary text-button-content-primary" : "border-border-light bg-surface-primary text-text-nav hover:text-text-primary"
    }`;
  return (
    <nav aria-label="Categories" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:-mx-8 md:px-8 [&::-webkit-scrollbar]:hidden">
      <Link href="/" aria-current={active === "all" ? "page" : undefined} className={pill(active === "all")}>
        All <span className="font-mono text-[11px] opacity-70">{total}</span>
      </Link>
      {categories.map((c) => (
        <Link key={c.id} href={`/?category=${c.id}`} aria-current={active === c.id ? "page" : undefined} className={pill(active === c.id)}>
          {c.name} <span className="font-mono text-[11px] opacity-70">{c.count}</span>
        </Link>
      ))}
    </nav>
  );
}
