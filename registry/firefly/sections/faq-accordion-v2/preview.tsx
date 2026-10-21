import { FaqAccordion } from "./faq-accordion-v2";

const ITEMS = [
  { question: "How long does setup take?", answer: "Most teams are running in under a day. Connect your tools, invite the team and the first results arrive the same afternoon." },
  { question: "Can I try it before buying?", answer: "Yes. Every plan starts with a free trial and you can cancel at any time without talking to anyone." },
  { question: "Where is our data stored?", answer: "In the region you choose. Nothing is shared with third parties and you can export or delete it whenever you like." },
  { question: "Do you offer support?", answer: "Every plan includes email support with a reply within one working day; larger plans add a named contact." },
];

export default function Preview() {
  return <FaqAccordion headline="Questions people ask," headlineMuted="answered." items={ITEMS} />;
}
