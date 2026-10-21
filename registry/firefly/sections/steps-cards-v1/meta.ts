import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "steps-cards-v1",
  name: "Steps Cards",
  version: 1,
  category: "stats",
  description:
    "A process in a row: two-tone heading with a short intro on the right, then one bordered card per step with an icon slot (numbered tile by default), title and body. Side by side on desktop, a 3-column grid on tablet, hairline rows on mobile.",
  interactions: ["Hover a card: it lifts 3px and the icon nudges right.", "Scroll: heading, intro and each step rise in, staggered."],
  props: [
    { name: "headline", type: "string", description: "Primary part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second part, on its own line." },
    { name: "intro", type: "string", description: "Short paragraph shown to the right of the heading on tablet and desktop." },
    { name: "steps", type: "{ title; body; icon?: ReactNode }[]", description: "3–6 steps in order. icon defaults to a numbered 72px tile." },
    { name: "id", type: "string", default: '"steps"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release, rebuilt from the Founders timeline pattern." }, { version: "1.1", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Section h2 40/32/28 (was 48/32/26), section padding 120/96/64 (was 80/72/56), lead intro 20/18/17, headline → cards 64/56/40, card gap 24, step titles 18/17/16, step copy 16/15 (was 13)." }],
  usedOn: ["startupmap"],
  files: [
    {
      path: "registry/firefly/sections/steps-cards-v1/steps-cards-v1.tsx",
      target: "components/sections/steps-cards-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 15,
};
