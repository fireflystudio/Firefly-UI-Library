import { FaqSplit } from "./faq-split-v1";

/** Final example: the Startupmap homepage FAQ (copy from the live site, including the "withing" typo). */
const ITEMS = [
  {
    question: "Is this built for solo angels, or for funds?",
    answer:
      "Both. Solo angels use it to run diligence they couldn't afford before. Small funds use it to screen far more dealflow without adding analysts.",
  },
  {
    question: "Who is behind the analysis?",
    answer:
      "Startupmap reads the deck, the data room and the public record, then cross-checks every claim against the map of the market. Each finding in the memo links back to its source, so you can verify it yourself.",
  },
  {
    question: "What do I get?",
    answer:
      "A one-page memo for every deal: a verdict, the six lenses scored, the risks ranked and the questions to ask on the first call. Each deal also lands in your pipeline with its notes and next step.",
  },
  {
    question: "How does the diligence work?",
    answer:
      "Drop in a deck or a data room link. Startupmap checks it against six lenses (team, market, moat, retention, terms and cap table), cross-checks the numbers against what the map already knows and sends the memo back in minutes.",
  },
  {
    question: "Is my deal and portfolio data private?",
    answer:
      "Yes. Your decks, notes and memos are visible only to you and the people you invite. They are never shared with other users or used to score anyone else's deals.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Pricing depends on how many deals you review and how many seats you need. Book a demo and we'll walk you through the plans that fit your fund.",
  },
];

export default function Example() {
  return (
    <FaqSplit
      headline="Anything else, ask us directly."
      headlineMuted="We reply withing a day."
      cta={{ label: "Talk to us", href: "#cta" }}
      items={ITEMS}
    />
  );
}
