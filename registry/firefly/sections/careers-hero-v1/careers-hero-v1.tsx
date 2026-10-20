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
  /** Width + side padding of the content column, so it lines up with the site's nav and footer. Default = the library column (1072px at 1440). */
  containerClassName?: string;
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
  containerClassName = "max-w-[1200px] px-5 md:px-10 xl:px-16",
  className = "",
}: CareersHeroProps) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`bg-surface-page pb-8 pt-[calc(64px+56px)] md:pb-12 md:pt-[calc(64px+80px)] xl:pb-[60px] xl:pt-[calc(64px+120px)] ${className}`}
    >
      <div className={`mx-auto ${containerClassName}`}>
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
