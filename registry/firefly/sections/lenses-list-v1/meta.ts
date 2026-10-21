import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "lenses-list-v1",
  name: "Lenses List",
  version: 1,
  category: "features",
  description:
    "Two-tone headline with a portrait visual under it, next to a list of large clickable names. The active name is black with a short description, the others grey; choosing one crossfades the visual.",
  interactions: [
    "Click a name: its description fades in and the visual swaps.",
    "Tab to a name, then press ArrowDown / ArrowUp (Home / End jump to the ends).",
    "Switch to Mobile: the list comes first, the visual after it.",
  ],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the heading." },
    {
      name: "items",
      type: "{ name: string; description: string; visual?: ReactNode }[]",
      description: "4–6 items. Each visual fills the 4:5 frame while its item is active; defaults to a Placeholder labelled with the name.",
    },
    { name: "defaultActive", type: "number", default: "0", description: "Index of the item active on load." },
    { name: "reverse", type: "boolean", default: "false", description: "List on the left, headline and visual on the right." },
    { name: "id", type: "string", default: '"lenses"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: large-name list, arrow-key navigation, swapping portrait visual." }, { version: "1.1", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Section h2 40/32/28 (was 42/30/26), lens names at the sub-headline size 28/24/22 (was 44/36/32), descriptions 16/15, headline → visual 64/56/40." }],
  usedOn: ["startupmap"],
  files: [
    {
      path: "registry/firefly/sections/lenses-list-v1/lenses-list-v1.tsx",
      target: "components/sections/lenses-list-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 30,
};
