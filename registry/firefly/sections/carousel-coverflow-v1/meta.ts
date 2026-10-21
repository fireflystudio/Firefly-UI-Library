import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "carousel-coverflow-v1",
  name: "Carousel Coverflow",
  version: 1,
  category: "carousels",
  description:
    "Two-tone headline over a cover-flow of portrait cards: the centre card full size, the neighbours smaller and faded. Round prev/next buttons, pagination dots with a sliding line for the active card, click a side card, arrow keys, mouse and touch drag with snap and flick, and autoplay with a visible pause button that is off under reduced motion.",
  interactions: [
    "Click the arrows, a dot or a side card: the row slides, the active line moves.",
    "Drag the cards with the mouse or a finger; a quick flick moves one card.",
    "Click the region and press ← / →.",
    "Hover or focus: autoplay pauses. Click the pause button to stop it.",
  ],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the heading." },
    { name: "intro", type: "string", description: "Short paragraph under the heading." },
    {
      name: "items",
      type: "{ title; body?; kicker?; visual?: ReactNode }[]",
      description: "5–8 cards. kicker is the small mono line, visual a 4:5 portrait image (Placeholder by default).",
    },
    { name: "autoplayMs", type: "number", default: "4000", description: "Milliseconds between automatic steps. 0 disables autoplay; reduced motion always disables it." },
    { name: "id", type: "string", default: '"carousel"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [
    { version: "1.0", date: "2026-10-16", notes: "First release: cover-flow geometry, buttons, keys, drag/flick, autoplay with pause toggle, counter." },
    { version: "1.1", date: "2026-10-19", notes: "Controls use the Base IconButton and PaginationDots (dots + sliding line) instead of bordered round buttons and the mono counter." },
    { version: "1.2", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Section h2 40/32/28 (was 48/36/28), lead intro 20/18/17, headline → carousel 64/56/40, card titles 20/19/18, card copy 16/15." },
  ],
  usedOn: ["startupmap"],
  files: [
    {
      path: "registry/firefly/sections/carousel-coverflow-v1/carousel-coverflow-v1.tsx",
      target: "components/sections/carousel-coverflow-v1.tsx",
      type: "registry:component",
    },
  ],
  dependencies: ["motion"],
  registryDependencies: ["firefly-base"],
  order: 10,
};
