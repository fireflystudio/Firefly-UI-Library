import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "popups-thank-you-v1",
  name: "Thank-you Popup",
  version: 1,
  category: "popups",
  description:
    "Thank-you V1: the confirmation as a modal popup — a check mark in a soft circle, a short title, one line of body and a full-width Close button. Exports the panel on its own too, so the Sign-up Popup can crossfade to it in place. Focus lands on the title, so screen readers hear the confirmation.",
  interactions: ["Close, the ×, Escape or a click on the overlay closes it.", "Press Show again to replay the rise-in."],
  props: [
    { name: "open", type: "boolean", description: "Controlled visibility (ThankYouPopup)." },
    { name: "onClose", type: "() => void", description: "Close button, ×, Escape and overlay click." },
    { name: "title", type: "string", description: 'Confirmation title, e.g. "You\'re in."' },
    { name: "body", type: "string", description: "One line under the title (optional)." },
    { name: "closeLabel", type: "string", default: '"Close"', description: "Button label (also the × accessible name)." },
    { name: "icon", type: "ReactNode", default: "Base check mark", description: "Icon in the circle." },
    { name: "<ThankYouPanel>", type: "component", description: "The same content without the popup shell: pass it as `success` to the Sign-up Popup." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-20", notes: "First release (Solve waitlist flow, thank-you version 1)." }],
  files: [{ path: "registry/firefly/sections/popups-thank-you-v1/popups-thank-you-v1.tsx", target: "components/sections/popups-thank-you-v1.tsx", type: "registry:component" }],
  dependencies: ["motion"],
  registryDependencies: ["firefly-base"],
  order: 20,
  previewDevice: 834,
  previewAlign: "center",
};
