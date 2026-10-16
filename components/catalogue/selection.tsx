"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const KEY = "firefly-ui-library:selection";

type SelectionContext = {
  /** Ordered list of selected item ids */
  selected: string[];
  /** false until localStorage has been read (avoids a hydration mismatch) */
  ready: boolean;
  isSelected: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  move: (id: string, direction: -1 | 1) => void;
  clear: () => void;
};

const Ctx = createContext<SelectionContext | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (Array.isArray(parsed)) setSelected(parsed.filter((x): x is string => typeof x === "string"));
      }
    } catch {
      /* private mode / blocked storage: start empty */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(selected));
    } catch {
      /* ignore */
    }
  }, [selected, ready]);

  const toggle = useCallback(
    (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])),
    []
  );
  const remove = useCallback((id: string) => setSelected((s) => s.filter((x) => x !== id)), []);
  const move = useCallback((id: string, direction: -1 | 1) => {
    setSelected((s) => {
      const i = s.indexOf(id);
      const j = i + direction;
      if (i < 0 || j < 0 || j >= s.length) return s;
      const next = [...s];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }, []);
  const clear = useCallback(() => setSelected([]), []);

  const value = useMemo<SelectionContext>(
    () => ({ selected, ready, isSelected: (id) => selected.includes(id), toggle, remove, move, clear }),
    [selected, ready, toggle, remove, move, clear]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSelection() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSelection must be used inside <SelectionProvider>");
  return ctx;
}
