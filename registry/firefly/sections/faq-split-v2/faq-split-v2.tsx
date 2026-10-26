"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type FaqItem = { question: string; answer: string };

export type FaqSplitProps = {
  /** Section id (anchor) */
  id?: string;
  headline: string;
  /** Grey second half of the headline */
  headlineMuted?: string;
  /** Ghost pill under the headline. null hides it. */
  cta?: { label: string; href: string } | null;
  items: FaqItem[];
  /** Index open on load; null = all closed */
  defaultOpen?: number | null;
  className?: string;
};

/**
 * FAQ Split v2 (boxed)
 * Two-tone headline + ghost CTA on the left (400px on desktop), questions on the right, each in a
 * soft stroked rounded box 12px apart; opening one grows its box with the answer inside.
 * One question open at a time: opening one closes the previous, clicking the open one closes
 * it. All closed by default. +/– glyph rotates; the answer fades and rises in after
 * the first interaction. Section padding 64/96/120px, max width 1200px.
 */
export function FaqSplit({
  id = "faq",
  headline,
  headlineMuted,
  cta = { label: "Talk to us", href: "#cta" },
  items,
  defaultOpen = null,
  className = "",
}: FaqSplitProps) {
  const headingId = `${id}-heading`;
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const [interacted, setInteracted] = useState(false);
  const toggle = (i: number) => {
    setInteracted(true);
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page px-5 py-16 md:px-10 md:py-24 xl:px-16 xl:py-[120px] ${className}`}>
      <Reveal className="mx-auto flex max-w-content flex-col items-start gap-10 md:flex-row xl:gap-[120px]">
        <div className="flex w-full flex-col items-start gap-8 pt-6 md:w-[260px] md:shrink-0 md:gap-10 xl:w-[400px]">
          <h2
            {...reveal}
            id={headingId}
            className="text-balance text-[28px] font-normal leading-[1.2] tracking-[-0.02em] text-text-primary md:text-[32px] xl:text-[40px]"
          >
            <TwoTone text={headline} muted={headlineMuted} />
          </h2>
          {cta ? (
            <div {...reveal}>
              <Button href={cta.href} variant="secondary">
                {cta.label}
              </Button>
            </div>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-3 md:min-w-0 md:flex-1">
          {items.map((item, i) => (
            <AccordionItem key={item.question} item={item} open={openIndex === i} animate={interacted} onToggle={() => toggle(i)} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function AccordionItem({ item, open, animate, onToggle }: { item: FaqItem; open: boolean; animate: boolean; onToggle: () => void }) {
  const id = useId();
  const buttonId = `${id}-button`;
  const panelId = `${id}-panel`;
  const reduce = useReducedMotion();

  return (
    <div
      {...reveal}
      className={`rounded-frame border transition-colors duration-200 ease-out ${open ? "border-border-10" : "border-surface-muted hover:border-border-10"}`}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex min-h-[60px] w-full cursor-pointer items-center justify-between gap-4 rounded-frame px-5 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-border-interactive md:px-6"
        >
          <span className="text-[16px] font-medium leading-[normal] text-text-primary md:text-[17px]">{item.question}</span>
          <ToggleIcon open={open} />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="grid transition-[grid-template-rows] duration-300 ease-out-soft motion-reduce:transition-none"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <motion.p
            initial={false}
            animate={{ opacity: open ? 1 : 0, y: open || !animate || reduce ? 0 : -6 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[600px] px-5 pb-5 text-pretty text-[15px] font-normal leading-[1.55] text-text-tertiary md:px-6 md:text-[16px]"
          >
            {item.answer}
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative size-4 shrink-0 text-icon-secondary">
      <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 rounded-full bg-current" />
      <span
        className={`absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 rounded-full bg-current transition-[rotate,opacity] duration-300 ease-out-soft motion-reduce:transition-none ${open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}
      />
    </span>
  );
}
