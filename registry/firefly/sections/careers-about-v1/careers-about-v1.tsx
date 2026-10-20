import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type CareersAboutProps = {
  /** Section id (anchor). Also prefixes the heading id. */
  id?: string;
  headline: string;
  /** Grey second half of the headline (optional: a short clause like "Who we are" stays one colour) */
  headlineMuted?: string;
  /** Short paragraphs, one per entry */
  paragraphs: string[];
  className?: string;
};

/**
 * Careers About v1
 * "Who we are": a section headline (28/32/40px) and a column of lead-size paragraphs (17/18/20px)
 * capped at 760px. Headline first, paragraphs stagger in after it.
 */
export function CareersAbout({ id = "about", headline, headlineMuted, paragraphs, className = "" }: CareersAboutProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page py-8 md:py-12 xl:py-[60px] ${className}`}>
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 xl:px-16">
        <Reveal>
          <h2 id={headingId} {...reveal} className="max-w-[1000px] text-balance text-[28px] leading-[1.2] tracking-[-0.02em] text-text-primary md:text-[32px] xl:text-[40px]">
            <TwoTone text={headline} muted={headlineMuted} />
          </h2>
          <div className="mt-10 flex max-w-[760px] flex-col gap-4 md:mt-14 md:gap-5 xl:mt-16">
            {paragraphs.map((p) => (
              <p key={p.slice(0, 32)} {...reveal} className="text-pretty text-[17px] leading-[1.4] tracking-[-0.01em] text-text-secondary md:text-[18px] xl:text-[20px]">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
