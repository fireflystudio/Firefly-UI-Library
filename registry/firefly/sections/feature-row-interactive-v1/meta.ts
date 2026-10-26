import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "feature-row-interactive-v1",
  name: "Feature Row Interactive",
  version: 1,
  category: "features",
  description:
    "Two-tone headline and a list of steps on one side, a 720×560 visual frame on the other. The steps are an accordion: one open at a time, and opening a step crossfades the frame to that step's visual.",
  interactions: [
    "Click a step: its body fades in and the visual swaps.",
    "Hover a closed step: it turns black and a small arrow slides in.",
    "Tab to a step and press Enter or Space.",
    "Scroll: the visual drifts 30px.",
  ],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the heading." },
    { name: "headlineStack", type: "boolean", default: "false", description: "Puts the grey half of the headline on its own line." },
    {
      name: "items",
      type: "{ title: string; body: string; visual?: ReactNode }[]",
      description: "Steps in order. Each visual fills the frame while its step is open; defaults to a Placeholder labelled with the title.",
    },
    { name: "reverse", type: "boolean", default: "false", description: "Visual on the left on tablet and desktop." },
    { name: "defaultActive", type: "number", default: "0", description: "Index of the step open on load." },
    { name: "id", type: "string", default: '"feature-row"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [
    { version: "1.4", date: "2026-10-26", notes: "Optional `headlineStack`: the grey half of the headline starts on its own line, like Steps Cards. Additive, off by default." },
    { version: "1.3", date: "2026-10-26", notes: "Headline at the Section h2 size 40/32/28 (was the 28/24/22 sub-headline); on desktop the copy column takes what the content width leaves next to the 720px frame (400px at 1200, as before); width follows max-w-content." },
    { version: "1.2", date: "2026-10-22", notes: "Optional `intro` lead under the headline (purely additive: without it the section renders exactly as in 1.0). Added for Verb V2, where three short steps left a gap under a tall visual." },
    { version: "1.0", date: "2026-10-16", notes: "First release: step accordion, swapping visual, parallax frame." },
    { version: "1.1", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Sub-headline h2 28/24/22 (was 37/28/26), step titles 18/17/16, step copy 16/15, headline → content 40 on mobile." },
  ],
  usedOn: ["verb", "startupmap", "verb-v2", "trendmd"],
  files: [
    {
      path: "registry/firefly/sections/feature-row-interactive-v1/feature-row-interactive-v1.tsx",
      target: "components/sections/feature-row-interactive-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 10,
};
