"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

/**
 * Carousel pagination (ElevenLabs testimonials): 4px grey dots, the active one stretched
 * into a 24×4 dark line that slides between positions (transform only). Each dot is a button
 * with a 20px-tall hit area.
 */
export function PaginationDots({
  count,
  index,
  onSelect,
  label = "Go to slide",
  className = "",
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
  /** Accessible name prefix: "Go to slide 3" */
  label?: string;
  className?: string;
}) {
  const layoutId = useId();
  const reduce = useReducedMotion();
  return (
    <div className={`flex items-center ${className}`} role="group" aria-label="Slides">
      {Array.from({ length: count }, (_, i) => {
        const active = i === index;
        return (
          <button
            key={i}
            type="button"
            aria-label={`${label} ${i + 1}`}
            aria-current={active ? "true" : undefined}
            onClick={() => onSelect(i)}
            className={`relative flex h-5 cursor-pointer items-center justify-center px-1 transition-[width] duration-300 ease-standard focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-border-interactive motion-reduce:transition-none ${active ? "w-8" : "w-3"}`}
          >
            <span aria-hidden className={`block size-1 rounded-pill bg-pagination-dot transition-opacity duration-150 ${active ? "opacity-0" : "opacity-100"}`} />
            {active ? (
              <motion.span
                layoutId={layoutId}
                aria-hidden
                className="absolute left-1 top-2 h-1 w-6 rounded-pill bg-pagination-active"
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 40, mass: 0.6 }}
              />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
