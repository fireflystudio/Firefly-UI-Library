import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Navigation bar atoms, matched to the ElevenLabs header: 64px bar, 14px regular links (20px line)
 * sitting in 36px pills (padding 8px 12px) that fill with a soft grey on hover (150ms, fill only).
 * The current page only gets aria-current, no permanent fill (as in the reference). Pair them with
 * <Button size="sm"> for the bar's CTAs.
 *
 * `tone="on-dark"` is for bars that sit over a hero photo: light text, a white 10% hover fill.
 */
export type NavTone = "light" | "on-dark";

const linkBase =
  "inline-flex h-9 items-center whitespace-nowrap rounded-pill px-3 text-[14px] font-normal leading-5 " +
  "transition-[background-color,color] duration-150 ease-standard " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive motion-reduce:transition-none";
const linkTones: Record<NavTone, string> = {
  light: "text-text-primary hover:bg-surface-hover",
  "on-dark": "text-text-on-dark hover:bg-text-on-dark/10",
};

export const navLinkClassesFor = (tone: NavTone = "light") => `${linkBase} ${linkTones[tone]}`;
export const navLinkClasses = navLinkClassesFor("light");

/** Text link for the bar and mobile panels. `active` marks the current page with aria-current. */
export function NavLink({
  active = false,
  tone = "light",
  className = "",
  ...rest
}: { active?: boolean; tone?: NavTone; className?: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "className">) {
  return <Link aria-current={active ? "page" : undefined} className={`${navLinkClassesFor(tone)} ${className}`} {...rest} />;
}

const iconBase =
  "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-pill " +
  "transition-[background-color,color] duration-150 ease-standard " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive motion-reduce:transition-none";
const iconTones: Record<NavTone, string> = {
  light: "text-icon-primary hover:bg-surface-hover",
  "on-dark": "text-text-on-dark hover:bg-text-on-dark/10",
};

/** Round 36px icon-only control for the bar (hamburger, dot grid): transparent, same hover fill. Always pass aria-label. */
export const navIconButtonClassesFor = (tone: NavTone = "light") => `${iconBase} ${iconTones[tone]}`;
export const navIconButtonClasses = navIconButtonClassesFor("light");

/** Two 18px lines that morph into a cross when `open` (transform/opacity only). */
export function BurgerIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative block h-4 w-[18px]">
      <span
        className={`absolute left-0 top-[4px] block h-[1.5px] w-[18px] bg-current transition-transform duration-200 ease-out motion-reduce:transition-none ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
      />
      <span
        className={`absolute left-0 top-[11px] block h-[1.5px] w-[18px] bg-current transition-transform duration-200 ease-out motion-reduce:transition-none ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
      />
    </span>
  );
}
