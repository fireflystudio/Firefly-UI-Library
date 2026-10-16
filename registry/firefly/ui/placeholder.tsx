import type { CSSProperties } from "react";

/**
 * Content-free stand-in for an image or product visual. Library components render it by
 * default; a site replaces it with a real `next/image` (or its own mockup) through props.
 *
 * Draws a soft hatched panel with a small mono label. Decorative (aria-hidden).
 */
export function Placeholder({
  label = "Visual",
  ratio,
  tone = "light",
  className = "",
  style,
}: {
  label?: string;
  /** CSS aspect-ratio, e.g. "16 / 10". Omit to fill the parent. */
  ratio?: string;
  tone?: "light" | "dark";
  className?: string;
  style?: CSSProperties;
}) {
  const tones = {
    light: "bg-surface-muted text-text-quaternary",
    dark: "bg-surface-card-dark text-text-on-dark/50",
  } as const;
  return (
    <div
      aria-hidden
      style={{ aspectRatio: ratio, ...style }}
      className={`relative flex h-full w-full items-center justify-center overflow-clip ${tones[tone]} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-60 [background-image:repeating-linear-gradient(135deg,transparent_0_14px,color-mix(in_srgb,currentColor_12%,transparent)_14px_15px)]"
      />
      <span className="relative rounded-pill border border-current/20 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em]">
        {label}
      </span>
    </div>
  );
}
