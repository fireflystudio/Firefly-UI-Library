import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "verb-creators-grid-v1",
  name: "Creators Grid",
  version: 1,
  category: "app-elements",
  area: "app",
  brand: "verb",
  description:
    "A grid of 13 rounded tiles of creator portraits and publisher logos (rows of 4, 5 and 4). Tiles grow a little on hover and the neighbours overlap; the hover cell never moves, so there is no flicker.",
  interactions: ["Hover a tile."],
  props: [
    { name: "tiles", type: "string[]", default: "13 sample images", description: "Image URLs in reading order (rows of 4, 5, 4)." },
    { name: "label", type: "string", default: "A grid of creator portraits…", description: "Accessible description of the grid." },
    { name: "className", type: "string", description: "Extra classes on the root." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-21", notes: "First release, moved from the Verb site where it was built and approved." }],
  files: [
    {
      path: "registry/firefly/sections/verb-creators-grid-v1/verb-creators-grid-v1.tsx",
      target: "components/app/verb-creators-grid-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  usedOn: [],
  order: 50,
  previewAlign: "center",
  previewDevice: 834,
};
