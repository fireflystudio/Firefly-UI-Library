"use client";

import { useState } from "react";
import { ScaledFrame } from "./scaled-frame";

export const DEVICES = [
  { id: "mobile", label: "Mobile", width: 390 },
  { id: "tablet", label: "Tablet", width: 834 },
  { id: "desktop", label: "Desktop", width: 1440 },
] as const;

export type DeviceId = (typeof DEVICES)[number]["id"];

/**
 * Live preview panel with a device-width switcher, a replay button (reloads the frame so the
 * entrance animations run again) and a link to open the bare preview in a new tab.
 */
export function ComponentPreview({
  src,
  title,
  defaultDevice = "desktop",
  scrollInside = false,
}: {
  src: string;
  title: string;
  defaultDevice?: DeviceId;
  /** Cap the frame at ~720px so scroll behaviour (sticky nav) can be seen inside it */
  scrollInside?: boolean;
}) {
  const [device, setDevice] = useState<DeviceId>(defaultDevice);
  const [reloadKey, setReloadKey] = useState(0);
  const current = DEVICES.find((d) => d.id === device)!;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="tablist" aria-label="Preview width" className="flex items-center rounded-pill border border-border-06 bg-surface-muted p-[3px]">
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
                <span className={`hidden font-mono text-[11px] sm:inline ${active ? "text-text-quaternary" : "text-text-placeholder"}`}>{d.width}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setReloadKey((k) => k + 1)}
            className="inline-flex h-[30px] cursor-pointer items-center gap-1.5 rounded-pill border border-border-light bg-surface-primary px-3 text-[13px] font-medium leading-none text-text-primary transition-opacity duration-200 ease-out hover:opacity-70"
          >
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v2.6h-2.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Replay
          </button>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-[30px] items-center gap-1.5 rounded-pill border border-border-light bg-surface-primary px-3 text-[13px] font-medium leading-none text-text-primary transition-opacity duration-200 ease-out hover:opacity-70"
          >
            Open
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      <div className="rounded-card border border-border-06 bg-surface-secondary p-3 [background-image:radial-gradient(color-mix(in_srgb,var(--color-text-primary)_7%,transparent)_1px,transparent_1px)] [background-size:16px_16px] md:p-6">
        <div
          className={`mx-auto overflow-clip border border-border-10 bg-surface-page shadow-soft transition-[max-width] duration-300 ease-out motion-reduce:transition-none ${
            device === "desktop" ? "rounded-tile" : "rounded-frame"
          }`}
          style={{ maxWidth: current.width }}
        >
          <ScaledFrame
            src={src}
            deviceWidth={current.width}
            title={`${title} at ${current.width}px`}
            reloadKey={reloadKey}
            maxHeight={scrollInside ? (device === "mobile" ? 760 : 720) : undefined}
          />
        </div>
      </div>
    </div>
  );
}
