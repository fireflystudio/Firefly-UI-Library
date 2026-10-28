import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "news-featured-v1",
  name: "News Featured",
  version: 1,
  category: "news",
  description:
    "The lead story of a news page: one wide card with the category, the read time and the headline at the bottom left and a round arrow in the corner. With a photo it is an image card with white copy; without one it is a quiet surface with a soft brand wash, so a site with no photography still opens on a headline.",
  interactions: ["The whole card is a link: it lifts 3px on hover and the arrow slides right.", "With an image, the photo scales 1.03 under the card."],
  props: [
    { name: "title", type: "string", description: "The headline (Statement h2, 48/40/30)." },
    { name: "href", type: "string", description: "Where the card links." },
    { name: "category", type: "string", description: "Shown before the read time." },
    { name: "meta", type: "string", description: "Read time or date, e.g. \"3 min read\"." },
    { name: "image", type: "ReactNode", description: "Fills the card behind the copy (an <Image fill>). Without it the card is type on a quiet surface." },
    { name: "containerClassName", type: "string", default: '"max-w-content"', description: "Width of the content column." },
    { name: "id", type: "string", default: '"featured"', description: "Section id." },
    { name: "className", type: "string", description: "Extra classes on the <section> (padding at a colour change)." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-28", notes: "First release. Built with the Verb news page from the client's Figma news template." }],
  usedOn: ["verb"],
  files: [{ path: "registry/firefly/sections/news-featured-v1/news-featured-v1.tsx", target: "components/sections/news-featured-v1.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  order: 10,
};
