"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type ViewMode = "wireframe" | "final";
const KEY = "firefly-ui-library:view";

type Ctx = { mode: ViewMode; setMode: (m: ViewMode) => void; ready: boolean };
const ViewModeContext = createContext<Ctx | null>(null);

/** Wireframe (content-free placeholders) vs Final (real example content). Remembered per browser. */
export function ViewModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ViewMode>("wireframe");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === "final" || saved === "wireframe") setModeState(saved);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const setMode = (m: ViewMode) => {
    setModeState(m);
    try {
      window.localStorage.setItem(KEY, m);
    } catch {
      /* ignore */
    }
  };

  const value = useMemo(() => ({ mode, setMode, ready }), [mode, ready]);
  return <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>;
}

export function useViewMode() {
  const ctx = useContext(ViewModeContext);
  if (!ctx) throw new Error("useViewMode must be used inside <ViewModeProvider>");
  return ctx;
}

/** Segmented control: Wireframe | Final */
export function ViewSwitch({ className = "" }: { className?: string }) {
  const { mode, setMode } = useViewMode();
  const options: { id: ViewMode; label: string }[] = [
    { id: "wireframe", label: "Wireframe" },
    { id: "final", label: "Final" },
  ];
  return (
    <div role="tablist" aria-label="Preview content" className={`flex items-center rounded-pill border border-border-06 bg-surface-muted p-[3px] ${className}`}>
      {options.map((o) => {
        const active = o.id === mode;
        return (
          <button
            key={o.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setMode(o.id)}
            className={`inline-flex h-[30px] cursor-pointer items-center rounded-pill px-3.5 text-[13px] font-medium leading-none transition-[background-color,color,box-shadow] duration-200 ease-out ${
              active ? "bg-surface-primary text-text-primary shadow-[0_1px_2px_0_#0000000f,0_0_0_1px_#0000000a]" : "text-text-nav hover:text-text-primary"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

/** Preview URL for an item in the current mode (falls back to the wireframe when there is no example). */
export function previewSrc(id: string, mode: ViewMode, hasExample?: boolean) {
  return mode === "final" && hasExample ? `/preview/${id}/example` : `/preview/${id}`;
}
