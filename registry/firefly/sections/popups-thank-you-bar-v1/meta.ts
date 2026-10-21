import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "popups-thank-you-bar-v1",
  name: "Thank-you Bar",
  version: 1,
  category: "popups",
  description:
    "Thank-you V2: a white pill that slides down from the top edge of the page, over the navigation — check mark, bold title, grey body and a × button. Hides itself after 6 s (pauses while hovered or focused), announces itself as a status message, instant under reduced motion. Pair it with the Sign-up Popup: close the popup on Join and show the bar.",
  interactions: ["Hover the bar: it stays until you leave.", "Press × or wait: it slides back up. Press Show again to replay."],
  props: [
    { name: "open", type: "boolean", description: "Controlled visibility." },
    { name: "onClose", type: "() => void", description: "Called by the × and by the auto-hide timer." },
    { name: "title", type: "string", description: 'Bold first part, e.g. "You\'re in."' },
    { name: "body", type: "string", description: "Grey second part (optional)." },
    { name: "autoHideMs", type: "number", default: "6000", description: "Auto-hide delay; 0 keeps the bar until dismissed." },
    { name: "dismissLabel", type: "string", default: '"Dismiss"', description: "Accessible name of the × button." },
    { name: "icon", type: "ReactNode", default: "Base check mark", description: "Icon in the circle." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-20", notes: "First release (Solve waitlist flow, thank-you version 2 — the chosen one)." }],
  files: [{ path: "registry/firefly/sections/popups-thank-you-bar-v1/popups-thank-you-bar-v1.tsx", target: "components/sections/popups-thank-you-bar-v1.tsx", type: "registry:component" }],
  dependencies: ["motion"],
  registryDependencies: ["firefly-base"],
  order: 30,
  previewDevice: 834,
  usedOn: ["startupmap", "solve", "verb"],
};
