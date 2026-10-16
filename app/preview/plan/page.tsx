"use client";

import dynamic from "next/dynamic";
import { Fragment, useEffect, useMemo, useState, type ComponentType } from "react";
import { PreviewHost } from "@/components/catalogue/preview-host";
import { PLAN_STORAGE_KEY } from "@/components/catalogue/selection";
import { renderPlanSection } from "@/lib/plan/render";
import type { PlanSection, SitePlan } from "@/lib/plan/types";
import type { PreviewProps } from "@/lib/types";

const ID_PATTERN = /^[a-z0-9-]+$/;

/** Wireframe fallback for a section without generated content */
function Wireframe({ component }: { component: string }) {
  const Component = useMemo<ComponentType<PreviewProps>>(
    () =>
      dynamic(() => import(`@/registry/firefly/sections/${component}/preview`).then((m) => m.default), {
        ssr: false,
        loading: () => <div className="h-40" aria-busy />,
      }),
    [component]
  );
  return <Component inBuild />;
}

function readPlan(): SitePlan | null {
  try {
    const raw = window.localStorage.getItem(PLAN_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SitePlan) : null;
  } catch {
    return null;
  }
}

/**
 * The assembled page: every section of the plan in order. Sections with content render the real
 * component with that content and its images; the rest render their wireframe preview.
 * Re-renders when the plan changes in another tab/frame (storage event).
 */
export default function PlanPreviewPage() {
  const [plan, setPlan] = useState<SitePlan | null>(null);

  useEffect(() => {
    setPlan(readPlan());
    const onStorage = (e: StorageEvent) => {
      if (e.key === PLAN_STORAGE_KEY || e.key === null) setPlan(readPlan());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const sections: PlanSection[] = (plan?.sections ?? []).filter((s) => ID_PATTERN.test(s.component));

  return (
    <PreviewHost>
      {sections.map((section, i) => {
        const next = sections[i + 1];
        const spacer = section.component.startsWith("navigation-") && next && !next.component.startsWith("hero-");
        const rendered = renderPlanSection(section);
        return (
          <Fragment key={section.id ?? `${section.component}-${i}`}>
            {rendered ?? <Wireframe component={section.component} />}
            {spacer ? <div aria-hidden className="h-[72px] md:h-[76px]" /> : null}
          </Fragment>
        );
      })}
    </PreviewHost>
  );
}
