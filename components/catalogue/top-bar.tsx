"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelection } from "./selection";

const TABS = [
  { href: "/", label: "UI Components", short: "Components", match: (p: string) => p === "/" || p.startsWith("/components") },
  { href: "/websites", label: "Websites", short: "Websites", match: (p: string) => p.startsWith("/websites") },
];

export function TopBar() {
  const pathname = usePathname();
  const { selected, ready } = useSelection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onBuild = pathname.startsWith("/build");
  const count = ready ? selected.length : 0;
  const filled = count > 0 || onBuild;

  return (
    <header className="fixed inset-x-0 top-0 z-50 xl:hidden">
      <div
        aria-hidden
        className={`absolute inset-0 border-b transition-[background-color,border-color] duration-300 ease-out ${
          scrolled ? "border-border-06 bg-catalogue-bg/85 backdrop-blur-xl" : "border-transparent bg-catalogue-bg"
        }`}
      />
      <nav aria-label="Catalogue" className="relative flex h-16 items-center justify-between gap-3 px-5 md:gap-4 md:px-8">
        <Link href="/" className="flex shrink-0 items-baseline gap-2 rounded-chip">
          <span className="text-[16px] font-medium leading-none tracking-[-0.01em] text-text-primary">Firefly</span>
          <span className="hidden text-[16px] font-normal leading-none text-text-muted sm:inline">UI Library</span>
        </Link>

        <div className="flex shrink-0 items-center rounded-pill border border-border-06 bg-surface-muted p-[3px]">
          {TABS.map((tab) => {
            const active = !onBuild && tab.match(pathname);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-pill px-3 py-1.5 text-[13px] font-medium leading-none transition-[background-color,color,box-shadow] duration-200 ease-out md:px-3.5 ${
                  active
                    ? "bg-surface-primary text-text-primary shadow-[0_1px_2px_0_#0000000f,0_0_0_1px_#0000000a]"
                    : "text-text-nav hover:text-text-primary"
                }`}
              >
                <span className="md:hidden">{tab.short}</span>
                <span className="hidden md:inline">{tab.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href="https://github.com/lukasznosekk/Firefly-UI-Library"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub repository"
            className="hidden size-[34px] items-center justify-center rounded-pill border border-border-light bg-surface-primary text-icon-primary transition-opacity duration-200 ease-out hover:opacity-70 md:inline-flex"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M8 .2a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.49c-2.23.48-2.7-.95-2.7-.95-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.87 2.33.67.07-.52.28-.87.5-1.07-1.77-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.94.29.25.54.74.54 1.49v2.21c0 .21.15.46.55.38A8 8 0 0 0 8 .2Z" />
            </svg>
          </a>
          <Link
            href="/build"
            aria-current={onBuild ? "page" : undefined}
            aria-label={`Build site, ${count} selected`}
            className={`inline-flex h-[34px] items-center gap-2 rounded-pill px-3 text-[13px] font-medium leading-none transition-[translate,scale,opacity] duration-200 ease-out hover:-translate-y-px hover:opacity-85 active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none md:px-4 ${
              filled ? "bg-button-primary text-button-content-primary" : "border border-border-light bg-surface-primary text-text-primary"
            }`}
          >
            {/* Stack icon on mobile, label from md */}
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden className="md:hidden">
              <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="hidden md:inline">Build site</span>
            <span
              aria-hidden
              className={`inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-pill px-1 font-mono text-[11px] ${
                filled ? "bg-surface-primary/20 text-button-content-primary" : "bg-surface-muted text-text-nav"
              }`}
            >
              {count}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
