"use client";

import { useEffect, type ReactNode } from "react";
import { PREVIEW_HEIGHT_MESSAGE } from "./use-scaled-frame";

/**
 * Wraps a component rendered inside a preview iframe and reports the document's content
 * height to the parent catalogue page, so the frame can size itself without scrollbars.
 */
export function PreviewHost({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.parent === window) return;
    const post = () => {
      const height = document.body.offsetHeight;
      window.parent.postMessage({ type: PREVIEW_HEIGHT_MESSAGE, height }, "*");
    };
    post();
    const ro = new ResizeObserver(post);
    ro.observe(document.body);
    window.addEventListener("load", post);
    return () => {
      ro.disconnect();
      window.removeEventListener("load", post);
    };
  }, []);

  return <>{children}</>;
}
