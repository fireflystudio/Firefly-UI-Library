"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { DESIGN_SYSTEM_HOME, DESIGN_SYSTEM_PAGES } from "@/lib/design-system/pages";
import type { MenuProps } from "@/lib/menu";
import type { CategoryId } from "@/lib/types";
import { FireflySymbol } from "./firefly-symbol";
import { useSelection } from "./selection";

function useActiveCategory(itemCategories: Record<string, CategoryId>): CategoryId | "all" | null {
  const pathname = usePathname();
  const params = useSearchParams();
  const match = pathname.match(/^\/components\/([^/]+)/);
  if (match) return itemCategories[match[1]] ?? "all";
  if (pathname !== "/") return null;
  const c = params.get("category");
  return c && c !== "all" ? (c as CategoryId) : "all";
}

const itemBase =
  "group flex items-center justify-between gap-3 rounded-tile px-3 py-[7px] text-[14px] font-medium leading-[normal] transition-[background-color,color,box-shadow] duration-200 ease-out";
const itemOn = "bg-surface-primary text-text-primary shadow-[0_1px_2px_0_#0000000f,0_0_0_1px_#0000000a]";
const itemOff = "text-text-nav hover:bg-surface-primary/70 hover:text-text-primary";

/**
 * Full-height product sidebar. The component categories are the main content, so they sit
 * right under the brand. The other areas (Websites, Build site, Design system) live at the
 * bottom under a hairline. Inside /design-system the categories give way to the design-system
 * pages with a back link above them.
 */
export function Sidebar({ categories, total, itemCategories }: MenuProps) {
  const pathname = usePathname();
  const active = useActiveCategory(itemCategories);
  const { selected, ready } = useSelection();
  const count = ready ? selected.length : 0;
  const onWebsites = pathname.startsWith("/websites");
  const onBuild = pathname.startsWith("/build");
  const onDesignSystem = pathname.startsWith("/design-system");

  return (
    <div className="flex h-full flex-col gap-6">
      <Link href="/" className="flex items-center gap-2 rounded-chip px-3 pt-1">
        <FireflySymbol className="h-[15px] text-text-primary" />
        <span className="text-[16px] font-medium leading-none tracking-[-0.01em] text-text-primary">Firefly</span>
        <span className="text-[16px] font-normal leading-none text-text-muted">UI Library</span>
      </Link>

      {onDesignSystem ? (
        <nav aria-label="Design system pages" className="flex flex-col gap-0.5">
          <Link href="/" className={`${itemBase} ${itemOff} mb-3`}>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M9.5 3.5 5 8l4.5 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              All components
            </span>
          </Link>
          {DESIGN_SYSTEM_PAGES.map((page) => {
            const isActive = pathname === page.href;
            return (
              <Link key={page.id} href={page.href} aria-current={isActive ? "page" : undefined} className={`${itemBase} ${isActive ? itemOn : itemOff}`}>
                <span className="truncate transition-[translate] duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transition-none">{page.name}</span>
              </Link>
            );
          })}
        </nav>
      ) : (
        <nav aria-label="Categories" className="flex flex-col gap-0.5">
          <CategoryLink href="/" active={active === "all"} count={total}>
            All components
          </CategoryLink>
          {categories.map((c) => (
            <CategoryLink key={c.id} href={`/?category=${c.id}`} active={active === c.id} count={c.count}>
              {c.name}
            </CategoryLink>
          ))}
        </nav>
      )}

      <nav aria-label="Other areas" className="mt-auto flex flex-col gap-0.5 pt-6">
        <div aria-hidden className="mb-3 h-px bg-border-10" />
        <Link href="/websites" aria-current={onWebsites ? "page" : undefined} className={`${itemBase} ${onWebsites ? itemOn : itemOff}`}>
          <span className="flex items-center gap-2.5">
            <Icon name="websites" />
            Websites
          </span>
        </Link>
        <Link href="/build" aria-current={onBuild ? "page" : undefined} className={`${itemBase} ${onBuild ? itemOn : itemOff}`}>
          <span className="flex items-center gap-2.5">
            <Icon name="build" />
            Build site
          </span>
          <span
            aria-label={`${count} selected`}
            className={`inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-pill px-1 font-mono text-[11px] ${
              count > 0 ? "bg-button-primary text-button-content-primary" : "text-text-quaternary"
            }`}
          >
            {count}
          </span>
        </Link>
        <Link href={DESIGN_SYSTEM_HOME} aria-current={onDesignSystem ? "page" : undefined} className={`${itemBase} ${onDesignSystem ? itemOn : itemOff}`}>
          <span className="flex items-center gap-2.5">
            <Icon name="design-system" />
            Design system
          </span>
        </Link>
      </nav>
    </div>
  );
}

function CategoryLink({ href, active, count, children }: { href: string; active: boolean; count: number; children: React.ReactNode }) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={`${itemBase} ${active ? itemOn : itemOff}`}>
      <span className="truncate transition-[translate] duration-200 ease-out group-hover:translate-x-[3px] motion-reduce:transition-none">{children}</span>
      <span className={`font-mono text-[11px] ${active ? "text-text-tertiary" : "text-text-quaternary"}`}>{count}</span>
    </Link>
  );
}

function Icon({ name }: { name: "websites" | "build" | "design-system" }) {
  const common = { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", "aria-hidden": true } as const;
  switch (name) {
    case "websites":
      return (
        <svg {...common}>
          <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M2 6h12" stroke="currentColor" strokeWidth="1.4" />
        </svg>
      );
    case "build":
      return (
        <svg {...common}>
          <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "design-system":
      return (
        <svg {...common}>
          {/* Layers: one rhombus on top of a second layer, same 1.4px stroke as the icons above */}
          <path d="M8 2.5 13.5 5.75 8 9 2.5 5.75 8 2.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
          <path d="M2.5 9.25 8 12.5l5.5-3.25" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
  }
}

/** Same categories as a horizontal row for tablet and mobile (no room for a side menu). */
export function CategoryBar({ categories, total, itemCategories }: MenuProps) {
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

const barPill = (isActive: boolean) =>
  `inline-flex h-8 shrink-0 items-center gap-1.5 rounded-pill border px-3.5 text-[13px] font-medium leading-none transition-[background-color,color,border-color] duration-200 ease-out ${
    isActive ? "border-button-primary bg-button-primary text-button-content-primary" : "border-border-light bg-surface-primary text-text-nav hover:text-text-primary"
  }`;

/** Design-system pages as a horizontal row for tablet and mobile. */
export function DesignSystemBar() {
  const pathname = usePathname();
  return (
    <nav aria-label="Design system pages" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:-mx-8 md:px-8 [&::-webkit-scrollbar]:hidden">
      {DESIGN_SYSTEM_PAGES.map((page) => {
        const isActive = pathname === page.href;
        return (
          <Link key={page.id} href={page.href} aria-current={isActive ? "page" : undefined} className={barPill(isActive)}>
            {page.name}
          </Link>
        );
      })}
    </nav>
  );
}
