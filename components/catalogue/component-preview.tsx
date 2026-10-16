"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ScaledFrame } from "./scaled-frame";
import { ViewSwitch, useViewMode } from "./view-mode";

export const DEVICES = [
  { id: "mobile", label: "Mobile", width: 390 },
  { id: "tablet", label: "Tablet", width: 834 },
  { id: "desktop", label: "Desktop", width: 1440 },
] as const;

export type DeviceId = (typeof DEVICES)[number]["id"];

/**
 * Live preview panel: device-width switcher, "Fit" to the screen height (toggles to "Reset"),
 * a replay button (reloads the frame so entrance animations run again) and a link to the bare preview.
 */
export function ComponentPreview({
  src,
  title,
  defaultDevice = "desktop",
  scrollInside = false,
  actions,
  exampleSrc,
}: {
  src: string;
  title: string;
  defaultDevice?: DeviceId;
  /** Cap the frame at ~720px so scroll behaviour (sticky nav) can be seen inside it */
  scrollInside?: boolean;
  /** Extra toolbar buttons rendered after "Open" (e.g. Add to build) */
  actions?: ReactNode;
  /** URL of the "final" example preview; enables the Wireframe / Final switch */
  exampleSrc?: string;
}) {
  const { mode } = useViewMode();
  const activeSrc = mode === "final" && exampleSrc ? exampleSrc : src;
  const [device, setDevice] = useState<DeviceId>(defaultDevice);
  const [reloadKey, setReloadKey] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [fitted, setFitted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Full-screen preview: Escape closes, body scroll is locked, focus returns to the Open button
  useEffect(() => {
    if (!fullscreen) return;
    const previous = document.documentElement.style.overflow;
    const opener = openButtonRef.current;
    document.documentElement.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setFullscreen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [fullscreen]);
  const [contentHeight, setContentHeight] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageWidth, setStageWidth] = useState(0);
  const current = DEVICES.find((d) => d.id === device)!;

  // On a phone, start with the mobile width: a 1440px frame scaled to 350px is unreadable.
  useEffect(() => {
    if (window.matchMedia("(max-width: 767px)").matches) setDevice("mobile");
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => setStageWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fitScale = stageWidth > 0 ? Math.min(1, stageWidth / current.width) : 1;
  const scale = fitScale * zoom;
  const frameWidth = Math.round(current.width * scale);

  const frameCap = scrollInside ? (device === "mobile" ? 760 : 720) : undefined;
  const reset = () => {
    setFitted(false);
    setZoom(1);
  };
  const fitScreen = () => {
    const stage = stageRef.current;
    if (!contentHeight || !stage) return;
    // The frame's real height (a capped frame scrolls inside, so only the cap counts)
    const frameHeight = frameCap
      ? Math.min(contentHeight, frameCap)
      : contentHeight;
    // Space between the stage's top edge (or the viewport top, if scrolled past it) and the bottom of the window
    const stageTop = Math.max(stage.getBoundingClientRect().top, 0);
    const padding = window.matchMedia("(min-width: 768px)").matches ? 24 : 12;
    const available = window.innerHeight - stageTop - padding * 2 - 24;
    const z = Math.min(
      1,
      Math.max(
        0.2,
        Math.floor((available / (frameHeight * fitScale)) * 100) / 100,
      ),
    );
    if (z < 1) {
      setZoom(z);
      setFitted(true);
    }
  };
  const onContentHeight = useCallback((h: number) => setContentHeight(h), []);

  const toolBtn =
    "inline-flex h-[30px] cursor-pointer items-center justify-center gap-1.5 rounded-pill border border-border-light bg-surface-primary px-3 text-[13px] font-medium leading-none text-text-primary transition-opacity duration-200 ease-out hover:opacity-70 disabled:cursor-default disabled:opacity-40 disabled:hover:opacity-40";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {exampleSrc ? <ViewSwitch /> : null}
          <div
            role="tablist"
            aria-label="Preview width"
            className="flex items-center rounded-pill border border-border-06 bg-surface-muted p-[3px]"
          >
            {DEVICES.map((d) => {
              const active = d.id === device;
              return (
                <button
                  key={d.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setDevice(d.id)}
                  className={`inline-flex h-[30px] cursor-pointer items-center gap-2 rounded-pill px-3.5 text-[13px] font-medium leading-none transition-[background-color,color,box-shadow] duration-200 ease-out ${
                    active
                      ? "bg-surface-primary text-text-primary shadow-[0_1px_2px_0_#0000000f,0_0_0_1px_#0000000a]"
                      : "text-text-nav hover:text-text-primary"
                  }`}
                >
                  {d.label}
                  <span
                    className={`hidden font-mono text-[11px] sm:inline ${active ? "text-text-quaternary" : "text-text-placeholder"}`}
                  >
                    {d.width}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {fitted ? (
            <button
              type="button"
              onClick={reset}
              className={toolBtn}
              title="Back to full width (100%)"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M6 2v4H2M10 2v4h4M14 10h-4v4M2 10h4v4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Reset
            </button>
          ) : (
            <button
              type="button"
              onClick={fitScreen}
              disabled={!contentHeight}
              className={toolBtn}
              title="Scale the whole section to fit the screen height"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Fit
            </button>
          )}
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className={toolBtn}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v2.6h-2.6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Replay
          </button>
          <button
            ref={openButtonRef}
            type="button"
            onClick={() => setFullscreen(true)}
            className={toolBtn}
            title="Full-screen preview"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M9 2h5v5M14 2 8.5 7.5M7 14H2V9M2 14l5.5-5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Open
          </button>
          {actions}
        </div>
      </div>

      <div
        ref={stageRef}
        className="rounded-card border border-border-06 bg-catalogue-bg p-3 [background-image:radial-gradient(color-mix(in_srgb,var(--color-text-primary)_9%,transparent)_1px,transparent_1px)] [background-size:16px_16px] md:p-6"
      >
        <div
          className={`mx-auto overflow-clip border border-border-06 bg-surface-page transition-[width] duration-300 ease-out motion-reduce:transition-none ${
            device === "desktop" ? "rounded-tile" : "rounded-frame"
          }`}
          style={{
            width: stageWidth > 0 ? frameWidth : undefined,
            maxWidth: "100%",
          }}
        >
          <ScaledFrame
            src={activeSrc}
            deviceWidth={current.width}
            title={`${title} at ${current.width}px`}
            reloadKey={reloadKey}
            scale={stageWidth > 0 ? scale : undefined}
            onContentHeight={onContentHeight}
            maxHeight={frameCap}
          />
        </div>
      </div>

      {fullscreen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title}, full-screen preview`}
          className="fixed inset-0 z-[100] bg-surface-page"
        >
          <iframe
            src={activeSrc}
            title={`${title}, full screen`}
            className="block h-full w-full border-0"
          />
          <button
            ref={closeButtonRef}
            type="button"
            onClick={() => setFullscreen(false)}
            aria-label="Close full-screen preview"
            className="fixed right-4 top-4 z-10 inline-flex size-9 cursor-pointer items-center justify-center rounded-pill border border-border-10 bg-surface-primary/90 text-text-primary backdrop-blur-xl transition-[translate,scale,opacity] duration-200 ease-out hover:-translate-y-px active:scale-[0.98] motion-reduce:transition-none"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden
            >
              <path
                d="M3.5 3.5l9 9M12.5 3.5l-9 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}
