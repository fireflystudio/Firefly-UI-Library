import type { CSSProperties, ReactNode } from "react";
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
  /** Short paragraph under the headline. Max 120 characters so it stays on 2 lines (tablet + desktop). */
  body?: string;
  /** Dark pill. Defaults to "Join waitlist → #cta". */
  primaryCta?: CtaLink;
  /** Ghost pill. Defaults to "Book a demo → #cta"; null hides it. */
  secondaryCta?: CtaLink | null;
  /** Large visual under the copy. Defaults to a Placeholder; pass your <Image> or mockup. */
  visual?: ReactNode;
  /** CSS aspect-ratio of the visual frame, e.g. "1392 / 720" */
  visualRatio?: string;
  /** Optional taller frame below 768px, e.g. "350 / 420" (pass an art-directed <picture> as visual). Defaults to visualRatio. */
  visualRatioMobile?: string;
  /**
   * Width of the visual's frame. The default 1392px is wider than a 1200px content column on
   * purpose; a site whose sections stop at a narrower column should pass that column here, or the
   * hero hangs past every edge below it on a wide screen.
   */
  visualClassName?: string;
  className?: string;
};

/**
 * Hero Centered v1
 * Centred copy block (eyebrow, stacked two-tone h1 at 34/44/56px, lead at 17/18/20px, CTA pair) with a
 * large visual underneath in a clipped rounded frame. On load the copy reveals line by line
 * (100ms stagger), the visual follows 300ms later and drifts down up to 60px as it scrolls
 * out. Top padding leaves room for a fixed nav (64px); bottom padding 64/80/96px. Renders the page's only h1.
 *
 * The frame is 1392px wide by default, which is wider than a 1200px content column. On a site
 * whose sections stop at a narrower column, pass that column as `visualClassName`, otherwise the
 * hero sticks out past the nav and every section under it once the screen is wider than the frame.
 */
/** Body limit: 2 lines at 600px / 20px (~60 characters per line). */
export const BODY_MAX = 120;

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
  visualRatioMobile,
  visualClassName = "max-w-[1392px]",
  className = "",
}: HeroCenteredProps) {
  const headingId = `${id}-heading`;
  if (process.env.NODE_ENV !== "production" && body && body.length > BODY_MAX) {
    console.warn(`HeroCentered: body is ${body.length} characters; keep it to ${BODY_MAX} so it stays on two lines.`);
  }

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`bg-surface-page px-5 pb-16 pt-[calc(64px+56px)] md:px-10 md:pb-20 md:pt-[calc(64px+80px)] xl:px-16 xl:pb-24 xl:pt-[calc(64px+120px)] ${className}`}
    >
      {/* Copy */}
      <Reveal stagger={100} className="mx-auto flex w-full max-w-[1100px] flex-col items-center gap-8 text-center md:gap-10">
        <div className="flex flex-col items-center gap-4 md:gap-5">
          {eyebrow ? (
            <p {...reveal} className="font-mono text-[12px] uppercase leading-[normal] tracking-[0.08em] text-text-quaternary">
              {eyebrow}
            </p>
          ) : null}
          <h1
            id={headingId}
            className="text-balance text-[34px] font-normal leading-[1.06] tracking-[-0.03em] text-text-primary md:text-[44px] xl:text-[56px]"
          >
            <span {...reveal} className="block">
              {headline}
            </span>
            <span {...reveal} className="block text-text-muted">
              {headlineMuted}
            </span>
          </h1>
          {body ? (
            <p {...reveal} className="max-w-[600px] text-pretty text-[17px] leading-[1.4] tracking-[-0.01em] text-text-nav md:text-[18px] xl:text-[20px]">
              {body}
            </p>
          ) : null}
        </div>
        <div {...reveal}>
          <HeroCta primary={primaryCta} secondary={secondaryCta} className="justify-center" />
        </div>
      </Reveal>

      {/* Visual */}
      <Reveal delay={300} className={`mx-auto mt-10 w-full md:mt-14 xl:mt-16 ${visualClassName}`}>
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
