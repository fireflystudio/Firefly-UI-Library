import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type StepCard = {
  title: string;
  body: string;
  /** 72px icon or illustration. Defaults to a numbered tile (01, 02 …). */
  icon?: ReactNode;
};

export type StepsCardsProps = {
  id?: string;
  headline: string;
  /** Grey second part of the heading, on its own line */
  headlineMuted?: string;
  /** Short paragraph to the right of the heading (desktop) */
  intro?: string;
  /** 3–6 steps, in order */
  steps: StepCard[];
  className?: string;
};

/**
 * Steps Cards v1
 * A process in a row: two-tone heading with an intro on the right, then one card per step.
 * Desktop: all steps side by side as bordered cards. Tablet: a 3-column wrapping grid.
 * Mobile: stacked rows separated by a hairline, no card border. Cards lift 3px on hover and
 * the icon nudges 5px right. Each step is a reveal child.
 */
export function StepsCards({ id = "steps", headline, headlineMuted, intro, steps, className = "" }: StepsCardsProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page px-5 py-14 md:px-10 md:py-[72px] xl:px-16 xl:py-20 ${className}`}>
      <Reveal className="mx-auto w-full max-w-[1312px]">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-8 xl:max-w-[1200px] xl:items-start">
          <h2
            {...reveal}
            id={headingId}
            className="text-balance text-[26px] font-normal leading-[1.08] tracking-[-0.03em] text-text-primary md:max-w-[440px] md:text-[32px] xl:max-w-[578px] xl:text-[48px]"
          >
            <TwoTone text={headline} muted={headlineMuted} stack />
          </h2>
          {intro ? (
            <p {...reveal} className="max-w-[300px] text-pretty text-[14px] leading-[1.6] text-text-nav md:w-[260px] md:shrink-0 md:pt-2 xl:w-[300px]">
              {intro}
            </p>
          ) : null}
        </div>

        <ol className="mt-8 flex flex-col md:mt-12 md:grid md:grid-cols-3 md:gap-x-4 md:gap-y-8 xl:mt-20 xl:flex xl:flex-row xl:gap-4">
          {steps.map((step, i) => (
            <li key={step.title} {...reveal} className="min-w-0 xl:flex-1">
              <div className="group flex h-full flex-col items-start border-t border-border-light py-5 transition-[translate] duration-200 ease-out hover:-translate-y-[3px] motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:rounded-tile md:border md:px-6 md:pb-6 md:pt-10">
                <div className="mt-3 transition-[translate] duration-200 ease-out group-hover:translate-x-[5px] motion-reduce:transition-none md:mt-0">
                  {step.icon ?? <NumberTile n={i + 1} />}
                </div>
                <div className="mt-3 flex flex-col gap-2 md:mt-10">
                  <h3 className="text-[16px] font-medium leading-[normal] tracking-[-0.005em] text-text-primary md:text-[18px]">{step.title}</h3>
                  <p className="text-pretty text-[13px] leading-[1.55] text-text-nav">{step.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}

function NumberTile({ n }: { n: number }) {
  return (
    <span aria-hidden className="flex size-[72px] items-center justify-center rounded-tile bg-surface-muted font-mono text-[18px] text-text-tertiary">
      {String(n).padStart(2, "0")}
    </span>
  );
}
