import type { CSSProperties, ReactNode } from "react";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type CareersHeroProps = {
  /** Section id (anchor). Also prefixes the heading id. */
  id?: string;
  /** First, primary-coloured line of the h1 */
  headline: string;
  /** Grey second line of the h1 */
  headlineMuted: string;
  /** Wide visual under the headline (team photo). Defaults to a Placeholder; pass your <Image fill>. */
  visual?: ReactNode;
  /** CSS aspect-ratio of the visual frame from 768px up */
  visualRatio?: string;
  /** Aspect ratio below 768px */
  visualRatioMobile?: string;
  className?: string;
};

/**
 * Careers Hero v1
 * Centred stacked two-tone h1 (34/48/64px) and a wide clipped frame for a team photo underneath.
 * The headline reveals first, the visual follows 300ms later. Top padding leaves room for a fixed
 * 64px nav; bottom padding 64/80/96px. Renders the page's only h1.
 */
export function CareersHero({
  id = "careers-hero",
  headline,
  headlineMuted,
  visual,
  visualRatio = "1200 / 520",
  visualRatioMobile = "4 / 3",
  className = "",
}: CareersHeroProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`bg-surface-page pb-16 pt-[calc(64px+56px)] md:pb-20 md:pt-[calc(64px+80px)] xl:pb-24 xl:pt-[calc(64px+120px)] ${className}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 xl:px-16">
        <Reveal stagger={100} className="flex flex-col items-center">
          <h1
            id={headingId}
            {...reveal}
            className="max-w-[1000px] text-balance text-center text-[34px] leading-[1.04] tracking-[-0.03em] text-text-primary md:text-[48px] xl:text-[64px]"
          >
            <TwoTone text={headline} muted={headlineMuted} stack />
          </h1>
        </Reveal>
        <Reveal delay={300} amount={0.1}>
          <div
            {...reveal}
            style={{ "--ratio-m": visualRatioMobile, "--ratio": visualRatio } as CSSProperties}
            className="relative mt-10 aspect-[var(--ratio-m)] w-full overflow-clip rounded-card md:mt-14 md:aspect-[var(--ratio)] xl:mt-16"
          >
            {visual ?? <Placeholder label="Team photo" />}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
