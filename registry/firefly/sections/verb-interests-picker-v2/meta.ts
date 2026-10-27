import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "verb-interests-picker-v2",
  name: "Interests Picker",
  version: 2,
  category: "app-elements",
  area: "app",
  brand: "verb",
  description:
    "The Verb Reader onboarding step as the product actually works: you type the interest in your own words, and under the field sit the lines people in your country are reading right now. v1 (a dozen category chips to toggle) is kept.",
  interactions: [
    "The phrase types itself out once, when the card scrolls into view; the caret blinks when it lands.",
    "The field is real: click into it and type your own interest. The first keystroke stops the demo phrase.",
    "Click a suggestion to tick it; click again to drop it.",
    "Static under prefers-reduced-motion.",
  ],
  props: [
    { name: "title", type: "string", default: "What do you want to keep up with?", description: "Card title." },
    { name: "inputLabel", type: "string", default: "Type in your own words", description: "Label above the field." },
    { name: "query", type: "string", default: "AI tools for designers", description: "The phrase in the field." },
    { name: "suggestionsLabel", type: "string", default: "Suggested for you", description: "Label above the chips." },
    { name: "suggestions", type: "string[]", default: "8 trending lines", description: "Chips under the field; clicking one ticks it." },
    { name: "defaultSelected", type: "string[]", default: "[]", description: "Suggestions ticked on first render." },
    { name: "typing", type: "boolean", default: "true", description: "Type the phrase out on first view. Off = the phrase is simply there." },
    { name: "onChange", type: "(value: string) => void", description: "Called with the phrase in the field." },
    { name: "onSelect", type: "(selected: string[]) => void", description: "Called with every suggestion currently ticked." },
    { name: "className", type: "string", description: "Extra classes on the root." },
  ],
  changelog: [
    {
      version: "2.1",
      date: "2026-10-27",
      notes:
        "The field is a real input — the card writes the demo phrase and the reader can type over it — and a suggestion now ticks instead of being typed into the field. Two chips fewer (eight), which takes a row off a card that was running tall.",
    },
    {
      version: "2.0",
      date: "2026-10-27",
      notes:
        "Rebuilt from the client's onboarding screen: free text first, trending suggestions under it, no fixed categories and no Skip / Continue. The field is drawn, not a real input, so the illustration never takes focus or opens a keyboard.",
    },
  ],
  files: [
    {
      path: "registry/firefly/sections/verb-interests-picker-v2/verb-interests-picker-v2.tsx",
      target: "components/app/verb-interests-picker-v2.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  usedOn: ["verb"],
  order: 20,
  previewAlign: "center",
  previewDevice: 834,
};
