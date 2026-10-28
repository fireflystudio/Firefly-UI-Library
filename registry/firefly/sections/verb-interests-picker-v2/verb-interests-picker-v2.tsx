"use client";

import { useEffect, useRef, useState } from "react";
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

/**
 * Trending lines rather than tidy categories: in the product these come from what is actually being
 * read right now in the reader's country, so they are lower-case, uneven in length and a mix of
 * sport, politics, money and games.
 */
const SAMPLE_SUGGESTIONS = [
  "gta 6",
  "super bowl halftime",
  "nvidia earnings",
  "lakers – celtics",
  "Federal Reserve rate decision",
  "call of duty",
  "chiefs – bills",
  "student loan forgiveness",
];

const TYPE_MS = 55;

export type InterestsPickerV2Props = {
  title?: string;
  /** Label above the field. */
  inputLabel?: string;
  /** The phrase shown in the field (typed out when `typing`). */
  query?: string;
  /** Label above the chips. */
  suggestionsLabel?: string;
  /** Trending lines under the field. Clicking one puts it in the field. */
  suggestions?: readonly string[];
  /** Type the phrase out when the element scrolls into view. Off = the phrase is simply there. */
  typing?: boolean;
  /** Suggestions ticked on first render. */
  defaultSelected?: readonly string[];
  /** Called with the phrase in the field whenever it changes. */
  onChange?: (value: string) => void;
  /** Called with every suggestion currently ticked. */
  onSelect?: (selected: string[]) => void;
  className?: string;
};

/**
 * Verb Reader onboarding, "What do you want to keep up with?" (v2).
 *
 * v1 was a dozen tidy category chips to toggle. The product works the other way round (client,
 * 2026-10-27): you type the interest in your own words, and under the field sit the lines people
 * in your country are actually reading right now. So the field leads, the chips follow it, and
 * nothing here is a fixed taxonomy.
 *
 * The phrase types itself out once when the card scrolls into view, which is the whole point of
 * the step, and the field is a real one afterwards: you can click into it and type your own.
 * Clicking a suggestion ticks it, the way it works in the app. Static under prefers-reduced-motion.
 */
export function InterestsPickerV2({
  title = "What do you want to keep up with?",
  inputLabel = "Type in your own words",
  query = "AI tools for designers",
  suggestionsLabel = "Suggested for you",
  suggestions = SAMPLE_SUGGESTIONS,
  typing = true,
  defaultSelected = [],
  onChange,
  onSelect,
  className = "",
}: InterestsPickerV2Props) {
  const root = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(typing ? "" : query);
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set(defaultSelected));
  const [animate, setAnimate] = useState(false);
  /** The moment the reader types, the demo phrase stops writing itself. */
  const [taken, setTaken] = useState(false);
  const [focused, setFocused] = useState(false);

  /* Type only once the card is actually on screen: it sits well below the fold. */
  useEffect(() => {
    if (!typing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue((v) => (v ? v : query));
      return;
    }
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setAnimate(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [typing, query]);

  useEffect(() => {
    if (!animate || taken || value.length >= query.length) return;
    const id = window.setTimeout(() => setValue(query.slice(0, value.length + 1)), TYPE_MS);
    return () => window.clearTimeout(id);
  }, [animate, taken, value, query]);

  const toggle = (line: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(line)) next.delete(line);
      else next.add(line);
      onSelect?.([...next]);
      return next;
    });

  /** The drawn caret stands in until the field is focused, where the real one takes over. */
  const showCaret = !focused && !taken && value.length >= query.length;

  return (
    <div ref={root} className={`@container w-full ${className}`} style={VERB_VARS}>
      <div
        className="flex flex-col bg-surface-primary shadow-[var(--v-shadow)]"
        style={{ padding: u(24), gap: u(20), borderRadius: u(14) }}
      >
        <p className="font-medium leading-[1.2] tracking-[-0.02em] text-text-primary" style={{ fontSize: fu(18) }}>
          {title}
        </p>

        <div className="flex flex-col" style={{ gap: u(8) }}>
          <p className="leading-[1.2] text-text-tertiary" style={{ fontSize: fu(13) }}>
            {inputLabel}
          </p>
          {/* A real field: the card writes the demo phrase itself, and from the first keystroke it
              is the reader's (client, 2026-10-27). */}
          <label
            className="flex cursor-text items-center overflow-hidden border border-border-10 transition-colors duration-150 ease-out focus-within:border-border-24"
            style={{ borderRadius: u(10), padding: `${u(13)} ${u(14)}`, minHeight: u(46) }}
          >
            {/* The field is as wide as what is in it (the hidden twin sets the width), so the drawn
                caret sits right after the last letter instead of at the far edge. */}
            <span className="grid max-w-full">
              <span
                aria-hidden
                className="invisible col-start-1 row-start-1 whitespace-pre leading-[1.2]"
                style={{ fontSize: fu(15) }}
              >
                {value || " "}
              </span>
              <input
                value={value}
                /* size=1 keeps the input's intrinsic width out of the grid, so the column is as
                   wide as the hidden twin — an input is 20 characters wide by default. */
                size={1}
                aria-label={inputLabel}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(e) => {
                  setTaken(true);
                  setValue(e.target.value);
                  onChange?.(e.target.value);
                }}
                className="col-start-1 row-start-1 w-full min-w-0 bg-transparent leading-[1.2] text-text-primary outline-none"
                style={{ fontSize: fu(15), caretColor: showCaret ? "transparent" : "var(--v-ink)" }}
              />
            </span>
            {showCaret ? (
              <span aria-hidden className="verb-caret inline-block shrink-0 bg-[var(--v-ink)]" style={{ width: u(1.5), height: fu(18), marginLeft: u(1) }} />
            ) : null}
          </label>
        </div>

        <div className="flex flex-col" style={{ gap: u(10) }}>
          <p className="leading-[1.2] text-text-tertiary" style={{ fontSize: fu(13) }}>
            {suggestionsLabel}
          </p>
          <div className="flex flex-wrap" style={{ gap: u(8) }}>
            {suggestions.map((line) => {
              const on = selected.has(line);
              return (
                <button
                  key={line}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(line)}
                  className={`cursor-pointer rounded-full border leading-none transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v-ink)] ${
                    on
                      ? "border-[var(--v-ink)] bg-[var(--v-ink)] text-white"
                      : "border-border-10 text-text-tertiary hover:border-border-24 hover:text-text-primary"
                  }`}
                  style={{ padding: `${u(9)} ${u(14)}`, fontSize: fu(13) }}
                >
                  {line}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {/* The caret blinks only once the phrase is finished, so the typing itself stays clean. */}
      <style href="verb-interests-caret" precedence="default">{`
        @keyframes verb-caret-blink { 0%, 45% { opacity: 1 } 55%, 100% { opacity: 0 } }
        .verb-caret { animation: verb-caret-blink 1.1s steps(1, end) infinite; }
        @media (prefers-reduced-motion: reduce) { .verb-caret { animation: none } }
      `}</style>
    </div>
  );
}
