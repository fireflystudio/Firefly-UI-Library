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
 * FAQ Accordion v1
 * Centred two-tone h2 (28/32/40, left-aligned on mobile), a 900px list of questions with soft
 * hairlines (surface-muted), a chevron that turns on open. One question open at a time, the first
 * open by default, clicking the open one closes it; the question nudges 5px right on hover and the
 * answer fades and rises in. Questions 16/17/18 medium, answers 15/16 tertiary. Used on Solve and Verb.
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
        <ul className="mx-auto mt-10 max-w-[900px] md:mt-14 xl:mt-16">
          {items.map((item, i) => {
            const isOpen = i === open;
            const panelId = `${uid}-panel-${i}`;
            const buttonId = `${uid}-button-${i}`;
            return (
              <li key={item.question} {...reveal} className="border-b border-surface-muted">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex min-h-[64px] w-full cursor-pointer items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="text-[16px] font-medium leading-[normal] text-text-primary transition-[translate] duration-200 ease-out group-hover:translate-x-[5px] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 md:text-[17px] xl:text-[18px]">
                      {item.question}
                    </span>
                    <svg
                      aria-hidden
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`shrink-0 text-icon-primary transition-[rotate] duration-300 ease-out-soft motion-reduce:transition-none ${isOpen ? "rotate-180" : "rotate-0"}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="pb-5">
                  <p
                    key={isOpen ? "open" : "closed"}
                    className="max-w-[720px] text-pretty text-[15px] leading-[1.55] text-text-tertiary motion-safe:animate-[feature-in_0.45s_var(--ease-out-soft)] md:text-[16px]"
                  >
                    {item.answer}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
