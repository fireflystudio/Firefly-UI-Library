"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

/** Verb brand values, set as CSS variables on the root so the file needs no brand tokens in the host site. */
const VERB_VARS = {
  "--v-ink": "#111111",
  "--v-shadow": "0 16px 40px rgb(0 0 0 / 0.06)",
} as CSSProperties;

/* Drawn 460px wide; every size is a share of the element's own width, so it scales with its box. */
const u = (px: number) => `calc(${px} * 100cqw / 460)`;
/* Type only: multiplied by --type-scale (default 1) so a host can shrink the text without resizing the box. */
const fu = (px: number) => `calc(${px} * 100cqw / 460 * var(--type-scale, 1))`;

const IMG = "/images/verb-player";

export type FollowSource = {
  name: string;
  /** One line under the name, e.g. "Podcast · 2.4M followers". */
  meta?: string;
  /** Square artwork. Logos usually want `contain` plus the brand's own background. */
  image?: string;
  contain?: boolean;
  /** Fills the tile behind the artwork (a logo's brand colour), or stands in for a missing image. */
  background?: string;
  /** Letter avatar when there is no image. */
  letter?: string;
  color?: string;
};

/* Three sources with artwork that still reads at 130px: a cover photo, a logo on its brand colour
   and a tile that carries its own background. Marks whose letters are knocked out of white (BBC,
   WSJ) turn into blank boxes at this size — do not use them here. */
const SAMPLE_SOURCES: FollowSource[] = [
  { name: "Huberman Lab", meta: "Podcast · weekly", image: `${IMG}/explore/huberman.jpg` },
  { name: "TED", meta: "Talks · daily", image: `${IMG}/explore/ted.png`, contain: true, background: "#ff002a" },
  { name: "The Verge", meta: "Tech news · daily", image: `${IMG}/source-verge.jpg` },
];

export type FollowSourcesProps = {
  /** Small title above the row. Pass null for the row on its own. */
  title?: string | null;
  /** Three or four sources. More than four and the row gets cramped. */
  sources?: FollowSource[];
  followLabel?: string;
  followingLabel?: string;
  /** Names that start out followed. */
  defaultFollowing?: readonly string[];
  /** Called with every name currently followed. */
  onChange?: (following: string[]) => void;
  className?: string;
};

/**
 * Verb Reader "Subscribe": a row of well-known channels, each with a Follow button.
 *
 * The step is about subscribing to the best content sources, not about creating a Verb account
 * (client, 2026-10-27) — in the app this is the Explore page. The artwork is the same source
 * imagery the reader uses, so a logo keeps its brand background and a portrait fills the tile.
 *
 * Follow toggles for real, so the card answers a click without the page going anywhere.
 */
export function FollowSources({
  title = "Follow the best sources",
  sources = SAMPLE_SOURCES,
  followLabel = "Follow",
  followingLabel = "Following",
  defaultFollowing = [],
  onChange,
  className = "",
}: FollowSourcesProps) {
  const [following, setFollowing] = useState<ReadonlySet<string>>(new Set(defaultFollowing));

  const toggle = (name: string) =>
    setFollowing((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      onChange?.([...next]);
      return next;
    });

  return (
    <div className={`@container w-full ${className}`} style={VERB_VARS}>
      <div
        className="flex flex-col bg-surface-primary shadow-[var(--v-shadow)]"
        style={{ padding: u(24), gap: u(18), borderRadius: u(14) }}
      >
        {title ? (
          <p className="font-medium leading-[1.2] tracking-[-0.02em] text-text-primary" style={{ fontSize: fu(18) }}>
            {title}
          </p>
        ) : null}

        <ul className="grid grid-cols-3" style={{ gap: u(12) }}>
          {sources.map((source) => {
            const on = following.has(source.name);
            return (
              <li key={source.name} className="flex min-w-0 flex-col" style={{ gap: u(10) }}>
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "1 / 1", borderRadius: u(12), background: source.background ?? "var(--color-surface-muted)" }}
                >
                  {source.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={source.image}
                      alt=""
                      loading="lazy"
                      className={`absolute inset-0 size-full ${source.contain ? "object-contain" : "object-cover"}`}
                      style={source.contain ? { padding: u(22) } : undefined}
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center font-medium"
                      style={{ color: source.color ?? "#ffffff", fontSize: fu(28) }}
                    >
                      {source.letter ?? source.name.slice(0, 1)}
                    </span>
                  )}
                </div>

                <div className="flex min-w-0 flex-col" style={{ gap: u(2) }}>
                  <p className="truncate font-medium leading-[1.2] tracking-[-0.01em] text-text-primary" style={{ fontSize: fu(13) }}>
                    {source.name}
                  </p>
                  {source.meta ? (
                    <p className="truncate leading-[1.2] text-text-tertiary" style={{ fontSize: fu(11) }}>
                      {source.meta}
                    </p>
                  ) : null}
                </div>

                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(source.name)}
                  className={`w-full cursor-pointer rounded-full border font-medium leading-none transition-colors duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--v-ink)] ${
                    on
                      ? "border-border-10 bg-transparent text-text-tertiary hover:text-text-primary"
                      : "border-[var(--v-ink)] bg-[var(--v-ink)] text-white hover:bg-[#333]"
                  }`}
                  style={{ padding: `${u(9)} ${u(10)}`, fontSize: fu(12) }}
                >
                  {on ? followingLabel : followLabel}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
