"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";


export type SectionVersion = { name: string; node: ReactNode };

type Props = {
  /** Names the control for screen readers only, e.g. "Reader intro" (no visible label, client 2026-10-22). */
  label: string;
  versions: SectionVersion[];
  /** The version shown by default, and the only one rendered when controls are off. */
  defaultIndex?: number;
  /** localStorage key that remembers the last pick in this browser. */
  storageKey: string;
  /** false ships only the default version and hides the control. Wire it to the site's own flag. */
  enabled?: boolean;
};

/**
 * Review tool (Firefly UI Library): renders every version of a section at once and shows one. While the section is on
 * screen, a small "1 2 3" control floats in the bottom-right corner; a click swaps the version
 * instantly. The hidden versions stay mounted (laid over the top of the visible one, invisible
 * and inert), so their images are already loaded and their reveals have already played: nothing
 * loads or lags on a switch. The pick is remembered per browser. With `enabled={false}` only the
 * default version is rendered and the control disappears — wire that to the site's own flag and
 * flip it before launch.
 */
/* Several switches can be on screen at once (e.g. the hero and the next section): only the one
   whose section fills the most of the viewport shows its pill. */
const shares = new Map<string, number>();
const listeners = new Set<() => void>();
function report(id: string, share: number) {
  if (share > 0) shares.set(id, share);
  else shares.delete(id);
  listeners.forEach((l) => l());
}
function leader() {
  let best: string | null = null;
  let max = 0;
  shares.forEach((v, k) => {
    if (v > max) {
      max = v;
      best = k;
    }
  });
  return best;
}

export function VersionSwitch(props: Props) {
  if (props.enabled === false) return <>{props.versions[props.defaultIndex ?? 0]?.node}</>;
  return <Switch {...props} />;
}

function Switch({ label, versions, defaultIndex = 0, storageKey }: Props) {
  const [active, setActive] = useState(defaultIndex);
  const [onScreen, setOnScreen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const me = useId();

  // Remembered pick (per browser; ignored if storage is unavailable).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      const saved = raw === null ? NaN : Number(raw);
      if (Number.isInteger(saved) && saved >= 0 && saved < versions.length) setActive(saved);
    } catch {}
  }, [storageKey, versions.length]);

  // The control shows only while the section is on screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setOnScreen(leader() === me);
    listeners.add(update);
    // share of the viewport the section covers (0 when it covers less than 15% of itself)
    const io = new IntersectionObserver(
      ([e]) => report(me, e.intersectionRatio >= 0.15 || e.intersectionRect.height > window.innerHeight * 0.3 ? e.intersectionRect.height / window.innerHeight : 0),
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      listeners.delete(update);
      report(me, 0);
    };
  }, [me]);

  const pick = (i: number) => {
    setActive(i);
    try {
      window.localStorage.setItem(storageKey, String(i));
    } catch {}
  };

  return (
    <>
      <div ref={ref} className="relative">
        {versions.map((v, i) => {
          const shown = i === active;
          return (
            <div
              key={v.name}
              aria-hidden={shown ? undefined : true}
              inert={!shown}
              className={shown ? "" : "pointer-events-none invisible absolute inset-x-0 top-0"}
            >
              {v.node}
            </div>
          );
        })}
      </div>

      <div
        role="group"
        aria-label={`${label}: choose a version`}
        className={`fixed bottom-5 right-5 z-[60] flex items-center gap-1 rounded-full bg-white/90 p-1 shadow-button backdrop-blur-md transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          onScreen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        {versions.map((v, i) => (
          <button
            key={v.name}
            type="button"
            title={v.name}
            aria-label={`Version ${i + 1}: ${v.name}`}
            aria-pressed={i === active}
            onClick={() => pick(i)}
            className={`flex size-8 cursor-pointer items-center justify-center rounded-full text-[13px] leading-none outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-text-interactive ${
              i === active ? "bg-text-primary text-white" : "text-text-secondary hover:bg-black/[0.06] hover:text-text-primary"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  );
}
