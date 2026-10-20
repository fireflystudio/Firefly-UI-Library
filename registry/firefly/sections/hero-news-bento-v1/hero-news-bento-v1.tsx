import Link from "next/link";
import type { ReactNode } from "react";
import { Parallax } from "@/components/ui/parallax";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";

export type NewsLead = {
  /** Small mono label, e.g. a category */
  kicker?: string;
  title: string;
  /** One-line standfirst under the title */
  dek?: string;
  href: string;
  /** Full-bleed image behind the text. Defaults to a dark Placeholder; pass <Image fill>. */
  image?: ReactNode;
};

export type NewsItem = {
  kicker?: string;
  title: string;
  href: string;
  /** 2:1 image slot at the top of the card. Defaults to a light Placeholder; null removes the slot. */
  image?: ReactNode | null;
};

export type HeroNewsBentoProps = {
  /** Section id (anchor). Also prefixes the heading id. */
  id?: string;
  /** Small mono uppercase line above the headline */
  eyebrow?: string;
  /** First, primary-coloured line of the h1 */
  headline: string;
  /** Grey second line of the h1 (stacked under the first) */
  headlineMuted: string;
  /** Short paragraph beside the headline */
  intro?: string;
  /** Large lead story */
  lead: NewsLead;
  /** 3–5 smaller stories */
  items: NewsItem[];
  className?: string;
};

const cardHover =
  "transition-[translate] duration-200 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0";
const mediaHover =
  "transition-[scale] duration-200 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100";
const kickerClass = "font-mono text-[12px] uppercase leading-[normal] tracking-[0.08em]";
/** Covers the whole card so the entire card is the link (the card is `relative`). */
const stretchedLink = "after:absolute after:inset-0 after:content-['']";

/** The grid reveals 250ms after the masthead; each card adds a 90ms step in DOM order. */
const GRID_DELAY = 250;
const CARD_STAGGER = 90;

/**
 * Hero News Bento v1
 * Editorial front page: masthead (eyebrow, stacked two-tone h1 at 34/48/64px, lead intro) above a story grid.
 * The lead story is a large dark card with the image behind a bottom gradient; 3–5 smaller
 * light cards show a kicker and title with an optional 2:1 image slot. One column on mobile
 * (lead as a 4:5 poster), two on tablet (lead full width at 16:9), on desktop the lead takes
 * the left 592/1312 and the small cards fill a 2-column grid beside it (an odd last card spans
 * both columns). Each card is its own reveal so cards below the fold wait until they scroll in;
 * when everything is in view they stagger 90ms in order. Cards lift 4px and their images scale
 * 1.03 on hover; the lead drifts ±30px as it crosses the viewport. Renders the page's only h1;
 * story titles are h3.
 */
export function HeroNewsBento({
  id = "hero",
  eyebrow,
  headline,
  headlineMuted,
  intro,
  lead,
  items,
  className = "",
}: HeroNewsBentoProps) {
  const headingId = `${id}-heading`;
  const oddCount = items.length % 2 === 1;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`bg-surface-page px-5 pb-16 pt-[calc(64px+56px)] md:px-10 md:pb-20 md:pt-[calc(64px+80px)] xl:px-16 xl:pb-24 xl:pt-[calc(64px+120px)] ${className}`}
    >
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10 md:gap-14 xl:gap-16">
        {/* Masthead */}
        <Reveal stagger={100} className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between xl:gap-16">
          <div className="flex min-w-0 flex-col items-start gap-4 md:gap-5">
            {eyebrow ? (
              <p {...reveal} className={`${kickerClass} text-text-quaternary`}>
                {eyebrow}
              </p>
            ) : null}
            <h1
              id={headingId}
              className="max-w-[760px] text-balance text-[34px] font-normal leading-[1.04] tracking-[-0.03em] text-text-primary md:text-[48px] xl:text-[64px]"
            >
              <span {...reveal} className="block">
                {headline}
              </span>
              <span {...reveal} className="block text-text-muted">
                {headlineMuted}
              </span>
            </h1>
          </div>
          {intro ? (
            <p {...reveal} className="max-w-[520px] text-pretty text-[17px] leading-[1.4] tracking-[-0.01em] text-text-nav md:text-[18px] xl:text-[20px] xl:max-w-[440px] xl:pb-2">
              {intro}
            </p>
          ) : null}
        </Reveal>

        {/* Front page */}
        <div className="grid grid-cols-1 gap-5 md:gap-6 xl:grid-cols-[minmax(0,592fr)_minmax(0,704fr)]">
          {/* Lead story: its own reveal, parallax "through" on this card only */}
          <Reveal {...reveal} delay={GRID_DELAY} className="min-w-0">
            <Parallax distance={30} className="h-full">
              <LeadCard {...lead} />
            </Parallax>
          </Reveal>

          {/* Smaller stories */}
          <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:auto-rows-fr">
            {items.map((item, i) => (
              <Reveal
                key={item.href + i}
                {...reveal}
                delay={GRID_DELAY + CARD_STAGGER * (i + 1)}
                className={`min-w-0 ${oddCount && i === items.length - 1 ? "md:col-span-2" : ""}`}
              >
                <StoryCard {...item} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadCard({ kicker, title, dek, href, image }: NewsLead) {
  return (
    <article
      className={`group relative isolate flex aspect-[4/5] h-full w-full flex-col justify-end gap-3 overflow-clip rounded-frame bg-surface-inverse p-5 text-text-on-dark md:aspect-[16/9] md:p-6 xl:aspect-[592/560] xl:p-8 ${cardHover}`}
    >
      <div className={`absolute inset-0 -z-10 ${mediaHover}`}>
        {image ?? (
          /* Label pinned to the top so it never sits behind the story text */
          <Placeholder tone="dark" label="Lead image" style={{ alignItems: "flex-start", paddingTop: 24 }} />
        )}
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-b from-transparent from-30% to-surface-inverse/80" />
      {kicker ? <p className={`${kickerClass} text-text-on-dark/70`}>{kicker}</p> : null}
      <h3 className="max-w-[18em] text-balance text-[22px] font-normal leading-[1.3] tracking-[-0.02em] md:text-[24px] xl:text-[28px]">
        <Link href={href} className={stretchedLink}>
          {title}
        </Link>
      </h3>
      {dek ? <p className="max-w-[480px] text-pretty text-[15px] leading-[1.55] text-text-on-dark/70 md:text-[16px]">{dek}</p> : null}
    </article>
  );
}

function StoryCard({ kicker, title, href, image }: NewsItem) {
  const hasImage = image !== null;
  return (
    <article
      className={`group relative flex h-full w-full flex-col overflow-clip rounded-frame border border-border-06 bg-surface-primary ${cardHover}`}
    >
      {hasImage ? (
        <div className="relative aspect-[2/1] w-full overflow-clip">
          <div className={`absolute inset-0 ${mediaHover}`}>{image ?? <Placeholder label="Image" />}</div>
        </div>
      ) : null}
      <div className={`flex flex-1 flex-col p-5 ${hasImage ? "gap-3" : "justify-between gap-8"}`}>
        {kicker ? <p className={`${kickerClass} text-text-quaternary`}>{kicker}</p> : null}
        <h3 className="text-pretty text-[18px] font-medium leading-[1.3] tracking-[-0.01em] text-text-primary md:text-[19px] xl:text-[20px]">
          <Link href={href} className={stretchedLink}>
            {title}
          </Link>
        </h3>
      </div>
    </article>
  );
}
