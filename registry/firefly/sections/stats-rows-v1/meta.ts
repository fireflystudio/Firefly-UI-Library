import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "stats-rows-v1",
  name: "Stats Rows",
  version: 1,
  category: "stats",
  description:
    "Two-tone headline with an optional eyebrow, intro and ghost pill above a list of hairline-separated rows: a large value or step number on the left, a title and short description on the right. Three columns from tablet up, stacked on mobile.",
  interactions: ["Hover a row: the value nudges 5px to the right.", "Scroll: the headline and each row rise in, staggered."],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the heading." },
    {
      name: "items",
      type: "{ value: string; title: string; description?: string }[]",
      description: "Rows in order. value is the large figure (\"01\", \"3×\", \"12 min\"), title 18px medium, description 15px muted (optional).",
    },
    { name: "eyebrow", type: "string", description: "Small mono uppercase label above the heading." },
    { name: "intro", type: "string", description: "One or two sentences under the heading (max 560px wide)." },
    { name: "cta", type: "{ label; href } | null", default: "Book a demo → #cta", description: "Ghost pill under the heading. null hides it." },
    { name: "id", type: "string", default: '"stats"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: hairline rows, value nudge on hover, two-tone headline." }, { version: "1.1", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Section h2 40/32/28 (was 48/36/28), values 48/40/32 (was 40/32/32), lead intro 20/18/17, lead → button 40/40/32, row titles 18/17/16, descriptions 16/15, header → rows 64/56/40." }],
  files: [
    {
      path: "registry/firefly/sections/stats-rows-v1/stats-rows-v1.tsx",
      target: "components/sections/stats-rows-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 10,
};
