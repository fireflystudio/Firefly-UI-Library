import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "before-after-compare-v1",
  name: "Before/After Compare",
  version: 1,
  category: "stats",
  description:
    "Two-tone headline above two rounded panels: a neutral “before” panel with dash-marked pain points and a dark “after” panel with check-marked gains. Each panel has a mono label, a visual slot and an optional lead line. Side by side from tablet up, stacked on mobile.",
  interactions: ["Hover a panel: it lifts 2px.", "Scroll: headline, intro and the two panels rise in, the after panel one step later."],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the heading." },
    {
      name: "before",
      type: "{ title?: string; points: string[]; visual?: ReactNode }",
      description: "Left, neutral panel: optional 18px lead line, 3–5 pain points with a dash marker, visual slot (Placeholder by default, null hides it).",
    },
    {
      name: "after",
      type: "{ title?: string; points: string[]; visual?: ReactNode }",
      description: "Right, dark panel: optional lead line, 3–5 gains with a check marker, visual slot (dark Placeholder by default, null hides it).",
    },
    { name: "beforeLabel", type: "string", default: '"Before"', description: "Mono label of the left panel." },
    { name: "afterLabel", type: "string", default: '"After"', description: "Mono label of the right panel." },
    { name: "intro", type: "string", description: "One or two sentences under the heading." },
    { name: "id", type: "string", default: '"compare"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [
    { version: "1.3", date: "2026-10-26", notes: "A point can now be a { value, label } figure row, and each panel takes an optional closing `footnote`. Gives the panels the density of the Startupmap results table instead of a bullet list; plain string points render exactly as before." },
    { version: "1.2", date: "2026-10-26", notes: "Width follows max-w-content (the site token --container-content, default 1200px), so a site can switch to a wider layout in one place. No visual change at the default." },
    { version: "1.0", date: "2026-10-16", notes: "First release: neutral/dark panels, dash and check markers, visual slots, 2px lift." },
    { version: "1.1", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Section h2 40/32/28 (was 48/36/28), lead intro 20/18/17, panel grid gap 24/20 (was 24/16), panel titles 20/19/18, points 16/15." },
  ],
  usedOn: ["verb", "startupmap"],
  files: [
    {
      path: "registry/firefly/sections/before-after-compare-v1/before-after-compare-v1.tsx",
      target: "components/sections/before-after-compare-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 30,
};
