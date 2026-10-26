import type { ReactNode } from "react";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

/** A point is either a plain line, or a figure with the line that explains it. */
export type ComparePoint = string | { value: string; label: string };

export type ComparePanel = {
  /** Short lead line above the list (card title: 18 / 19 / 20px medium) */
  title?: string;
  /** 3–5 short points */
  points: ComparePoint[];
  /** Closing line under the list, in the panel's quiet colour. */
  footnote?: string;
  /** Visual above the list. Defaults to a 4:3 Placeholder in the panel's tone; pass null to leave it out. */
  visual?: ReactNode;
};

export type BeforeAfterCompareProps = {
  /** Section id (anchor) */
  id?: string;
  headline: string;
  /** Grey second half of the headline */
  headlineMuted?: string;
  /** One or two sentences under the headline */
  intro?: string;
  /** Mono label of the left, neutral panel */
  beforeLabel?: string;
  /** Mono label of the right, dark panel */
  afterLabel?: string;
  before: ComparePanel;
  after: ComparePanel;
  className?: string;
};

/**
 * Before/After Compare v1
 * Two-tone headline above two rounded panels, side by side from tablet up and stacked on
 * mobile. The "before" panel is neutral (muted surface, dash markers, grey copy); the "after"
 * panel is dark (check markers, light copy). Each panel has a mono label, an optional visual
 * (Placeholder by default), an optional lead line, 3–5 hairline-separated points and an optional
 * closing line. A point can be a plain sentence or a `{ value, label }` figure row, which gives the
 * panel the density of a results table rather than a bullet list. Panels
 * lift 2px on hover (translate only). Headline, intro and both panels reveal on scroll, the
 * after panel one step later.
 */
export function BeforeAfterCompare({
  id = "compare",
  headline,
  headlineMuted,
  intro,
  beforeLabel = "Before",
  afterLabel = "After",
  before,
  after,
  className = "",
}: BeforeAfterCompareProps) {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page px-5 py-16 md:px-10 md:py-24 xl:px-16 xl:py-[120px] ${className}`}>
      <Reveal className="mx-auto flex max-w-content flex-col gap-10 md:gap-14 xl:gap-16">
        <div className="flex max-w-[720px] flex-col items-start gap-4 md:gap-5">
          <h2
            {...reveal}
            id={headingId}
            className="text-balance text-[28px] font-normal leading-[1.2] tracking-[-0.02em] text-text-primary md:text-[32px] xl:text-[40px]"
          >
            <TwoTone text={headline} muted={headlineMuted} />
          </h2>
          {intro ? (
            <p {...reveal} className="max-w-[600px] text-pretty text-[17px] leading-[1.4] tracking-[-0.01em] text-text-nav md:text-[18px] xl:text-[20px]">
              {intro}
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          <Panel id={`${id}-before`} label={beforeLabel} panel={before} dark={false} />
          <Panel id={`${id}-after`} label={afterLabel} panel={after} dark />
        </div>
      </Reveal>
    </section>
  );
}

function Panel({ id, label, panel, dark }: { id: string; label: string; panel: ComparePanel; dark: boolean }) {
  const visual = panel.visual === undefined ? <Placeholder label="Visual" ratio="4 / 3" tone={dark ? "dark" : "light"} /> : panel.visual;

  return (
    // The reveal sits on this wrapper; the card below has its own hover transition
    <div {...reveal} className="min-w-0">
      <article
        aria-labelledby={id}
        className={`flex h-full flex-col gap-6 rounded-frame p-6 transition-[translate] duration-200 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-7 xl:gap-8 xl:p-10 ${
          dark ? "bg-surface-card-dark text-text-on-dark" : "bg-surface-muted text-text-primary"
        }`}
      >
        <h3 id={id} className={`font-mono text-[12px] font-medium uppercase leading-[normal] tracking-[0.08em] ${dark ? "text-text-on-dark/60" : "text-text-nav"}`}>
          {label}
        </h3>

        {visual ? <div className={`overflow-clip rounded-tile border ${dark ? "border-border-dark" : "border-border-light"}`}>{visual}</div> : null}

        <div className="flex flex-col gap-4">
          {panel.title ? <p className="text-pretty text-[18px] font-medium leading-[1.3] tracking-[-0.01em] md:text-[19px] xl:text-[20px]">{panel.title}</p> : null}
          <ul className="flex flex-col">
            {panel.points.map((point) => {
              const figure = typeof point === "object";
              const key = figure ? point.value + point.label : point;
              return (
                <li
                  key={key}
                  className={`flex items-start gap-3 border-t py-3 text-pretty text-[15px] leading-[1.55] first:border-t-0 md:text-[16px] first:pt-0 last:pb-0 ${
                    dark ? "border-border-dark text-text-on-dark" : "border-border-light text-text-nav"
                  }`}
                >
                  <span aria-hidden className={`mt-[3px] flex size-4 shrink-0 items-center justify-center ${dark ? "text-text-on-dark" : "text-text-quaternary"}`}>
                    {dark ? <CheckIcon /> : <DashIcon />}
                  </span>
                  {figure ? (
                    /* Figure rows: the number carries the weight, the line beside it explains it. */
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                      <span className={`shrink-0 text-[20px] font-medium leading-[1.2] tracking-[-0.02em] tabular-nums sm:w-[108px] xl:text-[22px] ${dark ? "text-text-on-dark" : "text-text-primary"}`}>
                        {point.value}
                      </span>
                      <span className="min-w-0">{point.label}</span>
                    </span>
                  ) : (
                    <span className="min-w-0">{point}</span>
                  )}
                </li>
              );
            })}
          </ul>
          {panel.footnote ? (
            <p className={`text-pretty text-[14px] leading-[1.5] ${dark ? "text-text-on-dark/60" : "text-text-quaternary"}`}>{panel.footnote}</p>
          ) : null}
        </div>
      </article>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M3.5 8h9" />
    </svg>
  );
}
