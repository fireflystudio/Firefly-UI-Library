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
  "new iphone",
  "austin",
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
  /** Called with the phrase in the field whenever it changes. */
  onChange?: (value: string) => void;
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
 * the step; clicking a suggestion types that line instead. Static under prefers-reduced-motion.
 */
export function InterestsPickerV2({
  title = "What do you want to keep up with?",
  inputLabel = "Type in your own words",
  query = "AI tools for designers",
  suggestionsLabel = "Suggested for you",
  suggestions = SAMPLE_SUGGESTIONS,
  typing = true,
  onChange,
  className = "",
}: InterestsPickerV2Props) {
  const root = useRef<HTMLDivElement>(null);
  const [phrase, setPhrase] = useState(query);
  const [shown, setShown] = useState(typing ? 0 : query.length);
  const [animate, setAnimate] = useState(false);

  /* Type only once the card is actually on screen: it sits well below the fold. */
  useEffect(() => {
    if (!typing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(query.length);
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
  }, [typing, query.length]);

  useEffect(() => {
    if (!animate || shown >= phrase.length) return;
    const id = window.setTimeout(() => setShown((n) => n + 1), TYPE_MS);
    return () => window.clearTimeout(id);
  }, [animate, shown, phrase]);

  const pick = (line: string) => {
    setPhrase(line);
    setShown(animate ? 0 : line.length);
    onChange?.(line);
  };

  const text = phrase.slice(0, shown);
  const done = shown >= phrase.length;

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
          {/* A drawn field, not an input: the card is an illustration, so nothing here takes focus
              away from the page or offers a keyboard on a phone. */}
          <div
            role="img"
            aria-label={`${inputLabel}: ${phrase}`}
            className="flex items-center border border-border-10"
            style={{ borderRadius: u(10), padding: `${u(13)} ${u(14)}`, minHeight: u(46) }}
          >
            <span className="leading-[1.2] text-text-primary" style={{ fontSize: fu(15) }}>
              {text}
            </span>
            <span
              aria-hidden
              className={`inline-block bg-[var(--v-ink)] ${done ? "verb-caret" : ""}`}
              style={{ width: u(1.5), height: fu(18), marginLeft: u(2) }}
            />
          </div>
        </div>

        <div className="flex flex-col" style={{ gap: u(10) }}>
          <p className="leading-[1.2] text-text-tertiary" style={{ fontSize: fu(13) }}>
            {suggestionsLabel}
          </p>
          <div className="flex flex-wrap" style={{ gap: u(8) }}>
            {suggestions.map((line) => (
              <button
                key={line}
                type="button"
                onClick={() => pick(line)}
                className="cursor-pointer rounded-full border border-border-10 leading-none text-text-tertiary transition-colors duration-150 ease-out hover:border-border-20 hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v-ink)]"
                style={{ padding: `${u(9)} ${u(14)}`, fontSize: fu(13) }}
              >
                {line}
              </button>
            ))}
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
