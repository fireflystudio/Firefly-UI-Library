"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Verb Reader desktop app (Figma "Verb – Reader", v2: "For You · 1280", "3.1 Player" desktop and
 * "3.2 Audio queue" desktop) as one working 1280 × 800 screen.
 *
 * - Sidebar: For you / Explore / Saved / Summaries, Interests and Following (Show more, hover a row to
 *   delete or unfollow, Undo), collapse to an icon rail.
 * - Feed: Excerpt and Compact layouts (toggle top right), hover rows with ▶ and ⋮ (Save / Add to queue /
 *   Copy; "Playing now" on the playing row), See more, Trending chips (scroll, open a topic feed), interest
 *   feeds (Remove from Interests), Add interest with suggestions, loading skeleton, error with Retry
 *   (Politics, first time), the empty state with suggestions (Explore).
 * - Article side panel: click a row; previous / next, full width, menu, close, ▶ plays the summary.
 * - Audio: "New · 12m" starts a session of the feed (Playing · Xm left → Resume → Continue → All caught
 *   up), floating player with speed list, menu, seek, next, queue panel (play a row, row menu, Clear),
 *   "Now playing Design · Restore previous queue" when a session starts on another feed, Close player
 *   keeps the session (Resume), snackbars with Undo. Nothing is audible: progress runs on a timer.
 *
 * Content is the Figma sample; topic feeds that Figma does not show use sample copy.
 */

const VERB_VARS = {
  "--v-accent": "#4d63fd",
  "--v-btn": "rgb(0 0 0 / 0.06)",
  "--v-btn-hover": "rgb(0 0 0 / 0.1)",
  "--v-side": "#f8f8fb",
  "--v-snack": "#262626",
  "--v-snack-action": "#a5aeff",
  "--v-error": "#e5251f",
  "--v-error-bg": "#fbd5d2",
  "--v-skeleton": "#ebebeb",
} as CSSProperties;

const IMG = "/images/verb-player";

/* ------------------------------------------------------------------------------------------------ */
/* Content                                                                                          */
/* ------------------------------------------------------------------------------------------------ */

type Source = { id: string; name: string; src: string };

const SOURCES: Record<string, Source> = {
  guardian: { id: "guardian", name: "The Guardian", src: `${IMG}/source-guardian.png` },
  row: { id: "row", name: "Rest of World", src: `${IMG}/source-rest-of-world.png` },
  verge: { id: "verge", name: "The Verge", src: `${IMG}/source-verge.jpg` },
  huberman: { id: "huberman", name: "Andrew Huberman", src: `${IMG}/source-huberman.jpg` },
  hn: { id: "hn", name: "Hacker News", src: `${IMG}/source-hacker-news.png` },
  atc: { id: "atc", name: "Above The Crowd", src: `${IMG}/source-above-the-crowd.png` },
};

export type DesktopItem = {
  id: string;
  title: string;
  source: keyof typeof SOURCES;
  age: string;
  topic: string;
  /** Length of the audio summary in seconds. */
  duration: number;
  excerpt: string;
  /** Article paragraphs for the side panel. Defaults to the excerpt. */
  body?: string[];
  thumb?: string;
};

const item = (
  id: string,
  title: string,
  source: keyof typeof SOURCES,
  age: string,
  topic: string,
  duration: number,
  excerpt: string,
  thumb?: string,
  body?: string[],
): DesktopItem => ({ id, title, source, age, topic, duration, excerpt, thumb, body });

const FOR_YOU: DesktopItem[] = [
  item("time-saved", "Why ‘time saved’ is the wrong metric for AI at work", "guardian", "1h", "Productivity", 60,
    "Teams that tracked the hours saved by AI found that the time went straight back into meetings. A better measure turned out to be which decisions were being made faster, and who was able to make them.",
    `${IMG}/thumb-ai-at-work.png`,
    [
      "Teams that tracked the hours saved by AI found that the time went straight back into meetings. Nobody planned it; the calendar simply filled the gap.",
      "A better measure turned out to be which decisions were being made faster, and who was able to make them. Where junior staff could decide alone, the gains held.",
      "The lesson for managers is to count outcomes, not minutes. Minutes are easy to report and easy to lose.",
    ]),
  item("eu-ai-act", "The EU AI Act's initial compliance deadline is set for March, marking a pivotal moment for AI developers and organizations", "row", "2h", "AI", 120,
    "Providers of general-purpose AI models must publish training data summaries and copyright policies by March. Fines are tied to global turnover, so the largest labs carry the greatest financial risk.",
    `${IMG}/thumb-eu-ai-act.png`,
    [
      "Providers of general-purpose AI models must publish training data summaries and copyright policies by March.",
      "Fines are tied to global turnover, so the largest labs carry the greatest financial risk. Smaller developers get lighter documentation duties.",
      "Most companies that use AI rather than build it are not affected yet; their obligations start a year later.",
    ]),
  item("design-systems", "Design systems are org charts in disguise", "atc", "1d", "Design", 180,
    "A design system mirrors the company that builds it. Where two teams share a component, they also share a decision, and most of the disputes about the library turn out to be disputes about ownership.",
    `${IMG}/thumb-design-systems.png`),
  item("true-happiness", "The Art of True Happiness | Dr. Arthur Brooks", "huberman", "2d", "Productivity", 131,
    "Arthur Brooks argues that happiness has three parts: enjoyment, satisfaction and meaning. Most people chase the first and neglect the third. In this two-hour talk he explains why pleasure fades within hours, while meaning builds over years.",
    `${IMG}/thumb-true-happiness.jpg`,
    [
      "Arthur Brooks argues that happiness has three parts: enjoyment, satisfaction and meaning. Most people chase the first and neglect the third.",
      "Satisfaction, he says, comes from wanting less rather than having more. He describes a simple exercise: write down what you own and what you want, then shorten the second list.",
      "The last part covers relationships. Long-running studies show that close friendships in midlife predict wellbeing in old age better than income or career success.",
    ]),
  item("clinical-ai", "Where clinical AI actually reduced readmissions", "hn", "3d", "Healthcare", 120,
    "Hospitals that cut readmissions with AI did it through discharge scheduling and medication checks, not through diagnosis. The gains came from routine steps that the staff had never had the time to do.",
    `${IMG}/thumb-clinical-ai.png`),
  item("index-funds", "Index funds quietly became the default retirement plan", "guardian", "4d", "Finance", 49,
    "Automatic enrolment moved more household savings into index funds in the last ten years than two decades of investor education had managed. Fees fell once the money had arrived, and not before it did.",
    `${IMG}/thumb-index-funds.jpg`),
  item("ai-search", "AI-powered search is reshaping how we discover information", "verge", "5d", "AI", 60,
    "Search engines now answer questions instead of listing links. That saves a click but hides the sources, so publishers lose their visits and readers lose the means to check an answer for themselves.",
    `${IMG}/thumb-ai-search.jpg`),
];

/* Feeds that Figma does not draw in full: Design is from the "Another feed" frame, the rest is sample copy. */
const EXTRA: Record<string, DesktopItem[]> = {
  Design: [
    item("design-reviews", "Why design reviews are moving into the prototype", "row", "2h", "Design", 90,
      "Teams that review in the prototype instead of in slides catch interaction problems a sprint earlier, and the meetings get shorter.", `${IMG}/thumb-eu-ai-act.png`),
    item("accessibility", "Accessibility is a design decision, not a checklist", "atc", "1d", "Design", 75,
      "Products that treat accessibility as a late audit fix the same issues every release; the ones that design for it once stop seeing them."),
  ],
  Productivity: [
    item("context-switching", "The hidden cost of context switching in remote teams — how frequent interruptions silently erode deep work and what managers can do about it", "guardian", "1h", "Productivity", 20,
      "Remote teams switch between tools and conversations far more often than they realise. Each switch costs a few minutes of attention, and the minutes add up to hours every week.",
      undefined,
      [
        "Remote teams switch between tools and conversations far more often than they realise. Each switch costs a few minutes of attention, and the minutes add up to hours every week.",
        "The cost is hard to see because it never appears in a calendar. A message that takes thirty seconds to answer can take ten minutes to recover from, and nobody records the ten minutes.",
        "Teams that measured it found the same pattern. People who were interrupted most often finished fewer tasks, even though they worked longer days and replied faster than anyone else.",
      ]),
    item("async", "The case for async communication over meetings", "huberman", "1d", "Productivity", 70,
      "Written updates let people answer when they are ready; the meetings that remain get a clear decision to make."),
  ],
  AI: [
    item("code-review", "AI-assisted code review is changing team dynamics", "verge", "1h", "AI", 80,
      "Reviewers spend less time on style and more on design; junior engineers get feedback in minutes instead of days."),
  ],
  Finance: [
    item("pricing", "Why pricing pages fail in the first five seconds", "atc", "1d", "Finance", 60,
      "Visitors decide on a plan before they read the features; the first number they see sets the anchor for everything after."),
  ],
  Healthcare: [
    item("namibia", "Five years in Namibia's public health engine room", "row", "1h", "Healthcare", 110,
      "A retrospective of the health ministry's reforms shows how small scheduling changes cut waiting times across rural clinics."),
  ],
  Science: [
    item("brain-map", "A new map of the brain's wiring shows how memories are stored", "guardian", "3h", "Science", 95,
      "Researchers traced every connection in a cubic millimetre of cortex and found far more links than expected."),
    item("sleep", "Why sleep resets the brain for learning", "huberman", "1d", "Science", 150,
      "Deep sleep clears the day's noise so new skills stick; a later bedtime costs more than an early alarm."),
  ],
  Climate: [
    item("heat-pumps", "Heat pumps outsold gas boilers for the first time", "guardian", "4h", "Climate", 75,
      "Subsidies helped, but quieter units and installers trained at scale did most of the work."),
    item("trees", "Cities that cooled their streets with trees", "row", "1d", "Climate", 90,
      "Shade lowered street temperatures by up to six degrees and cut hospital visits during heatwaves."),
  ],
  "Formula 1": [
    item("f1-engines", "How the new engine rules change the 2026 grid", "guardian", "1h", "Formula 1", 85,
      "Half the power now comes from batteries, so energy management becomes a race skill."),
    item("pit-stop", "Inside a pit stop that takes two seconds", "hn", "1d", "Formula 1", 55,
      "Twenty people, one rehearsed sequence and sensors on every wheel gun."),
  ],
  Gaming: [
    item("short-games", "Small studios are winning with shorter games", "atc", "5h", "Gaming", 65,
      "Players finish ten-hour games and recommend them; long ones get abandoned at the halfway mark."),
  ],
  Politics: [
    item("local-elections", "What local elections say about the national mood", "guardian", "2h", "Politics", 100,
      "Turnout rose where councils published budgets in plain language; trust followed the paperwork."),
  ],
  "Electric cars": [
    item("batteries", "Cheaper batteries are finally reaching small cars", "row", "2h", "Electric cars", 80,
      "Sodium-ion cells cut the price of city cars below their petrol rivals in three markets."),
  ],
  Robotics: [
    item("warehouse", "Warehouse robots learn new items from one example", "hn", "2h", "Robotics", 70,
      "A foundation model lets pickers handle products they have never seen before."),
  ],
  Photography: [
    item("phone-cameras", "Phone cameras stopped getting better, and that is fine", "verge", "3h", "Photography", 60,
      "Sensor gains have flattened; the improvements now come from editing tools that keep the original intact."),
  ],
};

const ALL_ITEMS = [...FOR_YOU, ...Object.values(EXTRA).flat()];
const BY_ID = new Map(ALL_ITEMS.map((i) => [i.id, i]));

const TRENDING = ["Science", "Climate", "Formula 1", "Gaming", "Politics", "Electric cars", "Robotics", "Photography"];
const START_INTERESTS = ["Productivity", "AI", "Design", "Finance", "Healthcare", "Climate", "Startups", "Nutrition", "Architecture"];
const START_FOLLOWING = ["guardian", "row", "verge", "huberman", "hn", "atc"];
const SUGGESTIONS = ["Figma UI", "Figma plugins", "Figma variables", "Figma vs Sketch", "Film & TV", "Fintech", "Fitness", "Film festivals", "Space", "Startups", "Sustainability", "Sleep science", "Typography", "UX research", "Urbanism"];
const POPULAR = ["Polish startups", "Warsaw transit", "Energy prices", "Baltic coast", "Tatra hiking", "Polish cinema", "Ekstraklasa", "Local elections", "Vistula", "Co-working"];
const FOR_DESIGNERS = [
  { name: "Design systems", count: 9, color: "#f2c6e0" },
  { name: "Typography", count: 5, color: "#c9b8f2" },
  { name: "Accessibility", count: 7, color: "#b9e0e6" },
  { name: "UX research", count: 3, color: "#7a6ad0" },
];
const SPEEDS = [1, 1.25, 1.5, 2, 3] as const;

/* ------------------------------------------------------------------------------------------------ */
/* Helpers                                                                                          */
/* ------------------------------------------------------------------------------------------------ */

const short = (s: number) => (s < 60 ? `${Math.round(s)}s` : `${Math.round(s / 60)}m`);
const speedLabel = (s: number) => `${s}×`;

type View =
  | { kind: "forYou" }
  | { kind: "interest"; name: string }
  | { kind: "trending"; name: string }
  | { kind: "explore" }
  | { kind: "saved" }
  | { kind: "summaries" };

const viewKey = (v: View) => ("name" in v ? `${v.kind}:${v.name}` : v.kind);
const viewLabel = (v: View) => ("name" in v ? v.name : v.kind === "forYou" ? "For you" : v.kind[0].toUpperCase() + v.kind.slice(1));

function feedFor(v: View, saved: Set<string>): DesktopItem[] {
  switch (v.kind) {
    case "forYou":
      return FOR_YOU;
    case "summaries":
      return [...FOR_YOU, ...EXTRA.Productivity];
    case "saved":
      return ALL_ITEMS.filter((i) => saved.has(i.id));
    case "explore":
      return [];
    default: {
      const own = EXTRA[v.name] ?? [];
      const fromForYou = FOR_YOU.filter((i) => i.topic === v.name);
      return [...fromForYou, ...own];
    }
  }
}

/* ------------------------------------------------------------------------------------------------ */
/* Icons                                                                                            */
/* ------------------------------------------------------------------------------------------------ */

type IconName =
  | "play" | "pause" | "next" | "more" | "home" | "explore" | "bookmark" | "sparkle" | "sidebar" | "list" | "bell"
  | "plus" | "close" | "queue-add" | "copy" | "external" | "unfollow" | "flag" | "trash" | "chevron-up" | "chevron-down"
  | "chevron-right" | "expand" | "bars" | "error" | "mic" | "filter";

function Icon({ name, size = 16, className = "" }: { name: IconName; size?: number; className?: string }) {
  const st = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  const p: Record<IconName, ReactNode> = {
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
    home: <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5h-5v5H5a1 1 0 0 1-1-1v-8.5Z" {...st} />,
    explore: (
      <g {...st}>
        <rect x="4" y="7" width="16" height="12" rx="2" />
        <path d="M7 4h10" />
      </g>
    ),
    bookmark: <path d="M7 4.5h10a1 1 0 0 1 1 1V20l-6-4-6 4V5.5a1 1 0 0 1 1-1Z" {...st} />,
    sparkle: <path d="M12 3.5c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7Z" {...st} />,
    sidebar: (
      <g {...st}>
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M9 5v14" />
      </g>
    ),
    list: <path d="M9 7h11M9 12h11M9 17h11M4.5 7h.01M4.5 12h.01M4.5 17h.01" {...st} />,
    bell: <path d="M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 1.5h-15L6 16.5ZM10 20.5h4" {...st} />,
    plus: <path d="M12 5v14M5 12h14" {...st} />,
    close: <path d="m6 6 12 12M18 6 6 18" {...st} />,
    "queue-add": <path d="M4 7h12M4 12h12M4 17h8M18 14v6M15 17h6" {...st} />,
    copy: (
      <g {...st}>
        <rect x="8.5" y="8.5" width="11" height="11" rx="2" />
        <path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" />
      </g>
    ),
    external: <path d="M13 5h6v6M19 5l-8 8M17 14v4a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 5 18V8.5A1.5 1.5 0 0 1 6.5 7H10" {...st} />,
    unfollow: (
      <g {...st}>
        <circle cx="12" cy="12" r="8" />
        <path d="M8.5 12h7" />
      </g>
    ),
    flag: <path d="M5.5 20.5v-16m0 0h11l-2 4 2 4h-11" {...st} />,
    trash: <path d="M4 6.5h16M9 6.5V5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5v1.5M6.5 6.5l.8 12.2A2 2 0 0 0 9.3 20.5h5.4a2 2 0 0 0 2-1.8l.8-12.2M10 10.5v6M14 10.5v6" {...st} />,
    "chevron-up": <path d="m6 15 6-6 6 6" {...st} />,
    "chevron-down": <path d="m6 9 6 6 6-6" {...st} />,
    "chevron-right": <path d="m9 6 6 6-6 6" {...st} />,
    expand: <path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" {...st} />,
    bars: (
      <g fill="currentColor">
        <rect x="5" y="10" width="2.6" height="9" rx="1" />
        <rect x="10.7" y="5" width="2.6" height="14" rx="1" />
        <rect x="16.4" y="8" width="2.6" height="11" rx="1" />
      </g>
    ),
    error: (
      <g {...st}>
        <circle cx="12" cy="12" r="8" />
        <path d="m9.5 9.5 5 5M14.5 9.5l-5 5" />
      </g>
    ),
    mic: (
      <g {...st}>
        <rect x="9" y="3.5" width="6" height="11" rx="3" />
        <path d="M6 11.5a6 6 0 0 0 12 0M12 17.5v3" />
      </g>
    ),
    filter: <path d="M4.5 7h15M7 12h10M10 17h4" {...st} />,
  };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden className={`shrink-0 ${className}`}>
      {p[name]}
    </svg>
  );
}

const LOGO_PATH =
  "M24.4765 3.61921C23.1633 1.35466 20.8064 0 18.1767 0H7.28593C4.65619 0 2.30273 1.35466 0.986153 3.61921C-0.330423 5.88377 -0.327012 8.59308 0.986153 10.861L6.43323 20.2486C7.74639 22.5165 10.1033 23.8678 12.733 23.8678C15.3628 23.8678 17.7162 22.5131 19.0328 20.2486L24.5242 10.7829C25.793 8.53197 25.7828 5.86 24.4799 3.61921H24.4765ZM17.4945 19.3658C16.4986 21.0804 14.7181 22.1023 12.7296 22.1023C10.7411 22.1023 8.96065 21.0804 7.9681 19.3658L2.52102 9.9783C1.52506 8.26375 1.52506 6.21649 2.52102 4.50195C3.51698 2.7874 5.29743 1.76547 7.28593 1.76547H7.63384C7.28934 2.11856 6.98578 2.51579 6.72997 2.95377C5.65556 4.80411 5.65556 7.01435 6.72997 8.86469L11.0378 16.2932C12.1122 18.1436 14.0359 19.2504 16.1813 19.2504C16.693 19.2504 17.1944 19.1859 17.6719 19.0637L17.4979 19.3658H17.4945ZM8.125 7.70016H17.3751L12.7501 15.6753L8.125 7.70016ZM22.9416 9.9783L19.79 15.4139C19.0362 16.7108 17.6889 17.4883 16.1813 17.4883C15.4207 17.4883 14.7011 17.288 14.0769 16.9247L19.6808 7.26219C19.8377 6.99058 19.8377 6.65107 19.6808 6.37946C19.5239 6.10785 19.2306 5.93809 18.9134 5.93809H7.70205C7.69864 5.21832 7.88283 4.49516 8.26484 3.8399C9.01522 2.54635 10.3557 1.77565 11.853 1.76886H18.1801C20.1686 1.76886 21.949 2.7908 22.945 4.50534C23.941 6.21988 23.941 8.26715 22.945 9.98169L22.9416 9.9783Z";

/* ------------------------------------------------------------------------------------------------ */
/* Small parts                                                                                      */
/* ------------------------------------------------------------------------------------------------ */

function Mark({ source, size = 16 }: { source: keyof typeof SOURCES; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={SOURCES[source].src} alt="" width={size} height={size} className="shrink-0 object-cover" style={{ width: size, height: size, borderRadius: Math.max(3, size * 0.22) }} />
  );
}

function Ghost({ label, onClick, children, size = 32, active = false, disabled = false, round = false }: { label: string; onClick?: () => void; children: ReactNode; size?: 32 | 40; active?: boolean; disabled?: boolean; round?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className={`flex shrink-0 cursor-pointer items-center justify-center text-icon-primary outline-none transition-colors duration-150 hover:bg-[var(--v-btn)] focus-visible:ring-2 focus-visible:ring-[var(--v-accent)] disabled:cursor-default disabled:bg-[var(--v-btn)]/50 disabled:text-icon-quaternary disabled:hover:bg-[var(--v-btn)]/50 ${round ? "rounded-full" : "rounded-[8px]"} ${active ? "bg-[var(--v-btn)]" : ""}`}
      style={{ width: size, height: size }}
    >
      {children}
    </button>
  );
}

type MenuItem = { icon?: IconName; label: string; onSelect: () => void; disabled?: boolean };

function Menu({ items, className = "", width = 240, style }: { items: MenuItem[]; className?: string; width?: number; style?: CSSProperties }) {
  return (
    <div role="menu" className={`z-40 flex flex-col rounded-[12px] border border-border-06 bg-surface-primary p-1 shadow-[0_4px_12px_rgb(0_0_0/0.06)] ${className}`} style={{ width, ...style }}>
      {items.map((m) => (
        <button
          key={m.label}
          type="button"
          role="menuitem"
          disabled={m.disabled}
          onClick={m.onSelect}
          className="flex h-10 cursor-pointer items-center gap-3 rounded-[8px] px-3 text-left text-[16px] leading-[20px] tracking-[-0.3px] text-text-secondary outline-none transition-colors hover:bg-surface-secondary hover:text-text-primary focus-visible:bg-surface-secondary disabled:cursor-default disabled:hover:bg-transparent disabled:hover:text-text-secondary"
        >
          {m.icon ? <Icon name={m.icon} size={16} className="text-icon-secondary" /> : null}
          <span className="truncate">{m.label}</span>
        </button>
      ))}
    </div>
  );
}

function Pill({ children, onClick, active = false, label }: { children: ReactNode; onClick?: () => void; active?: boolean; label?: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={label}
      onClick={onClick}
      className={`h-8 shrink-0 cursor-pointer rounded-full border px-3 text-[14px] leading-[18px] tracking-[-0.4px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--v-accent)] ${
        active ? "border-text-primary bg-text-primary text-white" : "border-border-10 text-text-tertiary hover:bg-surface-secondary hover:text-text-primary"
      }`}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------------------------------------ */
/* App                                                                                              */
/* ------------------------------------------------------------------------------------------------ */

type Session = { key: string; label: string; view: View };
type Snack = { id: number; message: string; action?: { label: string; run: () => void } };
type Menu =
  | { kind: "row"; id: string }
  | { kind: "player" }
  | { kind: "speed" }
  | { kind: "queueRow"; id: string }
  | { kind: "article" }
  | { kind: "bell" }
  | null;

export type DesktopAppProps = {
  /** Screen size in px. Default 1280 × 800 (Figma "For You · 1280"); 1728 × 1080 is the Figma desktop frame, which reads smaller when scaled down on a page. */
  width?: number;
  height?: number;
  className?: string;
};

export function DesktopApp({ width = 1280, height = 800, className = "" }: DesktopAppProps) {
  /* Navigation + feed */
  const [view, setView] = useState<View>({ kind: "forYou" });
  const [layout, setLayout] = useState<"excerpt" | "compact">("excerpt");
  const [collapsed, setCollapsed] = useState(false);
  const [status, setStatus] = useState<"ready" | "loading" | "error">("ready");
  const [failedOnce, setFailedOnce] = useState<Set<string>>(() => new Set());
  const [interests, setInterests] = useState(START_INTERESTS);
  const [following, setFollowing] = useState(START_FOLLOWING);
  const [moreInterests, setMoreInterests] = useState(false);
  const [moreFollowing, setMoreFollowing] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(() => new Set(["design-systems", "index-funds", "clinical-ai"]));
  const [read, setRead] = useState<Set<string>>(() => new Set());
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());
  const [article, setArticle] = useState<string | null>(null);
  const [articleFull, setArticleFull] = useState(false);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const [added, setAdded] = useState<Set<string>>(() => new Set());
  const [search, setSearch] = useState("");

  /* Audio */
  const [current, setCurrent] = useState<string | null>("true-happiness");
  const [elapsed, setElapsed] = useState(32);
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [queue, setQueue] = useState<string[]>(["clinical-ai", "index-funds", "ai-search"]);
  const [session, setSession] = useState<Session | null>({ key: "forYou", label: "For you", view: { kind: "forYou" } });
  const [played, setPlayed] = useState<Set<string>>(() => new Set(["time-saved", "eu-ai-act", "design-systems"]));
  const [playerOpen, setPlayerOpen] = useState(true);
  const [queueOpen, setQueueOpen] = useState(false);

  /* Overlays */
  const [menu, setMenu] = useState<Menu>(null);
  const [snack, setSnack] = useState<Snack | null>(null);
  const snackTimer = useRef<number | undefined>(undefined);
  const snackId = useRef(0);
  const loadTimer = useRef<number | undefined>(undefined);
  const chipsRef = useRef<HTMLDivElement>(null);
  const feedRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const [rowMenuTop, setRowMenuTop] = useState(0);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    return () => {
      window.clearTimeout(snackTimer.current);
      window.clearTimeout(loadTimer.current);
    };
  }, []);

  const showSnack = useCallback((message: string, action?: Snack["action"]) => {
    window.clearTimeout(snackTimer.current);
    const id = ++snackId.current;
    setSnack({ id, message, action });
    snackTimer.current = window.setTimeout(() => setSnack((s) => (s?.id === id ? null : s)), 4500);
  }, []);

  const feed = useMemo(() => feedFor(view, saved), [view, saved]);
  const cur = current ? BY_ID.get(current) ?? null : null;
  const key = viewKey(view);

  /* Navigate with the Figma loading skeleton; Politics fails the first time (error + Retry). */
  const go = useCallback(
    (v: View) => {
      setView(v);
      setArticle(null);
      setArticleFull(false);
      setAdding(false);
      setMenu(null);
      feedRef.current?.scrollTo({ top: 0 });
      window.clearTimeout(loadTimer.current);
      setStatus("loading");
      const k = viewKey(v);
      loadTimer.current = window.setTimeout(() => {
        if (k === "trending:Politics" && !failedOnce.has(k)) {
          setFailedOnce((f) => new Set(f).add(k));
          setStatus("error");
        } else setStatus("ready");
      }, 650);
    },
    [failedOnce],
  );

  /* Progress */
  useEffect(() => {
    if (!playing || !cur) return;
    const tick = 250;
    const id = window.setInterval(() => setElapsed((e) => Math.min(cur.duration, e + (tick / 1000) * speed * (reduced ? 0 : 1))), tick);
    return () => window.clearInterval(id);
  }, [playing, cur, speed, reduced]);

  const playItem = useCallback((id: string) => {
    setCurrent(id);
    setElapsed(0);
    setPlaying(true);
    setPlayerOpen(true);
    setPlayed((p) => new Set(p).add(id));
  }, []);

  const next = useCallback(() => {
    if (queue.length === 0) return;
    const [head, ...rest] = queue;
    setQueue(rest);
    playItem(head);
  }, [queue, playItem]);

  // End of a summary: next in the queue, or the session ends (Continue / All caught up).
  useEffect(() => {
    if (cur && playing && elapsed >= cur.duration) {
      if (queue.length) next();
      else setPlaying(false);
    }
  }, [elapsed, cur, playing, queue.length, next]);

  const remaining = (cur ? cur.duration - elapsed : 0) + queue.reduce((s, id) => s + (BY_ID.get(id)?.duration ?? 0), 0);
  const sessionHere = session?.key === key;
  const unplayed = feed.filter((i) => !played.has(i.id) && i.id !== current);
  const sessionEnded = sessionHere && !!cur && !playing && elapsed >= cur.duration && queue.length === 0;

  /** "New · 12m" → starts a session of this feed. On another feed while one plays: Restore previous queue. */
  const startFeed = () => {
    const ids = (sessionEnded ? unplayed : feed).map((i) => i.id);
    if (!ids.length) return;
    const prev = { current, elapsed, queue, session, playing };
    const wasOther = !!session && session.key !== key && playing;
    setSession({ key, label: viewLabel(view), view });
    playItem(ids[0]);
    setQueue(ids.slice(1));
    if (wasOther) {
      showSnack(`Now playing ${viewLabel(view)}`, {
        label: "Restore previous queue",
        run: () => {
          setCurrent(prev.current);
          setElapsed(prev.elapsed);
          setQueue(prev.queue);
          setSession(prev.session);
          setPlaying(true);
        },
      });
    }
  };

  const headButton = (() => {
    if (sessionHere && cur && playerOpen) {
      if (sessionEnded) {
        return unplayed.length
          ? { label: `Continue · ${short(unplayed.reduce((s, i) => s + i.duration, 0))}`, icon: "play" as const, onClick: startFeed }
          : { label: "All caught up", icon: null, onClick: undefined };
      }
      return playing
        ? { label: `Playing · ${short(remaining)} left`, icon: "pause" as const, onClick: () => setPlaying(false) }
        : { label: `Resume · ${short(remaining)} left`, icon: "play" as const, onClick: () => setPlaying(true) };
    }
    if (sessionHere && cur && !playerOpen) {
      return { label: `Resume · ${short(remaining)} left`, icon: "play" as const, onClick: () => (setPlayerOpen(true), setPlaying(true)) };
    }
    const total = feed.reduce((s, i) => s + i.duration, 0);
    return feed.length ? { label: `New · ${short(total)}`, icon: "play" as const, onClick: startFeed } : null;
  })();

  /* Row actions */
  const toggleSave = (id: string) => {
    setMenu(null);
    const was = saved.has(id);
    setSaved((s) => {
      const n = new Set(s);
      if (was) n.delete(id);
      else n.add(id);
      return n;
    });
    showSnack(was ? "Removed from Saved" : "Saved", { label: "Undo", run: () => setSaved((s) => { const n = new Set(s); if (was) n.add(id); else n.delete(id); return n; }) });
  };
  const addToQueue = (id: string) => {
    setMenu(null);
    if (!cur) {
      setCurrent(id);
      setElapsed(0);
      setPlaying(false);
      setPlayerOpen(true);
      return showSnack("Ready to play");
    }
    if (id === current || queue.includes(id)) return showSnack("Already in the queue");
    const before = queue;
    setQueue((q) => [...q, id]);
    showSnack("Added to queue", { label: "Undo", run: () => setQueue(before) });
  };
  const copy = () => (setMenu(null), showSnack("Copied"));
  const playRow = (id: string) => {
    setMenu(null);
    if (id === current) return setPlaying((p) => !p);
    setQueue((q) => q.filter((x) => x !== id));
    playItem(id);
  };
  const openArticle = (id: string) => {
    setArticle(id);
    setRead((r) => new Set(r).add(id));
    setMenu(null);
  };

  /* Sidebar edits */
  const removeInterest = (name: string) => {
    const before = interests;
    setInterests((l) => l.filter((x) => x !== name));
    if (view.kind === "interest" && view.name === name) go({ kind: "forYou" });
    showSnack(`Removed ${name}`, { label: "Undo", run: () => setInterests(before) });
  };
  const unfollow = (id: string) => {
    setMenu(null);
    const before = following;
    setFollowing((l) => l.filter((x) => x !== id));
    showSnack(`Unfollowed ${SOURCES[id].name}`, { label: "Undo", run: () => setFollowing(before) });
  };
  const addInterest = (name: string) => {
    const n = name.trim();
    if (!n) return;
    setAdding(false);
    setDraft("");
    if (!interests.includes(n)) setInterests((l) => [...l.slice(0, 4), n, ...l.slice(4)]);
    showSnack(`Added ${n} to Interests`, { label: "Undo", run: () => setInterests((l) => l.filter((x) => x !== n)) });
  };

  // Chips: mouse wheel scrolls sideways
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
  });

  const art = article ? BY_ID.get(article) ?? null : null;
  const compact = layout === "compact" || !!art;
  const showSidebarList = (list: string[], more: boolean) => (more ? list : list.slice(0, 5));

  /* ---- Sidebar ------------------------------------------------------------------------------------ */
  const navItems: { v: View; icon: IconName; label: string; badge?: number }[] = [
    { v: { kind: "forYou" }, icon: "home", label: "For you" },
    { v: { kind: "explore" }, icon: "explore", label: "Explore" },
    { v: { kind: "saved" }, icon: "bookmark", label: "Saved", badge: saved.size },
    { v: { kind: "summaries" }, icon: "sparkle", label: "Summaries" },
  ];
  const navRow = (active: boolean) =>
    `group flex h-9 w-full cursor-pointer items-center gap-3 rounded-[8px] px-3 text-left text-[15px] leading-[20px] tracking-[-0.3px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[var(--v-accent)] ${
      active ? "font-medium text-text-primary" : "text-text-secondary hover:bg-black/[0.04] hover:text-text-primary"
    }`;
  const playingIn = (k: string) => (session?.key === k && playing && playerOpen ? <Icon name="bars" size={14} className="ml-auto text-[var(--v-accent)]" /> : null);

  const sidebar = collapsed ? (
    <aside className="flex w-14 shrink-0 flex-col items-center gap-2 border-r border-border-06 bg-[var(--v-side)] py-3">
      <svg viewBox="0 0 25.5 24" width={26} height={24} fill="currentColor" aria-label="Verb" className="mb-4 text-text-primary">
        <path d={LOGO_PATH} />
      </svg>
      {navItems.map((n) => (
        <Ghost key={n.label} label={n.label} size={40} active={viewKey(n.v) === key} onClick={() => go(n.v)}>
          <Icon name={n.icon} size={18} className="text-icon-secondary" />
        </Ghost>
      ))}
      <div className="mt-auto">
        <Ghost label="Expand sidebar" size={40} onClick={() => setCollapsed(false)}>
          <Icon name="sidebar" size={18} className="text-icon-secondary" />
        </Ghost>
      </div>
    </aside>
  ) : (
    <aside className="flex w-[220px] shrink-0 flex-col overflow-y-auto border-r border-border-06 bg-[var(--v-side)] px-2 pb-6 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="mb-6 flex items-center justify-between px-2">
        <svg viewBox="0 0 25.5 24" width={26} height={24} fill="currentColor" aria-label="Verb" className="text-text-primary">
          <path d={LOGO_PATH} />
        </svg>
        <Ghost label="Collapse sidebar" onClick={() => setCollapsed(true)}>
          <Icon name="sidebar" size={16} className="text-icon-tertiary" />
        </Ghost>
      </div>
      <nav aria-label="App" className="flex flex-col gap-0.5">
        {navItems.map((n) => {
          const k = viewKey(n.v);
          return (
            <button key={n.label} type="button" onClick={() => go(n.v)} aria-current={k === key ? "page" : undefined} className={navRow(k === key)}>
              <Icon name={n.icon} size={16} className={k === key ? "text-icon-primary" : "text-icon-secondary"} />
              {n.label}
              {playingIn(k)}
              {n.badge ? <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-black/[0.08] px-1.5 text-[12px] font-normal text-text-secondary">{n.badge}</span> : null}
            </button>
          );
        })}
      </nav>

      <p className="mb-1 mt-5 px-3 text-[12px] leading-[16px] tracking-[-0.4px] text-text-quaternary">Interests</p>
      <ul className="flex flex-col gap-0.5">
        {showSidebarList(interests, moreInterests).map((name) => {
          const k = `interest:${name}`;
          return (
            <li key={name} className="group relative">
              <button type="button" onClick={() => go({ kind: "interest", name })} aria-current={k === key ? "page" : undefined} className={`${navRow(k === key)} pr-9`}>
                <span className="truncate">{name}</span>
                {playingIn(k)}
              </button>
              <button
                type="button"
                aria-label={`Remove ${name}`}
                title="Remove"
                onClick={() => removeInterest(name)}
                className="absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[6px] text-icon-secondary opacity-0 outline-none transition-opacity hover:bg-black/[0.06] focus-visible:opacity-100 group-hover:opacity-100"
              >
                <Icon name="trash" size={15} />
              </button>
            </li>
          );
        })}
      </ul>
      {interests.length > 5 ? (
        <button type="button" onClick={() => setMoreInterests((m) => !m)} className="mt-1 h-8 cursor-pointer rounded-[8px] px-3 text-left text-[13px] text-text-tertiary outline-none hover:text-text-primary">
          {moreInterests ? "Show less" : `Show ${interests.length - 5} more`}
        </button>
      ) : null}

      <p className="mb-1 mt-5 px-3 text-[12px] leading-[16px] tracking-[-0.4px] text-text-quaternary">Following</p>
      <ul className="flex flex-col gap-0.5">
        {showSidebarList(following, moreFollowing).map((id) => (
          <li key={id} className="group relative">
            <button type="button" onClick={() => showSnack(`${SOURCES[id].name} opens in the source page`)} className={`${navRow(false)} pr-9`}>
              <Mark source={id} size={20} />
              <span className="truncate">{SOURCES[id].name}</span>
            </button>
            <button
              type="button"
              aria-label={`Unfollow ${SOURCES[id].name}`}
              title="Unfollow"
              onClick={() => unfollow(id)}
              className="absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[6px] text-icon-secondary opacity-0 outline-none transition-opacity hover:bg-black/[0.06] focus-visible:opacity-100 group-hover:opacity-100"
            >
              <Icon name="unfollow" size={15} />
            </button>
          </li>
        ))}
      </ul>
      {following.length > 5 ? (
        <button type="button" onClick={() => setMoreFollowing((m) => !m)} className="mt-1 h-8 cursor-pointer rounded-[8px] px-3 text-left text-[13px] text-text-tertiary outline-none hover:text-text-primary">
          {moreFollowing ? "Show less" : `Show ${following.length - 5} more`}
        </button>
      ) : null}
    </aside>
  );

  /* ---- Top bar ------------------------------------------------------------------------------------ */
  const topBar = (
    <div className="relative flex h-[60px] shrink-0 items-center justify-center px-4">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!search.trim()) return;
          showSnack(/^https?:\/\//.test(search.trim()) ? "Summarizing the link… it will appear in Summaries" : `Searching for “${search.trim()}”`);
          setSearch("");
        }}
        className={`flex h-11 items-center rounded-full border border-border-16 bg-surface-primary px-4 transition-[width] duration-300 ${art && !articleFull ? "w-[320px]" : "w-[464px]"}`}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Summarize a link or search"
          aria-label="Summarize a link or search"
          className="min-w-0 flex-1 bg-transparent text-[16px] text-text-primary outline-none placeholder:text-text-placeholder"
        />
        {art ? (
          <span className="flex gap-2 text-icon-tertiary">
            <Icon name="mic" size={16} />
            <Icon name="filter" size={16} />
          </span>
        ) : null}
      </form>
      <div className="absolute right-4 flex items-center gap-2">
        <Ghost label={layout === "excerpt" ? "Compact view" : "Excerpt view"} size={32} onClick={() => setLayout((l) => (l === "excerpt" ? "compact" : "excerpt"))} active={layout === "compact"}>
          <Icon name="list" size={16} className="text-icon-secondary" />
        </Ghost>
        <div className="relative">
          <Ghost label="Notifications" size={32} active={menu?.kind === "bell"} onClick={() => setMenu(menu?.kind === "bell" ? null : { kind: "bell" })}>
            <Icon name="bell" size={16} className="text-icon-secondary" />
          </Ghost>
          {menu?.kind === "bell" ? (
            <div className="absolute right-0 top-[calc(100%+6px)] z-40 w-[260px] rounded-[12px] border border-border-06 bg-surface-primary p-4 text-[14px] text-text-secondary shadow-[0_4px_12px_rgb(0_0_0/0.06)]">
              You are all caught up. New summaries from the people you follow show up here.
            </div>
          ) : null}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${IMG}/avatar-user.jpg`} alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
      </div>
    </div>
  );

  /* ---- Feed head ---------------------------------------------------------------------------------- */
  const isTopic = view.kind === "interest" || view.kind === "trending";
  const head = (
    <div className="flex flex-col gap-4 pb-6 pt-4">
      {isTopic ? <h2 className="text-[14px] font-medium leading-[18px] tracking-[-0.4px] text-text-primary">{viewLabel(view)}</h2> : null}
      <div className="flex items-center gap-3">
        {headButton ? (
          <button
            type="button"
            onClick={headButton.onClick}
            disabled={!headButton.onClick}
            className="flex h-8 cursor-pointer items-center gap-2 rounded-[8px] bg-[var(--v-btn)] px-2.5 text-[13px] leading-[16px] tracking-[-0.4px] text-text-primary outline-none transition-colors hover:bg-[var(--v-btn-hover)] focus-visible:ring-2 focus-visible:ring-[var(--v-accent)] disabled:cursor-default disabled:text-text-placeholder disabled:hover:bg-[var(--v-btn)]"
          >
            {headButton.icon ? <Icon name={headButton.icon} size={14} /> : null}
            {headButton.label}
          </button>
        ) : null}
        <div className="ml-auto">
          {view.kind === "interest" ? (
            <button type="button" onClick={() => removeInterest(view.name)} className="h-8 cursor-pointer rounded-[8px] px-2 text-[13px] text-text-tertiary outline-none hover:bg-[var(--v-btn)] hover:text-text-primary">
              Remove from Interests
            </button>
          ) : view.kind === "trending" ? (
            interests.includes(view.name) ? (
              <span className="px-2 text-[13px] text-text-tertiary">In your Interests</span>
            ) : (
              <button type="button" onClick={() => addInterest(view.name)} className="flex h-8 cursor-pointer items-center gap-2 rounded-[8px] px-2 text-[13px] text-text-tertiary outline-none hover:bg-[var(--v-btn)] hover:text-text-primary">
                <Icon name="plus" size={14} />
                Add to Interests
              </button>
            )
          ) : adding ? (
            <button type="button" onClick={() => (setAdding(false), setDraft(""))} className="flex h-8 cursor-pointer items-center gap-2 rounded-[8px] px-2 text-[13px] text-text-tertiary outline-none hover:bg-[var(--v-btn)] hover:text-text-primary">
              <Icon name="close" size={14} />
              Close
            </button>
          ) : (
            <button type="button" onClick={() => setAdding(true)} className="flex h-8 cursor-pointer items-center gap-2 rounded-[8px] px-2 text-[13px] text-text-tertiary outline-none hover:bg-[var(--v-btn)] hover:text-text-primary">
              <Icon name="plus" size={14} />
              Add interest
            </button>
          )}
        </div>
      </div>

      {adding ? (
        <div className="relative">
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addInterest(draft);
              if (e.key === "Escape") {
                setAdding(false);
                setDraft("");
              }
            }}
            placeholder="Type a topic, a person or a source"
            aria-label="New interest"
            className="h-8 w-full rounded-[8px] border-2 border-[var(--v-accent)] px-3 text-[14px] text-text-primary outline-none placeholder:text-text-placeholder"
          />
          {draft.trim() ? (
            <div role="listbox" className="absolute inset-x-0 top-[calc(100%+4px)] z-30 flex flex-col rounded-[12px] border border-border-06 bg-surface-primary p-1 shadow-[0_8px_24px_rgb(0_0_0/0.08)]">
              {[`Add ‘${draft.trim()}’`, ...SUGGESTIONS.filter((s) => s.toLowerCase().includes(draft.trim().toLowerCase()))].slice(0, 9).map((s, i) => (
                <button
                  key={s}
                  type="button"
                  role="option"
                  aria-selected={false}
                  onClick={() => addInterest(i === 0 ? draft : s)}
                  className="flex h-10 cursor-pointer items-center rounded-[8px] px-3 text-left text-[14px] text-text-secondary outline-none hover:bg-surface-secondary hover:text-text-primary"
                >
                  {s}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : view.kind !== "interest" && view.kind !== "saved" && view.kind !== "summaries" ? (
        <div ref={chipsRef} className="-mx-1 flex items-center gap-3 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <span className="shrink-0 text-[12px] leading-[16px] text-text-tertiary">Trending</span>
          {TRENDING.map((t) => (
            <Pill key={t} active={view.kind === "trending" && view.name === t} onClick={() => go(view.kind === "trending" && view.name === t ? { kind: "forYou" } : { kind: "trending", name: t })}>
              {t}
            </Pill>
          ))}
        </div>
      ) : null}
    </div>
  );

  /* ---- Rows --------------------------------------------------------------------------------------- */
  const rowMenu = (i: DesktopItem) => (
    <Menu
      className="absolute right-0 top-[calc(100%+4px)]"
      items={
        i.id === current
          ? [
              { icon: "bookmark", label: saved.has(i.id) ? "Saved" : "Save", onSelect: () => toggleSave(i.id) },
              { icon: "bars", label: "Playing now", onSelect: () => setMenu(null), disabled: true },
              { icon: "copy", label: "Copy", onSelect: copy },
            ]
          : [
              { icon: "bookmark", label: saved.has(i.id) ? "Saved" : "Save", onSelect: () => toggleSave(i.id) },
              { icon: "queue-add", label: "Add to queue", onSelect: () => addToQueue(i.id) },
              { icon: "copy", label: "Copy", onSelect: copy },
            ]
      }
    />
  );

  const playBtn = (i: DesktopItem) => {
    const isCur = i.id === current;
    const left = isCur && cur ? cur.duration - elapsed : i.duration;
    return (
      <button
        type="button"
        onClick={(e) => (e.stopPropagation(), playRow(i.id))}
        aria-label={isCur && playing ? `Pause: ${i.title}` : `Play summary: ${i.title}`}
        className="relative z-10 flex h-8 cursor-pointer items-center gap-2 rounded-[8px] bg-[var(--v-btn)] px-2.5 text-[13px] leading-[16px] text-text-primary outline-none transition-colors hover:bg-[var(--v-btn-hover)] focus-visible:ring-2 focus-visible:ring-[var(--v-accent)]"
      >
        <Icon name={isCur && playing ? "pause" : "play"} size={14} />
        {short(left)}
      </button>
    );
  };
  const moreBtn = (i: DesktopItem) => (
    <div className={`relative ${menu?.kind === "row" && menu.id === i.id ? "z-30" : "z-10"}`}>
      <Ghost label={`More actions: ${i.title}`} active={menu?.kind === "row" && menu.id === i.id} onClick={() => setMenu(menu?.kind === "row" && menu.id === i.id ? null : { kind: "row", id: i.id })}>
        <Icon name="more" size={16} className="text-icon-secondary" />
      </Ghost>
      {menu?.kind === "row" && menu.id === i.id ? rowMenu(i) : null}
    </div>
  );

  const excerptRow = (i: DesktopItem) => {
    const isCur = i.id === current;
    const open = expanded.has(i.id);
    const long = i.excerpt.length > 190;
    const showActions = menu?.kind === "row" && menu.id === i.id;
    return (
      <li key={i.id} className={`group relative flex gap-6 rounded-[12px] p-4 transition-colors hover:bg-surface-secondary ${showActions ? "bg-surface-secondary" : ""}`}>
        <button type="button" onClick={() => openArticle(i.id)} aria-label={`Open: ${i.title}`} className="absolute inset-0 cursor-pointer rounded-[12px] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--v-accent)]" />
        <div className="pointer-events-none relative flex min-w-0 flex-1 flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className={`text-[18px] font-medium leading-[22px] tracking-[-0.45px] ${read.has(i.id) ? "text-text-tertiary" : "text-text-primary"}`}>{i.title}</h3>
            <p className="flex h-6 items-center gap-2 text-[13px] leading-[16px] tracking-[-0.4px]">
              <Mark source={i.source} size={20} />
              <span className="text-text-secondary">{SOURCES[i.source].name}</span>
              <span className="text-text-placeholder">·</span>
              <span className="text-text-tertiary">{i.age}</span>
              <span className="text-text-placeholder">·</span>
              <span className="text-text-tertiary">{i.topic}</span>
              {isCur && playing ? <Icon name="bars" size={14} className="text-[var(--v-accent)]" /> : null}
            </p>
          </div>
          <p className="text-[15px] leading-[22px] tracking-[-0.5px] text-text-secondary">
            {long && !open ? (
              <>
                {i.excerpt.slice(0, 185).replace(/\s\S*$/, "")}…{" "}
                <button type="button" onClick={() => setExpanded((s) => new Set(s).add(i.id))} className="pointer-events-auto relative cursor-pointer text-[var(--v-accent)] outline-none hover:underline">
                  See more
                </button>
              </>
            ) : (
              i.excerpt
            )}
          </p>
        </div>
        <div className="relative flex w-[160px] shrink-0 flex-col items-end gap-4">
          <div className="pointer-events-none relative flex h-[90px] w-full items-center justify-center overflow-clip rounded-[6px] bg-surface-secondary">
            {i.thumb ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={i.thumb} alt="" className="size-full object-cover" />
            ) : (
              <Mark source={i.source} size={36} />
            )}
            {isCur && cur ? (
              <span className="absolute inset-x-0 bottom-0 h-1 bg-black/20">
                <span className="block h-full bg-[var(--v-accent)]" style={{ width: `${(elapsed / cur.duration) * 100}%` }} />
              </span>
            ) : null}
          </div>
          <div className={`flex items-center gap-1 transition-opacity ${showActions || isCur ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"}`}>
            {playBtn(i)}
            {moreBtn(i)}
          </div>
        </div>
      </li>
    );
  };

  const compactRow = (i: DesktopItem) => {
    const isCur = i.id === current;
    const showActions = menu?.kind === "row" && menu.id === i.id;
    const active = article === i.id;
    return (
      <li key={i.id} className={`group relative flex h-9 items-center gap-4 rounded-[8px] px-2 transition-colors hover:bg-surface-secondary ${showActions || active ? "bg-surface-secondary" : ""}`}>
        <button type="button" onClick={() => openArticle(i.id)} aria-label={`Open: ${i.title}`} className="absolute inset-0 cursor-pointer rounded-[8px] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--v-accent)]" />
        <p className="pointer-events-none relative min-w-0 flex-1 truncate text-[14px] font-medium leading-[18px] tracking-[-0.4px]">
          <span className={read.has(i.id) && !active ? "text-text-tertiary" : "text-text-primary"}>{i.title}</span>
          {art ? null : <span className="ml-3 font-normal text-text-tertiary">{i.excerpt}</span>}
        </p>
        {isCur && playing ? <Icon name="bars" size={14} className="relative text-[var(--v-accent)]" /> : null}
        <div className={`relative flex items-center gap-1 ${showActions ? "" : "hidden group-hover:flex group-focus-within:flex"}`}>
          <Ghost label={isCur && playing ? `Pause: ${i.title}` : `Play summary: ${i.title}`} onClick={() => playRow(i.id)}>
            <Icon name={isCur && playing ? "pause" : "play"} size={14} />
          </Ghost>
          {moreBtn(i)}
        </div>
        <span className={`pointer-events-none relative items-center gap-4 ${showActions ? "hidden" : "flex group-hover:hidden group-focus-within:hidden"}`}>
          <Mark source={i.source} size={20} />
          <span className="w-6 text-right text-[13px] text-text-tertiary">{i.age}</span>
        </span>
      </li>
    );
  };

  /* ---- Feed body ---------------------------------------------------------------------------------- */
  const body = (() => {
    if (status === "loading") {
      return (
        <ul aria-label="Loading" className="flex flex-col gap-8 px-4 pt-2">
          {[0, 1, 2, 3].map((k) => (
            <li key={k} className="flex gap-6">
              <div className="flex flex-1 flex-col gap-3">
                <span className="h-[18px] w-[70%] rounded-[3px] bg-[var(--v-skeleton)]" />
                <span className="h-3 w-[35%] rounded-[3px] bg-[var(--v-skeleton)]" />
                <span className="h-3 w-full rounded-[3px] bg-[var(--v-skeleton)]" />
                <span className="h-3 w-full rounded-[3px] bg-[var(--v-skeleton)]" />
                <span className="h-3 w-[65%] rounded-[3px] bg-[var(--v-skeleton)]" />
              </div>
              <span className="h-[90px] w-[160px] rounded-[6px] bg-[var(--v-skeleton)]" />
            </li>
          ))}
        </ul>
      );
    }
    if (status === "error") {
      return (
        <div className="flex h-12 items-center gap-3 rounded-[8px] bg-[var(--v-error-bg)] px-4 text-[14px] text-text-primary">
          <Icon name="error" size={18} />
          Couldn’t load the data
          <button type="button" onClick={() => go(view)} className="ml-auto cursor-pointer text-[14px] text-[var(--v-error)] outline-none hover:underline">
            Retry
          </button>
        </div>
      );
    }
    if (view.kind === "explore" || (view.kind === "forYou" && feed.length === 0)) {
      return (
        <div className="flex flex-col gap-10 pt-2">
          <p className="text-[16px] text-text-primary">Nothing new yet. Add a few interests and your feed fills up.</p>
          <div className="flex flex-col gap-4">
            <h3 className="text-[16px] font-medium text-text-primary">Popular in Warsaw</h3>
            <div className="flex flex-wrap gap-3">
              {POPULAR.map((p) => (
                <Pill key={p} active={interests.includes(p)} onClick={() => (interests.includes(p) ? removeInterest(p) : addInterest(p))}>
                  {p}
                </Pill>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-medium text-text-primary">For product designers</h3>
              <button type="button" onClick={() => showSnack("More collections open in Explore")} className="flex cursor-pointer items-center gap-1 text-[13px] text-text-secondary outline-none hover:text-text-primary">
                See all <Icon name="chevron-right" size={14} />
              </button>
            </div>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4">
              {FOR_DESIGNERS.map((d) => {
                const on = added.has(d.name);
                return (
                  <li key={d.name} className="flex items-center gap-2 text-[14px]">
                    <span aria-hidden className="size-6 rounded-[6px]" style={{ background: d.color }} />
                    <span className="font-medium text-text-primary">{d.name}</span>
                    <span className="text-text-tertiary">· {d.count} new this week</span>
                    <button
                      type="button"
                      onClick={() => {
                        setAdded((s) => {
                          const n = new Set(s);
                          if (on) n.delete(d.name);
                          else n.add(d.name);
                          return n;
                        });
                        if (on) removeInterest(d.name);
                        else addInterest(d.name);
                      }}
                      className={`ml-auto h-8 cursor-pointer rounded-[8px] px-2 text-[13px] outline-none hover:bg-[var(--v-btn)] ${on ? "text-text-tertiary" : "text-text-primary"}`}
                    >
                      {on ? "Added" : "Add"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
    if (feed.length === 0) {
      return <p className="pt-2 text-[15px] text-text-tertiary">{view.kind === "saved" ? "Nothing saved yet. Use Save on any summary." : "Nothing here yet."}</p>;
    }
    return compact ? <ul className="flex flex-col gap-2">{feed.map(compactRow)}</ul> : <ul className="-mx-4 flex flex-col gap-2">{feed.map(excerptRow)}</ul>;
  })();

  /* ---- Article panel ------------------------------------------------------------------------------ */
  const artIndex = art ? feed.findIndex((i) => i.id === art.id) : -1;
  const articlePanel = art ? (
    <section aria-label="Article" className={`flex min-w-0 flex-col border-l border-border-06 bg-surface-primary ${articleFull ? "flex-1" : "w-[530px] shrink-0"}`}>
      <div className="flex h-[60px] shrink-0 items-center justify-end gap-2 px-4">
        <Ghost label="Previous" disabled={artIndex <= 0} onClick={() => openArticle(feed[artIndex - 1].id)}>
          <Icon name="chevron-up" size={16} className="text-icon-secondary" />
        </Ghost>
        <Ghost label="Next" disabled={artIndex < 0 || artIndex >= feed.length - 1} onClick={() => openArticle(feed[artIndex + 1].id)}>
          <Icon name="chevron-down" size={16} className="text-icon-secondary" />
        </Ghost>
        <Ghost label={articleFull ? "Exit full width" : "Full width"} active={articleFull} onClick={() => setArticleFull((f) => !f)}>
          <Icon name="expand" size={16} className="text-icon-secondary" />
        </Ghost>
        <div className="relative">
          <Ghost label="Article actions" active={menu?.kind === "article"} onClick={() => setMenu(menu?.kind === "article" ? null : { kind: "article" })}>
            <Icon name="more" size={16} className="text-icon-secondary" />
          </Ghost>
          {menu?.kind === "article" ? (
            <Menu
              className="absolute right-0 top-[calc(100%+4px)]"
              items={[
                { icon: "bookmark", label: saved.has(art.id) ? "Saved" : "Save", onSelect: () => toggleSave(art.id) },
                { icon: "queue-add", label: "Add to queue", onSelect: () => addToQueue(art.id) },
                { icon: "copy", label: "Copy", onSelect: copy },
                { icon: "external", label: "Open original", onSelect: () => (setMenu(null), showSnack(`Opens ${SOURCES[art.source].name} in a new tab`)) },
              ]}
            />
          ) : null}
        </div>
        <Ghost label="Close article" onClick={() => (setArticle(null), setArticleFull(false))}>
          <Icon name="close" size={16} className="text-icon-secondary" />
        </Ghost>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-10 pb-32 pt-8 [scrollbar-width:thin]">
        <div className={articleFull ? "mx-auto max-w-[680px]" : ""}>
          <h2 className="text-[24px] font-medium leading-[34px] text-text-primary">{art.title}</h2>
          <div className="mt-5 flex items-center gap-2 text-[13px] tracking-[-0.4px] text-text-tertiary">
            <Mark source={art.source} size={20} />
            <span className="text-text-secondary">{SOURCES[art.source].name}</span>·<span>{art.age}</span>·<span>{art.topic}</span>
            <span className="ml-auto flex items-center gap-1">
              <Ghost label={saved.has(art.id) ? "Saved" : "Save"} active={saved.has(art.id)} onClick={() => toggleSave(art.id)}>
                <Icon name="bookmark" size={16} className="text-icon-secondary" />
              </Ghost>
              {playBtn(art)}
            </span>
          </div>
          <div className="mt-8 flex flex-col gap-4">
            {(art.body ?? [art.excerpt]).map((p) => (
              <p key={p.slice(0, 30)} className="text-[16px] leading-[26px] tracking-[-0.2px] text-text-secondary">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  ) : null;

  /* ---- Player + queue ----------------------------------------------------------------------------- */
  const progress = cur ? elapsed / cur.duration : 0;
  const player =
    cur && playerOpen ? (
      <div ref={playerRef} className="absolute bottom-4 right-4 z-30 flex w-[600px] flex-col gap-2">
        {queueOpen ? (
          <div className="flex max-h-[560px] flex-col overflow-hidden rounded-[16px] border border-border-06 bg-surface-primary shadow-[0_8px_32px_rgb(0_0_0/0.10)]">
            <div className="flex h-12 shrink-0 items-center px-5">
              <p className="flex-1 text-[14px] font-medium text-text-primary">Queue{queue.length ? ` · ${short(queue.reduce((s, id) => s + (BY_ID.get(id)?.duration ?? 0), 0))}` : ""}</p>
              {queue.length ? (
                <button
                  type="button"
                  onClick={() => {
                    const before = queue;
                    setQueue([]);
                    showSnack("Queue cleared", { label: "Undo", run: () => setQueue(before) });
                  }}
                  className="h-8 cursor-pointer rounded-[8px] px-2 text-[14px] text-text-secondary outline-none hover:bg-[var(--v-btn)]"
                >
                  Clear
                </button>
              ) : null}
            </div>
            {queue.length === 0 ? (
              <p className="px-5 pb-5 text-[13px] text-text-secondary">Press play on any feed to start a queue, or use Add to queue on any summary.</p>
            ) : (
              <ul className="min-h-0 overflow-y-auto px-2 pb-2 [scrollbar-width:thin]">
                {queue.map((id) => {
                  const q = BY_ID.get(id);
                  if (!q) return null;
                  const open = menu?.kind === "queueRow" && menu.id === id;
                  return (
                    <li key={id} className={`group relative flex items-center gap-3 rounded-[10px] px-3 py-2 transition-colors hover:bg-surface-secondary ${open ? "bg-surface-secondary" : ""}`}>
                      <button
                        type="button"
                        onClick={() => {
                          const idx = queue.indexOf(id);
                          setQueue(queue.slice(idx + 1));
                          playItem(id);
                        }}
                        aria-label={`Play: ${q.title}`}
                        className="absolute inset-0 cursor-pointer rounded-[10px] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--v-accent)]"
                      />
                      <span className="pointer-events-none relative">
                        <Mark source={q.source} size={24} />
                      </span>
                      <span className="pointer-events-none relative min-w-0 flex-1">
                        <span className="block truncate text-[14px] font-medium leading-[18px] text-text-primary">{q.title}</span>
                        <span className="block text-[13px] leading-[16px] text-text-tertiary">
                          {SOURCES[q.source].name} · {short(q.duration)}
                        </span>
                      </span>
                      <div className={`relative ${open ? "" : "opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"}`}>
                        <span
                          onClickCapture={(e) => {
                            const wrap = playerRef.current?.getBoundingClientRect();
                            const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                            if (wrap) setRowMenuTop(Math.max(8, r.top - wrap.top - 132));
                          }}
                        >
                          <Ghost label={`More actions: ${q.title}`} active={open} onClick={() => setMenu(open ? null : { kind: "queueRow", id })}>
                            <Icon name="more" size={16} className="text-icon-secondary" />
                          </Ghost>
                        </span>

                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : null}

{menu?.kind === "queueRow" && BY_ID.get(menu.id) ? (
                          <Menu
                            width={210}
                            className="absolute right-12" style={{ top: rowMenuTop }}
                            items={[
                              {
                                icon: "close",
                                label: "Remove from queue",
                                onSelect: () => {
                                  setMenu(null);
                                  const before = queue;
                                  const id = menu.id;
                                  setQueue((x) => x.filter((y) => y !== id));
                                  showSnack("Removed from queue", { label: "Undo", run: () => setQueue(before) });
                                },
                              },
                              { icon: "bookmark", label: saved.has(menu.id) ? "Saved" : "Save", onSelect: () => toggleSave(menu.id) },
                              { icon: "list", label: "Open summary", onSelect: () => (setMenu(null), openArticle(menu.id)) },
                            ]}
                          />
                        ) : null}

        <div className="relative flex h-[60px] items-center gap-2 overflow-visible rounded-[16px] border border-black/[0.08] bg-surface-primary/95 px-2 shadow-[0_4px_32px_rgb(0_0_0/0.15)] backdrop-blur-[20px]">
          <button
            type="button"
            onClick={() => (setQueueOpen((o) => !o), setMenu(null))}
            aria-expanded={queueOpen}
            aria-label={queueOpen ? "Hide queue" : "Show queue"}
            className={`flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-[10px] p-1 text-left outline-none transition-colors hover:bg-surface-secondary focus-visible:ring-2 focus-visible:ring-[var(--v-accent)] ${queueOpen ? "bg-surface-secondary" : ""}`}
          >
            <Mark source={cur.source} size={36} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-medium leading-[18px] text-text-primary">{cur.title}</span>
              <span className="block truncate text-[13px] leading-[16px] text-text-tertiary">{SOURCES[cur.source].name}</span>
            </span>
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenu(menu?.kind === "speed" ? null : { kind: "speed" })}
              aria-label={`Playback speed ${speedLabel(speed)}`}
              className={`h-10 min-w-10 cursor-pointer rounded-[8px] px-2 text-[13px] text-text-tertiary outline-none hover:bg-[var(--v-btn)] ${menu?.kind === "speed" ? "bg-[var(--v-btn)]" : ""}`}
            >
              {speedLabel(speed)}
            </button>
            {menu?.kind === "speed" ? (
              <div role="listbox" aria-label="Playback speed" className="absolute bottom-[calc(100%+12px)] left-1/2 z-40 flex w-[160px] -translate-x-1/2 flex-col rounded-[12px] bg-surface-primary p-1 shadow-[0_0_40px_rgb(0_0_0/0.12)]">
                {SPEEDS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    role="option"
                    aria-selected={s === speed}
                    onClick={() => (setSpeed(s), setMenu(null))}
                    className={`flex h-10 cursor-pointer items-center rounded-[8px] px-3 text-left text-[14px] outline-none hover:bg-surface-secondary ${s === speed ? "font-medium text-text-primary" : "text-text-secondary"}`}
                  >
                    {speedLabel(s)}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <Ghost label={playing ? "Pause" : "Play"} size={40} round onClick={() => {
              if (elapsed >= cur.duration) {
                setElapsed(0);
                setPlaying(true);
              } else setPlaying((p) => !p);
            }}>
            <Icon name={playing ? "pause" : "play"} size={24} />
          </Ghost>
          <Ghost label="Next" size={40} round onClick={next} disabled={queue.length === 0}>
            <Icon name="next" size={20} />
          </Ghost>
          <div className="relative">
            <Ghost label="Player actions" size={40} round active={menu?.kind === "player"} onClick={() => setMenu(menu?.kind === "player" ? null : { kind: "player" })}>
              <Icon name="more" size={16} className="text-icon-secondary" />
            </Ghost>
            {menu?.kind === "player" ? (
              <Menu
                width={270}
                className="absolute bottom-[calc(100%+12px)] right-0"
                items={[
                  { icon: "bookmark", label: saved.has(cur.id) ? "Saved" : "Save", onSelect: () => toggleSave(cur.id) },
                  { icon: "copy", label: "Copy", onSelect: copy },
                  { icon: "external", label: "Open original", onSelect: () => (setMenu(null), showSnack(`Opens ${SOURCES[cur.source].name} in a new tab`)) },
                  { icon: "unfollow", label: `Unfollow ${SOURCES[cur.source].name}`, onSelect: () => unfollow(cur.source) },
                  { icon: "flag", label: "Share feedback", onSelect: () => (setMenu(null), showSnack("Thanks, feedback sent")) },
                  { icon: "close", label: "Close player", onSelect: () => (setMenu(null), setPlaying(false), setPlayerOpen(false), setQueueOpen(false)) },
                ]}
              />
            ) : null}
          </div>
          {/* Progress: hover grows it and shows the handle; click seeks */}
          <div
            role="slider"
            tabIndex={0}
            aria-label="Position"
            aria-valuemin={0}
            aria-valuemax={Math.round(cur.duration)}
            aria-valuenow={Math.round(elapsed)}
            onPointerDown={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              setElapsed(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * cur.duration);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") setElapsed((x) => Math.min(cur.duration, x + 5));
              if (e.key === "ArrowLeft") setElapsed((x) => Math.max(0, x - 5));
            }}
            className="group/bar absolute inset-x-4 -bottom-[3px] flex h-3 cursor-pointer items-center outline-none"
          >
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-black/10 transition-[height] group-hover/bar:h-1.5">
              <div className="h-full rounded-full bg-[var(--v-accent)]" style={{ width: `${progress * 100}%` }} />
            </div>
            <span className="absolute size-3 -translate-x-1/2 rounded-full bg-[var(--v-accent)] opacity-0 shadow-[0_0_0_2px_white] transition-opacity group-hover/bar:opacity-100" style={{ left: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    ) : null;

  return (
    <div className={`relative flex overflow-hidden bg-surface-primary font-sans text-text-primary ${className}`} style={{ ...VERB_VARS, width, height }}>
      {sidebar}
      {articleFull ? null : (
        <div className={`flex min-w-0 flex-col ${art ? "w-[530px] shrink-0" : "flex-1"}`}>
          {topBar}
          <div ref={feedRef} className="min-h-0 flex-1 overflow-y-auto pb-32 [scrollbar-width:thin]">
            <div className={art ? "px-5" : compact ? "px-5" : "mx-auto w-[800px]"}>
              {head}
              {body}
            </div>
          </div>
        </div>
      )}
      {articlePanel}

      {/* Click-away for menus */}
      {menu ? <button type="button" aria-label="Close menu" tabIndex={-1} onClick={() => setMenu(null)} className="absolute inset-0 z-20 cursor-default" /> : null}

      {player}

      <div aria-live="polite" className="pointer-events-none absolute left-1/2 top-[28px] z-50 -translate-x-1/2">
        {snack ? (
          <div key={snack.id} className="pointer-events-auto flex h-10 items-center gap-4 rounded-[10px] bg-[var(--v-snack)] px-3 text-[13px] text-white shadow-[0_8px_24px_rgb(0_0_0/0.18)] motion-safe:animate-[feature-in_0.3s_ease-out_both]">
            <span className="whitespace-nowrap">{snack.message}</span>
            {snack.action ? (
              <button
                type="button"
                onClick={() => {
                  snack.action?.run();
                  setSnack(null);
                }}
                className="cursor-pointer whitespace-nowrap text-[var(--v-snack-action)] outline-none hover:underline"
              >
                {snack.action.label}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
