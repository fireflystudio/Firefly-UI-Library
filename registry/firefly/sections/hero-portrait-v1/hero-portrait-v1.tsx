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
 * copy on the right: h1 (34/48/64px) revealing word by word (muted part continues inline), lead
 * and the CTA pair. The visual follows the copy by 300ms and drifts down on scroll (exit parallax
 * 60px). Renders the page <h1>. Hero rhythm: top = nav 64 + 56/80/120px, bottom 64/80/96px.
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
      className={`overflow-x-clip bg-surface-page pb-16 pt-[calc(64px+56px)] md:pb-20 md:pt-[calc(64px+80px)] xl:pb-24 xl:pt-[calc(64px+120px)] ${className}`}
    >
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 md:flex-row md:items-center md:pl-6 md:pr-10 xl:gap-20 xl:pl-8 xl:pr-[clamp(40px,calc(100vw-1320px),120px)]">
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
        <Reveal stagger={60} className="flex min-w-0 flex-col items-start gap-8 md:flex-1 md:gap-10 xl:max-w-[608px]">
          <div className="flex flex-col items-start gap-4 md:gap-5">
            <h1
              id={headingId}
              className="text-pretty text-[34px] font-normal leading-[1.04] tracking-[-0.03em] text-text-primary md:text-[48px] xl:max-w-[520px] xl:text-[64px]"
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
              <p {...reveal} className="text-pretty text-[17px] leading-[1.4] tracking-[-0.01em] text-text-nav md:text-[18px] xl:text-[20px] md:max-w-[360px] xl:max-w-[480px]">
                {body}
              </p>
            ) : null}
          </div>
          <div {...reveal}>
            <HeroCta primary={primaryCta} secondary={secondaryCta} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
