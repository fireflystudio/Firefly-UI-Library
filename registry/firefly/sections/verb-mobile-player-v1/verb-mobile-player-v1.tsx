"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Verb Reader mobile player: the whole flow from Figma (section "Mobile Player", 16 states) as one
 * working phone screen, 390 × 844.
 *
 * Feed: ▶ on a summary starts it in the floating mini player; ⋮ opens Save / Add to queue / Copy /
 * More on …; "Added to queue" comes back as a snackbar with Undo. Tapping the mini player opens the
 * full player: cover (or the source mark when there is no cover), scrubber, speed list (1× – 3×),
 * play / pause / next, the summary with See more, and the queue. Queue rows play on tap; their ⋮ has
 * Remove / Save / Open summary; Clear empties the queue (Undo). The top ⋮ has Save, Copy, Unfollow,
 * Share feedback and Close player. A new summary shows Loading first; one sample summary fails the
 * first time (Couldn't play this, retry). Nothing is audible: progress runs on a timer.
 *
 * The parts are exported too (MiniPlayer, Snackbar, Menu …) so the flow and the single elements share
 * one source. Content is the Figma sample; pass `items` / `queue` to change it.
 */

/** Verb brand values, set as CSS variables on the root so the file needs no brand tokens in the host. */
const VERB_VARS = {
  "--v-accent": "#4d63fd",
  "--v-btn": "rgb(0 0 0 / 0.06)",
  "--v-btn-hover": "rgb(0 0 0 / 0.1)",
  "--v-chrome": "#eaeaea",
  "--v-snack": "#262626",
  "--v-snack-action": "#a5aeff",
  "--v-error": "#e5251f",
} as CSSProperties;

const IMG = "/images/verb-player";

export type PlayerItem = {
  id: string;
  title: string;
  source: string;
  /** Square source mark (logo or portrait). */
  sourceSrc: string;
  /** "1h", "2d" … shown in the feed. */
  age: string;
  /** Length of the audio summary in seconds. */
  duration: number;
  /** Short summary shown in the feed and folded in the player. */
  excerpt: string;
  /** Full summary for See more (paragraphs). Defaults to the excerpt. */
  summary?: string[];
  /** 16:9 cover. Without it the player shows the source mark on grey. */
  cover?: string;
  /** Topic used in "More on …". */
  topic?: string;
  /** Demo: the first play fails (error state with retry). */
  failsOnce?: boolean;
};

const SAMPLE_ITEMS: PlayerItem[] = [
  {
    id: "time-saved",
    title: "Why ‘time saved’ is the wrong metric for AI at work",
    source: "The Guardian",
    sourceSrc: `${IMG}/source-guardian.png`,
    age: "1h",
    duration: 60,
    excerpt: "Teams that tracked hours saved by AI found the time went straight back into more work, not better work.",
    cover: `${IMG}/thumb-ai-at-work.png`,
    topic: "Productivity",
  },
  {
    id: "true-happiness",
    title: "The Art of True Happiness | Dr. Arthur Brooks",
    source: "Andrew Huberman",
    sourceSrc: `${IMG}/source-huberman.jpg`,
    age: "2h",
    duration: 131,
    excerpt: "Happiness is enjoyment, satisfaction and meaning. Most people neglect the third.",
    summary: [
      "Arthur Brooks argues that happiness has three parts: enjoyment, satisfaction and meaning. Most people chase the first and neglect the third. In this two-hour talk he explains why pleasure fades within hours, while meaning builds over years.",
      "Satisfaction, he says, comes from wanting less rather than having more. He describes a simple exercise: write down what you own and what you want, then shorten the second list.",
      "The last part covers relationships. Brooks points to long-running studies in which close friendships in midlife predicted wellbeing in old age better than income or career success did.",
    ],
    cover: `${IMG}/cover-true-happiness.jpg`,
    topic: "Wellbeing",
  },
  {
    id: "eu-ai-act",
    title: "The EU AI Act's initial compliance deadline is set for March, marking a pivotal moment for AI developers and organizations",
    source: "Rest of World",
    sourceSrc: `${IMG}/source-rest-of-world.png`,
    age: "1d",
    duration: 120,
    excerpt: "General-purpose AI models must publish training data summaries and copyright policies by March.",
    cover: `${IMG}/thumb-eu-ai-act.png`,
    topic: "AI",
  },
  {
    id: "design-systems",
    title: "Design systems are org charts in disguise",
    source: "Above The Crowd",
    sourceSrc: `${IMG}/source-above-the-crowd.png`,
    age: "1d",
    duration: 180,
    excerpt: "A design system mirrors the company. Library disputes are really disputes about ownership.",
    cover: `${IMG}/thumb-design-systems.png`,
    topic: "Design",
    failsOnce: true,
  },
  {
    id: "clinical-ai",
    title: "Where clinical AI actually reduced readmissions",
    source: "Hacker News",
    sourceSrc: `${IMG}/source-hacker-news.png`,
    age: "2d",
    duration: 41,
    excerpt: "Hospitals that cut readmissions with AI did it with discharge scheduling, not diagnosis.",
    topic: "Healthcare",
  },
];

/* Lists behind the Trending chips (sample copy, not in Figma; no covers, so the source mark shows). */
const src = {
  guardian: `${IMG}/source-guardian.png`,
  row: `${IMG}/source-rest-of-world.png`,
  hn: `${IMG}/source-hacker-news.png`,
  atc: `${IMG}/source-above-the-crowd.png`,
  huberman: `${IMG}/source-huberman.jpg`,
};
const topicItem = (id: string, title: string, source: keyof typeof src, sourceName: string, age: string, duration: number, excerpt: string, topic: string): PlayerItem => ({
  id,
  title,
  source: sourceName,
  sourceSrc: src[source],
  age,
  duration,
  excerpt,
  topic,
});
const SAMPLE_TOPICS: Record<string, PlayerItem[]> = {
  Science: [
    topicItem("sci-1", "A new map of the brain's wiring shows how memories are stored", "guardian", "The Guardian", "3h", 95, "Researchers traced every connection in a cubic millimetre of cortex and found far more links than expected.", "Science"),
    topicItem("sci-2", "Why sleep resets the brain for learning", "huberman", "Andrew Huberman", "1d", 150, "Deep sleep clears the day's noise so new skills stick; a later bedtime costs more than an early alarm.", "Science"),
    topicItem("sci-3", "The quiet progress of fusion experiments", "hn", "Hacker News", "2d", 70, "Two labs held a stable plasma for minutes, not seconds, but power plants are still decades away.", "Science"),
  ],
  "Electric cars": [
    topicItem("ev-1", "Cheaper batteries are finally reaching small cars", "row", "Rest of World", "2h", 80, "Sodium-ion cells cut the price of city cars below their petrol rivals in three markets.", "Electric cars"),
    topicItem("ev-2", "Charging networks are the real competition now", "guardian", "The Guardian", "1d", 110, "Drivers pick a car by the chargers on their route; reliability matters more than speed.", "Electric cars"),
    topicItem("ev-3", "What fleets learned from five years of electric vans", "hn", "Hacker News", "3d", 60, "Maintenance fell by a third; winter range is the one surprise operators still plan around.", "Electric cars"),
  ],
  Climate: [
    topicItem("cl-1", "Heat pumps outsold gas boilers for the first time", "guardian", "The Guardian", "4h", 75, "Subsidies helped, but quieter units and installers trained at scale did most of the work.", "Climate"),
    topicItem("cl-2", "Cities that cooled their streets with trees", "row", "Rest of World", "1d", 90, "Shade lowered street temperatures by up to six degrees and cut hospital visits during heatwaves.", "Climate"),
    topicItem("cl-3", "Carbon removal has a measurement problem", "atc", "Above The Crowd", "2d", 120, "Buyers pay for tonnes nobody can verify; the market needs auditing before it needs money.", "Climate"),
  ],
  "Formula 1": [
    topicItem("f1-1", "How the new engine rules change the 2026 grid", "guardian", "The Guardian", "1h", 85, "Half the power now comes from batteries, so energy management becomes a race skill.", "Formula 1"),
    topicItem("f1-2", "Inside a pit stop that takes two seconds", "hn", "Hacker News", "1d", 55, "Twenty people, one rehearsed sequence and sensors on every wheel gun.", "Formula 1"),
    topicItem("f1-3", "Why rookies struggle in their first season", "row", "Rest of World", "3d", 100, "Simulators teach the tracks, not the tyres; most rookies lose time in the second half of a stint.", "Formula 1"),
  ],
  Robotics: [
    topicItem("rb-1", "Warehouse robots learn new items from one example", "hn", "Hacker News", "2h", 70, "A foundation model lets pickers handle products they have never seen before.", "Robotics"),
    topicItem("rb-2", "Humanoid robots meet the factory floor", "guardian", "The Guardian", "1d", 130, "Pilots show they work, slowly; the business case still depends on night shifts.", "Robotics"),
    topicItem("rb-3", "Surgical robots and the shortage of surgeons", "row", "Rest of World", "4d", 90, "Remote operations are moving from trials to rural hospitals.", "Robotics"),
  ],
  Gaming: [
    topicItem("gm-1", "Small studios are winning with shorter games", "atc", "Above The Crowd", "5h", 65, "Players finish ten-hour games and recommend them; long ones get abandoned at the halfway mark.", "Gaming"),
    topicItem("gm-2", "Cloud gaming finally works on trains", "hn", "Hacker News", "2d", 50, "Better codecs hide latency spikes, though competitive play still needs a cable.", "Gaming"),
    topicItem("gm-3", "What game design teaches about habits", "huberman", "Andrew Huberman", "3d", 140, "Small rewards at the right moment keep people going; the same loop works for exercise.", "Gaming"),
  ],
};

const SPEEDS = [1, 1.25, 1.5, 2, 3] as const;
const LOADING_MS = 900;

/* ------------------------------------------------------------------------------------------------ */
/* Helpers                                                                                          */
/* ------------------------------------------------------------------------------------------------ */

const clock = (s: number) => {
  const t = Math.max(0, Math.round(s));
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, "0")}`;
};
const minutes = (s: number) => (s < 60 ? `${Math.round(s)}s` : `${Math.round(s / 60)}m`);
const speedLabel = (s: number) => `${s}×`;

/* ------------------------------------------------------------------------------------------------ */
/* Icons (Serenity stroke set, 1.5px)                                                               */
/* ------------------------------------------------------------------------------------------------ */

type IconName =
  | "play" | "pause" | "next" | "more" | "chevron-down" | "menu" | "search" | "plus" | "bookmark" | "queue-add"
  | "copy" | "list" | "unfollow" | "flag" | "close" | "retry" | "bars" | "tabs" | "reload";

export function Icon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  const paths: Record<IconName, ReactNode> = {
    play: <path d="M7 4.8v14.4a.9.9 0 0 0 1.38.76l11.2-7.2a.9.9 0 0 0 0-1.52L8.38 4.04A.9.9 0 0 0 7 4.8Z" fill="currentColor" />,
    pause: (
      <g fill="currentColor">
        <rect x="5.5" y="4" width="4.5" height="16" rx="1.2" />
        <rect x="14" y="4" width="4.5" height="16" rx="1.2" />
      </g>
    ),
    next: (
      <g fill="currentColor">
        <path d="M5 5.6v12.8a.8.8 0 0 0 1.25.66l9.3-6.4a.8.8 0 0 0 0-1.32l-9.3-6.4A.8.8 0 0 0 5 5.6Z" />
        <rect x="16.5" y="4.5" width="2.5" height="15" rx="1" />
      </g>
    ),
    more: (
      <g fill="currentColor">
        <circle cx="12" cy="5.5" r="1.4" />
        <circle cx="12" cy="12" r="1.4" />
        <circle cx="12" cy="18.5" r="1.4" />
      </g>
    ),
    "chevron-down": <path d="m6 9 6 6 6-6" {...stroke} />,
    menu: <path d="M4 7.5h16M4 12h16M4 16.5h16" {...stroke} />,
    search: (
      <g {...stroke}>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </g>
    ),
    plus: <path d="M12 5v14M5 12h14" {...stroke} />,
    bookmark: <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-4-6 4V5.5a1 1 0 0 1 1-1Z" {...stroke} />,
    "queue-add": <path d="M4 7h12M4 12h12M4 17h8M18 14v6M15 17h6" {...stroke} />,
    copy: (
      <g {...stroke}>
        <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
        <path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" />
      </g>
    ),
    list: <path d="M9 7h11M9 12h11M9 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01" {...stroke} />,
    unfollow: (
      <g {...stroke}>
        <circle cx="12" cy="12" r="8" />
        <path d="M8.5 12h7" />
      </g>
    ),
    flag: <path d="M5.5 20.5v-16m0 0h11l-2 4 2 4h-11" {...stroke} />,
    close: <path d="m6 6 12 12M18 6 6 18" {...stroke} />,
    retry: (
      <g {...stroke}>
        <path d="M19 12a7 7 0 0 1-12.2 4.7M5 12a7 7 0 0 1 12.2-4.7" />
        <path d="M17.5 3.5v4h-4M6.5 20.5v-4h4" />
      </g>
    ),
    bars: (
      <g fill="currentColor">
        <rect x="5" y="10" width="2.6" height="9" rx="1" />
        <rect x="10.7" y="5" width="2.6" height="14" rx="1" />
        <rect x="16.4" y="8" width="2.6" height="11" rx="1" />
      </g>
    ),
    tabs: (
      <g {...stroke}>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M4 9h16M8 13h8M8 16h5" />
      </g>
    ),
    reload: (
      <g {...stroke}>
        <path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3" />
        <path d="M19.5 4.5v4h-4" />
      </g>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className={`shrink-0 ${className}`}>
      {paths[name]}
    </svg>
  );
}

function Spinner({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className="animate-spin motion-reduce:animate-none">
      <circle cx="12" cy="12" r="9" fill="none" stroke="rgb(0 0 0 / 0.1)" strokeWidth="1.8" />
      <path d="M12 3a9 9 0 0 1 9 9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------------------------------------ */
/* Small parts                                                                                      */
/* ------------------------------------------------------------------------------------------------ */

/** Square source mark (logo / portrait), rounded like the Figma avatar "organization". */
export function SourceMark({ src, size = 24 }: { src: string; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" width={size} height={size} className="shrink-0 object-cover" style={{ width: size, height: size, borderRadius: Math.max(4, size * 0.22) }} />
  );
}

/** 40px round ghost icon button (Serenity "button: icon", ghost). */
function GhostButton({
  label,
  onClick,
  children,
  size = 40,
  rounded = "full",
  active = false,
  disabled = false,
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  size?: 32 | 40;
  rounded?: "full" | "m";
  active?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={`flex shrink-0 cursor-pointer items-center justify-center text-icon-primary outline-none transition-colors duration-150 hover:bg-[var(--v-btn)] focus-visible:ring-2 focus-visible:ring-[var(--v-accent)] disabled:cursor-default disabled:text-icon-quaternary disabled:hover:bg-transparent ${
        rounded === "full" ? "rounded-full" : "rounded-[8px]"
      } ${active ? "bg-[var(--v-btn)]" : ""}`}
      style={{ width: size, height: size }}
    >
      {children}
    </button>
  );
}

export type MenuItem = { icon?: IconName; label: string; onSelect: () => void };

/** Serenity "menus": white panel, 40px rows with a 16px stroke icon. */
export function Menu({ items, className = "", width = 240 }: { items: MenuItem[]; className?: string; width?: number }) {
  return (
    <div
      role="menu"
      className={`z-30 flex flex-col rounded-[12px] border border-border-06 bg-surface-primary p-1 shadow-[0_4px_12px_rgb(0_0_0/0.05)] ${className}`}
      style={{ width }}
    >
      {items.map((item) => (
        <button
          key={item.label}
          type="button"
          role="menuitem"
          onClick={item.onSelect}
          className="flex h-10 cursor-pointer items-center gap-3 rounded-[8px] px-3 text-left text-[16px] leading-[20px] tracking-[-0.3px] text-text-secondary outline-none transition-colors duration-150 hover:bg-surface-secondary hover:text-text-primary focus-visible:bg-surface-secondary"
        >
          {item.icon ? <Icon name={item.icon} size={16} className="text-icon-secondary" /> : null}
          <span className="truncate">{item.label}</span>
        </button>
      ))}
    </div>
  );
}

/** Dark snackbar (Serenity "contrast"), optional Undo. */
export function Snackbar({ message, actionLabel, onAction, className = "" }: { message: string; actionLabel?: string; onAction?: () => void; className?: string }) {
  return (
    <div
      role="status"
      className={`flex h-12 items-center justify-between gap-3 rounded-[12px] bg-[var(--v-snack)] pl-3 pr-1 shadow-[0_8px_24px_rgb(0_0_0/0.18)] ${className}`}
    >
      <p className="truncate text-[13px] leading-[16px] tracking-[-0.4px] text-white">{message}</p>
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="h-8 shrink-0 cursor-pointer rounded-[8px] px-3 text-[13px] leading-[16px] tracking-[-0.4px] text-[var(--v-snack-action)] outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white/40"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}

/** Speed list (Serenity "dropdown"): the selected speed in medium weight. */
export function SpeedList({ value, onSelect, className = "" }: { value: number; onSelect: (s: number) => void; className?: string }) {
  return (
    <div role="listbox" aria-label="Playback speed" className={`z-30 flex w-[160px] flex-col rounded-[12px] bg-surface-primary p-1 shadow-[0_0_40px_rgb(0_0_0/0.12)] ${className}`}>
      {SPEEDS.map((s) => {
        const on = s === value;
        return (
          <button
            key={s}
            type="button"
            role="option"
            aria-selected={on}
            onClick={() => onSelect(s)}
            className={`flex h-10 cursor-pointer items-center rounded-[8px] px-3 text-left text-[14px] leading-[18px] tracking-[-0.4px] outline-none transition-colors hover:bg-surface-secondary focus-visible:bg-surface-secondary ${
              on ? "font-medium text-text-primary" : "text-text-secondary"
            }`}
          >
            {speedLabel(s)}
          </button>
        );
      })}
    </div>
  );
}

/** Floating mini player (Figma "player v3", mobile 358 × 58). */
export function MiniPlayer({
  item,
  playing,
  progress,
  onOpen,
  onToggle,
  onNext,
  canNext,
}: {
  item: PlayerItem;
  playing: boolean;
  /** 0–1 */
  progress: number;
  onOpen: () => void;
  onToggle: () => void;
  onNext: () => void;
  canNext: boolean;
}) {
  return (
    <div className="relative flex h-[58px] items-center gap-2 overflow-clip rounded-[16px] border border-black/[0.08] bg-surface-primary/95 px-2 py-[5px] shadow-[0_4px_32px_rgb(0_0_0/0.15)] backdrop-blur-[20px]">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open player: ${item.title}`}
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-accent)]"
      >
        <SourceMark src={item.sourceSrc} size={40} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-medium leading-[18px] tracking-[-0.4px] text-text-primary">{item.title}</span>
          <span className="block truncate text-[13px] leading-[16px] tracking-[-0.4px] text-text-tertiary">{item.source}</span>
        </span>
      </button>
      <div className="flex shrink-0 items-center gap-1">
        <GhostButton label={playing ? "Pause" : "Play"} onClick={onToggle}>
          <Icon name={playing ? "pause" : "play"} size={24} />
        </GhostButton>
        <GhostButton label="Next" onClick={onNext} disabled={!canNext}>
          <Icon name="next" size={20} />
        </GhostButton>
      </div>
      <div className="absolute -inset-x-px -bottom-px h-1 bg-black/10">
        <div className="h-full rounded-r-full bg-[var(--v-accent)]" style={{ width: `${progress * 100}%` }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------ */
/* Phone chrome (iOS status bar + Safari address bar)                                               */
/* ------------------------------------------------------------------------------------------------ */

function PhoneChrome() {
  return (
    <div className="relative z-20 shrink-0 border-b border-border-06 bg-surface-primary">
      <div className="flex h-[62px] items-center justify-between px-4">
        <span className="w-[103px] text-center text-[17px] font-semibold leading-[22px] text-black">9:41</span>
        <span className="flex w-[103px] items-center justify-center gap-[6px] text-black" aria-hidden>
          <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
            <rect x="0" y="8" width="3" height="4" rx="1" />
            <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
            <rect x="10" y="3" width="3" height="9" rx="1" />
            <rect x="15" y="0" width="3" height="12" rx="1" />
          </svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
            <path d="M8 2.6c2.2 0 4.2.9 5.7 2.3l1.1-1.1A9.7 9.7 0 0 0 8 1 9.7 9.7 0 0 0 1.2 3.8l1.1 1.1A8.1 8.1 0 0 1 8 2.6Z" />
            <path d="M8 5.8c1.3 0 2.5.5 3.4 1.3l1.1-1.1A6.4 6.4 0 0 0 8 4.2c-1.7 0-3.3.7-4.5 1.8l1.1 1.1c.9-.8 2.1-1.3 3.4-1.3Z" />
            <path d="M8 9c.5 0 .9.2 1.2.5L8 10.7 6.8 9.5C7.1 9.2 7.5 9 8 9Z" />
          </svg>
          <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
            <rect x=".5" y=".5" width="23" height="12" rx="3.5" stroke="currentColor" opacity=".35" />
            <rect x="2" y="2" width="20" height="9" rx="2" fill="currentColor" />
            <path d="M25 4.5v4a2 2 0 0 0 0-4Z" fill="currentColor" opacity=".4" />
          </svg>
        </span>
      </div>
      <div className="p-[9px]">
        <div className="flex h-[35px] items-center rounded-[8px] bg-[var(--v-chrome)] px-[7px]">
          <Icon name="tabs" size={20} className="text-text-primary" />
          <span className="flex-1 text-center text-[16px] leading-[22px] tracking-[-0.2px] text-text-primary">website.com</span>
          <Icon name="reload" size={20} className="text-text-primary" />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------ */
/* The flow                                                                                         */
/* ------------------------------------------------------------------------------------------------ */

type Snack = { id: number; message: string; undo?: () => void };
type OpenMenu =
  | { kind: "feed"; id: string }
  | { kind: "player" }
  | { kind: "speed" }
  | { kind: "row"; id: string }
  | null;

export type MobilePlayerProps = {
  /** Feed content, in order. Defaults to the Figma sample. */
  items?: PlayerItem[];
  /** Id of the summary already in the player (mini player on load). `null` = nothing playing. */
  startId?: string | null;
  /** Seconds already played of the start summary. */
  startAt?: number;
  /** Ids queued after it. */
  queue?: string[];
  /** Feed header. */
  title?: string;
  /** Interest chips under "Trending". */
  trending?: string[];
  /** The list a chip shows when it is selected (chip label → summaries). */
  topics?: Record<string, PlayerItem[]>;
  /** Avatar in the app bar. */
  avatarSrc?: string;
  /** Length shown on the "New" button. Defaults to the sum of the feed. */
  newLabel?: string;
  className?: string;
};

export function MobilePlayer({
  items = SAMPLE_ITEMS,
  startId = "true-happiness",
  startAt = 32,
  queue: startQueue = ["time-saved", "eu-ai-act", "design-systems"],
  title = "For you",
  trending = ["Science", "Electric cars", "Climate", "Formula 1", "Robotics", "Gaming"],
  topics = SAMPLE_TOPICS,
  avatarSrc = `${IMG}/avatar-user.jpg`,
  newLabel = "12m",
  className = "",
}: MobilePlayerProps) {
  const byId = useMemo(() => new Map([...items, ...Object.values(topics).flat()].map((i) => [i.id, i])), [items, topics]);

  const [currentId, setCurrentId] = useState<string | null>(startId);
  const [elapsed, setElapsed] = useState(startAt);
  const [status, setStatus] = useState<"playing" | "paused" | "loading" | "error">(startId ? "playing" : "paused");
  const [queue, setQueue] = useState<string[]>(startQueue);
  const [speed, setSpeed] = useState(1);
  const [expanded, setExpanded] = useState(false); // full player open
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [menu, setMenu] = useState<OpenMenu>(null);
  const [snack, setSnack] = useState<Snack | null>(null);
  const [failed, setFailed] = useState<Set<string>>(() => new Set());
  const [topic, setTopic] = useState<string | null>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const [openExcerpts, setOpenExcerpts] = useState<Set<string>>(() => new Set());
  const [reduced, setReduced] = useState(false);
  const loadTimer = useRef<number | undefined>(undefined);
  const snackTimer = useRef<number | undefined>(undefined);
  const snackId = useRef(0);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    return () => {
      window.clearTimeout(loadTimer.current);
      window.clearTimeout(snackTimer.current);
    };
  }, []);

  // A vertical mouse wheel over the chips scrolls them sideways (non-passive, so the feed does not move too).
  useEffect(() => {
    const el = chipsRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      if ((e.deltaY < 0 && el.scrollLeft <= 0) || (e.deltaY > 0 && el.scrollLeft >= max)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const current = currentId ? byId.get(currentId) ?? null : null;
  const playing = status === "playing";

  const showSnack = useCallback((message: string, undo?: () => void) => {
    window.clearTimeout(snackTimer.current);
    const id = ++snackId.current;
    setSnack({ id, message, undo });
    snackTimer.current = window.setTimeout(() => setSnack((s) => (s?.id === id ? null : s)), 4000);
  }, []);

  /** Load a summary into the player: Loading, then Playing (or Error the first time for `failsOnce`). */
  const load = useCallback(
    (id: string) => {
      window.clearTimeout(loadTimer.current);
      setCurrentId(id);
      setElapsed(0);
      setSummaryOpen(false);
      setStatus("loading");
      const item = byId.get(id);
      loadTimer.current = window.setTimeout(() => {
        if (item?.failsOnce && !failed.has(id)) {
          setFailed((f) => new Set(f).add(id));
          setStatus("error");
        } else setStatus("playing");
      }, LOADING_MS);
    },
    [byId, failed]
  );

  const next = useCallback(() => {
    setQueue((q) => {
      if (q.length === 0) return q;
      const [head, ...rest] = q;
      load(head);
      return rest;
    });
  }, [load]);

  // Progress runs while playing; at the end the next queued summary starts.
  useEffect(() => {
    if (!playing || !current) return;
    const tick = 250;
    const id = window.setInterval(() => {
      setElapsed((e) => {
        const n = e + (tick / 1000) * speed * (reduced ? 0 : 1);
        return Math.min(n, current.duration);
      });
    }, tick);
    return () => window.clearInterval(id);
  }, [playing, current, speed, reduced]);

  useEffect(() => {
    if (current && elapsed >= current.duration && playing) {
      if (queue.length) next();
      else setStatus("paused");
    }
  }, [elapsed, current, playing, queue.length, next]);

  const toggle = () => {
    if (!current) return;
    if (status === "error") return load(current.id);
    if (status === "loading") return;
    if (elapsed >= current.duration) setElapsed(0);
    setStatus(playing ? "paused" : "playing");
  };

  const playFromFeed = (id: string) => {
    setMenu(null);
    if (id === currentId) return toggle();
    setQueue((q) => q.filter((x) => x !== id));
    load(id);
  };

  const playAllNew = () => {
    const ids = items.map((i) => i.id);
    load(ids[0]);
    setQueue(ids.slice(1));
  };

  const addToQueue = (id: string) => {
    setMenu(null);
    if (id === currentId || queue.includes(id)) return showSnack("Already in the queue");
    const before = queue;
    setQueue((q) => [...q, id]);
    showSnack("Added to queue", () => setQueue(before));
  };

  const removeFromQueue = (id: string) => {
    setMenu(null);
    const before = queue;
    setQueue((q) => q.filter((x) => x !== id));
    showSnack("Removed from queue", () => setQueue(before));
  };

  const clearQueue = () => {
    const before = queue;
    setQueue([]);
    showSnack("Queue cleared", () => setQueue(before));
  };

  const closePlayer = () => {
    setMenu(null);
    setExpanded(false);
    window.clearTimeout(loadTimer.current);
    setCurrentId(null);
    setStatus("paused");
  };

  const seek = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    setElapsed(p * current.duration);
  };

  const queueTotal = queue.reduce((s, id) => s + (byId.get(id)?.duration ?? 0), 0);
  const newTotal = items.reduce((s, i) => s + i.duration, 0);
  const progress = current ? elapsed / current.duration : 0;

  /* ---- Feed ------------------------------------------------------------------------------------ */
  const feed = (
    <div inert={expanded} aria-hidden={expanded || undefined} className="flex-1 overflow-y-auto overscroll-contain pb-[120px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {/* App bar */}
      <div className="flex h-14 items-center gap-2 bg-surface-primary px-2">
        <GhostButton label="Menu" rounded="m">
          <Icon name="menu" size={20} className="text-icon-tertiary" />
        </GhostButton>
        <h2 className="flex-1 text-[20px] font-medium leading-[24px] tracking-[-0.5px] text-text-primary">{title}</h2>
        <GhostButton label="Search" rounded="m">
          <Icon name="search" size={20} className="text-icon-tertiary" />
        </GhostButton>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatarSrc} alt="" width={32} height={32} className="mr-1 size-8 rounded-full object-cover" />
      </div>

      {/* Listen + add interests */}
      <div className="flex flex-col gap-4 px-5 pb-6 pt-2">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={playAllNew}
            className="flex h-8 cursor-pointer items-center gap-2 rounded-[8px] bg-[var(--v-btn)] px-2 text-[13px] leading-[16px] tracking-[-0.4px] text-text-primary outline-none transition-colors hover:bg-[var(--v-btn-hover)] focus-visible:ring-2 focus-visible:ring-[var(--v-accent)]"
          >
            <Icon name="play" size={16} />
            New · {newLabel ?? minutes(newTotal)}
          </button>
          <button
            type="button"
            onClick={() => showSnack("Interests open in the full app")}
            className="ml-auto flex h-8 cursor-pointer items-center gap-2 rounded-[8px] px-2 text-[13px] leading-[16px] tracking-[-0.4px] text-text-tertiary outline-none transition-colors hover:bg-[var(--v-btn)] focus-visible:ring-2 focus-visible:ring-[var(--v-accent)]"
          >
            <Icon name="plus" size={16} />
            Add interest
          </button>
        </div>
        {/* Chips scroll sideways: trackpad, wheel (turned sideways) or drag with the mouse. */}
        <div
          ref={chipsRef}
          onPointerDown={(e) => {
            if (e.pointerType !== "mouse" || !chipsRef.current) return;
            drag.current = { x: e.clientX, left: chipsRef.current.scrollLeft, moved: false };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d || !chipsRef.current) return;
            const dx = e.clientX - d.x;
            if (Math.abs(dx) > 4) d.moved = true;
            chipsRef.current.scrollLeft = d.left - dx;
          }}
          onPointerUp={() => {
            window.setTimeout(() => (drag.current = null), 0);
          }}
          onPointerLeave={() => (drag.current = null)}
          onClickCapture={(e) => {
            if (drag.current?.moved) {
              e.stopPropagation();
              e.preventDefault();
            }
          }}
          className="-mx-5 flex cursor-grab select-none items-center gap-3 overflow-x-auto overscroll-x-contain px-5 active:cursor-grabbing [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <span className="shrink-0 text-[12px] leading-[16px] tracking-[-0.4px] text-text-tertiary">Trending</span>
          {trending.map((t) => {
            const on = topic === t;
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => setTopic(on ? null : t)}
                className={`h-8 shrink-0 cursor-pointer rounded-full border px-3 text-[13px] leading-[16px] tracking-[-0.4px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--v-accent)] ${
                  on ? "border-text-primary bg-text-primary text-white" : "border-border-10 text-text-secondary hover:bg-surface-secondary"
                }`}
              >
                {t}
              </button>
            );
          })}
          <span aria-hidden className="w-2 shrink-0" />
        </div>
      </div>

      {/* Summaries */}
      {topic ? (
        <div className="flex items-center justify-between px-5 pb-2">
          <p className="text-[14px] font-medium leading-[18px] tracking-[-0.4px] text-text-secondary">Trending in {topic}</p>
          <button
            type="button"
            onClick={() => setTopic(null)}
            className="h-8 cursor-pointer rounded-[8px] px-2 text-[13px] leading-[16px] tracking-[-0.4px] text-text-tertiary outline-none transition-colors hover:bg-[var(--v-btn)] focus-visible:ring-2 focus-visible:ring-[var(--v-accent)]"
          >
            Back to {title}
          </button>
        </div>
      ) : null}
      <ul key={topic ?? "all"} className="flex flex-col gap-1 px-2 motion-safe:animate-[feature-in_0.35s_ease-out_both]">
        {(topic ? topics[topic] ?? [] : items).map((item) => {
          const isCurrent = item.id === currentId;
          return (
            <li
              key={item.id}
              className={`group relative flex items-start gap-4 rounded-[12px] px-3 py-3 transition-colors duration-150 hover:bg-surface-secondary ${
                isCurrent ? "bg-surface-secondary" : ""
              }`}
            >
              {/* The whole row plays the summary (or pauses it when it is already playing). */}
              <button
                type="button"
                onClick={() => playFromFeed(item.id)}
                aria-label={isCurrent ? `${playing ? "Pause" : "Play"}: ${item.title}` : `Play: ${item.title}`}
                className="absolute inset-0 cursor-pointer rounded-[12px] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--v-accent)]"
              />
              <div className="pointer-events-none relative flex min-w-0 flex-1 flex-col gap-2">
                <h3 className="line-clamp-2 text-[18px] font-medium leading-[22px] tracking-[-0.45px] text-text-primary">{item.title}</h3>
                <p className="flex items-center gap-2 text-[13px] leading-[16px] tracking-[-0.4px]">
                  <SourceMark src={item.sourceSrc} size={16} />
                  <span className="truncate text-text-secondary">{item.source}</span>
                  <span className="text-text-tertiary">·</span>
                  <span className="text-text-tertiary">{item.age}</span>
                  {isCurrent && playing ? <Icon name="bars" size={16} className="text-[var(--v-accent)]" /> : null}
                </p>
                <p className="text-[15px] leading-[22px] tracking-[-0.5px] text-text-secondary">
                  {item.excerpt.length > 80 && !openExcerpts.has(item.id) ? (
                    <>
                      {item.excerpt.slice(0, 78).replace(/\s\S*$/, "")}…{" "}
                      <button
                        type="button"
                        onClick={() => setOpenExcerpts((o) => new Set(o).add(item.id))}
                        className="pointer-events-auto relative cursor-pointer text-[var(--v-accent)] outline-none hover:underline"
                      >
                        See more
                      </button>
                    </>
                  ) : (
                    item.excerpt
                  )}
                </p>
              </div>
              <div className="pointer-events-none relative flex w-[112px] shrink-0 flex-col items-end gap-4">
                <div className="relative h-[56.25px] w-full overflow-clip rounded-[3.75px] bg-surface-secondary">
                  {item.cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.cover} alt="" className="size-full object-cover" />
                  ) : (
                    <span className="flex size-full items-center justify-center">
                      <SourceMark src={item.sourceSrc} size={28} />
                    </span>
                  )}
                  {isCurrent ? (
                    <span className="absolute inset-x-0 bottom-0 h-[3px] bg-black/20">
                      <span className="block h-full bg-[var(--v-accent)]" style={{ width: `${progress * 100}%` }} />
                    </span>
                  ) : null}
                </div>
                <div className="pointer-events-auto relative flex w-full items-start justify-between">
                  {isCurrent ? (
                    <span />
                  ) : (
                    <button
                      type="button"
                      onClick={() => playFromFeed(item.id)}
                      aria-label={`Play summary: ${item.title}`}
                      className="flex h-8 w-[70px] cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[var(--v-btn)] text-[13px] leading-[16px] tracking-[-0.4px] text-text-primary outline-none transition-colors hover:bg-[var(--v-btn-hover)] focus-visible:ring-2 focus-visible:ring-[var(--v-accent)]"
                    >
                      <Icon name="play" size={16} />
                      {minutes(item.duration)}
                    </button>
                  )}
                  <GhostButton
                    label={`More actions: ${item.title}`}
                    size={32}
                    rounded="m"
                    active={menu?.kind === "feed" && menu.id === item.id}
                    onClick={() => setMenu(menu?.kind === "feed" && menu.id === item.id ? null : { kind: "feed", id: item.id })}
                  >
                    <Icon name="more" size={16} className="text-icon-secondary" />
                  </GhostButton>
                  {menu?.kind === "feed" && menu.id === item.id ? (
                    <Menu
                      className="absolute right-0 top-[calc(100%+4px)]"
                      items={[
                        { icon: "bookmark", label: "Save", onSelect: () => (setMenu(null), showSnack("Saved")) },
                        { icon: "queue-add", label: "Add to queue", onSelect: () => addToQueue(item.id) },
                        { icon: "copy", label: "Copy", onSelect: () => (setMenu(null), showSnack("Copied")) },
                        { icon: "list", label: `More on ${item.topic ?? item.source}`, onSelect: () => (setMenu(null), showSnack(`More on ${item.topic ?? item.source} added to your feed`)) },
                      ]}
                    />
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );

  /* ---- Full player ------------------------------------------------------------------------------ */
  const remaining = current ? current.duration - elapsed : 0;
  const summary = current ? current.summary ?? [current.excerpt] : [];
  const full = current ? (
    <div
      role="dialog"
      aria-label="Player"
      aria-hidden={!expanded}
      inert={!expanded}
      className={`absolute inset-x-0 bottom-0 top-[115px] z-10 flex flex-col bg-surface-primary transition-transform duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none ${
        expanded ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex h-12 shrink-0 items-center justify-between px-5">
        <GhostButton label="Close full player" rounded="m" onClick={() => (setExpanded(false), setMenu(null))}>
          <Icon name="chevron-down" size={20} className="text-icon-tertiary" />
        </GhostButton>
        <div className="relative">
          <GhostButton label="Player actions" rounded="m" active={menu?.kind === "player"} onClick={() => setMenu(menu?.kind === "player" ? null : { kind: "player" })}>
            <Icon name="more" size={16} className="text-icon-secondary" />
          </GhostButton>
          {menu?.kind === "player" ? (
            <Menu
              width={270}
              className="absolute right-0 top-[calc(100%+4px)]"
              items={[
                { icon: "bookmark", label: "Save", onSelect: () => (setMenu(null), showSnack("Saved")) },
                { icon: "copy", label: "Copy", onSelect: () => (setMenu(null), showSnack("Copied")) },
                { icon: "unfollow", label: `Unfollow ${current.source}`, onSelect: () => (setMenu(null), showSnack(`Unfollowed ${current.source}`)) },
                { icon: "flag", label: "Share feedback", onSelect: () => (setMenu(null), showSnack("Thanks, feedback sent")) },
                { icon: "close", label: "Close player", onSelect: closePlayer },
              ]}
            />
          ) : null}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Cover */}
        <div className="px-5 pb-3 pt-2">
          <div className="flex h-[197px] items-center justify-center overflow-clip rounded-[6px] bg-surface-secondary">
            {current.cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={current.cover} alt="" className="size-full object-cover" />
            ) : (
              <SourceMark src={current.sourceSrc} size={64} />
            )}
          </div>
        </div>

        {/* Title + source */}
        <div className="flex flex-col items-center gap-2 px-5 pb-3 pt-1 text-center">
          <p className="text-[18px] font-medium leading-[22px] tracking-[-0.45px] text-text-primary">{current.title}</p>
          {status === "error" ? (
            <p className="text-[13px] leading-[16px] tracking-[-0.4px] text-[var(--v-error)]">Couldn’t play this</p>
          ) : (
            <p className="truncate text-[13px] leading-[16px] tracking-[-0.4px] text-text-tertiary">{current.source}</p>
          )}
        </div>

        {/* Scrubber */}
        <div className="flex flex-col gap-2 px-5">
          <div
            role="slider"
            tabIndex={0}
            aria-label="Position"
            aria-valuemin={0}
            aria-valuemax={Math.round(current.duration)}
            aria-valuenow={Math.round(elapsed)}
            aria-valuetext={clock(elapsed)}
            onPointerDown={seek}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setElapsed((x) => Math.min(current.duration, x + 5));
              if (e.key === "ArrowLeft") setElapsed((x) => Math.max(0, x - 5));
            }}
            className="relative h-3 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-accent)]"
          >
            <div className="absolute inset-x-0 top-1 h-1 overflow-clip rounded-full bg-black/10">
              <div className="h-full rounded-full bg-[var(--v-accent)]" style={{ width: `${progress * 100}%` }} />
            </div>
            <div
              className="absolute top-0 size-3 -translate-x-1/2 rounded-full bg-[var(--v-accent)] shadow-[0_0_0_2px_white]"
              style={{ left: `${progress * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-[13px] leading-[16px] tracking-[-0.4px] text-text-tertiary tabular-nums">
            <span>{clock(elapsed)}</span>
            <span>−{clock(remaining)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-5 pt-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenu(menu?.kind === "speed" ? null : { kind: "speed" })}
              aria-label={`Playback speed ${speedLabel(speed)}`}
              aria-expanded={menu?.kind === "speed"}
              className={`h-10 min-w-10 cursor-pointer rounded-[8px] px-2 text-[13px] leading-[16px] tracking-[-0.4px] text-text-tertiary outline-none transition-colors hover:bg-[var(--v-btn)] focus-visible:ring-2 focus-visible:ring-[var(--v-accent)] ${
                menu?.kind === "speed" ? "bg-[var(--v-btn)]" : ""
              }`}
            >
              {speedLabel(speed)}
            </button>
            {menu?.kind === "speed" ? (
              <SpeedList
                value={speed}
                onSelect={(s) => (setSpeed(s), setMenu(null))}
                className="absolute left-0 top-[calc(100%+4px)]"
              />
            ) : null}
          </div>
          <GhostButton label={status === "error" ? "Retry" : playing ? "Pause" : "Play"} onClick={toggle} disabled={status === "loading"}>
            {status === "loading" ? (
              <span className="text-icon-primary">
                <Spinner size={26} />
              </span>
            ) : status === "error" ? (
              <Icon name="retry" size={24} />
            ) : (
              <Icon name={playing ? "pause" : "play"} size={32} />
            )}
          </GhostButton>
          <GhostButton label="Next" onClick={next} disabled={queue.length === 0}>
            <Icon name="next" size={22} />
          </GhostButton>
        </div>

        {/* Summary */}
        <div className="px-5 py-1">
          {summaryOpen ? (
            <button type="button" onClick={() => setSummaryOpen(false)} className="flex w-full cursor-pointer flex-col gap-3 text-left outline-none">
              {summary.map((para) => (
                <span key={para.slice(0, 24)} className="text-[14px] leading-[18px] tracking-[-0.45px] text-text-secondary">
                  {para}
                </span>
              ))}
            </button>
          ) : (
            <p className="text-[14px] leading-[18px] tracking-[-0.45px] text-text-secondary">
              {summary[0].length > 150 ? `${summary[0].slice(0, 150).replace(/\s\S*$/, "")}… ` : `${summary[0]} `}
              {summary.length > 1 || summary[0].length > 150 ? (
                <button type="button" onClick={() => setSummaryOpen(true)} className="cursor-pointer text-[var(--v-accent)] outline-none hover:underline">
                  See more
                </button>
              ) : null}
            </p>
          )}
        </div>

        {/* Queue */}
        <div className="mt-6 flex flex-col">
          <div className="flex h-10 items-center px-5">
            <p className="flex-1 text-[14px] font-medium leading-[18px] tracking-[-0.4px] text-text-secondary">
              Queue{queue.length ? ` · ${minutes(queueTotal)}` : ""}
            </p>
            {queue.length ? (
              <button
                type="button"
                onClick={clearQueue}
                className="h-10 cursor-pointer rounded-[8px] px-2 text-[14px] leading-[18px] tracking-[-0.4px] text-text-secondary outline-none transition-colors hover:bg-[var(--v-btn)] focus-visible:ring-2 focus-visible:ring-[var(--v-accent)]"
              >
                Clear
              </button>
            ) : null}
          </div>
          {queue.length === 0 ? (
            <p className="px-5 pt-2 text-[14px] leading-[18px] tracking-[-0.45px] text-text-secondary">
              Press play on any feed to start a queue, or use Add to queue on any summary.
            </p>
          ) : (
            <ul>
              {queue.map((id) => {
                const q = byId.get(id);
                if (!q) return null;
                const open = menu?.kind === "row" && menu.id === id;
                return (
                  <li key={id} className="relative flex items-center gap-2 px-5 py-2">
                    <button
                      type="button"
                      onClick={() => (setQueue((x) => x.filter((y) => y !== id)), load(id))}
                      aria-label={`Play: ${q.title}`}
                      className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-[8px] text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--v-accent)]"
                    >
                      <SourceMark src={q.sourceSrc} size={24} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-medium leading-[18px] tracking-[-0.4px] text-text-primary">{q.title}</span>
                        <span className="flex items-center gap-2 text-[13px] leading-[16px] tracking-[-0.4px]">
                          <span className="truncate text-text-secondary">{q.source}</span>
                          <span className="text-text-tertiary">·</span>
                          <span className="text-text-tertiary">{minutes(q.duration)}</span>
                        </span>
                      </span>
                    </button>
                    <GhostButton label={`More actions: ${q.title}`} rounded="m" active={open} onClick={() => setMenu(open ? null : { kind: "row", id })}>
                      <Icon name="more" size={16} className="text-icon-secondary" />
                    </GhostButton>
                    {open ? (
                      <Menu
                        width={200}
                        className="absolute bottom-[calc(100%-4px)] right-5"
                        items={[
                          { icon: "close", label: "Remove", onSelect: () => removeFromQueue(id) },
                          { icon: "bookmark", label: "Save", onSelect: () => (setMenu(null), showSnack("Saved")) },
                          { icon: "list", label: "Open summary", onSelect: () => (setMenu(null), setQueue((x) => x.filter((y) => y !== id)), load(id), setSummaryOpen(true)) },
                        ]}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div
      className={`relative flex h-[844px] w-[390px] flex-col overflow-hidden bg-surface-primary font-sans text-text-primary ${className}`}
      style={VERB_VARS}
    >
      <PhoneChrome />
      {feed}

      {/* Click-away layer for any open menu */}
      {menu ? <button type="button" aria-label="Close menu" tabIndex={-1} onClick={() => setMenu(null)} className="absolute inset-0 z-[5] cursor-default" /> : null}

      {/* Mini player */}
      {current ? (
        <div
          className={`absolute inset-x-4 bottom-[50px] z-[6] transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none ${
            expanded ? "pointer-events-none translate-y-4 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <MiniPlayer
            item={current}
            playing={playing}
            progress={progress}
            onOpen={() => (setExpanded(true), setMenu(null))}
            onToggle={toggle}
            onNext={next}
            canNext={queue.length > 0}
          />
        </div>
      ) : null}

      {full}

      {/* Snackbar: under the browser bar, above everything */}
      <div aria-live="polite" className={`pointer-events-none absolute top-[155px] z-40 ${expanded ? "inset-x-9" : "inset-x-5"}`}>
        {snack ? (
          <div key={snack.id} className="pointer-events-auto motion-safe:animate-[feature-in_0.3s_ease-out_both]">
            <Snackbar
              message={snack.message}
              actionLabel={snack.undo ? "Undo" : undefined}
              onAction={() => {
                snack.undo?.();
                setSnack(null);
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
