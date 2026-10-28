import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "news-index-v1",
  name: "News Index",
  version: 1,
  category: "news",
  description:
    "The body of a news page: category filters, a grid / list switch and the stories. Grid is three to five pictures across with the category, the headline and the read time under each one \u2014 no frame; list is full-width rows with a 2:1 thumbnail, the headline and the category on the right, for skimming a lot of stories.",
  interactions: [
    "Click a category to filter; \"All\" clears it.",
    "The switch top right changes between grid and list; both views hold the same stories.",
    "3 / 4 / 5 (grid view, wide screens) sets how many cards fit across.",
    "On hover only the picture pushes in by 3%; no type moves.",
  ],
  props: [
    { name: "headline", type: "string", description: "Visible section headline (e.g. \"More from the newsroom\"). Without one the heading is there for screen readers only." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the headline." },
    { name: "items", type: "{ title; href; category?; meta?; image? }[]", description: "The stories, in order. `image` is an <Image fill>: 16:9 on the grid card, cropped to 2:1 on the list row." },
    { name: "categories", type: "string[]", default: "[]", description: "Filters, in order. \"All\" is added in front." },
    { name: "allLabel", type: "string", default: '"All"', description: "Label of the first filter." },
    { name: "defaultView", type: '"grid" | "list"', default: '"grid"', description: "The view the page opens in." },
    { name: "switchable", type: "boolean", default: "true", description: "false hides the switch and keeps `defaultView`." },
    { name: "columns", type: "3 | 4 | 5", default: "5", description: "Cards per row on a wide screen. The template is drawn at 5." },
    { name: "resizable", type: "boolean", default: "true", description: "false hides the 3 / 4 / 5 picker and keeps `columns`." },
    { name: "emptyText", type: "string", default: '"Nothing here yet. Try another category."', description: "Shown when a filter matches nothing." },
    { name: "containerClassName", type: "string", default: '"max-w-content"', description: "Width of the content column." },
    { name: "id", type: "string", default: '"news"', description: "Section id." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [
    { version: "1.0", date: "2026-10-28", notes: "First release. Built with the Verb news page from the client's Figma news template (grid and list are the two options drawn there)." },
    { version: "1.1", date: "2026-10-28", notes: "List rows carry the story's artwork as a 2:1 thumbnail (96 / 160 / 200px), as drawn in the template. Rows without an image are unchanged." },
    { version: "1.2", date: "2026-10-28", notes: "Grid cards lost their frame: picture, then category, headline and read time straight on the page, as in the template. Rows can be 3, 4 or 5 across (new `columns`, picker beside the view switch, headline size follows), and headlines no longer shift on hover \u2014 only the picture moves. Fixes stories staying invisible after a filter click (the reveal is keyed now) and a hover border that used an undefined token." },
  ],
  usedOn: ["verb"],
  files: [{ path: "registry/firefly/sections/news-index-v1/news-index-v1.tsx", target: "components/sections/news-index-v1.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  order: 20,
};
