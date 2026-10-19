import type { ReactNode } from "react";
import { HeroCta, type CtaLink } from "@/components/ui/hero-cta";
import { Parallax } from "@/components/ui/parallax";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";

export type HeroCenteredProps = {
  /** Section id (anchor). Also prefixes the heading id. */
  id?: string;
  /** Small mono uppercase line above the headline */
  eyebrow?: string;
  /** First, primary-coloured line of the h1 */
  headline: string;
  /** Grey second line of the h1 (stacked under the first) */
  headlineMuted: string;
  /** Short paragraph under the headline */
  body?: string;
  /** Dark pill. Defaults to "Join waitlist → #cta". */
  primaryCta?: CtaLink;
  /** Ghost pill. Defaults to "Book a demo → #cta"; null hides it. */
  secondaryCta?: CtaLink | null;
  /** Large visual under the copy. Defaults to a Placeholder; pass your <Image> or mockup. */
  visual?: ReactNode;
  /** CSS aspect-ratio of the visual frame, e.g. "1392 / 720" */
  visualRatio?: string;
  className?: string;
};

/**
 * Hero Centered v1
 * Centred copy block (eyebrow, stacked two-tone h1 at 34/48/64px, body, CTA pair) with a
 * large visual underneath in a clipped rounded frame. On load the copy reveals line by line
 * (100ms stagger), the visual follows 300ms later and drifts down up to 60px as it scrolls
 * out. Top padding leaves room for a fixed nav (64px). Renders the page's only h1.
 */
export function HeroCentered({
  id = "hero",
  eyebrow,
  headline,
  headlineMuted,
  body,
  primaryCta,
  secondaryCta,
  visual,
  visualRatio = "1392 / 720",
  className = "",
}: HeroCenteredProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`bg-surface-page px-5 pb-14 pt-[calc(64px+56px)] md:px-10 md:pb-20 md:pt-[calc(64px+80px)] xl:px-16 xl:pb-24 xl:pt-[calc(64px+120px)] ${className}`}
    >
      {/* Copy */}
      <Reveal stagger={100} className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-6 text-center md:gap-8">
        <div className="flex flex-col items-center gap-4 md:gap-5">
          {eyebrow ? (
            <p {...reveal} className="font-mono text-[12px] uppercase leading-[normal] tracking-[0.08em] text-text-quaternary">
              {eyebrow}
            </p>
          ) : null}
          <h1
            id={headingId}
            className="text-balance text-[34px] font-normal leading-[1.04] tracking-[-0.03em] text-text-primary md:text-[48px] xl:text-[64px]"
          >
            <span {...reveal} className="block">
              {headline}
            </span>
            <span {...reveal} className="block text-text-muted">
              {headlineMuted}
            </span>
          </h1>
        </div>
        {body ? (
          <p {...reveal} className="max-w-[560px] text-pretty text-[16px] leading-[1.55] text-text-nav md:text-[18px]">
            {body}
          </p>
        ) : null}
        <div {...reveal}>
          <HeroCta primary={primaryCta} secondary={secondaryCta} className="justify-center" />
        </div>
      </Reveal>

      {/* Visual */}
      <Reveal delay={300} className="mx-auto mt-10 w-full max-w-[1392px] md:mt-12 xl:mt-14">
        <div {...reveal}>
          <Parallax distance={60} mode="exit">
            <div className="relative w-full overflow-clip rounded-frame" style={{ aspectRatio: visualRatio }}>
              {visual ?? <Placeholder label="Hero visual" />}
            </div>
          </Parallax>
        </div>
      </Reveal>
    </section>
  );
}
