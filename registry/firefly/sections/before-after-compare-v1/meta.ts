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
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: neutral/dark panels, dash and check markers, visual slots, 2px lift." }],
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
