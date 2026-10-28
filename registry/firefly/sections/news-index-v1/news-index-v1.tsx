"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
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
  /** Artwork (an <Image fill>). 16:9 above the card, cropped to 2:1 as the list row thumbnail.
   *  Without it the card and the row are type only. */
  image?: ReactNode;
};

export type NewsView = "grid" | "list";
export type NewsColumns = 3 | 4 | 5;

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
  /** Cards per row on a wide screen. The design is drawn at 5. */
  columns?: NewsColumns;
  /** Hide the 3 / 4 / 5 picker and stay at `columns`. */
  resizable?: boolean;
  /** Shown instead of the items when a filter matches nothing. */
  emptyText?: string;
  /** Width + side padding of the content column (match the site's other sections). */
  containerClassName?: string;
  className?: string;
};

/** Cards per row, and how that row collapses on smaller screens. */
const GRID: Record<NewsColumns, string> = {
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-3 xl:grid-cols-4",
  5: "grid-cols-1 md:grid-cols-3 xl:grid-cols-5",
};

/** Headlines shrink as the row gets denser, so a card never runs to six lines. */
const TITLE: Record<NewsColumns, string> = {
  3: "text-[18px] md:text-[19px] xl:text-[20px]",
  4: "text-[17px] md:text-[17px] xl:text-[18px]",
  5: "text-[17px] md:text-[16px] xl:text-[17px]",
};

/**
 * News Index v1
 * The body of a news page: a row of category filters, the grid / list switch with a 3 / 4 / 5
 * picker beside it, and the stories in whichever view is on.
 *
 * Grid = a picture with the category, the headline and the read time underneath it, straight on
 * the page. No frame, no card: the artwork is the edge. List = full-width rows separated by
 * hairlines, a 2:1 thumbnail, the headline, and the category on the right, which is the view for
 * skimming a lot of stories.
 *
 * Hovering only pushes the picture in by 3%: nothing about the type moves, so a row of headlines
 * stays still while the reader runs down it.
 *
 * Filtering, the view and the row width are client state, and the list is re-revealed on every
 * change (a keyed <Reveal>), so filtered-in stories fade in instead of staying at opacity 0.
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
  columns = 5,
  resizable = true,
  emptyText = "Nothing here yet. Try another category.",
  containerClassName = "max-w-content",
  className = "",
}: NewsIndexProps) {
  const headingId = `${id}-heading`;
  const [active, setActive] = useState<string | null>(null);
  const [view, setView] = useState<NewsView>(defaultView);
  const [cols, setCols] = useState<NewsColumns>(columns);

  const shown = useMemo(() => (active ? items.filter((i) => i.category === active) : items), [active, items]);
  const hasControls = categories.length > 0 || switchable;

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
        {hasControls ? (
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
                          : "border-border-10 text-text-tertiary hover:border-border-24 hover:text-text-primary"
                      }`}
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>

            {switchable ? (
              <div className="ml-auto flex shrink-0 items-center gap-1">
                {/* How many fit across. One button that draws the current width; the options are
                    behind it. Only at xl, where the row is wide enough to tell 3 from 5. */}
                {resizable && view === "grid" ? (
                  <>
                    <ColumnsMenu cols={cols} onPick={setCols} />
                    <span aria-hidden className="mx-2 hidden h-5 w-px bg-border-10 xl:block" />
                  </>
                ) : null}

                <div className="flex items-center gap-1" role="group" aria-label="View">
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
              </div>
            ) : null}
          </div>
        ) : null}

        {/* Keyed so a filter, a view or a width change remounts the reveal and the new stories
            fade in. Without the key they would render with the hidden state and never be told
            to come back. */}
        <Reveal key={`${view}-${cols}-${active ?? "all"}`} stagger={45} amount={0}>
          {shown.length === 0 ? (
            <p className="mt-10 text-[16px] leading-[1.55] text-text-tertiary md:mt-14">{emptyText}</p>
          ) : view === "grid" ? (
            <ul className={`grid gap-x-5 gap-y-10 md:gap-x-6 md:gap-y-12 ${GRID[cols]} ${hasControls ? "mt-8 md:mt-10" : ""}`}>
              {shown.map((item) => (
                <li key={item.href} {...reveal} className="min-w-0">
                  <Link
                    href={item.href}
                    className="group block rounded-tile focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-border-interactive"
                  >
                    {item.image ? (
                      <span className="relative block aspect-[16/9] w-full overflow-hidden rounded-tile bg-surface-muted">
                        <span className="absolute inset-0 block transition-[scale] duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none">
                          {item.image}
                        </span>
                      </span>
                    ) : null}
                    {item.category ? (
                      <span className="mt-4 block text-[13px] leading-[1.4] text-text-tertiary">{item.category}</span>
                    ) : null}
                    <h3 className={`mt-1.5 text-pretty font-medium leading-[1.35] tracking-[-0.01em] text-text-primary ${TITLE[cols]}`}>
                      {item.title}
                    </h3>
                    {item.meta ? (
                      <span className="mt-2 block text-[13px] leading-[1.4] text-text-quaternary">{item.meta}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className={`flex flex-col ${hasControls ? "mt-6 md:mt-8" : ""}`}>
              {shown.map((item) => (
                <li key={item.href} {...reveal}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 border-t border-border-10 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive md:gap-6 md:py-6"
                  >
                    {item.image ? (
                      <span className="relative block aspect-[2/1] w-[96px] shrink-0 overflow-hidden rounded-tile bg-surface-muted md:w-[160px] xl:w-[200px]">
                        <span className="absolute inset-0 block transition-[scale] duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none">
                          {item.image}
                        </span>
                      </span>
                    ) : null}
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="text-pretty text-[16px] font-medium leading-[1.4] tracking-[-0.01em] text-text-primary md:text-[17px] xl:text-[18px]">
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

/** The row width, drawn: three wide bars, four, or five narrow ones. */
function ColumnsIcon({ n, size = 18 }: { n: NewsColumns; size?: number }) {
  const gap = 1.8;
  const span = 18;
  const w = (span - gap * (n - 1)) / n;
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" focusable="false">
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={3 + i * (w + gap)} y={5.5} width={w} height={13} rx={1} fill="currentColor" />
      ))}
    </svg>
  );
}

/**
 * The 3 / 4 / 5 picker: one icon button showing the width that is on, and the other two behind it.
 * Closes on a pick, on Escape and on a click anywhere else.
 */
function ColumnsMenu({ cols, onPick }: { cols: NewsColumns; onPick: (n: NewsColumns) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative hidden xl:block">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Cards per row: ${cols}`}
        onClick={() => setOpen((o) => !o)}
        className={`flex size-9 cursor-pointer items-center justify-center rounded-pill transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive ${
          open ? "bg-surface-muted text-text-primary" : "text-text-quaternary hover:text-text-primary"
        }`}
      >
        <ColumnsIcon n={cols} />
      </button>

      {open ? (
        <div
          role="menu"
          aria-label="Cards per row"
          className="absolute right-0 top-[calc(100%+8px)] z-20 w-[164px] rounded-card bg-surface-primary p-1.5 shadow-[var(--shadow-card-drop),0_0_0_0.5px_var(--color-border-16)]"
        >
          {([3, 4, 5] as const).map((n) => {
            const on = cols === n;
            return (
              <button
                key={n}
                type="button"
                role="menuitemradio"
                aria-checked={on}
                onClick={() => {
                  onPick(n);
                  setOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-s px-2.5 py-2 text-left text-[14px] leading-[1.2] transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-border-interactive ${
                  on ? "bg-surface-muted text-text-primary" : "text-text-secondary hover:bg-surface-muted"
                }`}
              >
                <ColumnsIcon n={n} size={16} />
                <span>{n} per row</span>
                {on ? (
                  <svg viewBox="0 0 24 24" width="15" height="15" className="ml-auto" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
