import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "verb-interests-picker-v1",
  name: "Interests Picker",
  version: 1,
  category: "app-elements",
  area: "app",
  brand: "verb",
  description:
    "The Verb Reader sign-up step \"Pick your interests\": toggle chips with a live counter. Chips keep their size when toggled, so the card never jumps.",
  interactions: ["Toggle chips; the counter follows.", "Skip for now and Continue call back (the preview ignores them)."],
  props: [
    { name: "interests", type: "string[]", default: "12 sample topics", description: "All chips, in order." },
    { name: "defaultSelected", type: "string[]", default: "[\"Productivity\",\"AI\",\"Formula 1\"]", description: "Chips selected on first render." },
    { name: "title", type: "string", default: "Pick your interests", description: "Card title." },
    { name: "skipLabel", type: "string", default: "Skip for now", description: "Text link." },
    { name: "continueLabel", type: "string", default: "Continue", description: "Button." },
    { name: "onChange", type: "(selected: string[]) => void", description: "Called on every toggle." },
    { name: "onSkip", type: "() => void", description: "" },
    { name: "onContinue", type: "(selected: string[]) => void", description: "Called with the selection." },
    { name: "className", type: "string", description: "Extra classes on the root." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-21", notes: "First release, moved from the Verb site where it was built and approved." }],
  files: [
    {
      path: "registry/firefly/sections/verb-interests-picker-v1/verb-interests-picker-v1.tsx",
      target: "components/app/verb-interests-picker-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  usedOn: ["verb"],
  order: 20,
  previewAlign: "center",
  previewDevice: 834,
};
