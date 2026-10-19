import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Navigation bar atoms, matched to the ElevenLabs header: 64px bar, 18px regular links sitting in
 * 36px pills that fill with a soft grey on hover (150ms, fill only), the current page keeping the
 * fill. Pair them with <Button size="sm"> for the bar's CTAs.
 */
export const navLinkClasses =
  "inline-flex h-9 items-center whitespace-nowrap rounded-pill px-3 text-[18px] font-normal leading-none text-text-primary " +
  "transition-[background-color,color] duration-150 ease-standard hover:bg-surface-hover " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive motion-reduce:transition-none";

/** Text link for the bar and mobile panels. `active` marks the current page (aria-current + the fill). */
export function NavLink({
  active = false,
  className = "",
  ...rest
}: { active?: boolean; className?: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "className">) {
  return <Link aria-current={active ? "page" : undefined} className={`${navLinkClasses} ${active ? "bg-surface-hover" : ""} ${className}`} {...rest} />;
}

/** Round 36px icon-only control for the bar (hamburger, dot grid): transparent, same hover fill. Always pass aria-label. */
export const navIconButtonClasses =
  "inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-pill text-icon-primary " +
  "transition-[background-color] duration-150 ease-standard hover:bg-surface-hover " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive motion-reduce:transition-none";

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
