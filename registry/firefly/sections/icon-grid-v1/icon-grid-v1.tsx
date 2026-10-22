import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { Placeholder } from "@/components/ui/placeholder";
import { TwoTone } from "@/components/ui/two-tone";

export type IconGridItem = {
  title: string;
  body?: string;
  /** 24px mark inside the tile. A Placeholder tile is used when nothing is passed. */
  icon?: ReactNode;
  /** Fills the tile behind the icon (a photo or a gradient) and drops the hairline: use on one item at most. */
  tileBackground?: ReactNode;
};

export type IconGridProps = {
  id?: string;
  headline: string;
  /** Grey second half of the headline. */
  headlineMuted?: string;
  /** Short paragraph under the headline. */
  intro?: string;
  items: IconGridItem[];
  /** Headline max width; pages with a long headline can widen it. */
  headlineClassName?: string;
  /**
   * When a `tileBackground` shows. "always" (default) paints it straight away; "hover" keeps the
   * tile plain like the rest and fades the background in when the item is hovered or focused.
   */
  tileBackgroundOn?: "always" | "hover";
  className?: string;
};

/**
 * Icon Grid v1
 * A headline over a grid of plain items: an 80px rounded tile with a 24px mark, a title and two
 * lines of copy. Three columns on desktop, two on tablet, one on mobile, with generous row gaps
 * and no card borders — the lightest way to show six capabilities without six boxes.
 *
 * One item may carry `tileBackground` (a photo or gradient behind its mark), which gives the grid
 * a single point of colour — painted straight away, or faded in on hover with `tileBackgroundOn`. The title nudges 5px right on hover, like every other list row in the
 * house style; everything rises in on scroll, staggered.
 *
 * Seeded from the Solve "problems" section (2026-10-22) and generalised: no copy, no brand, icons
 * and the highlight passed in as nodes.
 */
export function IconGrid({
  id = "features",
  headline,
  headlineMuted,
  intro,
  items,
  headlineClassName = "max-w-[900px]",
  tileBackgroundOn = "always",
  className = "",
}: IconGridProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`bg-surface-page px-5 py-16 md:px-10 md:py-24 xl:px-16 xl:py-[120px] ${className}`}
    >
      <Reveal className="mx-auto max-w-[1200px]">
        <h2
          id={headingId}
          {...reveal}
          className={`${headlineClassName} text-pretty text-[28px] leading-[1.2] tracking-[-0.02em] text-text-primary md:text-[32px] xl:text-[40px]`}
        >
          <TwoTone text={headline} muted={headlineMuted} />
        </h2>

        {intro ? (
          <p
            {...reveal}
            className="mt-4 max-w-[640px] text-pretty text-[17px] leading-[1.4] tracking-[-0.01em] text-text-nav md:mt-5 md:text-[18px] xl:text-[20px]"
          >
            {intro}
          </p>
        ) : null}

        <ul className="mt-10 grid gap-y-12 md:mt-14 md:grid-cols-2 md:gap-x-6 md:gap-y-[72px] xl:mt-16 xl:grid-cols-3 xl:gap-y-20">
          {items.map((item) => (
            <li key={item.title} {...reveal} className="group flex flex-col items-start">
              {item.tileBackground ? (
                <div
                  className={`relative flex size-20 items-center justify-center overflow-clip rounded-icon-tile ${
                    tileBackgroundOn === "hover" ? "border border-border-10" : "bg-surface-muted"
                  }`}
                >
                  <div
                    aria-hidden
                    className={`absolute inset-0 ${
                      tileBackgroundOn === "hover"
                        ? "opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
                        : ""
                    }`}
                  >
                    {item.tileBackground}
                  </div>
                  <div className="relative">{item.icon}</div>
                </div>
              ) : (
                <div className="flex size-20 items-center justify-center rounded-icon-tile border border-border-10">
                  {item.icon ?? <Placeholder label="" className="size-6" />}
                </div>
              )}

              <h3 className="mt-5 text-pretty text-[18px] font-medium leading-[1.3] tracking-[-0.01em] text-text-primary transition-[translate] duration-200 ease-out group-hover:translate-x-[5px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 md:text-[19px] xl:text-[20px]">
                {item.title}
              </h3>
              {item.body ? (
                <p className="mt-3 text-pretty text-[15px] leading-[1.55] text-text-tertiary md:text-[16px]">{item.body}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
