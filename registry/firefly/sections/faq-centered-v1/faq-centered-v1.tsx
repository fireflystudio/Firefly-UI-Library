"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type FaqItem = { question: string; answer: string };

export type FaqCenteredProps = {
  /** Section id (anchor) */
  id?: string;
  headline: string;
  /** Grey second line of the headline */
  headlineMuted?: string;
  items: FaqItem[];
  /** Index open on load; null = all closed */
  defaultOpen?: number | null;
  /** Contact line under the accordion. Empty string hides it. */
  footerText?: string;
  /** Ghost pill next to the contact line. null hides it. */
  cta?: { label: string; href: string } | null;
  className?: string;
};

/**
 * FAQ Centered v1
 * Two-tone headline stacked on two lines on top (left-aligned on mobile, centred from tablet),
 * the accordion below (full width / 640px / 760px, top hairline) and a contact line with a
 * ghost pill at the bottom. Same behaviour as FAQ Split: one question open at a time, the first
 * all closed by default, clicking the open one closes it, +/– glyph rotates, the answer fades and
 * rises in after the first interaction. Questions 16/17/18px, 24px row padding, 15/16px answers.
 * Section padding 64/96/120px.
 */
export function FaqCentered({
  id = "faq",
  headline,
  headlineMuted,
  items,
  defaultOpen = null,
  footerText = "Anything else, ask us directly. We reply within a day.",
  cta = { label: "Talk to us", href: "#cta" },
  className = "",
}: FaqCenteredProps) {
  const headingId = `${id}-heading`;
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const [interacted, setInteracted] = useState(false);
  const toggle = (i: number) => {
    setInteracted(true);
    setOpenIndex((prev) => (prev === i ? null : i));
  };
  const showFooter = Boolean(footerText) || Boolean(cta);

  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page px-5 py-16 md:px-10 md:py-24 xl:px-[120px] xl:py-[120px] ${className}`}>
      <Reveal className="mx-auto flex w-full max-w-[760px] flex-col items-start gap-10 md:items-center md:gap-14 xl:gap-16">
        <h2
          {...reveal}
          id={headingId}
          className="max-w-[600px] text-[28px] font-normal leading-[1.2] tracking-[-0.02em] text-text-primary md:text-center md:text-[32px] xl:max-w-[760px] xl:text-[40px]"
        >
          <TwoTone text={headline} muted={headlineMuted} stack />
        </h2>

        <div className="w-full border-t border-border-light md:max-w-[640px] xl:max-w-[760px]">
          {items.map((item, i) => (
            <AccordionItem key={item.question} item={item} open={openIndex === i} animate={interacted} onToggle={() => toggle(i)} />
          ))}
        </div>

        {showFooter ? (
          <div {...reveal} className="flex w-full flex-col items-center gap-3 text-center md:flex-row md:justify-center md:gap-4">
            {footerText ? <p className="text-balance text-[14px] font-normal leading-[normal] text-text-nav">{footerText}</p> : null}
            {cta ? (
              <Button href={cta.href} variant="secondary">
                {cta.label}
              </Button>
            ) : null}
          </div>
        ) : null}
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
          className="group flex w-full cursor-pointer items-center justify-between gap-4 py-6 text-left"
        >
          <span className="text-[16px] font-medium leading-[normal] text-text-primary transition-opacity duration-200 ease-out group-hover:opacity-70 motion-reduce:transition-none md:text-[17px] xl:text-[18px]">
            {item.question}
          </span>
          <ToggleIcon open={open} />
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open} className="-mt-3 pb-6">
        {open ? (
          <motion.p
            initial={animate && !reduce ? { opacity: 0, y: -8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[300px] text-pretty text-[15px] font-normal leading-[1.55] text-text-nav md:max-w-[640px] md:text-[16px]"
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
    <span
      aria-hidden
      className="relative grid h-[22px] w-[11px] shrink-0 place-items-center text-[15px] font-normal leading-[normal] text-text-muted md:h-[27px] md:w-[13px] md:text-[18px]"
    >
      <span className={`${t} ${open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"}`}>+</span>
      <span className={`${t} ${open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"}`}>–</span>
    </span>
  );
}
