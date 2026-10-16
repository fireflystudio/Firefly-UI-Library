import type { ReactNode } from "react";
import { Parallax } from "@/components/ui/parallax";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type FeatureCheck = {
  title: string;
  body?: string;
};

export type FeatureRowChecksProps = {
  /** Section id (anchor) */
  id?: string;
  headline: string;
  /** Grey second half of the headline */
  headlineMuted?: string;
  items: FeatureCheck[];
  /** Fills the 720×560 frame. Defaults to a Placeholder; pass an <Image fill> or your own mockup. */
  visual?: ReactNode;
  /** Visual on the left on tablet/desktop (mobile is always copy first) */
  reverse?: boolean;
  className?: string;
};

/**
 * Feature Row Checks v1
 * The static sibling of Feature Row Interactive: a compact two-tone h2 at the top of the copy
 * column, a list of ✓ + title + body items at the bottom (every item open, no dividers,
 * 48px apart; 32px on tablet), and one shared 720×560 visual with a 30px parallax.
 * Copy column 400px on desktop, 300px on tablet.
 */
export function FeatureRowChecks({
  id = "feature-checks",
  headline,
  headlineMuted,
  items,
  visual,
  reverse = false,
  className = "",
}: FeatureRowChecksProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page px-5 py-16 md:px-10 md:py-24 xl:px-16 xl:py-[120px] ${className}`}>
      <Reveal
        className={`mx-auto flex w-full max-w-[1200px] flex-col gap-7 md:items-center md:gap-[22px] xl:items-stretch xl:gap-20 ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Copy */}
        <div className="flex w-full flex-col justify-between gap-12 pt-2 md:w-[300px] md:shrink-0 md:gap-8 xl:w-[400px]">
          <h2
            {...reveal}
            id={headingId}
            className="text-pretty text-[26px] font-normal leading-[1.1] tracking-[-0.025em] text-text-primary md:pr-6 md:text-[24px] xl:pr-8 xl:text-[32px]"
          >
            <TwoTone text={headline} muted={headlineMuted} />
          </h2>

          <ul className="flex flex-col gap-12 md:gap-8 xl:gap-12">
            {items.map((item) => (
              <li key={item.title} {...reveal} className="flex items-start gap-3">
                <CheckIcon className="mt-[3px] shrink-0 text-icon-primary" />
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="text-[16px] font-medium leading-[normal] text-text-primary">{item.title}</h3>
                  {item.body ? <p className="max-w-[340px] text-pretty text-[14px] font-normal leading-[1.55] text-text-nav">{item.body}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Visual */}
        <div {...reveal} className="w-full min-w-0 md:flex-1 xl:w-[720px] xl:flex-none xl:shrink-0">
          <Parallax distance={30}>
            <div className="relative aspect-[720/560] w-full overflow-clip rounded-chip bg-surface-muted md:rounded-tile xl:rounded-frame">
              <div className="absolute inset-0">{visual ?? <Placeholder label="Visual" />}</div>
            </div>
          </Parallax>
        </div>
      </Reveal>
    </section>
  );
}

function CheckIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" width="14" height="14" className={className}>
      <path d="M3 8.5 6.3 11.6 13 4.6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
