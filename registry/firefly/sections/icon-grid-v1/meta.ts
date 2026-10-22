import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "icon-grid-v1",
  name: "Icon Grid",
  version: 1,
  category: "features",
  description:
    "A two-tone headline over a grid of plain items: an 80px rounded tile with a mark, a title and two lines. Three columns on desktop, two on tablet, one on mobile, no card borders — six capabilities without six boxes. One tile can carry a photo or gradient background as the single point of colour.",
  interactions: [
    "Hover an item: the title nudges 5px right.",
    "With tileBackgroundOn=\"hover\": the highlighted tile is plain at rest and its background fades in on hover or keyboard focus.",
    "Scroll: headline, intro and every item rise in, staggered.",
  ],
  props: [
    { name: "headline", type: "string", description: "First part of the headline." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the headline." },
    { name: "intro", type: "string", description: "Short lead under the headline." },
    {
      name: "items",
      type: "{ title; body?; icon?: ReactNode; tileBackground?: ReactNode }[]",
      description: "3–9 items. `icon` is the 24px mark inside the tile; `tileBackground` fills one tile behind its mark.",
    },
    { name: "headlineClassName", type: "string", default: '"max-w-[900px]"', description: "Headline max width." },
    { name: "tileBackgroundOn", type: '"always" | "hover"', default: '"always"', description: "When the highlighted tile shows its background. \"hover\" keeps the tile plain and fades the background in on hover or focus." },
    { name: "id", type: "string", default: '"features"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section> (e.g. padding at a colour change)." },
  ],
  changelog: [
    {
      version: "1.1",
      date: "2026-10-22",
      notes: "Optional tileBackgroundOn=\"hover\": the highlighted tile stays plain until hover or focus. Additive — the default is unchanged.",
    },
    {
      version: "1.0",
      date: "2026-10-22",
      notes:
        "First release. Generalised from the Solve homepage \"problems\" grid (built there first): copy, icons and the highlighted tile are now props, and the headline takes the two-tone treatment.",
    },
  ],
  usedOn: ["verb"],
  files: [
    {
      path: "registry/firefly/sections/icon-grid-v1/icon-grid-v1.tsx",
      target: "components/sections/icon-grid-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 16,
};
