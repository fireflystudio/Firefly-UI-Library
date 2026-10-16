"use client";

import { useEffect, useRef } from "react";

/**
 * Sets `--art-scale` on its parent element: max(1, parentWidth / designWidth).
 * Lets a decorative composition drawn at a fixed design width (1440px) grow to cover
 * wider screens via `scale-[var(--art-scale,1)]` instead of leaving empty bands.
 */
export function ArtScale({ designWidth = 1440 }: { designWidth?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const update = () =>
      parent.style.setProperty("--art-scale", String(Math.max(1, parent.clientWidth / designWidth)));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [designWidth]);

  return <span ref={ref} hidden />;
}
