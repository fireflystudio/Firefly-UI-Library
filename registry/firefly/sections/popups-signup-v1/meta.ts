import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "popups-signup-v1",
  name: "Sign-up Popup",
  version: 1,
  category: "popups",
  description:
    "Modal popup with one labelled email field and a primary button, for waitlists and demo requests. Validates inline in a reserved slot, then either crossfades to a thank-you view inside the popup (V1) or closes and hands over to the site (V2, e.g. the Thank-you Bar). Built on the Base Popup: native dialog, focus trap, Escape, overlay click, focus restore, rise-in animation.",
  interactions: [
    "Press Join with the field empty or with a bad address: the error appears under the field without moving anything.",
    "Enter an address and press Join: the thank-you view fades in (this preview passes the Thank-you Panel).",
    "Escape, the × or a click on the overlay closes it; focus returns to the button that opened it.",
  ],
  props: [
    { name: "open", type: "boolean", description: "Controlled visibility." },
    { name: "onClose", type: "() => void", description: "Called on Escape, overlay click, the × and after a V2 submit." },
    { name: "onSubmit", type: "(email: string) => void | Promise<void>", description: "Receives the validated email. Return a promise to show the pending label; throw to show failedMessage." },
    { name: "title", type: "string", description: "Popup heading." },
    { name: "body", type: "string", description: "One short sentence under the heading (optional)." },
    { name: "emailLabel / placeholder", type: "string", default: '"Email address" / "name@example.com"', description: "Field label and placeholder." },
    { name: "submitLabel / pendingLabel", type: "string", default: '"Join" / "Joining…"', description: "Button labels." },
    { name: "invalidMessage / failedMessage", type: "string", default: '"Enter a valid email address." / "Something went wrong. Please try again."', description: "Inline error texts." },
    { name: "note", type: "string", description: "Small reassurance line under the button (optional)." },
    { name: "success", type: "ReactNode", description: "Thank-you view shown inside the popup after submit (V1), e.g. <ThankYouPanel/>. Omit to close instead (V2)." },
    { name: "closeLabel", type: "string", default: '"Close"', description: "Accessible name of the × button." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-20", notes: "First release, distilled from the Solve waitlist flow (ElevenLabs-style popup)." }],
  files: [{ path: "registry/firefly/sections/popups-signup-v1/popups-signup-v1.tsx", target: "components/sections/popups-signup-v1.tsx", type: "registry:component" }],
  dependencies: ["motion"],
  registryDependencies: ["firefly-base"],
  order: 10,
  previewDevice: 834,
  previewAlign: "center",
  usedOn: ["startupmap", "solve", "verb"],
};
