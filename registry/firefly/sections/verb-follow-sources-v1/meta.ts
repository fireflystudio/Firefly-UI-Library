import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "verb-follow-sources-v1",
  name: "Follow Sources",
  version: 1,
  category: "app-elements",
  area: "app",
  brand: "verb",
  description:
    "The Verb Reader \"Subscribe\" step: a row of well-known channels with a Follow button each. The step subscribes you to content sources, not to a Verb account — in the app this is the Explore page.",
  interactions: ["Follow toggles to Following and back; the button keeps its size, so the row never jumps."],
  props: [
    { name: "title", type: "string | null", default: "Follow the best sources", description: "Small title above the row; null for the row on its own." },
    { name: "sources", type: "{ name; meta?; image?; contain?; background?; letter?; color? }[]", default: "Huberman Lab, TED, The Verge", description: "Three or four sources. A logo usually wants `contain` plus the brand's own `background`; a mark whose letters are knocked out of white goes blank at this size." },
    { name: "followLabel", type: "string", default: "Follow", description: "" },
    { name: "followingLabel", type: "string", default: "Following", description: "" },
    { name: "defaultFollowing", type: "string[]", default: "[]", description: "Names that start out followed." },
    { name: "onChange", type: "(following: string[]) => void", description: "Called with every name currently followed." },
    { name: "className", type: "string", description: "Extra classes on the root." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-27", notes: "First release. Built for the Verb home page, where the Subscribe step used to show a Create-your-account card by mistake." }],
  files: [
    {
      path: "registry/firefly/sections/verb-follow-sources-v1/verb-follow-sources-v1.tsx",
      target: "components/app/verb-follow-sources-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  usedOn: ["verb"],
  order: 21,
  previewAlign: "center",
  previewDevice: 834,
};
