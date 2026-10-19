"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { BurgerIcon, NavLink, navIconButtonClasses } from "@/components/ui/nav-link";

export type NavLink = { label: string; href: string };

export type NavigationStickyProps = {
  /** Logo or wordmark. Defaults to a neutral mark + "Brand" text; pass your <Image> or SVG. */
  brand?: ReactNode;
  /** Accessible name of the brand link */
  brandLabel?: string;
  brandHref?: string;
  links: NavLink[];
  /** Primary pill on the right. null hides it. */
  cta?: NavLink | null;
  /** Secondary (white) pill before the primary one, e.g. "Log in". null hides it. */
  secondaryCta?: NavLink | null;
  /** Which link is current. Defaults to the pathname. */
  activeHref?: string;
  className?: string;
};

/**
 * Navigation Sticky v1.1
 * Fixed 64px header styled after the ElevenLabs bar: brand, 14px regular links in 36px pills
 * that fill with a soft grey on hover (the current page only gets aria-current), then an optional white
 * secondary pill ("Log in") and the primary pill, both 36px. After ~8px of scroll the background
 * turns translucent with a hairline (no compaction). Mobile: a round hamburger that morphs into
 * a cross and opens a simple panel; Escape closes it.
 *
 * Pages below need a top padding of 64px plus their own spacing.
 */
export function NavigationSticky({
  brand,
  brandLabel = "Home",
  brandHref = "/",
  links,
  cta = { label: "Join waitlist", href: "#cta" },
  secondaryCta = null,
  activeHref,
  className = "",
}: NavigationStickyProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const current = activeHref ?? pathname;
  // pathname never contains "#", so anchor links are only active when a site passes a matching activeHref
  const isActive = (href: string) => current === href;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${className}`}>
      {/* Background layer: turns translucent with a hairline once the page scrolls or the panel opens */}
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-16 border-b transition-[background-color,border-color] duration-200 ease-out motion-reduce:transition-none ${
          scrolled || open ? "border-border-06 bg-surface-page/85 backdrop-blur-xl" : "border-transparent bg-surface-page"
        }`}
      />
      <nav aria-label="Main" className="relative mx-auto flex h-16 max-w-[1328px] items-center justify-between gap-6 px-5 md:px-10 xl:px-16">
        <div className="flex min-w-0 items-center gap-6 xl:gap-9">
          <Link href={brandHref} aria-label={brandLabel} className="flex min-w-0 items-center rounded-chip">
            {brand ?? <DefaultBrand />}
          </Link>
          <ul className="hidden items-center md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <NavLink href={l.href} active={isActive(l.href)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-2 md:gap-2">
          {secondaryCta ? (
            <span className="hidden md:contents">
              <Button href={secondaryCta.href} variant="secondary" size="sm">
                {secondaryCta.label}
              </Button>
            </span>
          ) : null}
          {cta ? (
            <Button href={cta.href} size="sm">
              {cta.label}
            </Button>
          ) : null}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((o) => !o)}
            className={`${navIconButtonClasses} ml-0.5 md:hidden`}
          >
            <BurgerIcon open={open} />
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div id={menuId} hidden={!open} className="relative border-b border-border-06 bg-surface-page px-5 pb-5 pt-1 md:hidden">
        <ul className="flex flex-col gap-0.5">
          {links.map((l) => (
            <li key={l.href}>
              <NavLink href={l.href} active={isActive(l.href)} onClick={() => setOpen(false)} className="h-11 w-full">
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        {secondaryCta ? (
          <Button href={secondaryCta.href} variant="secondary" size="md" className="mt-3 w-full" onClick={() => setOpen(false)}>
            {secondaryCta.label}
          </Button>
        ) : null}
      </div>
    </header>
  );
}

function DefaultBrand() {
  return (
    <span className="flex items-center gap-2">
      <span aria-hidden className="block size-6 rounded-chip bg-text-primary" />
      <span className="text-[16px] font-medium leading-none tracking-[-0.01em] text-text-primary">
        Brand
      </span>
    </span>
  );
}
