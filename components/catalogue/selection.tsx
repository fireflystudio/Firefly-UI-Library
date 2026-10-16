"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { PlanSection, SitePlan } from "@/lib/plan/types";

const KEY = "firefly-ui-library:plan";
const LEGACY_KEY = "firefly-ui-library:selection";

const newId = (component: string) => `${component}-${Math.random().toString(36).slice(2, 8)}`;

type SelectionContext = {
  /** The site plan: ordered sections, with content when the builder wrote it */
  plan: SitePlan | null;
  sections: PlanSection[];
  /** Component ids in page order (may repeat) */
  selected: string[];
  /** false until localStorage has been read (avoids a hydration mismatch) */
  ready: boolean;
  isSelected: (component: string) => boolean;
  /** Add one section of this component, or remove every section using it */
  toggle: (component: string) => void;
  remove: (sectionId: string) => void;
  move: (sectionId: string, direction: -1 | 1) => void;
  clear: () => void;
  setPlan: (plan: SitePlan) => void;
  setImageSrc: (sectionId: string, slot: string, src: string) => void;
};

const Ctx = createContext<SelectionContext | null>(null);

export function SelectionProvider({ children }: { children: ReactNode }) {
  const [plan, setPlanState] = useState<SitePlan | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) {
        setPlanState(JSON.parse(raw) as SitePlan);
      } else {
        // Migrate the old plain selection (list of component ids)
        const legacy = window.localStorage.getItem(LEGACY_KEY);
        if (legacy) {
          const ids = (JSON.parse(legacy) as unknown[]).filter((x): x is string => typeof x === "string");
          if (ids.length) setPlanState({ title: "Untitled site", summary: "", sections: ids.map((c) => ({ id: newId(c), component: c })) });
          window.localStorage.removeItem(LEGACY_KEY);
        }
      }
    } catch {
      /* private mode / blocked storage: start empty */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      if (plan) window.localStorage.setItem(KEY, JSON.stringify(plan));
      else window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }, [plan, ready]);

  const update = useCallback((fn: (sections: PlanSection[]) => PlanSection[]) => {
    setPlanState((prev) => {
      const base = prev ?? { title: "Untitled site", summary: "", sections: [] };
      return { ...base, sections: fn(base.sections) };
    });
  }, []);

  const toggle = useCallback(
    (component: string) =>
      update((s) => (s.some((x) => x.component === component) ? s.filter((x) => x.component !== component) : [...s, { id: newId(component), component }])),
    [update]
  );
  const remove = useCallback((sectionId: string) => update((s) => s.filter((x) => x.id !== sectionId)), [update]);
  const move = useCallback(
    (sectionId: string, direction: -1 | 1) =>
      update((s) => {
        const i = s.findIndex((x) => x.id === sectionId);
        const j = i + direction;
        if (i < 0 || j < 0 || j >= s.length) return s;
        const next = [...s];
        [next[i], next[j]] = [next[j], next[i]];
        return next;
      }),
    [update]
  );
  const clear = useCallback(() => setPlanState(null), []);
  const setPlan = useCallback((p: SitePlan) => setPlanState({ ...p, sections: p.sections.map((s) => ({ ...s, id: s.id ?? newId(s.component) })) }), []);
  const setImageSrc = useCallback(
    (sectionId: string, slot: string, src: string) =>
      update((s) => s.map((x) => (x.id === sectionId ? { ...x, images: x.images?.map((im) => (im.slot === slot ? { ...im, src } : im)) } : x))),
    [update]
  );

  const sections = useMemo(() => plan?.sections ?? [], [plan]);
  const value = useMemo<SelectionContext>(
    () => ({
      plan,
      sections,
      selected: sections.map((s) => s.component),
      ready,
      isSelected: (component) => sections.some((s) => s.component === component),
      toggle,
      remove,
      move,
      clear,
      setPlan,
      setImageSrc,
    }),
    [plan, sections, ready, toggle, remove, move, clear, setPlan, setImageSrc]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSelection() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSelection must be used inside <SelectionProvider>");
  return ctx;
}

export const PLAN_STORAGE_KEY = KEY;
