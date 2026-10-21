import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "verb-mini-player-v1",
  name: "Mini Player",
  version: 1,
  category: "app-elements",
  area: "app",
  brand: "verb",
  description:
    "The floating Verb Reader mini player (Figma player v3, mobile 358 × 58): source mark, title and source, play / pause and next, a 4px progress line. Part of the Mobile Player flow and shipped in the same file.",
  interactions: ["Pause and play; the progress line runs while playing."],
  props: [
    { name: "item", type: "PlayerItem", description: "{ title, source, sourceSrc, … } of the summary in the player." },
    { name: "playing", type: "boolean", description: "Pause icon when true, play icon when false." },
    { name: "progress", type: "number", description: "0–1." },
    { name: "onOpen", type: "() => void", description: "Tap on the card body (opens the full player in the flow)." },
    { name: "onToggle / onNext", type: "() => void", description: "Play / pause and next." },
    { name: "canNext", type: "boolean", description: "Next is disabled when false (empty queue)." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-21", notes: "First release, from the Mobile Player flow." }],
  files: [
    {
      path: "registry/firefly/sections/verb-mobile-player-v1/verb-mobile-player-v1.tsx",
      target: "components/app/verb-mobile-player-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 15,
  previewDevice: 834,
  previewAlign: "center",
};
