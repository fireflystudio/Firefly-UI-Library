"use client";

import { useEffect, type ReactNode } from "react";
import { PREVIEW_HEIGHT_MESSAGE, PREVIEW_REPLAY_MESSAGE } from "./use-scaled-frame";

/**
 * Wraps a component rendered inside a preview iframe: reports the document's content height
 * to the parent catalogue page (so the frame sizes itself without scrollbars) and replays the
 * reveal animations when the parent asks (hovering a dashboard card).
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

    const onMessage = (e: MessageEvent) => {
      const data = e.data as { type?: string } | null;
      if (!data || data.type !== PREVIEW_REPLAY_MESSAGE) return;
      if (!document.documentElement.classList.contains("motion-ok")) return;
      // Snap every revealed element back to hidden (no fade-out), commit that state, then reveal
      // again with the normal transition and the same stagger delays.
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal][data-in]"));
      els.forEach((el) => {
        el.style.transition = "none";
        el.removeAttribute("data-in");
      });
      void document.body.offsetWidth;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          els.forEach((el) => {
            el.style.transition = "";
            el.setAttribute("data-in", "");
          });
        })
      );
    };
    window.addEventListener("message", onMessage);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", post);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return <>{children}</>;
}
