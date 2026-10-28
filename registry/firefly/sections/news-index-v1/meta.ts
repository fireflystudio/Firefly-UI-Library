import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "news-index-v1",
  name: "News Index",
  version: 1,
  category: "news",
  description:
    "The body of a news page: category filters, a grid / list switch and the stories. Grid is three cards across on desktop with an optional 16:9 image; list is full-width rows with a 2:1 thumbnail, the headline and the category on the right, for skimming a lot of stories.",
  interactions: [
    "Click a category to filter; \"All\" clears it.",
    "The switch top right changes between grid and list; both views hold the same stories.",
    "Cards lift 3px on hover, row and card titles nudge 5px right.",
  ],
  props: [
    { name: "headline", type: "string", description: "Visible section headline (e.g. \"More from the newsroom\"). Without one the heading is there for screen readers only." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the headline." },
    { name: "items", type: "{ title; href; category?; meta?; image? }[]", description: "The stories, in order. `image` is an <Image fill>: 16:9 on the grid card, cropped to 2:1 on the list row." },
    { name: "categories", type: "string[]", default: "[]", description: "Filters, in order. \"All\" is added in front." },
    { name: "allLabel", type: "string", default: '"All"', description: "Label of the first filter." },
    { name: "defaultView", type: '"grid" | "list"', default: '"grid"', description: "The view the page opens in." },
    { name: "switchable", type: "boolean", default: "true", description: "false hides the switch and keeps `defaultView`." },
    { name: "emptyText", type: "string", default: '"Nothing here yet. Try another category."', description: "Shown when a filter matches nothing." },
    { name: "containerClassName", type: "string", default: '"max-w-content"', description: "Width of the content column." },
    { name: "id", type: "string", default: '"news"', description: "Section id." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [
    { version: "1.0", date: "2026-10-28", notes: "First release. Built with the Verb news page from the client's Figma news template (grid and list are the two options drawn there)." },
    { version: "1.1", date: "2026-10-28", notes: "List rows carry the story's artwork as a 2:1 thumbnail (96 / 160 / 200px), as drawn in the template. Rows without an image are unchanged." },
  ],
  usedOn: ["verb"],
  files: [{ path: "registry/firefly/sections/news-index-v1/news-index-v1.tsx", target: "components/sections/news-index-v1.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  order: 20,
};
