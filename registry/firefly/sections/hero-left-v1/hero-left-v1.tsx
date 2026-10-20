import type { CSSProperties, ReactNode } from "react";
import { HeroCta, type CtaLink } from "@/components/ui/hero-cta";
import { Parallax } from "@/components/ui/parallax";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";

export type HeroLeftProps = {
  /** Section id (anchor). Also prefixes the heading id. */
  id?: string;
  /** Small mono uppercase line above the headline */
  eyebrow?: string;
  /** First, primary-coloured line of the h1 */
  headline: string;
  /** Grey second line of the h1 (stacked under the first) */
  headlineMuted: string;
  /** Lead paragraph in the right column (tablet+), under the headline on phones. Max 180 characters (3 lines at 20px). */
  body?: string;
  /** Primary pill. Defaults to "Join waitlist → #cta". */
  primaryCta?: CtaLink;
  /** Secondary pill. Defaults to "Book a demo → #cta"; null hides it. */
  secondaryCta?: CtaLink | null;
  /** Large visual under the copy. Defaults to a Placeholder; pass your <Image> or mockup. */
  visual?: ReactNode;
  /** CSS aspect-ratio of the visual frame, e.g. "1392 / 720" */
  visualRatio?: string;
  /** Optional taller frame below 768px, e.g. "350 / 420" (pass an art-directed <picture> as visual). Defaults to visualRatio. */
  visualRatioMobile?: string;
  className?: string;
};

/**
 * Hero Left v1
 * Hero Centered with the copy aligned left, the way the ElevenLabs home hero is laid out: the
 * stacked two-tone h1 (34/48/64px) and the CTA pair sit in the left column, the lead (17/18/20px)
 * sits in the right column vertically centred on the headline; on phones everything stacks left.
 * The visual underneath is identical to Hero Centered (clipped rounded frame, 300ms later reveal,
 * exit parallax). Top padding leaves room for a fixed nav (64px); bottom padding 64/80/96px.
 * Renders the page's only h1.
 */
/** Body limit: 3 lines in the right column at 20px (~60 characters per line). */
export const BODY_MAX = 180;

export function HeroLeft({
  id = "hero",
  eyebrow,
  headline,
  headlineMuted,
  body,
  primaryCta,
  secondaryCta,
  visual,
  visualRatio = "1392 / 720",
  visualRatioMobile,
  className = "",
}: HeroLeftProps) {
  const headingId = `${id}-heading`;
  if (process.env.NODE_ENV !== "production" && body && body.length > BODY_MAX) {
    console.warn(`HeroLeft: body is ${body.length} characters; keep it to ${BODY_MAX} so it stays on three lines.`);
  }

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`bg-surface-page px-5 pb-16 pt-[calc(64px+56px)] md:px-10 md:pb-20 md:pt-[calc(64px+80px)] xl:px-16 xl:pb-24 xl:pt-[calc(64px+120px)] ${className}`}
    >
      {/* Copy: headline + buttons left, lead right (tablet+) */}
      <Reveal stagger={100} className="mx-auto grid w-full max-w-[1392px] grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-12 md:items-center md:gap-y-10 xl:gap-x-16">
        <div className="flex flex-col items-start gap-4 md:col-span-7 md:gap-5">
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
          <p
            {...reveal}
            className="max-w-[560px] text-pretty text-[17px] leading-[1.4] tracking-[-0.01em] text-text-nav md:col-span-5 md:col-start-8 md:text-[18px] xl:text-[20px]"
          >
            {body}
          </p>
        ) : null}

        <div {...reveal} className="md:col-span-7 md:col-start-1 md:row-start-2">
          <HeroCta primary={primaryCta} secondary={secondaryCta} />
        </div>
      </Reveal>

      {/* Visual: identical to Hero Centered */}
      <Reveal delay={300} className="mx-auto mt-10 w-full max-w-[1392px] md:mt-14 xl:mt-16">
        <div {...reveal}>
          <Parallax distance={60} mode="exit">
            <div
              className="relative aspect-(--hero-ratio-mobile) w-full overflow-clip rounded-frame md:aspect-(--hero-ratio)"
              style={{ "--hero-ratio": visualRatio, "--hero-ratio-mobile": visualRatioMobile ?? visualRatio } as CSSProperties}
            >
              {visual ?? <Placeholder label="Hero visual" />}
            </div>
          </Parallax>
        </div>
      </Reveal>
    </section>
  );
}
