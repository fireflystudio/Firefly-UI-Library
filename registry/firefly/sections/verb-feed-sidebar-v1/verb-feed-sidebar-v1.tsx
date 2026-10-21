"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

/** Verb brand values, set as CSS variables on the root so the file needs no brand tokens in the host site. */
const VERB_VARS = {
  "--v-card": "#f5f5f5",
  "--v-accent": "#4d63fd",
  "--v-shadow": "0 16px 40px rgb(0 0 0 / 0.06)",
} as CSSProperties;

/* Drawn 260px wide; every size is a share of the element's own width (the Verb site shows it 260px wide). */
const v = (n: number) => `calc(${n} * 100cqw / 260)`;

/**
 * Verb Reader sidebar: the sidebar is the feed. Every interest and every followed channel can be removed
 * (hover a row, press the bin) and "Add interest" opens a field to type a new one. Nothing is saved.
 */
export type FeedEntry = { id: number; label: string; /** Two or three letters shown in a round avatar (channels). */ initials?: string; /** Avatar colours. */ background?: string; color?: string };
type Entry = FeedEntry;

const SAMPLE_INTERESTS: Entry[] = [
  "gaming",
  "software team management",
  "learn to meditate",
  "Dune 3 movie",
  "Paris things to do",
].map((label, id) => ({ id, label }));

const SAMPLE_FOLLOWING: Entry[] = [
  { id: 100, label: "BBC News", initials: "BBC", background: "#b81f1f", color: "#ffffff" },
  { id: 101, label: "Andrew Huberman", initials: "AH", background: "#2b2b2b", color: "#ffffff" },
  { id: 102, label: "Lewis Howes", initials: "LH", background: "#e8b04a", color: "#3a2a06" },
];

const MAX_INTERESTS = 6;
const COLLAPSE_MS = 220;

function TrashIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ width: v(17), height: v(17) }}
    >
      <path d="M3 6h18M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6M5.5 6l.9 13.2A2 2 0 0 0 8.4 21h7.2a2 2 0 0 0 2-1.8L18.5 6M10 10.5v6M14 10.5v6" />
    </svg>
  );
}

function Row({
  entry,
  removing,
  onRemove,
}: {
  entry: Entry;
  removing: boolean;
  onRemove: () => void;
}) {
  return (
    <li
      className="grid transition-[grid-template-rows,opacity] duration-200 ease-out"
      style={{ gridTemplateRows: removing ? "0fr" : "1fr", opacity: removing ? 0 : 1 }}
    >
      <div className="min-h-0 overflow-hidden">
        <div
          className="group flex items-center justify-between text-text-secondary transition-colors duration-150 hover:bg-[var(--v-card)] hover:text-text-primary focus-within:bg-[var(--v-card)]"
          style={{ height: v(34), borderRadius: v(9), padding: `0 ${v(8)} 0 ${v(12)}`, fontSize: v(15) }}
        >
          <span className="flex min-w-0 items-center" style={{ gap: v(10) }}>
            {entry.initials ? (
              <span
                className="flex shrink-0 items-center justify-center rounded-full font-medium leading-none"
                style={{ width: v(22), height: v(22), fontSize: v(8), background: entry.background, color: entry.color }}
              >
                {entry.initials}
              </span>
            ) : null}
            <span className="truncate">{entry.label}</span>
          </span>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${entry.label}`}
            className="flex shrink-0 cursor-pointer items-center justify-center rounded-md text-text-tertiary opacity-0 outline-none transition-[opacity,color] duration-150 hover:text-text-primary focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-[var(--v-accent)] group-hover:opacity-100 [@media(hover:none)]:opacity-100"
            style={{ width: v(26), height: v(26) }}
          >
            <TrashIcon />
          </button>
        </div>
      </div>
    </li>
  );
}

export type FeedSidebarProps = {
  interests?: readonly FeedEntry[];
  following?: readonly FeedEntry[];
  /** Most interests the list can hold; "Add interest" disappears at the limit. */
  maxInterests?: number;
  className?: string;
};

export function FeedSidebar({ interests: startInterests = SAMPLE_INTERESTS, following: startFollowing = SAMPLE_FOLLOWING, maxInterests = MAX_INTERESTS, className = "" }: FeedSidebarProps) {
  const [interests, setInterests] = useState<Entry[]>([...startInterests]);
  const [following, setFollowing] = useState<Entry[]>([...startFollowing]);
  const [removing, setRemoving] = useState<number[]>([]);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState("");
  const nextId = useRef(1000);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (adding) input.current?.focus();
  }, [adding]);

  const remove = (id: number) => {
    setRemoving((r) => [...r, id]);
    window.setTimeout(() => {
      setInterests((l) => l.filter((e) => e.id !== id));
      setFollowing((l) => l.filter((e) => e.id !== id));
      setRemoving((r) => r.filter((x) => x !== id));
    }, COLLAPSE_MS);
  };

  const commit = () => {
    const label = draft.trim();
    if (label) setInterests((l) => [...l, { id: nextId.current++, label }]);
    setDraft("");
    setAdding(false);
  };

  const full = interests.length >= maxInterests;

  return (
    <div className={`@container w-full ${className}`} style={VERB_VARS}>
      <div
        className="flex flex-col bg-surface-primary shadow-[var(--v-shadow)]"
        style={{ minHeight: v(424), padding: v(14), borderRadius: v(16) }}
      >
        <p className="text-text-tertiary" style={{ fontSize: v(13), padding: `${v(4)} ${v(12)} ${v(6)}` }}>
          Interests
        </p>
        <ul style={{ display: "flex", flexDirection: "column", gap: v(2) }}>
          {interests.map((e) => (
            <Row key={e.id} entry={e} removing={removing.includes(e.id)} onRemove={() => remove(e.id)} />
          ))}
        </ul>

        {adding ? (
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              commit();
            }}
            className="flex items-center text-text-primary"
            style={{ height: v(34), padding: `0 ${v(12)}`, fontSize: v(15), gap: v(8), marginTop: v(2) }}
          >
            <span className="leading-none text-text-tertiary" style={{ fontSize: v(18) }}>
              +
            </span>
            <input
              ref={input}
              value={draft}
              maxLength={28}
              onChange={(ev) => setDraft(ev.target.value)}
              onBlur={commit}
              onKeyDown={(ev) => {
                if (ev.key === "Escape") {
                  setDraft("");
                  setAdding(false);
                }
              }}
              placeholder="Type an interest"
              aria-label="New interest"
              className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-text-placeholder"
              style={{ fontSize: v(15) }}
            />
          </form>
        ) : full ? null : (
          <button
            type="button"
            onClick={() => setAdding(true)}
            className="flex cursor-pointer items-center text-text-tertiary outline-none transition-colors duration-150 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-[var(--v-accent)]"
            style={{ height: v(34), padding: `0 ${v(12)}`, fontSize: v(15), gap: v(8), marginTop: v(2), borderRadius: v(9) }}
          >
            <span className="leading-none" style={{ fontSize: v(18) }}>
              +
            </span>
            Add interest
          </button>
        )}

        <p className="text-text-tertiary" style={{ fontSize: v(13), padding: `${v(14)} ${v(12)} ${v(6)}` }}>
          Following
        </p>
        <ul style={{ display: "flex", flexDirection: "column", gap: v(2) }}>
          {following.map((e) => (
            <Row key={e.id} entry={e} removing={removing.includes(e.id)} onRemove={() => remove(e.id)} />
          ))}
        </ul>
      </div>
    </div>
  );
}
