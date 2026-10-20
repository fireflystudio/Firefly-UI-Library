"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type Lens = {
  name: string;
  description: string;
  /** Shown in the side frame (4:5) while this item is active. Defaults to a Placeholder labelled with the name. */
  visual?: ReactNode;
};

export type LensesListProps = {
  /** Section id (anchor) */
  id?: string;
  headline: string;
  /** Grey second half of the headline */
  headlineMuted?: string;
  /** 4–6 items work best */
  items: Lens[];
  /** Index of the item active on load */
  defaultActive?: number;
  /** List on the left, headline + visual on the right (tablet/desktop) */
  reverse?: boolean;
  className?: string;
};

/**
 * Lenses List v1
 * A two-tone h2 (28/32/40px) with a portrait (4:5) visual under it, next to a vertical list of
 * clickable sub-headline names (22/24/28px). The active name is black and shows a short description; the others are
 * grey. Choosing an item crossfades the visual (opacity + slight rise/scale, 500ms; hidden
 * layers are inert). Real buttons: Enter/Space select, ArrowUp/ArrowDown move, Home/End jump.
 * Mobile stacks headline, list, then the visual.
 */
export function LensesList({
  id = "lenses",
  headline,
  headlineMuted,
  items,
  defaultActive = 0,
  reverse = false,
  className = "",
}: LensesListProps) {
  const headingId = `${id}-heading`;
  const uid = useId();
  const [active, setActive] = useState(() => Math.min(Math.max(defaultActive, 0), items.length - 1));
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (e: KeyboardEvent<HTMLButtonElement>, from: number) => {
    const n = items.length;
    let next: number;
    if (e.key === "ArrowDown") next = (from + 1) % n;
    else if (e.key === "ArrowUp") next = (from - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setActive(next);
    buttons.current[next]?.focus();
  };

  const side = reverse ? "md:col-start-2" : "md:col-start-1";
  const listSide = reverse ? "md:col-start-1" : "md:col-start-2";

  return (
    <section id={id} aria-labelledby={headingId} className={`bg-surface-page px-5 py-16 md:px-10 md:py-24 xl:px-[120px] xl:py-[120px] ${className}`}>
      <Reveal
        className={`mx-auto flex w-full max-w-[1200px] flex-col gap-10 md:grid md:gap-x-10 md:gap-y-0 md:grid-rows-[auto_1fr] xl:gap-x-16 ${
          reverse ? "md:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[560px_minmax(0,1fr)]" : "md:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_560px]"
        }`}
      >
        <h2
          {...reveal}
          id={headingId}
          className={`${side} text-balance text-[28px] font-normal leading-[1.2] tracking-[-0.02em] text-text-primary md:row-start-1 md:self-start md:text-[32px] xl:max-w-[520px] xl:text-[40px]`}
        >
          <TwoTone text={headline} muted={headlineMuted} />
        </h2>

        {/* List */}
        <ul className={`${listSide} flex w-full min-w-0 flex-col md:row-span-2 md:row-start-1`}>
          {items.map((item, i) => {
            const open = i === active;
            const buttonId = `${uid}-button-${i}`;
            const panelId = `${uid}-panel-${i}`;
            return (
              <li key={item.name} {...reveal} className="flex flex-col border-b border-border-light">
                <h3 className="text-[22px] font-normal leading-[1.3] tracking-[-0.02em] md:text-[24px] xl:text-[28px]">
                  <button
                    ref={(el) => {
                      buttons.current[i] = el;
                    }}
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => move(e, i)}
                    className={`w-full py-[18px] text-left ${
                      open ? "cursor-default pb-[10px] text-text-primary" : "cursor-pointer text-text-quaternary hover:text-text-tertiary"
                    }`}
                  >
                    {item.name}
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
                  <p
                    key={open ? "open" : "closed"}
                    className="max-w-[520px] text-pretty pb-[18px] text-[15px] font-normal leading-[1.55] text-text-nav motion-safe:animate-[feature-in_0.45s_var(--ease-out-soft)_both] md:text-[16px]"
                  >
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Visual */}
        <div {...reveal} className={`${side} w-full max-w-[280px] md:row-start-2 md:mt-14 md:max-w-[240px] md:self-start xl:mt-16 xl:max-w-[300px]`}>
          <div className="relative aspect-[4/5] w-full overflow-clip rounded-frame bg-surface-muted">
            {items.map((item, i) => {
              const current = i === active;
              return (
                <div
                  key={item.name}
                  aria-hidden={!current}
                  inert={!current}
                  className={`absolute inset-0 transition-[opacity,translate,scale] duration-500 ease-out-soft motion-reduce:transition-none ${
                    current ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-2 scale-[1.03] opacity-0"
                  }`}
                >
                  {item.visual ?? <Placeholder label={item.name} ratio="4 / 5" />}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
