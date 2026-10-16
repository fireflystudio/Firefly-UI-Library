import { LensesList } from "./lenses-list-v1";

const ITEMS = [
  {
    name: "Clarity",
    description: "Plain language everywhere, from the first screen to the last setting. If a label needs a tooltip, we rewrite the label.",
  },
  {
    name: "Speed",
    description: "Pages open instantly and changes save as you type. Waiting is treated as a bug and tracked like any other.",
  },
  {
    name: "Coverage",
    description: "Every source you rely on is supported, and new ones are added within weeks of being requested.",
  },
  {
    name: "Accuracy",
    description: "Figures are checked against the original before they are shown, and every number links back to where it came from.",
  },
  {
    name: "Trust",
    description: "Your data stays yours. Access is logged, exports take one click and deleting something is permanent.",
  },
];

export default function Preview() {
  return <LensesList headline="Five qualities" headlineMuted="behind every release." items={ITEMS} />;
}
