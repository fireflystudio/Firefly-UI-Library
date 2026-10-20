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
 * FAQ Split v1
 * Two-tone headline + ghost CTA on the left (400px on desktop), accordion on the right.
 * One question open at a time: opening one closes the previous, clicking the open one closes
 * it. The first is open by default. +/– glyph rotates; the answer fades and rises in after
 * the first interaction. Section padding 64/96/120px, max width 1200px.
 */
export function FaqSplit({
  id = "faq",
  headline,
  headlineMuted,
  cta = { label: "Talk to us", href: "#cta" },
  items,
  defaultOpen = 0,
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
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page px-5 py-16 md:px-10 md:py-24 xl:px-[120px] xl:py-[120px] ${className}`}>
      <Reveal className="mx-auto flex max-w-[1200px] flex-col items-start gap-10 md:flex-row xl:gap-[120px]">
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

        <div className="w-full md:min-w-0 md:flex-1">
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
    <div {...reveal} className="border-b border-border-light">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex w-full cursor-pointer items-center justify-between gap-4 py-[26px] text-left"
        >
          <span className="text-[16px] font-medium leading-[normal] text-text-primary transition-opacity duration-200 ease-out group-hover:opacity-70 motion-reduce:transition-none md:text-[17px] xl:text-[18px]">
            {item.question}
          </span>
          <ToggleIcon open={open} />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="-mt-3 pb-[26px]">
        {open ? (
          <motion.p
            initial={animate && !reduce ? { opacity: 0, y: -8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[280px] text-pretty text-[15px] font-normal leading-[1.55] text-text-nav md:max-w-[400px] md:text-[16px] xl:max-w-[600px]"
          >
            {item.answer}
          </motion.p>
        ) : null}
      </div>
    </div>
  );
}

function ToggleIcon({ open }: { open: boolean }) {
  const t = "col-start-1 row-start-1 transition-[rotate,opacity] duration-300 ease-out-soft motion-reduce:transition-none";
  return (
    <span aria-hidden className="relative grid h-[27px] w-[15px] shrink-0 place-items-center text-[22px] font-normal leading-[normal] text-text-muted">
      <span className={`${t} ${open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}>+</span>
      <span className={`${t} ${open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}>–</span>
    </span>
  );
}
