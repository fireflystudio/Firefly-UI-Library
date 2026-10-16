"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const PREVIEW_HEIGHT_MESSAGE = "firefly-preview-height";

/**
 * Renders a page at a fixed viewport width inside an iframe and scales it to the
 * container. The framed page reports its content height via postMessage
 * (see <PreviewHost>), so the frame never shows an inner scrollbar.
 */
export function useScaledFrame(deviceWidth: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setContainerWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const frame = iframeRef.current;
      if (!frame || e.source !== frame.contentWindow) return;
      const data = e.data as { type?: string; height?: number } | null;
      if (data && data.type === PREVIEW_HEIGHT_MESSAGE && typeof data.height === "number") {
        setContentHeight(Math.ceil(data.height));
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const reset = useCallback(() => setContentHeight(0), []);

  const scale = containerWidth > 0 ? Math.min(1, containerWidth / deviceWidth) : 1;
  return { containerRef, iframeRef, scale, contentHeight, containerWidth, reset };
}
