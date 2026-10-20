import type { CSSProperties, ReactNode } from "react";
import { Button } from "@/components/ui/button";
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
  /** Short lead under the headline (two lines at 600px). */
  body?: string;
  /** Primary pill under the lead; defaults to "See open roles → #open-roles" (the Careers Roles section id). null hides it. */
  cta?: { label: string; href: string } | null;
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
 * Centred stacked two-tone h1 (30/40/48px: a subpage, smaller than the site hero), a two-line lead, a primary pill
 * that scrolls to the roles list, and a wide clipped frame for a team photo underneath.
 * The headline reveals first, the visual follows 300ms later. Top padding leaves room for a fixed
 * 64px nav; bottom padding 64/80/96px. Renders the page's only h1.
 */
export function CareersHero({
  id = "careers-hero",
  headline,
  headlineMuted,
  body,
  cta = { label: "See open roles", href: "#open-roles" },
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
            className="max-w-[1000px] text-balance text-center text-[30px] leading-[1.1] tracking-[-0.025em] text-text-primary md:text-[40px] xl:text-[48px]"
          >
            <TwoTone text={headline} muted={headlineMuted} stack />
          </h1>
          {body ? (
            <p {...reveal} className="mt-4 max-w-[640px] text-balance text-center text-[17px] leading-[1.4] tracking-[-0.01em] text-text-secondary md:mt-5 md:text-[18px] xl:text-[20px]">
              {body}
            </p>
          ) : null}
          {cta ? (
            <div {...reveal} className="mt-8 md:mt-10">
              <Button href={cta.href} variant="primary" size="lg">
                {cta.label}
              </Button>
            </div>
          ) : null}
        </Reveal>
        <Reveal delay={300} amount={0.1}>
          <div
            {...reveal}
            style={{ "--ratio-m": visualRatioMobile, "--ratio": visualRatio } as CSSProperties}
            className="relative mt-10 aspect-[var(--ratio-m)] w-full overflow-clip rounded-card md:mt-12 md:aspect-[var(--ratio)] xl:mt-14"
          >
            {visual ?? <Placeholder label="Team photo" />}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
