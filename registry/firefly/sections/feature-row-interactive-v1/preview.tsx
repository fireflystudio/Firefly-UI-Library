import { FeatureRowInteractive } from "./feature-row-interactive-v1";

const ITEMS = [
  {
    title: "Connect your sources",
    body: "Link the tools your team already uses. Everything syncs in the background, so nothing has to be exported or typed in again.",
  },
  {
    title: "Set the rules",
    body: "Decide what counts as important and who should hear about it. Rules are plain sentences, not formulas, and you can change them at any time.",
  },
  {
    title: "Review what matters",
    body: "Each morning you get a short list of what changed and why. Open an item for the full context, or dismiss it and move on.",
  },
];

export default function Preview() {
  return <FeatureRowInteractive headline="Three steps from raw input" headlineMuted="to decisions you can act on." items={ITEMS} />;
}
