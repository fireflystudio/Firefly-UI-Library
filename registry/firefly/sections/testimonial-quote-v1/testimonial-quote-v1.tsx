import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";

export type TestimonialQuoteProps = {
  /** Section id (anchor) */
  id?: string;
  /** Dark section (default) or the light page background */
  tone?: "dark" | "light";
  /** Small mono label above the quote. When present it is the section heading (h2). */
  eyebrow?: string;
  /** The quote, without quotation marks (typographic “ ” are added unless `quoteMarks` is false) */
  quote: string;
  /** Wrap the quote in “ ” */
  quoteMarks?: boolean;
  name: string;
  /** Role / company line under the name */
  role?: string;
  /** 48px avatar slot (pass a round <Image>). Defaults to a neutral placeholder circle. */
  avatar?: ReactNode;
  /** Small company mark next to the attribution, separated by a hairline. Default none. */
  logo?: ReactNode;
  className?: string;
};

const TONES = {
  dark: {
    section: "bg-surface-dark text-text-on-dark",
    eyebrow: "text-text-on-dark/60",
    muted: "text-text-on-dark/60",
    avatar: "border-border-on-dark bg-text-on-dark/10 text-text-on-dark",
    divider: "border-border-on-dark",
  },
  light: {
    section: "bg-surface-page text-text-primary",
    eyebrow: "text-text-quaternary",
    muted: "text-text-nav",
    avatar: "border-border-10 bg-surface-muted text-text-quaternary",
    divider: "border-border-light",
  },
} as const;

/**
 * Testimonial Quote v1
 * One centred quote at the sub-headline size (22/24/28px, line-height 1.3, max 900px) with an attribution row:
 * 48px avatar, name (15px medium) and role (14px muted), plus an optional company mark.
 * `tone` switches between the dark section and the light page background. Eyebrow, quote and
 * attribution reveal one after another (90ms stagger). Section padding 64/96/120px.
 */
export function TestimonialQuote({
  id = "testimonial",
  tone = "dark",
  eyebrow,
  quote,
  quoteMarks = true,
  name,
  role,
  avatar,
  logo,
  className = "",
}: TestimonialQuoteProps) {
  const t = TONES[tone];
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={eyebrow ? headingId : undefined}
      aria-label={eyebrow ? undefined : "Testimonial"}
      className={`${t.section} px-5 py-16 md:px-10 md:py-24 xl:px-16 xl:py-[120px] ${className}`}
    >
      <Reveal className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-6 text-center md:gap-8">
        {eyebrow ? (
          <h2
            {...reveal}
            id={headingId}
            className={`font-mono text-[12px] font-normal uppercase leading-[normal] tracking-[0.08em] ${t.eyebrow}`}
          >
            {eyebrow}
          </h2>
        ) : null}

        <figure className="flex w-full flex-col items-center gap-8 md:gap-10">
          <blockquote
            {...reveal}
            className="max-w-[900px] text-balance text-[22px] font-normal leading-[1.3] tracking-[-0.02em] md:text-[24px] xl:text-[28px]"
          >
            <p>{quoteMarks ? `“${quote}”` : quote}</p>
          </blockquote>

          <figcaption {...reveal} className="flex items-center gap-4 text-left">
            <span className="shrink-0">{avatar ?? <DefaultAvatar className={t.avatar} />}</span>
            <cite className="flex min-w-0 flex-col gap-0.5 not-italic leading-[normal]">
              <span className="text-[15px] font-medium">{name}</span>
              {role ? <span className={`text-[14px] font-normal ${t.muted}`}>{role}</span> : null}
            </cite>
            {logo ? <span className={`ml-2 flex items-center self-stretch border-l pl-6 ${t.divider}`}>{logo}</span> : null}
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}

/** Content-free 48px circle (same hatched treatment as <Placeholder>). Decorative. */
function DefaultAvatar({ className }: { className: string }) {
  return (
    <span aria-hidden className={`relative block size-12 overflow-clip rounded-pill border ${className}`}>
      <span className="absolute inset-0 opacity-60 [background-image:repeating-linear-gradient(135deg,transparent_0_6px,color-mix(in_srgb,currentColor_14%,transparent)_6px_7px)]" />
    </span>
  );
}
