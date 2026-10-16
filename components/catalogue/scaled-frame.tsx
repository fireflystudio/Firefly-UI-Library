"use client";

import { useEffect } from "react";
import { useScaledFrame } from "./use-scaled-frame";

/**
 * Full-height scaled preview: the iframe is as tall as its content and scaled to fit the
 * container width (or to an explicit `scale`). Used on component pages and the Build page.
 */
export function ScaledFrame({
  src,
  deviceWidth,
  title,
  minHeight = 240,
  maxHeight,
  reloadKey = 0,
  scale: scaleProp,
  onContentHeight,
}: {
  src: string;
  deviceWidth: number;
  title: string;
  minHeight?: number;
  /** Cap in CSS px of the framed viewport; taller content scrolls inside the frame */
  maxHeight?: number;
  reloadKey?: number;
  /** Explicit scale; when omitted the frame fits its container width */
  scale?: number;
  /** Reports the framed page's natural content height (CSS px at scale 1) */
  onContentHeight?: (height: number) => void;
}) {
  const { containerRef, iframeRef, scale: fitScale, contentHeight } = useScaledFrame(deviceWidth);
  const scale = scaleProp ?? fitScale;
  const natural = Math.max(contentHeight, minHeight);
  const height = maxHeight ? Math.min(natural, maxHeight) : natural;

  useEffect(() => {
    if (contentHeight > 0) onContentHeight?.(contentHeight);
  }, [contentHeight, onContentHeight]);

  return (
    <div
      ref={containerRef}
      className="relative w-full transition-[height] duration-300 ease-out motion-reduce:transition-none"
      style={{ height: Math.round(height * scale) }}
    >
      <iframe
        key={reloadKey}
        ref={iframeRef}
        src={src}
        title={title}
        className="absolute left-0 top-0 border-0 bg-surface-page"
        style={{
          width: deviceWidth,
          height,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}
