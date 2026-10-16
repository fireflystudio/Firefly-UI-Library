"use client";

import { useScaledFrame } from "./use-scaled-frame";

const DEVICE = 1440;

/**
 * Dashboard card window: a fixed 16:10 panel showing the component rendered at desktop width
 * and scaled down. Short components (nav, marquee, footer) are centred; tall ones show their
 * top with a soft fade at the bottom. Decorative: the card's link opens the full preview.
 */
export function CardPreview({ src, short = false, label }: { src: string; short?: boolean; label: string }) {
  const { containerRef, iframeRef, scale, contentHeight } = useScaledFrame(DEVICE);
  const scaledHeight = contentHeight * scale;
  // Window height = width * 10/16 (aspect 16/10)
  const windowHeight = (containerRef.current?.clientWidth ?? 0) * 0.625;
  const centre = short && contentHeight > 0 && scaledHeight < windowHeight;
  const offset = centre ? Math.round((windowHeight - scaledHeight) / 2) : 0;
  const overflows = contentHeight > 0 && scaledHeight > windowHeight + 2;

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="relative aspect-[16/10] w-full overflow-clip bg-surface-secondary [background-image:radial-gradient(color-mix(in_srgb,var(--color-text-primary)_7%,transparent)_1px,transparent_1px)] [background-size:16px_16px]"
    >
      <iframe
        ref={iframeRef}
        src={src}
        title={`${label} preview`}
        loading="lazy"
        tabIndex={-1}
        className="pointer-events-none absolute left-0 top-0 border-0 bg-surface-page"
        style={{
          width: DEVICE,
          height: Math.max(contentHeight, 1),
          transform: `translateY(${offset}px) scale(${scale})`,
          transformOrigin: "top left",
          opacity: contentHeight > 0 ? 1 : 0,
          transition: "opacity 0.4s ease-out",
        }}
      />
      {overflows ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-primary/90 to-transparent" />
      ) : null}
    </div>
  );
}
