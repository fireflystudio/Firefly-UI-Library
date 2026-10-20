import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "stats-grid-v1",
  name: "Stats Grid",
  version: 1,
  category: "stats",
  description:
    "Dark (or light) results section: an optional two-tone heading, an optional large quote with attribution, and a grid of 3–4 big numbers with a hairline above each. Two columns on mobile, one column per stat from tablet up.",
  interactions: ["Hover a stat: the number nudges 5px to the right.", "Scroll: heading, quote and stats rise in, staggered."],
  props: [
    {
      name: "stats",
      type: "{ value: string; label: string }[]",
      description: "3–4 stats. value is the big number (44/48/64px), label the 14px muted caption underneath.",
    },
    { name: "tone", type: '"dark" | "light"', default: '"dark"', description: "dark = bg-surface-dark with light text; light = page background with ink text." },
    { name: "headline", type: "string", description: "First, primary-coloured part of the optional heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the heading (white/60 on dark)." },
    {
      name: "quote",
      type: "{ text: string; author: string; role?: string }",
      description: "Large quote (24–32px) with <cite> attribution. Sits beside the heading on tablet+ when both are present. Pass the text without quotation marks.",
    },
    { name: "eyebrow", type: "string", description: "Small mono uppercase label above the heading. Also used as the hidden heading when there is no headline." },
    { name: "id", type: "string", default: '"results"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: dark/light tone, optional quote, hairline stat grid with hover nudge." }, { version: "1.1", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Section h2 40/32/28 (was 48/36/28), stat numbers 48/40/32 (was 64/48/44), quote 28/24/22 regular (was 32/28/24 light), header → grid 64/56/40, grid gap 24/20." }],
  files: [
    {
      path: "registry/firefly/sections/stats-grid-v1/stats-grid-v1.tsx",
      target: "components/sections/stats-grid-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 20,
};
