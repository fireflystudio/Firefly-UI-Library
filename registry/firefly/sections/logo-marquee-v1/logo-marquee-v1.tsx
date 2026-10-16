import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";

export type LogoMarqueeProps = {
  /** Section id (anchor) */
  id?: string;
  /** Small centred mono eyebrow above the strip, e.g. "Trusted by teams at". Omit to hide it. */
  label?: string;
  /** Logos in order; each becomes one tile. Pass your <Image> or inline SVG. Defaults to 8 neutral placeholder tiles. */
  logos?: ReactNode[];
  /** Seconds for one full loop of a row (default 40). Lower is faster. */
  speed?: number;
  /** One row moving left, or two rows moving in opposite directions. */
  rows?: 1 | 2;
  /** "dark" puts the strip on bg-surface-dark and inverts the tile colours. */
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Each half of a track repeats the logo list until it holds at least this many tiles, so the
 * strip stays continuous on 2400px-wide screens even with a short list.
 */
const MIN_PER_HALF = 16;

/**
 * Logo Marquee v1
 * A compact strip of logos sliding sideways on a CSS keyframe (transform only). Each row is a
 * track that holds two identical copies of the list (the second aria-hidden) and moves by -50%,
 * so the loop is seamless. Hovering the strip pauses it; under prefers-reduced-motion it stands
 * still. The strip is clipped and faded at the edges, so it never scrolls the page sideways.
 */
export function LogoMarquee({ id = "logos", label, logos, speed = 40, rows = 1, tone = "light", className = "" }: LogoMarqueeProps) {
  const headingId = `${id}-heading`;
  const dark = tone === "dark";
  const list = logos && logos.length > 0 ? logos : defaultLogos(dark);
  const repeats = Math.max(1, Math.ceil(MIN_PER_HALF / list.length));
  const fade = dark ? "from-surface-dark" : "from-surface-page";

  return (
    <section
      id={id}
      aria-labelledby={label ? headingId : undefined}
      aria-label={label ? undefined : "Logos"}
      className={`overflow-x-clip py-12 md:py-16 ${dark ? "bg-surface-dark" : "bg-surface-page"} ${className}`}
    >
      <Reveal className="flex flex-col gap-8 md:gap-10">
        {label ? (
          <h2
            {...reveal}
            id={headingId}
            className={`px-5 text-center font-mono text-[12px] font-medium uppercase leading-[normal] tracking-[0.08em] ${
              dark ? "text-text-on-dark/60" : "text-text-tertiary"
            }`}
          >
            {label}
          </h2>
        ) : null}

        <div {...reveal} className="group relative">
          {/* Soft edge fades (token colour → transparent) */}
          <div aria-hidden className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r ${fade} to-transparent md:w-24 xl:w-40`} />
          <div aria-hidden className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l ${fade} to-transparent md:w-24 xl:w-40`} />

          <div className="flex flex-col gap-3 md:gap-4">
            <MarqueeRow items={list} repeats={repeats} direction="left" speed={speed} />
            {rows === 2 ? <MarqueeRow items={[...list].reverse()} repeats={repeats} direction="right" speed={speed} decorative /> : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function MarqueeRow({
  items,
  repeats,
  direction,
  speed,
  decorative = false,
}: {
  items: ReactNode[];
  repeats: number;
  direction: "left" | "right";
  speed: number;
  /** The second row repeats the same logos, so it is hidden from assistive tech. */
  decorative?: boolean;
}) {
  const animation =
    direction === "left"
      ? "animate-[marquee-left_var(--marquee-duration)_linear_infinite]"
      : "animate-[marquee-right_var(--marquee-duration)_linear_infinite]";
  const style = { "--marquee-duration": `${speed}s` } as CSSProperties;

  return (
    <div className="overflow-clip" aria-hidden={decorative || undefined}>
      <div style={style} className={`flex w-max will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none ${animation}`}>
        <LogoList items={items} repeats={repeats} />
        <LogoList items={items} repeats={repeats} hidden />
      </div>
    </div>
  );
}

function LogoList({ items, repeats, hidden = false }: { items: ReactNode[]; repeats: number; hidden?: boolean }) {
  return (
    // The trailing padding equals the gap, so -50% lands exactly on the start of the second copy
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-3 pr-3 md:gap-4 md:pr-4">
      {Array.from({ length: repeats }, (_, r) =>
        items.map((node, i) => (
          // Only the first pass of the list is exposed; the filler passes are decorative
          <li key={`${r}-${i}`} aria-hidden={r > 0 || undefined} className="flex shrink-0 items-center">
            {node}
          </li>
        ))
      )}
    </ul>
  );
}

/* ---------- default placeholder tiles ---------- */

const TILE_WIDTHS = [128, 148, 120, 160, 136, 152, 124, 144];

function defaultLogos(dark: boolean): ReactNode[] {
  return TILE_WIDTHS.map((width, i) => <LogoTile key={i} index={i} width={width} dark={dark} />);
}

function LogoTile({ index, width, dark }: { index: number; width: number; dark: boolean }) {
  return (
    <span
      style={{ width }}
      className={`flex h-11 items-center justify-center rounded-tile border font-mono text-[12px] uppercase leading-none tracking-[0.08em] ${
        dark ? "border-border-on-dark bg-surface-card-dark text-text-on-dark/50" : "border-border-06 bg-surface-primary text-text-quaternary"
      }`}
    >
      Logo {index + 1}
    </span>
  );
}
