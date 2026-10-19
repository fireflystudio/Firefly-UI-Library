"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { BurgerIcon, NavLink, navIconButtonClassesFor } from "@/components/ui/nav-link";

export type CenteredNavLink = { label: string; href: string; prefetch?: boolean };

export type NavigationCenteredProps = {
  /** Logo or wordmark. Defaults to a neutral mark + "Brand" text; pass your <Image> or SVG (use currentColor so it follows the bar's tone). */
  brand?: ReactNode;
  /** Accessible name of the brand link */
  brandLabel?: string;
  brandHref?: string;
  links: CenteredNavLink[];
  /** Primary pill on the right. null hides it. */
  cta?: CenteredNavLink | null;
  /** Secondary (white) pill before the primary one, e.g. "Log in". Hidden on phones. null hides it. */
  secondaryCta?: CenteredNavLink | null;
  /**
   * The bar starts over a hero photo: transparent, light text, a thin light divider, the primary
   * CTA as a light outline pill. After ~8px of scroll (or when the mobile menu opens) it becomes
   * the standard bar. The hero itself must sit under the bar (fixed header, no top padding gap).
   */
  overHero?: boolean;
  /** Which link is current. Defaults to the pathname. */
  activeHref?: string;
  className?: string;
};

/**
 * Navigation Centered v1
 * Fixed 64px header with the links on the left, the brand centred and the CTAs on the right
 * (the Solve layout). Styling follows the other Firefly navigations (ElevenLabs reference):
 * 14px regular links in 36px pills with a grey hover fill, white secondary + primary 36px pills,
 * a round hamburger. After ~8px of scroll the background turns translucent with a hairline.
 * With `overHero` the bar first sits transparent over the hero photo in light text, with a thin
 * light divider aligned to the content, and switches to the standard look on scroll.
 * Mobile: brand on the left, CTA + hamburger on the right, a simple panel below the bar.
 *
 * Pages below need a top padding of 64px plus their own spacing (or none with `overHero`).
 */
export function NavigationCentered({
  brand,
  brandLabel = "Home",
  brandHref = "/",
  links,
  cta = { label: "Join waitlist", href: "#cta" },
  secondaryCta = null,
  overHero = false,
  activeHref,
  className = "",
}: NavigationCenteredProps) {
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
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  // Over the hero and not yet scrolled: light tone. Otherwise the standard bar.
  const onDark = overHero && !scrolled && !open;
  const tone = onDark ? "on-dark" : "light";
  const solid = scrolled || open;

  return (
    <header className={`fixed inset-x-0 top-0 z-50 ${className}`}>
      {/* Background layer: page colour (translucent + hairline once scrolled); transparent while over the hero */}
      <div
        aria-hidden
        className={`absolute inset-x-0 top-0 h-16 border-b transition-[background-color,border-color,opacity] duration-200 ease-out motion-reduce:transition-none ${
          solid ? "border-border-06 bg-surface-page/85 backdrop-blur-xl" : "border-transparent bg-surface-page"
        } ${overHero && !solid ? "opacity-0" : "opacity-100"}`}
      />
      <nav
        aria-label="Main"
        className={`relative mx-auto flex h-16 max-w-[1328px] items-center justify-between gap-4 px-5 transition-[color] duration-200 ease-out motion-reduce:transition-none md:px-10 xl:px-16 ${
          onDark ? "text-text-on-dark" : "text-text-primary"
        }`}
      >
        {/* Thin divider over the hero, aligned with the content */}
        {overHero ? (
          <div
            aria-hidden
            className={`absolute inset-x-5 bottom-0 h-px bg-text-on-dark/20 transition-opacity duration-200 ease-out motion-reduce:transition-none md:inset-x-10 xl:inset-x-16 ${
              onDark ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null}

        {/* Links on the left (tablet+) */}
        <ul className="hidden min-w-0 items-center md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <NavLink href={l.href} prefetch={l.prefetch} active={isActive(l.href)} tone={tone}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Brand: left on phones, centred from md */}
        <Link
          href={brandHref}
          aria-label={brandLabel}
          className="flex min-w-0 items-center rounded-chip md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
        >
          {brand ?? <DefaultBrand />}
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          {secondaryCta ? (
            <span className="hidden md:contents">
              <Button href={secondaryCta.href} prefetch={secondaryCta.prefetch} variant={onDark ? "secondary-on-dark" : "secondary"} size="sm">
                {secondaryCta.label}
              </Button>
            </span>
          ) : null}
          {cta ? (
            <Button href={cta.href} prefetch={cta.prefetch} variant={onDark ? "secondary-on-dark" : "primary"} size="sm">
              {cta.label}
            </Button>
          ) : null}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((o) => !o)}
            className={`${navIconButtonClassesFor(tone)} ml-0.5 md:hidden`}
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
              <NavLink href={l.href} prefetch={l.prefetch} active={isActive(l.href)} onClick={() => setOpen(false)} className="h-11 w-full">
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        {secondaryCta ? (
          <Button href={secondaryCta.href} prefetch={secondaryCta.prefetch} variant="secondary" size="md" className="mt-3 w-full" onClick={() => setOpen(false)}>
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
      <span aria-hidden className="block size-6 rounded-chip bg-current" />
      <span className="text-[16px] font-medium leading-none tracking-[-0.01em]">Brand</span>
    </span>
  );
}
