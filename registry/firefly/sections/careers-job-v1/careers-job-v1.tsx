import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";

export type JobSection = {
  title: string;
  /** Short line above the bullets (e.g. "In this role, you will:") */
  lead?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type CareersJobProps = {
  /** Section id (anchor). Also prefixes the heading id. */
  id?: string;
  /** Link back to the roles list. null hides it. */
  back?: { label: string; href: string } | null;
  title: string;
  /** Short facts shown as chips under the title (level, type, location) */
  tags?: string[];
  /** Primary pill under the chips; defaults to "Apply for this role → #apply". null hides it. */
  cta?: { label: string; href: string } | null;
  /** Paragraphs shared by every role, above the first section */
  intro?: string[];
  sections: JobSection[];
  className?: string;
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * Careers Job v1
 * A role page: back link, title (the page's h1, 32/40/48px), fact chips, an "Apply" pill that scrolls
 * to the form, shared intro paragraphs, then the role's sections (sub-headline h2 + paragraphs and/or
 * bullet list). Narrow 760px column. Each section reveals on its own as it scrolls in.
 */
export function CareersJob({
  id = "job",
  back = { label: "All open roles", href: "/careers" },
  title,
  tags = [],
  cta = { label: "Apply for this role", href: "#apply" },
  intro = [],
  sections,
  className = "",
}: CareersJobProps) {
  const headingId = `${id}-heading`;
  return (
    <article id={id} aria-labelledby={headingId} className={`bg-surface-page pt-[calc(64px+56px)] md:pt-[calc(64px+80px)] xl:pt-[calc(64px+120px)] ${className}`}>
      <div className="mx-auto max-w-[760px] px-5 md:px-10">
        <Reveal as="header" stagger={80}>
          {back ? (
            <Link
              href={back.href}
              {...reveal}
              className="inline-flex items-center gap-2 text-[13px] leading-[1.5] text-text-tertiary transition-opacity duration-200 ease-out hover:opacity-60 motion-reduce:transition-none md:text-[14px]"
            >
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M11 18l-6-6 6-6" />
              </svg>
              {back.label}
            </Link>
          ) : null}

          <h1 id={headingId} {...reveal} className="mt-6 max-w-[1000px] text-balance text-[30px] leading-[1.1] tracking-[-0.025em] text-text-primary md:mt-8 md:text-[40px] xl:text-[48px]">
            {title}
          </h1>

          {tags.length ? (
            <ul {...reveal} className="mt-4 flex flex-wrap gap-2 md:mt-5" aria-label="Role details">
              {tags.map((tag) => (
                <li key={tag} className="rounded-pill border border-border-10 px-4 py-2 text-[13px] leading-[1.2] text-text-secondary md:text-[14px]">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          {cta ? (
            <div {...reveal} className="mt-8 md:mt-10">
              <Button href={cta.href} variant="primary" size="lg">
                {cta.label}
              </Button>
            </div>
          ) : null}

          {intro.length ? (
            <div {...reveal} className="mt-10 flex flex-col gap-4 border-t border-border-10 pt-8 md:mt-14 md:pt-10 xl:mt-16">
              {intro.map((p) => (
                <p key={p.slice(0, 32)} className="text-pretty text-[15px] leading-[1.55] text-text-secondary md:text-[16px]">
                  {p}
                </p>
              ))}
            </div>
          ) : null}
        </Reveal>

        {sections.map((section) => {
          const sectionId = `${id}-${slugify(section.title)}`;
          return (
            <Reveal key={section.title} as="section" aria-labelledby={sectionId} amount={0.15} className="mt-10 md:mt-12">
              <h2 id={sectionId} {...reveal} className="text-[22px] leading-[1.3] tracking-[-0.02em] text-text-primary md:text-[24px] xl:text-[28px]">
                {section.title}
              </h2>
              {section.paragraphs?.map((p) => (
                <p key={p.slice(0, 32)} {...reveal} className="mt-4 text-pretty text-[15px] leading-[1.55] text-text-secondary md:text-[16px]">
                  {p}
                </p>
              ))}
              {section.lead ? (
                <p {...reveal} className="mt-4 text-[15px] leading-[1.55] text-text-secondary md:text-[16px]">
                  {section.lead}
                </p>
              ) : null}
              {section.bullets?.length ? (
                <ul {...reveal} className="mt-4 flex flex-col gap-2.5">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] leading-[1.55] text-text-secondary md:text-[16px]">
                      <span aria-hidden="true" className="mt-[0.7em] block size-1.5 shrink-0 rounded-pill bg-text-quaternary" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          );
        })}
      </div>
    </article>
  );
}
