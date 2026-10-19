"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

/**
 * Switch / tab pills (ElevenLabs "AI Voice Generator · Text to Speech · …"): 40px pills, regular
 * weight, the active one white with the button shadow. The white indicator slides between
 * items (transform only, 300ms); inactive items get a light grey layer on hover.
 * Keyboard: arrow keys move the selection, Home/End jump.
 */
export type SegmentedItem = { id: string; label: string };

export function Segmented({
  items,
  value,
  onChange,
  size = "md",
  ariaLabel = "Options",
  className = "",
}: {
  items: SegmentedItem[];
  value: string;
  onChange: (id: string) => void;
  size?: "sm" | "md";
  ariaLabel?: string;
  className?: string;
}) {
  const layoutId = useId();
  const reduce = useReducedMotion();
  const sizes = { sm: "h-9 px-3.5 text-[14px]", md: "h-10 px-4 text-[15px]" } as const;

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const i = items.findIndex((it) => it.id === value);
    const go = (j: number) => {
      const next = items[(j + items.length) % items.length];
      onChange(next.id);
      (e.currentTarget.querySelectorAll<HTMLButtonElement>("[role=tab]")[(j + items.length) % items.length] ?? null)?.focus();
    };
    if (e.key === "ArrowRight" || e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(items.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <div role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown} className={`inline-flex items-center gap-1 ${className}`}>
      {items.map((item) => {
        const active = item.id === value;
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(item.id)}
            className={`relative inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-pill font-normal leading-none transition-[color,background-color] duration-150 ease-standard focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-interactive motion-reduce:transition-none ${sizes[size]} ${
              active ? "text-text-primary" : "text-text-primary hover:bg-surface-pressed"
            }`}
          >
            {active ? (
              <motion.span
                layoutId={layoutId}
                aria-hidden
                className="absolute inset-0 rounded-pill bg-button-secondary shadow-button"
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40, mass: 0.6 }}
              />
            ) : null}
            <span className="relative">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
