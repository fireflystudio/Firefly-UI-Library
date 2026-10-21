"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type FaqAccordionItem = { question: string; answer: string };

export type FaqAccordionProps = {
  /** Section id (anchor) */
  id?: string;
  headline: string;
  /** Grey second half of the headline (same line) */
  headlineMuted?: string;
  items: FaqAccordionItem[];
  /** Index open on load; null = all closed */
  defaultOpen?: number | null;
  /** Section paddings, default 64 / 96 / 120 (override at a colour change, e.g. before a dark block) */
  className?: string;
};

/**
 * FAQ Accordion v2 (boxed)
 * Same headline and behaviour as v1, but every question sits in its own rounded box with a soft hairline
 * stroke (surface-muted, the v1 separator colour; no fill), 12px apart. Opening a question grows its box and shows the answer inside it
 * (height eases via grid rows; static under reduced motion). The + turns into – when open.
 * One question open at a time, the first open by default.
 */
export function FaqAccordion({ id = "faq", headline, headlineMuted, items, defaultOpen = 0, className = "py-16 md:py-24 xl:py-[120px]" }: FaqAccordionProps) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`bg-surface-page px-5 md:px-10 xl:px-16 ${className}`}>
      <Reveal className="mx-auto max-w-[1200px]">
        <h2
          id={`${id}-heading`}
          {...reveal}
          className="text-balance text-[28px] font-normal leading-[1.2] tracking-[-0.02em] text-text-primary md:text-center md:text-[32px] xl:text-[40px]"
        >
          <TwoTone text={headline} muted={headlineMuted} />
        </h2>
        <ul className="mx-auto mt-10 flex max-w-[900px] flex-col gap-3 md:mt-14 xl:mt-16">
          {items.map((item, i) => {
            const isOpen = i === open;
            const panelId = `${uid}-panel-${i}`;
            const buttonId = `${uid}-button-${i}`;
            return (
              <li
                key={item.question}
                {...reveal}
                className={`rounded-frame border transition-colors duration-200 ease-out ${isOpen ? "border-border-10" : "border-surface-muted hover:border-border-10"}`}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex min-h-[60px] w-full cursor-pointer items-center justify-between gap-4 rounded-frame px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-border-interactive md:px-6"
                  >
                    <span className="text-[16px] font-medium leading-[normal] text-text-primary md:text-[17px]">{item.question}</span>
                    <span aria-hidden className="relative size-4 shrink-0 text-icon-secondary">
                      <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 rounded-full bg-current" />
                      <span
                        className={`absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 rounded-full bg-current transition-[rotate,opacity] duration-300 ease-out-soft motion-reduce:transition-none ${isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
                      />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="grid transition-[grid-template-rows] duration-300 ease-out-soft motion-reduce:transition-none"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  inert={!isOpen}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="max-w-[720px] px-5 pb-5 text-pretty text-[15px] leading-[1.55] text-text-tertiary md:px-6 md:text-[16px]">{item.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
