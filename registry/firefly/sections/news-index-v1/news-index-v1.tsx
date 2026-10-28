"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type NewsItem = {
  title: string;
  href: string;
  /** Category label; must match one of `categories` for the filter to find it. */
  category?: string;
  /** Read time or date, e.g. "3 min read" */
  meta?: string;
  /** 16:9 artwork for the grid card (an <Image fill>). Without it the card is type only. */
  image?: ReactNode;
};

export type NewsView = "grid" | "list";

export type NewsIndexProps = {
  /** Section id (anchor) */
  id?: string;
  /** Visible section headline. Without one the heading is there for screen readers only. */
  headline?: string;
  /** Grey second half of the headline */
  headlineMuted?: string;
  /** Filters, in order. "All" is added in front on its own. */
  categories?: string[];
  allLabel?: string;
  items: NewsItem[];
  /** The view the page opens in. */
  defaultView?: NewsView;
  /** Hide the grid / list switch and stay in `defaultView`. */
  switchable?: boolean;
  /** Shown instead of the items when a filter matches nothing. */
  emptyText?: string;
  /** Width + side padding of the content column (match the site's other sections). */
  containerClassName?: string;
  className?: string;
};

/**
 * News Index v1
 * The body of a news page: a row of category filters, a grid / list switch, and the stories in
 * whichever view is on. Grid = three cards across on desktop (two on tablet, one on a phone), each
 * with an optional 16:9 image, the category, the headline and the read time. List = full-width
 * rows separated by hairlines, the headline on the left and the category on the right, which is
 * the view for skimming a lot of stories.
 *
 * Filtering and the switch are client state; both views render the same items, so nothing is lost
 * when the reader switches. Cards lift 3px on hover and row titles nudge 5px right, like every
 * other list in the house style.
 */
export function NewsIndex({
  id = "news",
  headline,
  headlineMuted,
  categories = [],
  allLabel = "All",
  items,
  defaultView = "grid",
  switchable = true,
  emptyText = "Nothing here yet. Try another category.",
  containerClassName = "max-w-content",
  className = "",
}: NewsIndexProps) {
  const headingId = `${id}-heading`;
  const [active, setActive] = useState<string | null>(null);
  const [view, setView] = useState<NewsView>(defaultView);

  const shown = useMemo(() => (active ? items.filter((i) => i.category === active) : items), [active, items]);

  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page px-5 md:px-10 xl:px-16 ${className}`}>
      <Reveal className={`mx-auto w-full ${containerClassName}`}>
        {headline ? (
          <h2
            id={headingId}
            {...reveal}
            className="mb-8 max-w-[760px] text-balance text-[28px] font-normal leading-[1.2] tracking-[-0.02em] text-text-primary md:mb-10 md:text-[32px] xl:text-[40px]"
          >
            <TwoTone text={headline} muted={headlineMuted} />
          </h2>
        ) : (
          <h2 id={headingId} className="sr-only">
            All stories
          </h2>
        )}
        {/* Without filters and without the switch there is nothing to show here, so the row goes:
            a lone "All" chip above three related stories is a control that does nothing. */}
        {categories.length || switchable ? (
        <div {...reveal} className="flex flex-wrap items-center justify-between gap-4">
          <ul className="flex min-w-0 flex-wrap items-center gap-2">
            {(categories.length ? [null, ...categories] : []).map((cat) => {
              const on = cat === active;
              const label = cat ?? allLabel;
              return (
                <li key={label}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setActive(cat)}
                    className={`cursor-pointer rounded-pill border px-4 py-2 text-[13px] leading-[1.2] transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive md:text-[14px] ${
                      on
                        ? "border-text-primary bg-text-primary text-text-on-dark"
                        : "border-border-10 text-text-tertiary hover:border-border-20 hover:text-text-primary"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>

          {switchable ? (
            <div className="ml-auto flex shrink-0 items-center gap-1" role="group" aria-label="View">
              <ViewButton label="Grid view" on={view === "grid"} onClick={() => setView("grid")}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
                  <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
                  <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
                  <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
                </svg>
              </ViewButton>
              <ViewButton label="List view" on={view === "list"} onClick={() => setView("list")}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />
                </svg>
              </ViewButton>
            </div>
          ) : null}
        </div>
        ) : null}

        {shown.length === 0 ? (
          <p className="mt-10 text-[16px] leading-[1.55] text-text-tertiary md:mt-14">{emptyText}</p>
        ) : view === "grid" ? (
          <ul className={`grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 xl:grid-cols-3 ${categories.length || switchable ? "mt-8 md:mt-10" : ""}`}>
            {shown.map((item) => (
              <li key={item.href} {...reveal} className="min-w-0">
                <Link
                  href={item.href}
                  className="group flex h-full flex-col overflow-hidden rounded-tile border border-border-10 transition-[translate] duration-200 ease-out hover:-translate-y-[3px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  {item.image ? (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-muted">
                      <div className="absolute inset-0 transition-[scale] duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none">{item.image}</div>
                    </div>
                  ) : null}
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    {item.category ? (
                      <p className="text-[13px] leading-[1.4] text-text-tertiary md:text-[14px]">{item.category}</p>
                    ) : null}
                    <h3 className="mt-2 text-pretty text-[18px] font-medium leading-[1.3] tracking-[-0.01em] text-text-primary transition-[translate] duration-200 ease-out group-hover:translate-x-[5px] motion-reduce:transition-none md:text-[19px] xl:text-[20px]">
                      {item.title}
                    </h3>
                    {item.meta ? (
                      <p className="mt-auto pt-5 text-[13px] leading-[1.4] text-text-quaternary md:text-[14px]">{item.meta}</p>
                    ) : null}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <ul className={`flex flex-col ${categories.length || switchable ? "mt-6 md:mt-8" : ""}`}>
            {shown.map((item) => (
              <li key={item.href} {...reveal}>
                <Link
                  href={item.href}
                  className="group flex items-start gap-6 border-t border-border-10 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive md:py-6"
                >
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-pretty text-[16px] font-medium leading-[1.4] tracking-[-0.01em] text-text-primary transition-[translate] duration-200 ease-out group-hover:translate-x-[5px] motion-reduce:transition-none md:text-[17px] xl:text-[18px]">
                      {item.title}
                    </span>
                    {item.meta ? (
                      <span className="mt-1.5 text-[13px] leading-[1.4] text-text-quaternary md:text-[14px]">{item.meta}</span>
                    ) : null}
                  </span>
                  {item.category ? (
                    <span className="shrink-0 pt-0.5 text-[13px] leading-[1.4] text-text-tertiary md:text-[14px]">{item.category}</span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </section>
  );
}

function ViewButton({ label, on, onClick, children }: { label: string; on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={on}
      onClick={onClick}
      className={`flex size-9 cursor-pointer items-center justify-center rounded-pill transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive ${
        on ? "bg-surface-muted text-text-primary" : "text-text-quaternary hover:text-text-primary"
      }`}
    >
      {children}
    </button>
  );
}
