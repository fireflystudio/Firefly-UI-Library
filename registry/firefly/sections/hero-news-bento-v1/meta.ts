import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "hero-news-bento-v1",
  name: "Hero News Bento",
  version: 1,
  category: "hero",
  description:
    "Editorial front page: masthead with a stacked two-tone h1 and intro, then a bento of stories — one large lead card with the image behind a dark gradient and 3–5 smaller cards with kicker, title and an optional image slot.",
  interactions: [
    "Hover a card: it lifts 4px and its image scales to 1.03.",
    "Scroll: the lead card drifts ±30px as it crosses the viewport; on mobile each card fades in as it reaches the viewport.",
    "Resize: one column on mobile, two on tablet, lead + 2-column stack on desktop.",
  ],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured line of the h1." },
    { name: "headlineMuted", type: "string", description: "Grey second line, stacked under the first." },
    { name: "eyebrow", type: "string", description: "Small mono uppercase line above the headline." },
    { name: "intro", type: "string", description: "Short paragraph beside the headline (right-aligned on desktop)." },
    {
      name: "lead",
      type: "{ kicker; title; dek?; href; image?: ReactNode }",
      description: "The large story. `image` fills the card behind a bottom gradient; defaults to a dark Placeholder (pass <Image fill>).",
    },
    {
      name: "items",
      type: "{ kicker; title; href; image?: ReactNode | null }[]",
      description: "3–5 smaller stories. `image` fills a 2:1 slot at the top of the card (defaults to a light Placeholder); null removes the slot. An odd last card spans both columns.",
    },
    { name: "id", type: "string", default: '"hero"', description: "Section id for anchor links; the heading id is <id>-heading." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: masthead, lead card with gradient, fluid 1/2/2+lead grid, hover lift + image scale, parallax on the lead." }],
  files: [
    {
      path: "registry/firefly/sections/hero-news-bento-v1/hero-news-bento-v1.tsx",
      target: "components/sections/hero-news-bento-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 30,
};
