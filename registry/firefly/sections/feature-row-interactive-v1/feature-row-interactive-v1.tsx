"use client";

import { useId, useState, type ReactNode } from "react";
import { Parallax } from "@/components/ui/parallax";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type FeatureStep = {
  title: string;
  body: string;
  /** Shown in the visual frame while this step is open. Defaults to a Placeholder labelled with the title. */
  visual?: ReactNode;
};

export type FeatureRowInteractiveProps = {
  /** Section id (anchor) */
  id?: string;
  headline: string;
  /** Grey second half of the headline */
  headlineMuted?: string;
  /** Put the grey half on its own line (as Steps Cards does), instead of running it on. */
  headlineStack?: boolean;
  /** Optional lead under the headline; without it the component looks exactly as before. */
  intro?: string;
  items: FeatureStep[];
  /** Visual on the left on tablet/desktop (mobile is always copy first) */
  reverse?: boolean;
  /** Index of the step open on load */
  defaultActive?: number;
  className?: string;
};

/**
 * Feature Row Interactive v1
 * Copy column (two-tone Section h2 at 28/32/40px at the top, step list at the bottom; 300px on tablet, on desktop
 * whatever the content width leaves next to the 720px frame: 400px at 1200, more on wide sites) next to a 720×560
 * visual frame with a 30px parallax. The steps are an accordion:
 * one open at a time (black title + body fading in), the others grey (black on hover with a
 * small arrow sliding in). Opening a step crossfades the frame to that step's `visual`
 * (opacity + slight rise/scale, 500ms; hidden layers are inert).
 */
export function FeatureRowInteractive({
  id = "feature-row",
  headline,
  headlineMuted,
  headlineStack = false,
  intro,
  items,
  reverse = false,
  defaultActive = 0,
  className = "",
}: FeatureRowInteractiveProps) {
  const headingId = `${id}-heading`;
  const uid = useId();
  const [active, setActive] = useState(() => Math.min(Math.max(defaultActive, 0), items.length - 1));

  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page px-5 py-16 md:px-10 md:py-24 xl:px-16 xl:py-[120px] ${className}`}>
      <Reveal
        className={`mx-auto flex w-full max-w-content flex-col gap-10 md:items-center md:gap-[22px] xl:items-stretch xl:gap-20 ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Copy */}
        <div className="flex w-full flex-col justify-between gap-10 pt-2 md:w-[300px] md:shrink-0 md:gap-8 xl:w-auto xl:min-w-0 xl:flex-1">
          <h2
            {...reveal}
            id={headingId}
            className="text-balance text-[28px] font-normal leading-[1.2] tracking-[-0.02em] text-text-primary md:text-[32px] xl:pr-8 xl:text-[40px]"
          >
            <TwoTone text={headline} muted={headlineMuted} stack={headlineStack} />
          </h2>

          {intro ? (
            <p {...reveal} className="-mt-4 max-w-[420px] text-pretty text-[15px] leading-[1.55] text-text-nav md:-mt-4 md:text-[16px]">
              {intro}
            </p>
          ) : null}

          <ul {...reveal} className="flex w-full flex-col">
            {items.map((item, i) => {
              const open = i === active;
              const buttonId = `${uid}-button-${i}`;
              const panelId = `${uid}-panel-${i}`;
              return (
                <li key={item.title} className={`flex w-full flex-col ${i > 0 ? "border-t border-border-light" : ""}`}>
                  <h3 className="text-[16px] font-medium leading-[normal] md:text-[17px] xl:text-[18px]">
                    <button
                      id={buttonId}
                      type="button"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setActive(i)}
                      className={`group/step flex w-full items-center justify-between gap-3 py-4 text-left ${
                        open ? "cursor-default pb-2 text-text-primary" : "cursor-pointer text-text-nav hover:text-text-primary"
                      }`}
                    >
                      <span>{item.title}</span>
                      <ArrowIcon
                        className={`shrink-0 text-icon-tertiary transition-[opacity,translate] duration-200 ease-out motion-reduce:transition-none ${
                          open
                            ? "opacity-0"
                            : "-translate-x-1 opacity-0 group-hover/step:translate-x-0 group-hover/step:opacity-100 group-focus-visible/step:translate-x-0 group-focus-visible/step:opacity-100"
                        }`}
                      />
                    </button>
                  </h3>
                  <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
                    <p
                      key={open ? "open" : "closed"}
                      className="max-w-[480px] text-pretty pb-4 text-[15px] font-normal leading-[1.55] text-text-nav motion-safe:animate-[feature-in_0.45s_var(--ease-out-soft)_both] md:text-[16px]"
                    >
                      {item.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Visual */}
        <div {...reveal} className="w-full min-w-0 md:flex-1 xl:w-[720px] xl:flex-none xl:shrink-0">
          <Parallax distance={30}>
            <div className="relative aspect-[720/560] w-full overflow-clip rounded-chip bg-surface-muted md:rounded-tile xl:rounded-frame">
              {items.map((item, i) => {
                const current = i === active;
                return (
                  <div
                    key={item.title}
                    aria-hidden={!current}
                    inert={!current}
                    className={`absolute inset-0 transition-[opacity,translate,scale] duration-500 ease-out-soft motion-reduce:transition-none ${
                      current ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-3 scale-[0.98] opacity-0"
                    }`}
                  >
                    {item.visual ?? <Placeholder label={item.title} />}
                  </div>
                );
              })}
            </div>
          </Parallax>
        </div>
      </Reveal>
    </section>
  );
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" width="14" height="14" className={className}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
