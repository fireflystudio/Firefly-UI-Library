"use client";

import { useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight, IconButton, PauseIcon, PlayIcon } from "@/components/ui/icon-button";
import { PaginationDots } from "@/components/ui/pagination-dots";
import { Placeholder } from "@/components/ui/placeholder";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";
import { TwoTone } from "@/components/ui/two-tone";

export type CarouselItem = {
  /** Small mono line above the title, e.g. "Case study" */
  kicker?: string;
  title: string;
  body?: string;
  /** Portrait image (4:5) at the top of the card. Defaults to a Placeholder. */
  visual?: ReactNode;
};

export type CarouselCoverflowProps = {
  /** Section id (anchor) */
  id?: string;
  headline: string;
  /** Grey second half of the headline */
  headlineMuted?: string;
  /** Short paragraph under the headline */
  intro?: string;
  /** 5–8 cards work best (7 looks balanced on desktop) */
  items: CarouselItem[];
  /** ms between automatic steps (default 4000). 0 disables autoplay. Always off under reduced motion. */
  autoplayMs?: number;
  className?: string;
};

/*
 * Geometry by distance from the centre slot, in units of the card width (--w). Side cards slide
 * under the centre card and shrink/fade step by step; a card more than two slots away is
 * invisible, which hides the wrap-around jump.
 */
const SLOT_X = [0, 0.8, 1.5, 2.1, 2.7];
const SLOT_SCALE = [1, 0.86, 0.74, 0.64, 0.56];
const SLOT_OPACITY = [1, 0.75, 0.4, 0, 0];

// Drag tuning
const DRAG_START = 6; // px of movement before a press becomes a drag
const RESISTANCE = 0.8; // the row follows the pointer at 80%
const FLICK_VELOCITY = 0.5; // px/ms
const MIN_PULL = 0.3; // slots: a short pull past this still moves one card

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Position, scale and opacity for a (possibly fractional) signed slot. */
function place(p: number) {
  const d = Math.abs(p);
  const i = Math.min(Math.floor(d), SLOT_X.length - 2);
  const t = d - i;
  const tc = Math.min(t, 1);
  return {
    x: Math.sign(p) * lerp(SLOT_X[i], SLOT_X[i + 1], t),
    scale: lerp(SLOT_SCALE[i], SLOT_SCALE[i + 1], tc),
    opacity: lerp(SLOT_OPACITY[i], SLOT_OPACITY[i + 1], tc),
    z: 10 - Math.round(d),
  };
}

type Drag = { id: number; startX: number; lastX: number; lastT: number; v: number; step: number; active: boolean };

/**
 * Carousel Coverflow v1
 * Two-tone headline + a cover-flow of portrait cards: the centre card at full size, the
 * neighbours smaller and faded (transform/opacity only, 500ms). Prev/next buttons, click a side
 * card to centre it, arrow keys on the focused region, mouse and touch drag with snap and flick,
 * pagination dots, and autoplay every `autoplayMs` that pauses on hover, focus and drag, has a
 * visible pause/play toggle and is off under prefers-reduced-motion.
 */
export function CarouselCoverflow({
  id = "carousel",
  headline,
  headlineMuted,
  intro,
  items,
  autoplayMs = 4000,
  className = "",
}: CarouselCoverflowProps) {
  const headingId = `${id}-heading`;
  const count = items.length;
  const half = Math.floor(count / 2);
  const wrap = useCallback((n: number) => ((n % count) + count) % count, [count]);
  /** Signed slot of card i when `active` is centred: -half .. count-1-half */
  const slotOf = (i: number, active: number) => wrap(i - active + half) - half;

  const [{ active, prev }, setState] = useState({ active: 0, prev: 0 });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [dragOffset, setDragOffset] = useState<number | null>(null); // slots while dragging, null otherwise
  const stageRef = useRef<HTMLDivElement>(null);
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);

  // The server can't know the motion preference: the first client render matches it (autoplay
  // on) and switches off right after hydration when reduced motion is set.
  const reduce = useReducedMotion();
  const [motionOk, setMotionOk] = useState(true);
  useEffect(() => setMotionOk(!reduce), [reduce]);

  const go = useCallback((next: number) => setState((s) => ({ active: wrap(next), prev: s.active })), [wrap]);
  const step = useCallback((dir: number) => setState((s) => ({ active: wrap(s.active + dir), prev: s.active })), [wrap]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dragging = dragOffset !== null;
  const autoplay = autoplayMs > 0 && motionOk && !paused;
  const running = autoplay && !hovered && !focused && !dragging && inView;

  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => step(1), autoplayMs);
    return () => window.clearInterval(t);
  }, [running, step, autoplayMs]);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  };

  /** Distance between the centre and the first side slot, in px (one step of the row). */
  const stepPx = () => {
    const card = stageRef.current?.querySelector<HTMLElement>("[data-card]");
    return (card?.offsetWidth ?? 320) * SLOT_X[1];
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    suppressClick.current = false;
    drag.current = { id: e.pointerId, startX: e.clientX, lastX: e.clientX, lastT: e.timeStamp, v: 0, step: stepPx(), active: false };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    if (!d.active) {
      if (Math.abs(dx) < DRAG_START) return;
      d.active = true;
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    const dt = e.timeStamp - d.lastT;
    if (dt > 0) d.v = (e.clientX - d.lastX) / dt;
    d.lastX = e.clientX;
    d.lastT = e.timeStamp;
    // At most `half` cards can be pulled past the centre in one drag
    setDragOffset(Math.max(-half, Math.min(half, (dx * RESISTANCE) / d.step)));
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>, cancelled = false) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (!d.active) return;
    suppressClick.current = true; // the click that follows a drag must not centre a side card
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    const x = dragOffset ?? 0;
    setDragOffset(null);
    if (cancelled) return;
    // Snap to the nearest card; a short pull or a quick flick still moves one card
    let n = Math.round(x);
    if (n === 0 && (Math.abs(x) > MIN_PULL || Math.abs(d.v) > FLICK_VELOCITY)) n = x !== 0 ? Math.sign(x) : Math.sign(d.v);
    if (n !== 0) step(-n);
  };

  const offset = dragOffset ?? 0;

  return (
    <section id={id} aria-labelledby={headingId} className={`overflow-x-clip bg-surface-page py-16 md:py-24 xl:py-[120px] ${className}`}>
      <Reveal className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 md:gap-14 xl:gap-16">
        <div className="flex w-full max-w-[800px] flex-col items-center gap-4 px-5 text-center md:gap-5 md:px-10">
          <h2
            {...reveal}
            id={headingId}
            className="text-balance text-[28px] font-normal leading-[1.2] tracking-[-0.02em] text-text-primary md:text-[32px] xl:text-[40px]"
          >
            <TwoTone text={headline} muted={headlineMuted} />
          </h2>
          {intro ? (
            <p {...reveal} className="max-w-[600px] text-pretty text-[17px] leading-[1.4] tracking-[-0.01em] text-text-nav md:text-[18px] xl:text-[20px]">
              {intro}
            </p>
          ) : null}
        </div>

        <div
          {...reveal}
          role="region"
          aria-roledescription="carousel"
          aria-labelledby={headingId}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          }}
          className="flex w-full flex-col items-center gap-6 rounded-frame focus-visible:[outline-offset:-4px] md:gap-8"
        >
          <div
            ref={stageRef}
            style={{ "--w": "min(78vw, 320px)" } as CSSProperties}
            className={`grid w-full touch-pan-y justify-items-center overflow-clip py-3 select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={(e) => endDrag(e)}
            onPointerCancel={(e) => endDrag(e, true)}
            onClickCapture={(e) => {
              if (suppressClick.current) {
                suppressClick.current = false;
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            onDragStart={(e) => e.preventDefault()}
          >
            {items.map((item, i) => {
              const slot = slotOf(i, active);
              const { x, scale, opacity, z } = place(slot + offset);
              // A card wrapping from one end to the other jumps instead of sweeping across the row
              const jump = Math.abs(slot - slotOf(i, prev)) > half;
              const animate = !dragging && !jump;
              const hidden = opacity <= 0;
              return (
                <article
                  key={i}
                  data-card
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${count}`}
                  aria-hidden={hidden || undefined}
                  className={`relative col-start-1 row-start-1 flex w-(--w) flex-col overflow-clip rounded-card border border-border-06 bg-surface-primary shadow-card-drop ${
                    animate ? "transition-[transform,opacity] duration-500 ease-out-soft motion-reduce:transition-none" : ""
                  } ${hidden ? "pointer-events-none" : ""}`}
                  // Inline `transform` (not the translate/scale utilities), so transition-[transform,opacity] is right here
                  style={{ transform: `translateX(calc(var(--w) * ${x})) scale(${scale})`, opacity, zIndex: z }}
                >
                  <div className="relative aspect-[4/5] w-full overflow-clip">{item.visual ?? <Placeholder label="Image" ratio="4 / 5" />}</div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    {item.kicker ? (
                      <p className="font-mono text-[12px] uppercase leading-[normal] tracking-[0.08em] text-text-tertiary">{item.kicker}</p>
                    ) : null}
                    <h3 className="text-pretty text-[18px] font-medium leading-[1.3] tracking-[-0.01em] text-text-primary md:text-[19px] xl:text-[20px]">{item.title}</h3>
                    {item.body ? <p className="text-pretty text-[15px] leading-[1.55] text-text-nav md:text-[16px]">{item.body}</p> : null}
                  </div>
                  {slot !== 0 && !hidden ? (
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-label={`Show slide ${i + 1} of ${count}`}
                      onClick={() => go(i)}
                      className={`absolute inset-0 ${dragging ? "cursor-grabbing" : "cursor-pointer"}`}
                    />
                  ) : null}
                </article>
              );
            })}
          </div>

          <div className="flex items-center gap-5">
            <IconButton aria-label="Previous slide" onClick={() => step(-1)}>
              <ChevronLeft />
            </IconButton>
            <PaginationDots count={count} index={active} onSelect={go} />
            <p className="sr-only" aria-live={running ? "off" : "polite"} aria-atomic="true">
              {`Slide ${active + 1} of ${count}: ${items[active]?.title ?? ""}`}
            </p>
            <IconButton aria-label="Next slide" onClick={() => step(1)}>
              <ChevronRight />
            </IconButton>
            {autoplayMs > 0 && motionOk ? (
              <IconButton aria-label={paused ? "Play autoplay" : "Pause autoplay"} aria-pressed={paused} onClick={() => setPaused((p) => !p)} className="ml-1">
                {paused ? <PlayIcon /> : <PauseIcon />}
              </IconButton>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

