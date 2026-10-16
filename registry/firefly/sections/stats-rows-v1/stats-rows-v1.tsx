import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type StatsRowItem = {
  /** Large figure on the left: a step number ("01"), a ratio ("3×") or a short value ("12 min") */
  value: string;
  title: string;
  description?: string;
};

export type StatsRowsProps = {
  /** Section id (anchor) */
  id?: string;
  /** Small mono label above the headline */
  eyebrow?: string;
  headline: string;
  /** Grey second half of the headline */
  headlineMuted?: string;
  /** One or two sentences under the headline */
  intro?: string;
  items: StatsRowItem[];
  /** Ghost pill under the headline. null hides it. */
  cta?: { label: string; href: string } | null;
  className?: string;
};

/**
 * Stats Rows v1
 * Two-tone headline (optional eyebrow, intro and ghost pill) above a list of rows separated by
 * hairlines. Each row: a large value or number on the left, a title and a short description on
 * the right — a three-column grid from tablet up, stacked on mobile. Hovering a row nudges the
 * value 5px to the right (translate only). Headline and every row reveal on scroll, staggered.
 */
export function StatsRows({
  id = "stats",
  eyebrow,
  headline,
  headlineMuted,
  intro,
  items,
  cta = { label: "Book a demo", href: "#cta" },
  className = "",
}: StatsRowsProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page px-5 py-16 md:px-10 md:py-24 xl:px-16 xl:py-[120px] ${className}`}>
      <Reveal className="mx-auto flex max-w-[1200px] flex-col gap-10 md:gap-14 xl:gap-20">
        <div className="flex max-w-[720px] flex-col items-start gap-5 md:gap-6">
          {eyebrow ? (
            <p {...reveal} className="font-mono text-[12px] font-medium uppercase leading-[normal] tracking-[0.08em] text-text-nav">
              {eyebrow}
            </p>
          ) : null}
          <h2
            {...reveal}
            id={headingId}
            className="text-balance text-[28px] font-normal leading-[1.1] tracking-[-0.03em] text-text-primary md:text-[36px] xl:text-[48px]"
          >
            <TwoTone text={headline} muted={headlineMuted} />
          </h2>
          {intro ? (
            <p {...reveal} className="max-w-[560px] text-pretty text-[16px] leading-[1.55] text-text-nav">
              {intro}
            </p>
          ) : null}
          {cta ? (
            <div {...reveal} className="pt-1">
              <Button href={cta.href} variant="ghost">
                {cta.label}
              </Button>
            </div>
          ) : null}
        </div>

        <ul className="flex flex-col border-b border-border-light">
          {items.map((item) => (
            <li
              key={`${item.value}-${item.title}`}
              {...reveal}
              className="group flex flex-col gap-3 border-t border-border-light py-6 md:grid md:grid-cols-[112px_minmax(0,1fr)_minmax(0,1.4fr)] md:items-baseline md:gap-x-8 md:gap-y-0 md:py-8 xl:grid-cols-[200px_minmax(0,1fr)_minmax(0,1.4fr)] xl:gap-x-12 xl:py-10"
            >
              {/* Hover: the value nudges 5px right (translate only); the reveal sits on the <li> */}
              <p className="text-[32px] font-normal leading-[1] tracking-[-0.03em] text-text-primary tabular-nums transition-[translate] duration-200 ease-out group-hover:translate-x-[5px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 xl:text-[40px]">
                {item.value}
              </p>
              <h3 className="text-pretty text-[18px] font-medium leading-[1.3] tracking-[-0.01em] text-text-primary">{item.title}</h3>
              {item.description ? (
                <p className="max-w-[480px] text-pretty text-[15px] leading-[1.55] text-text-nav">{item.description}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
