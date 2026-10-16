"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

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
  /** Which link is current. Defaults to the pathname. */
  activeHref?: string;
  className?: string;
};

/**
 * Navigation Sticky v1
 * Fixed header (72px mobile / 76px tablet+). After ~8px of scroll the background turns
 * translucent with a hairline and compacts (scaleY 0.84 + content translateY -6px, transform
 * only). Links 14px medium grey, the active one primary with aria-current. Mobile: hamburger
 * that morphs into a cross and opens a simple panel; Escape closes it.
 *
 * Pages below need a top padding of 72px / 76px plus their own spacing.
 */
export function NavigationSticky({
  brand,
  brandLabel = "Home",
  brandHref = "/",
  links,
  cta = { label: "Join waitlist", href: "#cta" },
  activeHref,
  className = "",
}: NavigationStickyProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const current = activeHref ?? pathname;
  const isActive = (href: string) => !href.includes("#") && current === href;

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
      {/* Background layer: fades in and shrinks (scaleY) on scroll */}
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-[72px] origin-top border-b transition-transform duration-300 ease-out md:h-[76px] ${
          scrolled || open ? "border-border-06 bg-surface-page/85 backdrop-blur-xl" : "border-transparent bg-surface-page"
        } ${scrolled && !open ? "scale-y-[0.842]" : ""}`}
      />
      <nav
        aria-label="Main"
        className={`relative mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 transition-transform duration-300 ease-out md:h-[76px] md:px-8 ${
          scrolled && !open ? "-translate-y-[6px]" : ""
        }`}
      >
        <div className="flex min-w-0 items-center gap-10">
          <Link href={brandHref} aria-label={brandLabel} className="flex min-w-0 items-center rounded-chip">
            {brand ?? <DefaultBrand />}
          </Link>
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`text-[14px] font-medium transition-opacity duration-200 ease-out hover:opacity-60 ${
                    isActive(l.href) ? "text-text-primary" : "text-text-nav"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex shrink-0 items-center gap-2">
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
            className="flex h-8 w-[26px] cursor-pointer flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span className={`block h-[1.5px] w-[18px] bg-icon-primary transition-transform duration-200 ease-out ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`block h-[1.5px] w-[18px] bg-icon-primary transition-opacity duration-200 ease-out ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] w-[18px] bg-icon-primary transition-transform duration-200 ease-out ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div id={menuId} hidden={!open} className="relative border-b border-border-06 bg-surface-page px-5 pb-6 md:hidden">
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`block border-b border-border-06 py-4 text-[17px] font-medium ${isActive(l.href) ? "text-text-primary" : "text-text-nav"}`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function DefaultBrand() {
  return (
    <span className="flex items-center gap-2">
      <span aria-hidden className="block size-6 rounded-chip bg-text-primary" />
      <span className="text-[16px] font-medium leading-none tracking-[-0.01em] text-text-primary">Brand</span>
    </span>
  );
}
