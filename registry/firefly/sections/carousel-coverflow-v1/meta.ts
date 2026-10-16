import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "carousel-coverflow-v1",
  name: "Carousel Coverflow",
  version: 1,
  category: "carousels",
  description:
    "Two-tone headline over a cover-flow of portrait cards: the centre card full size, the neighbours smaller and faded. Prev/next buttons, click a side card, arrow keys, mouse and touch drag with snap and flick, a mono counter, and autoplay with a visible pause button that is off under reduced motion.",
  interactions: [
    "Click the arrows or a side card: the row slides, the counter updates.",
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
  ],
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
