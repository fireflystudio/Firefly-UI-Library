import type { ReactNode } from "react";
import { HeroCta, type CtaLink } from "@/components/ui/hero-cta";
import { Parallax } from "@/components/ui/parallax";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";

export type HeroPortraitProps = {
  id?: string;
  /** Primary part of the headline; words reveal one by one */
  headline: string;
  /** Grey second part of the headline, continues inline */
  headlineMuted?: string;
  body?: string;
  primaryCta?: CtaLink;
  /** null hides the second pill */
  secondaryCta?: CtaLink | null;
  /** Portrait visual on the left. Defaults to a placeholder; pass your <Image fill> or mockup. */
  visual?: ReactNode;
  /** CSS aspect-ratio of the visual frame */
  visualRatio?: string;
  className?: string;
};

/**
 * Hero Portrait v1
 * Portrait-ratio visual on the left (full width on mobile, ~46% on tablet, 600px on desktop),
 * copy on the right: h1 revealing word by word (muted part continues inline), body and the CTA
 * pair. The visual follows the copy by 300ms and drifts down on scroll (exit parallax 60px).
 * Renders the page <h1>. Top padding assumes a fixed nav (64px).
 */
export function HeroPortrait({
  id = "hero",
  headline,
  headlineMuted,
  body,
  primaryCta,
  secondaryCta,
  visual,
  visualRatio = "600 / 640",
  className = "",
}: HeroPortraitProps) {
  const headingId = `${id}-heading`;
  const words = [
    ...headline.split(" ").map((word) => ({ word, muted: false })),
    ...(headlineMuted ? headlineMuted.split(" ").map((word) => ({ word, muted: true })) : []),
  ];

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`overflow-x-clip bg-surface-page pb-14 pt-[calc(64px+20px)] md:pb-[72px] md:pt-[calc(64px+24px)] xl:pb-24 xl:pt-[calc(64px+32px)] ${className}`}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 md:flex-row md:items-center md:pl-6 md:pr-10 xl:gap-20 xl:pl-8 xl:pr-[clamp(40px,calc(100vw-1320px),120px)]">
        {/* Visual: slightly delayed after the copy */}
        <Reveal delay={300} className="w-full md:w-[max(380px,46%)] md:shrink-0 xl:w-[600px]">
          <div {...reveal}>
            <Parallax distance={60} mode="exit">
              <div className="relative w-full overflow-clip rounded-chip xl:rounded-tile" style={{ aspectRatio: visualRatio }}>
                {visual ?? <Placeholder label="Portrait" />}
              </div>
            </Parallax>
          </div>
        </Reveal>

        {/* Copy */}
        <Reveal stagger={60} className="flex min-w-0 flex-col items-start gap-7 md:flex-1 xl:max-w-[608px]">
          <h1
            id={headingId}
            className="text-pretty text-[32px] font-normal leading-[1.06] tracking-[-0.03em] text-text-primary md:max-w-[350px] md:text-[40px] xl:max-w-[520px] xl:text-[64px]"
          >
            {words.map(({ word, muted }, i) => (
              <span key={i}>
                {i > 0 && " "}
                <span {...reveal} className={`inline-block${muted ? " text-text-muted" : ""}`}>
                  {word}
                </span>
              </span>
            ))}
          </h1>
          {body ? (
            <p {...reveal} className="text-pretty text-[16px] leading-[1.5] text-text-nav md:max-w-[350px] xl:max-w-[460px]">
              {body}
            </p>
          ) : null}
          <div {...reveal}>
            <HeroCta primary={primaryCta} secondary={secondaryCta} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
