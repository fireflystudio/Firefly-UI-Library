import Link from "next/link";
import type { ReactNode } from "react";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type BentoTone = "photo" | "dark" | "light";

export type BentoItem = {
  /** Small line at the top of the card, e.g. "Story" */
  label: string;
  title: string;
  body?: string;
  /** photo = image filling the card under a gradient; dark / light = solid surfaces with a visual slot in the middle */
  tone?: BentoTone;
  /** Image or mockup. Defaults to a Placeholder matching the tone. */
  visual?: ReactNode;
  /** Makes the whole card a link */
  href?: string;
};

export type BentoCardsProps = {
  /** Section id (anchor) */
  id?: string;
  headline: string;
  /** Grey second half of the headline */
  headlineMuted?: string;
  /** 4–6 cards. 4 → four columns on desktop; 5–6 → three columns, with 5 the first card is double width. */
  items: BentoItem[];
  className?: string;
};

/**
 * Bento Cards v1
 * Two-tone headline + a grid of equal-height cards (1 / 2 / 4 columns, or 3 columns for 5–6
 * cards). Each card has a label, an h3 title, optional body and a tone: "photo" fills the card
 * with the visual under a gradient, "dark" and "light" are solid surfaces with a visual slot in
 * the middle. Cards lift 4px on hover and the visual scales 1.03. With `href` the whole card is
 * a link (stretched from the title).
 */
export function BentoCards({ id = "bento", headline, headlineMuted, items, className = "" }: BentoCardsProps) {
  const headingId = `${id}-heading`;
  const n = items.length;
  const cols = n <= 4 ? "xl:grid-cols-4" : "xl:grid-cols-3";
  // With 5 cards on 3 (or 2) columns, a double-width first card fills every row
  const wideFirst = n > 4 && n % 3 === 2;

  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page px-5 py-16 md:px-10 md:py-24 xl:px-16 xl:py-[120px] ${className}`}>
      <Reveal className="mx-auto flex w-full max-w-[1312px] flex-col gap-8 md:gap-10 xl:gap-12">
        <h2
          {...reveal}
          id={headingId}
          className="max-w-[760px] text-balance text-[28px] font-normal leading-[1.06] tracking-[-0.04em] text-text-primary md:text-[36px] xl:text-[48px]"
        >
          <TwoTone text={headline} muted={headlineMuted} />
        </h2>

        <ul className={`grid w-full auto-rows-[400px] grid-cols-1 gap-3 md:auto-rows-[423px] md:grid-cols-2 xl:auto-rows-[364px] ${cols}`}>
          {items.map((item, i) => (
            <li key={i} {...reveal} className={`min-w-0 ${wideFirst && i === 0 ? "md:col-span-2" : ""}`}>
              <BentoCard item={item} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

const SURFACE: Record<BentoTone, string> = {
  photo: "bg-surface-card-dark text-text-on-dark",
  dark: "bg-surface-card-dark text-text-on-dark",
  light: "bg-surface-card-light text-text-primary",
};

function BentoCard({ item }: { item: BentoItem }) {
  const tone = item.tone ?? "light";
  const onDark = tone !== "light";
  const visualMotion = "transition-[translate,scale,opacity] duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none";

  return (
    <article
      className={`group relative flex h-full flex-col justify-between overflow-clip rounded-card p-6 transition-[translate,scale,opacity] duration-200 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-border-interactive ${SURFACE[tone]}`}
    >
      {tone === "photo" ? (
        <>
          <div aria-hidden className={`absolute inset-0 ${visualMotion}`}>
            {item.visual ?? <Placeholder tone="dark" label="Photo" />}
          </div>
          <div aria-hidden className="absolute inset-0 bg-linear-to-t from-surface-inverse/70 via-surface-inverse/10 to-transparent" />
        </>
      ) : null}

      <p className={`relative text-[13px] leading-[normal] ${onDark ? "text-text-on-dark/60" : "text-text-tertiary"}`}>{item.label}</p>

      {tone !== "photo" ? (
        <div className={`relative my-5 min-h-0 flex-1 overflow-clip rounded-tile border ${onDark ? "border-border-on-dark" : "border-border-06"} ${visualMotion}`}>
          {item.visual ?? <Placeholder tone={onDark ? "dark" : "light"} label="Mockup" />}
        </div>
      ) : null}

      <div className="relative flex flex-col gap-2">
        <h3 className="line-clamp-3 text-pretty text-[20px] font-medium leading-[1.3] tracking-[-0.02em]">
          {item.href ? (
            // Stretched link: the whole card is clickable, the accessible name stays the title
            <Link href={item.href} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
              {item.title}
            </Link>
          ) : (
            item.title
          )}
        </h3>
        {item.body ? <p className={`line-clamp-2 text-pretty text-[14px] leading-[1.5] ${onDark ? "text-text-on-dark/70" : "text-text-nav"}`}>{item.body}</p> : null}
      </div>
    </article>
  );
}
