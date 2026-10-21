"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

/**
 * Audio queue + player (Verb Reader). Five summaries in a queue; hover highlights a row, click loads it
 * into the player, which then "plays" (the progress bar runs; pause, skip and speed work). Nothing is
 * audible: it is the product's interface. Sizes are `q(px)`: a share of the element's own width, drawn
 * for a 556px frame, so it scales crisply wherever it is placed (the Verb site shows it 424px wide).
 */
/** Verb brand values. Set as CSS variables on the root so the file needs no brand tokens in the host site. */
const VERB_VARS = {
  "--v-ink": "#111111",
  "--v-accent": "#4d63fd",
  "--v-card": "#f5f5f5",
  "--v-glow": "#d4e1f2",
  "--v-shadow": "0 16px 40px rgb(0 0 0 / 0.06)",
} as CSSProperties;
const q = (n: number) => `calc(${n} * 100cqw / 556)`;

export type AudioQueueItem = {
  title: string;
  source: string;
  minutes: number;
  src?: string;
  mark?: string;
};

const SAMPLE_ITEMS: readonly AudioQueueItem[] = [
  { src: "/images/app/source-guardian.png", title: "Why ‘time saved’ is the wrong metric for AI at work", source: "The Guardian", minutes: 1 },
  { src: "/images/app/source-rest-of-world.png", title: "The EU AI Act's initial compliance deadline is set for March", source: "Rest of World", minutes: 2 },
  { src: "/images/app/source-hacker-news.png", title: "Design systems are org charts in disguise", source: "Hacker News", minutes: 3 },
  { src: "/images/app/source-huberman.jpg", title: "The Art of True Happiness | Dr. Arthur Brooks", source: "Andrew Huberman", minutes: 4 },
  { src: "/images/app/source-verge.jpg", title: "Index funds quietly became the default retirement plan", source: "The Verge", minutes: 2 },
];

const SPEEDS = [1, 1.5, 2] as const;
const START_PROGRESS = 24.4; /* % of the player bar shown before anything is clicked */
const FULL_RUN_SECONDS = 24; /* time the bar needs to fill at 1× (it is a demo, not real length) */

function Thumb({ item, size, radius }: { item: AudioQueueItem; size: number; radius: number }) {
  return item.src ? (
    <Image src={item.src} alt="" width={64} height={64} className="shrink-0 object-cover" style={{ width: q(size), height: q(size), borderRadius: q(radius) }} />
  ) : (
    <span
      className="flex shrink-0 items-center justify-center bg-surface-muted font-medium text-text-secondary"
      style={{ width: q(size), height: q(size), borderRadius: q(radius), fontSize: `max(10px, ${q(size * 0.43)})` }}
    >
      {item.mark}
    </span>
  );
}

function PlayGlyph({ playing, size }: { playing: boolean; size: number }) {
  return playing ? (
    <svg viewBox="0 0 24 24" fill="currentColor" className="shrink-0" style={{ width: q(size), height: q(size) }}>
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  ) : (
    <svg viewBox="0 0 12 12" fill="currentColor" className="shrink-0" style={{ width: q(size * 0.7), height: q(size * 0.7) }}>
      <path d="M2.4 1.5v9a.5.5 0 0 0 .77.42l7-4.5a.5.5 0 0 0 0-.84l-7-4.5A.5.5 0 0 0 2.4 1.5Z" />
    </svg>
  );
}

export type AudioQueueProps = {
  /** The summaries in the queue. Defaults to sample content. `src` is a source logo or a portrait; without it `mark` (one letter) is shown. */
  items?: readonly AudioQueueItem[];
  /** Index of the row that starts in the player. */
  startIndex?: number;
  className?: string;
};

export function AudioQueue({ items = SAMPLE_ITEMS, startIndex = 3, className = "" }: AudioQueueProps) {
  const ITEMS = items;
  const TOTAL = ITEMS.reduce((sum, item) => sum + item.minutes, 0);
  const [current, setCurrent] = useState(Math.min(startIndex, ITEMS.length - 1));
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(START_PROGRESS);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [animate, setAnimate] = useState(false); /* off for reduced motion */

  useEffect(() => {
    setAnimate(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const finished = progress >= 100;
  const isPlaying = playing && !finished;

  useEffect(() => {
    if (!playing || !animate || finished) return;
    const tick = 200;
    const step = (100 / (FULL_RUN_SECONDS * 1000)) * tick * SPEEDS[speedIndex];
    const id = window.setInterval(() => setProgress((p) => Math.min(100, p + step)), tick);
    return () => window.clearInterval(id);
  }, [playing, animate, speedIndex, current, finished]);

  const select = (index: number) => {
    setCurrent(index);
    setProgress(0);
    setPlaying(true);
  };
  const toggle = () => {
    if (finished) {
      setProgress(0);
      setPlaying(true);
      return;
    }
    setPlaying((p) => !p);
  };

  const item = ITEMS[current];
  const text = (n: number, min: number) => `max(${min}px, ${q(n)})`;

  return (
    <div className={`@container w-full ${className}`} style={VERB_VARS}>
      <div style={{ "--gap": q(12) } as CSSProperties} className="flex flex-col gap-[var(--gap)]">
        {/* Queue panel */}
        <div
          className="overflow-hidden border border-border-10 bg-white shadow-[0_4px_12px_rgb(0_0_0/0.05)]"
          style={{ borderRadius: q(12), padding: `${q(4)} ${q(8)}`, fontSize: 0 }}
        >
          <div className="flex items-center justify-between" style={{ height: q(40), paddingLeft: q(12), paddingRight: q(8) }}>
            <p className="font-medium text-text-primary" style={{ fontSize: text(14, 11) }}>
              Queue · {TOTAL}m
            </p>
            <p className="text-text-tertiary" style={{ fontSize: text(13, 11) }}>
              Clear
            </p>
          </div>
          <ul>
            {ITEMS.map((row, i) => {
              const active = i === current;
              return (
                <li key={row.title}>
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-pressed={active}
                    aria-label={`Play: ${row.title}, ${row.source}, ${row.minutes} minutes`}
                    className={`flex w-full cursor-pointer items-center text-left outline-none transition-colors duration-150 ease-out focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--v-accent)] ${
                      active ? "bg-surface-secondary" : "hover:bg-surface-secondary"
                    }`}
                    style={{ height: q(56), gap: q(12), paddingLeft: q(12), paddingRight: q(8), borderRadius: q(8) }}
                  >
                    <Thumb item={row} size={28} radius={6} />
                    <span className="block min-w-0 flex-1">
                      <span className="block truncate font-medium text-text-primary" style={{ fontSize: text(14, 11), lineHeight: 1.3 }}>
                        {row.title}
                      </span>
                      <span className="block truncate text-text-tertiary" style={{ fontSize: text(13, 10), lineHeight: 1.3 }}>
                        {row.source} · {row.minutes}m
                      </span>
                    </span>
                    {active ? (
                      <span className="text-icon-primary" style={{ marginRight: q(8) }}>
                        <PlayGlyph playing={isPlaying} size={14} />
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Player */}
        <div
          className="border border-border-10 bg-white/90 shadow-[0_4px_16px_rgb(0_0_0/0.15)] backdrop-blur-[20px]"
          style={{ borderRadius: q(16), padding: `${q(12)} ${q(16)}` }}
        >
          <div className="flex items-center" style={{ gap: q(16) }}>
            <Thumb item={item} size={36} radius={6} />
            <div className="min-w-0 flex-1" aria-live="polite">
              <p className="truncate font-medium text-text-primary" style={{ fontSize: text(14, 11), lineHeight: 1.3 }}>
                {item.title}
              </p>
              <p className="truncate text-text-tertiary" style={{ fontSize: text(13, 10), lineHeight: 1.3 }}>
                {item.source}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSpeedIndex((s) => (s + 1) % SPEEDS.length)}
              aria-label={`Playback speed ${SPEEDS[speedIndex]}×, change`}
              className="cursor-pointer text-text-tertiary outline-none transition-colors duration-150 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-[var(--v-accent)]"
              style={{ fontSize: text(13, 10) }}
            >
              {SPEEDS[speedIndex]}×
            </button>
            <button
              type="button"
              onClick={toggle}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="shrink-0 cursor-pointer text-icon-primary outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-accent)]"
            >
              <PlayGlyph playing={isPlaying} size={22} />
            </button>
            <button
              type="button"
              onClick={() => select((current + 1) % ITEMS.length)}
              aria-label="Next summary"
              className="shrink-0 cursor-pointer text-icon-primary outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-accent)]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: q(20), height: q(20) }}>
                <path d="M6 5v14l9-7-9-7Zm10 0h2v14h-2V5Z" />
              </svg>
            </button>
          </div>
          <div className="overflow-hidden rounded-full bg-border-10" style={{ height: q(4), marginTop: q(10) }}>
            <div className="h-full rounded-full bg-[var(--v-accent)]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
