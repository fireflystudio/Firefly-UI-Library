"use client";

import { useEffect } from "react";
import { PREVIEW_REPLAY_MESSAGE, useScaledFrame } from "./use-scaled-frame";

/**
 * Dashboard card window: a fixed 16:10 panel showing the component rendered at `deviceWidth`
 * and scaled down. Components shorter than the window sit at the top, centre or bottom on the
 * page background; taller ones show their top with a soft fade. `replayTick` changes ask the
 * framed page to replay its reveal animations (card hover). Decorative: the card link opens the page.
 */
export function CardPreview({
  src,
  label,
  deviceWidth = 1440,
  align = "top",
  replayTick = 0,
}: {
  src: string;
  label: string;
  deviceWidth?: number;
  align?: "top" | "center" | "bottom";
  replayTick?: number;
}) {
  const { containerRef, iframeRef, scale, contentHeight } = useScaledFrame(deviceWidth);
  const scaledHeight = contentHeight * scale;
  const windowHeight = (containerRef.current?.clientWidth ?? 0) * 0.625; // aspect 16/10
  const free = Math.max(0, windowHeight - scaledHeight);
  const offset = contentHeight > 0 ? (align === "center" ? Math.round(free / 2) : align === "bottom" ? Math.round(free) : 0) : 0;
  const overflows = contentHeight > 0 && scaledHeight > windowHeight + 2;

  useEffect(() => {
    if (!replayTick) return;
    iframeRef.current?.contentWindow?.postMessage({ type: PREVIEW_REPLAY_MESSAGE }, "*");
  }, [replayTick, iframeRef]);

  return (
    <div ref={containerRef} aria-hidden className="relative aspect-[16/10] w-full overflow-clip bg-surface-page">
      <iframe
        ref={iframeRef}
        src={src}
        title={`${label} preview`}
        loading="lazy"
        tabIndex={-1}
        className="pointer-events-none absolute left-0 top-0 border-0 bg-surface-page"
        style={{
          width: deviceWidth,
          height: Math.max(contentHeight, 1),
          transform: `translateY(${offset}px) scale(${scale})`,
          transformOrigin: "top left",
          opacity: contentHeight > 0 ? 1 : 0,
          transition: "opacity 0.4s ease-out",
        }}
      />
      {overflows ? <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface-primary/90 to-transparent" /> : null}
    </div>
  );
}
