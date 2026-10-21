import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "verb-audio-queue-v1",
  name: "Audio Queue",
  version: 1,
  category: "app-elements",
  area: "app",
  brand: "verb",
  description:
    "Verb Reader's audio queue with the player under it: five summaries, hover and click to load a row, a progress bar that runs, pause, skip and speed. Sized by its own width, so it works on a marketing page and inside the app.",
  interactions: ["Click a row to load it into the player.", "Pause, skip to the next summary, change the speed (1× / 1.5× / 2×)."],
  props: [
    { name: "items", type: "AudioQueueItem[]", default: "Sample content", description: "The summaries: { title, source, minutes, src?, mark? }. src is a source logo or portrait; without it mark (one letter) is shown." },
    { name: "startIndex", type: "number", default: "3", description: "Row that starts in the player." },
    { name: "className", type: "string", description: "Extra classes on the root." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-21", notes: "First release, moved from the Verb site where it was built and approved." }],
  files: [
    {
      path: "registry/firefly/sections/verb-audio-queue-v1/verb-audio-queue-v1.tsx",
      target: "components/app/verb-audio-queue-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  usedOn: [],
  order: 10,
  previewAlign: "center",
  previewDevice: 834,
};
