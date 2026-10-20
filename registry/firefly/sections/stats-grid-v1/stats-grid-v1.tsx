import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type Stat = { value: string; label: string };

export type StatsGridQuote = {
  /** The quote without quotation marks; the component adds them. */
  text: string;
  author: string;
  role?: string;
};

export type StatsGridProps = {
  /** Section id (anchor) */
  id?: string;
  /** "dark" (default): dark surface, light text. "light": page background, ink text. */
  tone?: "dark" | "light";
  /** Small mono label above the headline (or above the quote when there is no headline) */
  eyebrow?: string;
  /** Optional two-tone heading. Without it a visually hidden heading (eyebrow or "Key figures") names the section for assistive tech. */
  headline?: string;
  /** Grey second half of the headline */
  headlineMuted?: string;
  /** Large quote shown beside the heading (or on its own) */
  quote?: StatsGridQuote;
  /** 3–4 stats. From tablet up the grid has as many columns as stats (max 4); 2 columns on mobile. */
  stats: Stat[];
  className?: string;
};

const tones = {
  dark: {
    section: "bg-surface-dark text-text-on-dark",
    muted: "text-text-on-dark/60",
    hairline: "border-border-on-dark",
  },
  light: {
    section: "bg-surface-page text-text-primary",
    muted: "text-text-nav",
    hairline: "border-border-light",
  },
} as const;

/**
 * Stats Grid v1
 * A dark (or light) section with an optional two-tone heading, an optional large quote with
 * attribution, and a grid of 3–4 big numbers (32/40/48px) with a hairline above each. Values nudge 5px right
 * on hover (translate only). Heading, quote and every stat reveal on scroll, staggered.
 */
export function StatsGrid({
  id = "results",
  tone = "dark",
  eyebrow,
  headline,
  headlineMuted,
  quote,
  stats,
  className = "",
}: StatsGridProps) {
  const headingId = `${id}-heading`;
  const t = tones[tone];
  const twoColumnHeader = Boolean(headline && quote);
  const hasHeader = Boolean(eyebrow || headline || quote);
  const columns = stats.length <= 2 ? "md:grid-cols-2" : stats.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4";

  return (
    <section id={id} aria-labelledby={headingId} className={`${t.section} px-5 py-16 md:px-10 md:py-24 xl:px-16 xl:py-[120px] ${className}`}>
      <Reveal className="mx-auto flex max-w-[1200px] flex-col gap-10 md:gap-14 xl:gap-16">
        {headline ? null : (
          <h2 id={headingId} className="sr-only">
            {eyebrow ?? "Key figures"}
          </h2>
        )}

        {hasHeader ? (
          <div className={`flex flex-col gap-8 ${twoColumnHeader ? "md:grid md:grid-cols-2 md:items-start md:gap-x-12 xl:gap-x-20" : ""}`}>
            {eyebrow || headline ? (
              <div className="flex flex-col items-start gap-5 md:gap-6">
                {eyebrow ? (
                  <p {...reveal} className={`font-mono text-[12px] font-medium uppercase leading-[normal] tracking-[0.08em] ${t.muted}`}>
                    {eyebrow}
                  </p>
                ) : null}
                {headline ? (
                  <h2
                    {...reveal}
                    id={headingId}
                    className="text-balance text-[28px] font-normal leading-[1.2] tracking-[-0.02em] md:text-[32px] xl:text-[40px]"
                  >
                    <TwoTone text={headline} muted={headlineMuted} onDark={tone === "dark"} />
                  </h2>
                ) : null}
              </div>
            ) : null}

            {quote ? (
              <figure {...reveal} className={twoColumnHeader ? "md:pt-1" : "max-w-[880px]"}>
                <blockquote className="text-pretty text-[22px] font-normal leading-[1.3] tracking-[-0.02em] md:text-[24px] xl:text-[28px]">
                  <p>“{quote.text}”</p>
                </blockquote>
                <figcaption className="mt-6 flex flex-col gap-0.5 text-[14px] leading-[1.4]">
                  <cite className="font-medium not-italic">{quote.author}</cite>
                  {quote.role ? <span className={t.muted}>{quote.role}</span> : null}
                </figcaption>
              </figure>
            ) : null}
          </div>
        ) : null}

        <ul className={`grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-6 ${columns}`}>
          {stats.map((stat) => (
            <li key={`${stat.value}-${stat.label}`} {...reveal} className={`group flex min-w-0 flex-col gap-4 border-t pt-5 md:pt-6 ${t.hairline}`}>
              {/* Hover: the value nudges 5px right (translate only); the reveal sits on the <li> */}
              <p className="text-[32px] font-normal leading-[1] tracking-[-0.03em] tabular-nums transition-[translate] duration-200 ease-out group-hover:translate-x-[5px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 md:text-[40px] xl:text-[48px]">
                {stat.value}
              </p>
              <p className={`max-w-[220px] text-pretty text-[14px] leading-[1.5] ${t.muted}`}>{stat.label}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
