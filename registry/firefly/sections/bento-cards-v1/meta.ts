import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "bento-cards-v1",
  name: "Bento Cards",
  version: 1,
  category: "bento",
  description:
    "Two-tone headline and a grid of equal-height cards in three tones: a photo filling the card under a gradient, a dark surface or a light surface with a visual slot in the middle. One column on mobile, two on tablet, four on desktop (three for 5–6 cards). Cards lift on hover and can be links.",
  interactions: ["Hover a card: it lifts 4px and the visual scales to 103%.", "Tab to a linked card: the whole card shows the focus ring.", "Try 5 cards: the first one becomes double width."],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the heading." },
    {
      name: "items",
      type: '{ label; title; body?; tone?: "photo" | "dark" | "light"; visual?: ReactNode; href? }[]',
      description: "4–6 cards. tone defaults to “light”; visual defaults to a Placeholder; href makes the whole card a link.",
    },
    { name: "id", type: "string", default: '"bento"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: three card tones, 1/2/4-column grid with a 3-column variant, hover lift, stretched links." }],
  files: [
    {
      path: "registry/firefly/sections/bento-cards-v1/bento-cards-v1.tsx",
      target: "components/sections/bento-cards-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 10,
};
