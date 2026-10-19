"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { FireflyMark } from "@/components/ui/brand-mark";
import { Button } from "@/components/ui/button";
import { NavLink, navIconButtonClasses } from "@/components/ui/nav-link";

export type SlideOutLink = { label: string; href: string };
export type SlideOutGroup = { title: string; links: SlideOutLink[] };

export type NavigationSlideOutProps = {
  /** Logo or wordmark. Defaults to the Firefly mark + "Brand" text; pass your <Image> or SVG. */
  brand?: ReactNode;
  /** Accessible name of the brand link */
  brandLabel?: string;
  brandHref?: string;
  /** Primary links: text links in the bar (tablet+) and the big list in the panel. */
  links: SlideOutLink[];
  /** White secondary pill before the CTA ("Log in"). Tablet+ in the bar, always in the panel. null hides it. */
  secondaryLink?: SlideOutLink | null;
  /** Primary pill in the bar and in the panel. null hides it. */
  cta?: SlideOutLink | null;
  /** Small link groups at the bottom of the panel (one or two columns). */
  groups?: SlideOutGroup[];
  /** Title in the panel's top row; also the dialog's accessible name. */
  menuTitle?: string;
  /** Mono label above the big links in the panel. */
  exploreLabel?: string;
  /** Which link is current. Defaults to the pathname. */
  activeHref?: string;
  /** Width + side padding of the bar's content, so it lines up with the site's sections. Default matches the library heroes. */
  containerClassName?: string;
  className?: string;
};

/**
 * Navigation Slide-out v1.1
 * Fixed 64px header styled like Navigation Sticky (ElevenLabs bar: 14px links in pills with a
 * grey hover fill, white secondary + primary 36px pills, translucent background + hairline after
 * 8px of scroll). A round dot-grid button (all breakpoints) opens a right-side panel that slides
 * in (translateX 100% → 0, 0.4s) over a fading overlay (0.35s). The panel is a modal dialog:
 * Escape, the overlay, the close button and every link close it; focus returns to the menu
 * button; Tab is trapped inside; body scroll is locked while open.
 *
 * Pages below need a top padding of 64px plus their own spacing.
 */
export function NavigationSlideOut({
  brand,
  brandLabel = "Home",
  brandHref = "/",
  links,
  secondaryLink = null,
  cta = { label: "Join waitlist", href: "#cta" },
  groups = [],
  menuTitle = "Menu",
  exploreLabel = "Explore",
  activeHref,
  containerClassName = "max-w-[1440px] px-5 md:px-10",
  className = "",
}: NavigationSlideOutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);
  const current = activeHref ?? pathname;
  // pathname never contains "#", so anchor links are only active when a site passes a matching activeHref
  const isActive = (href: string) => current === href;
  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Open: lock body scroll, move focus into the dialog, close on Escape.
  // Close: restore scroll and return focus to the menu button.
  useEffect(() => {
    if (!open) {
      if (wasOpen.current) {
        wasOpen.current = false;
        menuButtonRef.current?.focus();
      }
      return;
    }
    wasOpen.current = true;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = previousOverflow;
    };
  }, [open]);

  // Keep Tab / Shift+Tab inside the dialog while it is open.
  const trapFocus = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 ${className}`}>
        {/* Background layer: turns translucent with a hairline once the page scrolls */}
        <div
          aria-hidden
          className={`absolute inset-x-0 top-0 h-16 border-b transition-[background-color,border-color] duration-200 ease-out motion-reduce:transition-none ${
            scrolled ? "border-border-06 bg-surface-page/85 backdrop-blur-xl" : "border-transparent bg-surface-page"
          }`}
        />
        <nav aria-label="Main" className={`relative mx-auto flex h-16 items-center justify-between gap-6 ${containerClassName}`}>
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

          <div className="flex shrink-0 items-center gap-2">
            {secondaryLink ? (
              <span className="hidden md:contents">
                <Button href={secondaryLink.href} variant="secondary" size="sm">
                  {secondaryLink.label}
                </Button>
              </span>
            ) : null}
            {cta ? (
              <Button href={cta.href} size="sm">
                {cta.label}
              </Button>
            ) : null}
            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen(true)}
              className={`${navIconButtonClasses} ml-0.5`}
            >
              <DotGrid />
            </button>
          </div>
        </nav>
      </header>

      {/* Page overlay: opacity only. Visibility is transitioned only while closing, so it stays clickable until the fade-out ends and appears instantly on open */}
      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-0 z-[60] bg-surface-inverse/40 duration-[350ms] ease-out motion-reduce:transition-none ${
          open
            ? "visible opacity-100 transition-[opacity]"
            : "invisible opacity-0 transition-[opacity,visibility]"
        }`}
      />

      {/* Slide-out panel: translate only. Visibility is transitioned only while closing (hidden + inert once the slide-out has finished); on open it is visible at once so focus can move in */}
      <div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label={menuTitle}
        inert={!open}
        onKeyDown={trapFocus}
        className={`fixed inset-y-0 right-0 z-[70] flex w-[min(460px,92vw)] flex-col overflow-y-auto rounded-l-[24px] bg-surface-primary p-6 duration-[400ms] ease-out-soft motion-reduce:transition-none md:p-8 ${
          open
            ? "visible translate-x-0 transition-[translate]"
            : "invisible translate-x-full transition-[translate,visibility]"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-[24px] font-normal leading-[1.1] tracking-[-0.02em] text-text-primary md:text-[28px]">
            {menuTitle}
          </p>
          <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 md:gap-x-4">
            {secondaryLink ? (
              <Button href={secondaryLink.href} variant="secondary" size="sm" onClick={close}>
                {secondaryLink.label}
              </Button>
            ) : null}
            {cta ? (
              <Button href={cta.href} size="sm" onClick={close}>
                {cta.label}
              </Button>
            ) : null}
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close menu"
              onClick={close}
              className={`${navIconButtonClasses} ml-0.5`}
            >
              <DotGrid />
            </button>
          </div>
        </div>

        <p className="mt-10 font-mono text-[12px] uppercase leading-[1.3] tracking-[0.08em] text-text-quaternary">
          {exploreLabel}
        </p>
        <ul className="mb-12 mt-3 flex flex-col">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={close}
                aria-current={isActive(l.href) ? "page" : undefined}
                className="block py-1.5 text-[24px] font-normal leading-[1.15] tracking-[-0.02em] text-text-primary transition-opacity duration-200 ease-out hover:opacity-60 motion-reduce:transition-none md:text-[28px]"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {groups.length ? (
          <div
            className={`mt-auto grid gap-6 border-t border-border-06 pt-6 ${groups.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}
          >
            {groups.slice(0, 2).map((group) => (
              <div key={group.title} className="flex min-w-0 flex-col gap-2.5">
                <p className="text-[13px] leading-[1.3] text-text-quaternary">
                  {group.title}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={close}
                        className="text-[14px] leading-[1.3] text-text-nav transition-opacity duration-200 ease-out hover:opacity-60 motion-reduce:transition-none"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}

/** 2 × 3 grid of 4px dots, drawn in the button's text colour */
function DotGrid() {
  return (
    <span aria-hidden className="grid grid-cols-3 gap-1">
      {Array.from({ length: 6 }, (_, i) => (
        <span key={i} className="size-1 rounded-pill bg-current" />
      ))}
    </span>
  );
}

function DefaultBrand() {
  return (
    <span className="flex items-center gap-2">
      <FireflyMark className="h-[17px]" />
      <span className="text-[16px] font-medium leading-none tracking-[-0.01em]">Brand</span>
    </span>
  );
}
