import { BentoCards, type BentoItem } from "./bento-cards-v1";

const ITEMS: BentoItem[] = [
  { tone: "photo", title: "How a design team cut review rounds in half", href: "#story-reviews" },
  { tone: "dark", title: "What a good weekly update looks like", body: "Three questions, one page, every Friday.", href: "#insight-updates" },
  { tone: "light", title: "Setting up a shared workspace in an afternoon", body: "A step-by-step plan for teams of five to fifty.", href: "#guide-workspace" },
  { tone: "photo", title: "The support team that answers in under an hour", href: "#story-support" },
];

export default function Preview() {
  return <BentoCards headline="Stories, insights and guides" headlineMuted="from teams who did the work." items={ITEMS} />;
}
