"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, IconButton } from "@/components/ui/icon-button";
import { PaginationDots } from "@/components/ui/pagination-dots";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { Segmented } from "@/components/ui/segmented";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "features", label: "Features" },
  { id: "pricing", label: "Pricing" },
  { id: "reviews", label: "Reviews" },
];

export function SegmentedDemo({ size = "md" }: { size?: "sm" | "md" }) {
  const [value, setValue] = useState(TABS[0].id);
  return <Segmented items={TABS} value={value} onChange={setValue} size={size} ariaLabel="Demo tabs" />;
}

/** Arrows + dots exactly as under a testimonial carousel */
export function PaginationDemo({ count = 5 }: { count?: number }) {
  const [index, setIndex] = useState(0);
  const step = (d: number) => setIndex((i) => (i + d + count) % count);
  return (
    <div className="flex items-center gap-5">
      <IconButton aria-label="Previous" onClick={() => step(-1)}>
        <ChevronLeft />
      </IconButton>
      <PaginationDots count={count} index={index} onSelect={setIndex} />
      <IconButton aria-label="Next" onClick={() => step(1)}>
        <ChevronRight />
      </IconButton>
    </div>
  );
}

/** Four blocks that fade and rise in, staggered; the button plays it again. */
export function RevealDemo() {
  const [tick, setTick] = useState(0);
  return (
    <div className="flex flex-col gap-5">
      <Reveal key={tick} amount={0.1} className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {["Headline", "Copy", "Buttons", "Visual"].map((label) => (
          <div key={label} {...reveal} className="flex h-24 items-end rounded-tile border border-border-06 bg-surface-secondary p-3 text-[13px] text-text-nav">
            {label}
          </div>
        ))}
      </Reveal>
      <div>
        <button
          type="button"
          onClick={() => setTick((t) => t + 1)}
          className="inline-flex h-9 cursor-pointer items-center rounded-pill bg-button-secondary px-3.5 text-[14px] text-button-content-secondary shadow-button transition-[background-color] duration-150 ease-standard hover:bg-button-secondary-hover"
        >
          Replay
        </button>
      </div>
    </div>
  );
}
