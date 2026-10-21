"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

/** Verb brand values, set as CSS variables on the root so the file needs no brand tokens in the host site. */
const VERB_VARS = {
  "--v-ink": "#111111",
  "--v-shadow": "0 16px 40px rgb(0 0 0 / 0.06)",
} as CSSProperties;

/* Drawn 423px wide; every size is a share of the element's own width, so it scales with its box. */
const u = (px: number) => `calc(${px} * 100cqw / 423)`;
/* Type only: multiplied by --type-scale (default 1) so a host can shrink the text without resizing the box. */
const fu = (px: number) => `calc(${px} * 100cqw / 423 * var(--type-scale, 1))`;

const SAMPLE_INTERESTS = [
  "Productivity",
  "AI",
  "Design",
  "Finance",
  "Healthcare",
  "Climate",
  "Formula 1",
  "Gaming",
  "Politics",
  "Electric cars",
  "Robotics",
  "Science",
];

export type InterestsPickerProps = {
  /** All chips, in order. */
  interests?: readonly string[];
  /** Chips selected on first render. */
  defaultSelected?: readonly string[];
  title?: string;
  skipLabel?: string;
  continueLabel?: string;
  /** Called with the current selection on every toggle. */
  onChange?: (selected: string[]) => void;
  onSkip?: () => void;
  onContinue?: (selected: string[]) => void;
  className?: string;
};

/**
 * Verb Reader "Pick your interests": a card of toggle chips with a live counter. Chips keep their size
 * when toggled (every chip has a border), so the card never jumps. Skip and Continue only call back.
 */
export function InterestsPicker({
  interests = SAMPLE_INTERESTS,
  defaultSelected = ["Productivity", "AI", "Formula 1"],
  title = "Pick your interests",
  skipLabel = "Skip for now",
  continueLabel = "Continue",
  onChange,
  onSkip,
  onContinue,
  className = "",
}: InterestsPickerProps) {
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set(defaultSelected));

  const toggle = (label: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      onChange?.([...next]);
      return next;
    });

  return (
    <div className={`@container w-full ${className}`} style={VERB_VARS}>
      <div
        className="flex flex-col bg-surface-primary shadow-[var(--v-shadow)]"
        style={{ padding: u(24), gap: u(18), borderRadius: u(14) }}
      >
        <div className="flex items-baseline justify-between">
          <p className="font-medium leading-[1.2] tracking-[-0.02em] text-text-primary" style={{ fontSize: fu(18) }}>
            {title}
          </p>
          <p className="tabular-nums text-text-tertiary" style={{ fontSize: fu(13) }} aria-live="polite">
            {selected.size} selected
          </p>
        </div>
        <div className="flex flex-wrap" style={{ gap: u(8) }}>
          {interests.map((label) => {
            const on = selected.has(label);
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(label)}
                className={`cursor-pointer rounded-full border leading-none transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v-ink)] ${
                  on ? "border-[var(--v-ink)] bg-[var(--v-ink)] text-white" : "border-border-10 text-text-secondary hover:bg-surface-muted"
                }`}
                style={{ padding: `${u(9)} ${u(14)}`, fontSize: fu(13) }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center justify-end" style={{ gap: u(14) }}>
          <button
            type="button"
            onClick={onSkip}
            className="cursor-pointer text-text-tertiary transition-colors hover:text-text-primary"
            style={{ fontSize: fu(13) }}
          >
            {skipLabel}
          </button>
          <button
            type="button"
            onClick={() => onContinue?.([...selected])}
            className="cursor-pointer rounded-full bg-[var(--v-ink)] font-medium leading-none text-white transition-colors duration-150 hover:bg-[#333]"
            style={{ padding: `${u(10)} ${u(16)}`, fontSize: fu(13) }}
          >
            {continueLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
