import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "news-article-v1",
  name: "News Article",
  version: 1,
  category: "news",
  description:
    "The story page: back link, category and read time, the h1, an optional \"Listen\" pill and artwork, then the body — paragraphs, sub-headings, bullet lists and pull quotes. The column is 760px, the same as the careers role page.",
  interactions: ["Each block reveals as it scrolls in.", "The back link fades to 60% on hover."],
  props: [
    { name: "title", type: "string", description: "The page's h1 (28/32/40)." },
    { name: "blocks", type: "{ type: 'p'|'h2'|'ul'|'quote'; … }[]", description: "The body, in order. `p` and `h2` take `text`, `ul` takes `items`, `quote` takes `text` and an optional `by`." },
    { name: "back", type: "{ label; href } | null", default: '{ label: "All news", href: "/news" }', description: "Link back to the index." },
    { name: "category", type: "string", description: "Shown before the read time." },
    { name: "meta", type: "string", description: "Read time or date." },
    { name: "lead", type: "string", description: "One line under the title, in the muted grey." },
    { name: "listenLabel", type: "string", description: 'Small pill under the meta line, e.g. "Listen · 3m". Not wired to anything.' },
    { name: "image", type: "ReactNode", description: "Artwork above the title, in a 16:9 frame." },
    { name: "containerClassName", type: "string", default: '"max-w-[760px]"', description: "The reading column." },
    { name: "id", type: "string", default: '"article"', description: "Anchor + heading id." },
    { name: "className", type: "string", description: "Extra classes (e.g. bottom padding before the next section)." },
  ],
  changelog: [
    {
      version: "1.0",
      date: "2026-10-28",
      notes:
        "First release. Built with the Verb news page. The design's 1050px column was narrowed to the house 760px (at 1050 a line of 17px type runs past 110 characters) and body type is 16/17/17, a step above the house body size, because this is the one page people read top to bottom.",
    },
  ],
  usedOn: ["verb"],
  files: [{ path: "registry/firefly/sections/news-article-v1/news-article-v1.tsx", target: "components/sections/news-article-v1.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  order: 30,
};
