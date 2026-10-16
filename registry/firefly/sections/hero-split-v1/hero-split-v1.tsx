import type { ReactNode } from "react";
import { HeroCta, type CtaLink } from "@/components/ui/hero-cta";
import { Parallax } from "@/components/ui/parallax";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type HeroSplitProps = {
  /** Section id (anchor). Also prefixes the heading id. */
  id?: string;
  /** Small mono uppercase line above the headline */
  eyebrow?: string;
  /** First, primary-coloured part of the h1 */
  headline: string;
  /** Grey second half of the h1 (runs on inline) */
  headlineMuted: string;
  /** Short paragraph under the headline */
  body?: string;
  /** Dark pill. Defaults to "Join waitlist → #cta". */
  primaryCta?: CtaLink;
  /** Ghost pill. Defaults to "Book a demo → #cta"; null hides it. */
  secondaryCta?: CtaLink | null;
  /** Small mono line under the buttons, e.g. "No credit card needed" */
  note?: string;
  /** Visual in the second column. Defaults to a Placeholder; pass your <Image> or mockup. */
  visual?: ReactNode;
  /** CSS aspect-ratio of the visual frame, e.g. "720 / 560" */
  visualRatio?: string;
  /** Put the visual on the left (tablet and up). Mobile always stacks copy first. */
  reverse?: boolean;
  className?: string;
};

/**
 * Hero Split v1
 * Two columns from tablet up (copy 6/12, then 5/12 on desktop; visual takes the rest), stacked
 * on mobile with the copy first. Left-aligned two-tone h1 at 34/44/56px, body, CTA pair and an
 * optional mono note. The copy reveals on load (100ms stagger); the visual follows 300ms later
 * and drifts down up to 60px as it scrolls out. `reverse` swaps the columns on tablet and up.
 * Top padding leaves room for a fixed nav (72px / 76px). Renders the page's only h1.
 */
export function HeroSplit({
  id = "hero",
  eyebrow,
  headline,
  headlineMuted,
  body,
  primaryCta,
  secondaryCta,
  note,
  visual,
  visualRatio = "720 / 560",
  reverse = false,
  className = "",
}: HeroSplitProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`bg-surface-page px-5 pb-14 pt-[calc(72px+56px)] md:px-10 md:pb-20 md:pt-[calc(76px+80px)] xl:px-16 xl:pb-24 xl:pt-[calc(76px+120px)] ${className}`}
    >
      <div className="mx-auto grid max-w-[1312px] grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-8 xl:gap-12">
        {/* Copy */}
        <Reveal stagger={100} className="flex min-w-0 flex-col items-start gap-6 md:col-span-6 md:gap-7 xl:col-span-5">
          <div className="flex flex-col items-start gap-4 md:gap-5">
            {eyebrow ? (
              <p {...reveal} className="font-mono text-[12px] uppercase leading-[normal] tracking-[0.08em] text-text-quaternary">
                {eyebrow}
              </p>
            ) : null}
            <h1
              {...reveal}
              id={headingId}
              className="text-balance text-[34px] font-normal leading-[1.04] tracking-[-0.03em] text-text-primary md:text-[44px] xl:text-[56px]"
            >
              <TwoTone text={headline} muted={headlineMuted} />
            </h1>
          </div>
          {body ? (
            <p {...reveal} className="max-w-[480px] text-pretty text-[16px] leading-[1.55] text-text-nav md:text-[17px] xl:text-[18px]">
              {body}
            </p>
          ) : null}
          <div className="flex flex-col items-start gap-4">
            <div {...reveal}>
              <HeroCta primary={primaryCta} secondary={secondaryCta} />
            </div>
            {note ? (
              <p {...reveal} className="font-mono text-[12px] leading-[normal] tracking-[0.02em] text-text-quaternary">
                {note}
              </p>
            ) : null}
          </div>
        </Reveal>

        {/* Visual */}
        <Reveal delay={300} className={`min-w-0 md:col-span-6 xl:col-span-7 ${reverse ? "md:order-first" : ""}`}>
          <div {...reveal}>
            <Parallax distance={60} mode="exit">
              <div className="relative w-full overflow-clip rounded-frame" style={{ aspectRatio: visualRatio }}>
                {visual ?? <Placeholder label="Hero visual" />}
              </div>
            </Parallax>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
