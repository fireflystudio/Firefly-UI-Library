"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState, type FocusEvent, type ReactNode } from "react";
import { FireflyMark } from "@/components/ui/brand-mark";
import { Button } from "@/components/ui/button";
import {
  BurgerIcon,
  NavLink,
  navIconButtonClassesFor,
} from "@/components/ui/nav-link";
import { Placeholder } from "@/components/ui/placeholder";

export type NavMenuLink = {
  label: string;
  href: string;
  prefetch?: boolean;
};

/** Dropdown under a link (tablet+): link columns on the left, picture tiles on the right. */
export type NavMenu = {
  /** Text columns: a small label over a list of links. */
  columns: { label: string; links: NavMenuLink[] }[];
  /** Picture tiles (212 × 199 at desktop) with a caption below. `image` is any node, e.g. a next/image with `fill`; a Placeholder by default. */
  features?: (NavMenuLink & { image?: ReactNode })[];
  /** Accessible name of the dropdown. Defaults to "<link label> menu". */
  label?: string;
};

export type NavLink = {
  label: string;
  href: string;
  prefetch?: boolean;
  /** Optional dropdown that opens on hover / focus (tablet+); its links are listed under the link in the mobile panel. */
  menu?: NavMenu;
};

export type NavigationStickyProps = {
  /** Logo or wordmark. Defaults to the Firefly mark + "Brand" text; pass your <Image> or SVG (use currentColor so it follows the bar's tone). */
  brand?: ReactNode;
  /** Accessible name of the brand link */
  brandLabel?: string;
  brandHref?: string;
  /** Text links shown on tablet/desktop and in the mobile panel. An empty list = logo + CTA only (one-page sites). */
  links: NavLink[];
  /** Primary pill on the right. null hides it. */
  cta?: NavMenuLink | null;
  /** Secondary (white) pill before the primary one, e.g. "Log in". null hides it. */
  secondaryCta?: NavMenuLink | null;
  /**
   * The bar starts over a hero photo: transparent, light text, a thin light divider, the primary
   * CTA as a light outline pill. After ~8px of scroll (or when the mobile menu opens) it becomes
   * the standard bar. The hero itself must sit under the bar (fixed header, no top padding gap).
   */
  overHero?: boolean;
  /** Which link is current. Defaults to the pathname. */
  activeHref?: string;
  /** Width + side padding of the bar's content, so it lines up with the site's sections. Default matches the library heroes. */
  containerClassName?: string;
  className?: string;
};

/**
 * Navigation Sticky v1.3
 * Fixed 64px header styled after the ElevenLabs bar: brand on the left with the 14px regular links
 * next to it (36px pills that fill with a soft grey on hover; the current page only gets aria-current),
 * then an optional white secondary pill ("Log in") and the primary pill, both 36px. After ~8px of
 * scroll the background turns translucent with a hairline (no compaction).
 * With `overHero` the bar first sits transparent over the hero photo in light text, with a thin
 * light divider aligned to the content, and switches to the standard look on scroll.
 * A link with `menu` opens a full-width dropdown card under the bar on hover or focus (soft rise-in,
 * staggered contents, the button shadow); Escape, leaving the card or a route change closes it.
 * Mobile: a round hamburger that morphs into a cross and opens a simple panel (sub-links listed
 * under their link); Escape closes it.
 *
 * Pages below need a top padding of 64px plus their own spacing (or none with `overHero`).
 */
export function NavigationSticky({
  brand,
  brandLabel = "Home",
  brandHref = "/",
  links,
  cta = { label: "Join waitlist", href: "#cta" },
  secondaryCta = null,
  overHero = false,
  activeHref,
  containerClassName = "max-w-[1440px] px-5 md:px-10",
  className = "",
}: NavigationStickyProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  /** href of the link whose dropdown is open */
  const [dropdown, setDropdown] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const menuId = useId();
  const current = activeHref ?? pathname;
  // pathname never contains "#", so anchor links are only active when a site passes a matching activeHref
  const isActive = (href: string) => current === href;
  // One-page sites may pass no links: then there is nothing to open on phones, so no hamburger
  const hasMenu = links.length > 0 || Boolean(secondaryCta);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clearCloseTimer = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const openDropdown = (href: string) => {
    clearCloseTimer();
    setDropdown(href);
  };
  // A short grace period so the pointer can cross the gap between the link and the card
  const closeDropdownSoon = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setDropdown(null), 150);
  };
  const onDropdownBlur = (e: FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setDropdown(null);
  };
  useEffect(() => clearCloseTimer, []);
  useEffect(() => setDropdown(null), [pathname]);
  useEffect(() => {
    if (!dropdown) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDropdown(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dropdown]);

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
          solid
            ? "border-border-06 bg-surface-page/85 backdrop-blur-xl"
            : "border-transparent bg-surface-page"
        } ${overHero && !solid ? "opacity-0" : "opacity-100"}`}
      />
      <nav
        aria-label="Main"
        className={`relative mx-auto transition-[color] duration-200 ease-out motion-reduce:transition-none ${containerClassName} ${
          onDark ? "text-text-on-dark" : "text-text-primary"
        }`}
      >
        {/* Content box: the divider and the dropdown are positioned against it, so they follow the container padding */}
        <div className="relative flex h-16 items-center justify-between gap-6">
          {overHero ? (
            <div
              aria-hidden
              className={`absolute inset-x-0 bottom-0 h-px bg-text-on-dark/20 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
                onDark ? "opacity-100" : "opacity-0"
              }`}
            />
          ) : null}

          <div className="flex min-w-0 items-center gap-6 xl:gap-9">
            <Link
              href={brandHref}
              aria-label={brandLabel}
              className="flex min-w-0 items-center rounded-chip"
            >
              {brand ?? <DefaultBrand />}
            </Link>
            {/* Links next to the brand (tablet+); a link with `menu` opens its dropdown on hover / focus */}
            <ul className="hidden items-center md:flex">
              {links.map((l, i) => {
                const hasDropdown = Boolean(l.menu && (l.menu.columns.length || l.menu.features?.length));
                const dropdownOpen = hasDropdown && dropdown === l.href;
                const dropdownId = `${menuId}-dropdown-${i}`;
                return (
                  <li
                    key={`${l.label}-${l.href}`}
                    onPointerEnter={hasDropdown ? () => openDropdown(l.href) : undefined}
                    onPointerLeave={hasDropdown ? closeDropdownSoon : undefined}
                    onFocus={hasDropdown ? () => openDropdown(l.href) : undefined}
                    onBlur={hasDropdown ? onDropdownBlur : undefined}
                  >
                    <NavLink
                      href={l.href}
                      prefetch={l.prefetch}
                      active={isActive(l.href)}
                      tone={tone}
                      aria-expanded={hasDropdown ? dropdownOpen : undefined}
                      aria-controls={hasDropdown ? dropdownId : undefined}
                      className={dropdownOpen ? (onDark ? "bg-text-on-dark/10" : "bg-surface-hover") : ""}
                    >
                      {l.label}
                    </NavLink>
                    {hasDropdown && l.menu ? (
                      <Dropdown id={dropdownId} open={dropdownOpen} menu={l.menu} label={l.menu.label ?? `${l.label} menu`} reduce={Boolean(reduce)} />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {secondaryCta ? (
              <span className="hidden md:contents">
                <Button
                  href={secondaryCta.href}
                  prefetch={secondaryCta.prefetch}
                  variant={onDark ? "secondary-on-dark" : "secondary"}
                  size="sm"
                >
                  {secondaryCta.label}
                </Button>
              </span>
            ) : null}
            {cta ? (
              <Button
                href={cta.href}
                prefetch={cta.prefetch}
                variant={onDark ? "secondary-on-dark" : "primary"}
                size="sm"
              >
                {cta.label}
              </Button>
            ) : null}
            {hasMenu ? (
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
            ) : null}
          </div>
        </div>
      </nav>

      {/* Mobile panel (only when there are links or a secondary CTA to show) */}
      <div
        id={menuId}
        hidden={!open || !hasMenu}
        className="relative border-b border-border-06 bg-surface-page px-5 pb-5 pt-1 md:hidden"
      >
        <ul className="flex flex-col gap-0.5">
          {links.map((l) => {
            // Column links first, then the tiles; a link that appears in both is listed once
            const all = l.menu ? [...l.menu.columns.flatMap((c) => c.links), ...(l.menu.features ?? [])] : [];
            const subLinks = all.filter((s, i) => all.findIndex((t) => t.href === s.href && t.label === s.label) === i);
            return (
              <li key={`${l.label}-${l.href}`}>
                <NavLink
                  href={l.href}
                  prefetch={l.prefetch}
                  active={isActive(l.href)}
                  onClick={() => setOpen(false)}
                  className="h-11 w-full"
                >
                  {l.label}
                </NavLink>
                {subLinks.length ? (
                  <ul className="mb-1 flex flex-col gap-0.5 pl-3">
                    {subLinks.map((s, i) => (
                      <li key={`${s.href}-${i}`}>
                        <NavLink href={s.href} prefetch={s.prefetch} onClick={() => setOpen(false)} className="h-10 w-full text-text-secondary">
                          {s.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
        {secondaryCta ? (
          <Button
            href={secondaryCta.href}
            prefetch={secondaryCta.prefetch}
            variant="secondary"
            size="md"
            className="mt-3 w-full"
            onClick={() => setOpen(false)}
          >
            {secondaryCta.label}
          </Button>
        ) : null}
      </div>
    </header>
  );
}

const EASE = [0.22, 1, 0.36, 1] as const;
const rise = (reduce: boolean, delay: number) =>
  reduce ? {} : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.32, delay, ease: EASE } };

/**
 * The dropdown card: full width of the bar's content, 12px under the bar (the wrapper's padding keeps
 * the pointer "inside" while crossing the gap). Fades and rises in with its columns and tiles staggered;
 * instant under reduced motion. Tiles sit right of the columns from xl, in a row below them before that.
 */
function Dropdown({
  id,
  open,
  menu,
  label,
  reduce,
}: {
  id: string;
  open: boolean;
  menu: NavMenu;
  label: string;
  reduce: boolean;
}) {
  return (
    <AnimatePresence>
      {open ? (
        <div id={id} className="absolute inset-x-0 top-full z-10 pt-3">
          <motion.div
            role="region"
            aria-label={label}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -6, scale: 0.99, transition: { duration: 0.16, ease: "easeIn" } }}
            transition={reduce ? { duration: 0 } : { duration: 0.28, ease: EASE }}
            style={{ transformOrigin: "50% 0%" }}
            className="rounded-tile bg-surface-primary px-6 pb-8 pt-6 text-text-primary shadow-button xl:px-[42px] xl:pb-10"
          >
            <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between xl:gap-10">
              {menu.columns.length ? (
                <div className="flex flex-wrap gap-x-[72px] gap-y-6 xl:pt-[15px]">
                  {menu.columns.map((col, i) => (
                    <motion.div key={col.label} {...rise(reduce, 0.05 + i * 0.04)} className="flex min-w-[100px] flex-col gap-6">
                      <p className="text-[12px] leading-[normal]">{col.label}</p>
                      <ul className="flex flex-col gap-[9px]">
                        {col.links.map((link, j) => (
                          <li key={`${link.href}-${j}`}>
                            <Link
                              href={link.href}
                              prefetch={link.prefetch}
                              className="rounded-chip text-[16px] leading-[1.18] transition-colors duration-150 ease-standard hover:text-text-tertiary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive motion-reduce:transition-none"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              ) : null}
              {menu.features?.length ? (
                <ul className="grid grid-cols-3 gap-[17px] xl:flex xl:shrink-0">
                  {menu.features.map((f, i) => (
                    <motion.li key={`${f.href}-${i}`} {...rise(reduce, 0.12 + i * 0.05)} className="min-w-0 xl:w-[212px]">
                      <Link
                        href={f.href}
                        prefetch={f.prefetch}
                        className="group block rounded-tile focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive"
                      >
                        <span className="relative block aspect-[212/199] overflow-clip rounded-tile bg-surface-muted">
                          <span className="absolute inset-0 block transition-[scale] duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                            {f.image ?? <Placeholder label="Image" />}
                          </span>
                        </span>
                        <span className="mt-[15px] block text-[12px] leading-[1.18]">{f.label}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              ) : null}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function DefaultBrand() {
  return (
    <span className="flex items-center gap-2">
      <FireflyMark className="h-[17px]" />
      <span className="text-[16px] font-medium leading-none tracking-[-0.01em]">
        Brand
      </span>
    </span>
  );
}
