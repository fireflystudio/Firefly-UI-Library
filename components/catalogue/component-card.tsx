"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { CatalogueItem } from "@/lib/types";
import { CardPreview } from "./card-preview";
import { useSelection } from "./selection";
import { previewSrc, useViewMode } from "./view-mode";

/** Dashboard card: live preview + name + version. The whole card opens the component; the checkbox adds it to the build. */
export function ComponentCard({ item }: { item: CatalogueItem }) {
  const { isSelected, toggle, ready } = useSelection();
  const { mode } = useViewMode();
  const wireframeOnly = mode === "final" && !item.hasExample;
  const href = `/components/${item.id}`;
  const checked = ready && isSelected(item.id);
  // Hovering the card replays the component's reveal animation (at most once per 1.5s)
  const [replayTick, setReplayTick] = useState(0);
  const lastReplay = useRef(0);
  const replay = () => {
    const now = Date.now();
    if (now - lastReplay.current < 1500) return;
    lastReplay.current = now;
    setReplayTick((t) => t + 1);
  };

  return (
    <article
      onMouseEnter={replay}
      className={`group relative flex h-full flex-col overflow-clip rounded-card border bg-surface-primary transition-[translate,border-color] duration-200 ease-out hover:-translate-y-0.5 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-border-interactive motion-reduce:transition-none ${
        checked ? "border-text-primary/40" : "border-border-06"
      }`}
    >
      <div className="relative border-b border-border-06">
        <CardPreview
          src={previewSrc(item.id, mode, item.hasExample)}
          label={item.name}
          deviceWidth={item.previewDevice}
          align={item.previewAlign}
          replayTick={replayTick}
        />
        {wireframeOnly ? (
          <span className="absolute right-3 top-3 rounded-pill border border-border-10 bg-surface-primary/90 px-2 py-1 font-mono text-[11px] text-text-nav backdrop-blur-xl">
            wireframe only
          </span>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4 px-5 py-4">
        <h3 className="min-w-0 text-[16px] font-medium leading-[normal] text-text-primary">
          {/* Stretched link: the whole card is clickable, the accessible name is the component name */}
          <Link
            href={href}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            <span className="block truncate">{item.name}</span>
          </Link>
        </h3>
        <label className="relative z-10 flex shrink-0 cursor-pointer items-center gap-2 text-[13px] font-medium text-text-nav">
          <input
            type="checkbox"
            className="catalogue-checkbox"
            checked={checked}
            onChange={() => toggle(item.id)}
            aria-label={`Add ${item.name} v${item.version} to the build`}
          />
          {checked ? "In build" : "Add to build"}
        </label>
      </div>
    </article>
  );
}
