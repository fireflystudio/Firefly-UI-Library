import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "verb-feed-sidebar-v1",
  name: "Feed Sidebar",
  version: 1,
  category: "app-elements",
  area: "app",
  brand: "verb",
  description:
    "The Verb Reader sidebar: the sidebar is the feed. Hover a row and press the bin to remove an interest or a channel; Add interest opens a field to type a new one.",
  interactions: ["Hover a row and remove it with the bin.", "Press Add interest, type a topic, press Enter."],
  props: [
    { name: "interests", type: "FeedEntry[]", default: "5 sample interests", description: "Interests: { id, label }." },
    { name: "following", type: "FeedEntry[]", default: "3 sample channels", description: "Channels: { id, label, initials, background, color }." },
    { name: "maxInterests", type: "number", default: "6", description: "\"Add interest\" disappears at this number." },
    { name: "className", type: "string", description: "Extra classes on the root." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-21", notes: "First release, moved from the Verb site where it was built and approved." }],
  files: [
    {
      path: "registry/firefly/sections/verb-feed-sidebar-v1/verb-feed-sidebar-v1.tsx",
      target: "components/app/verb-feed-sidebar-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  usedOn: [],
  order: 40,
  previewAlign: "center",
  previewDevice: 834,
};
