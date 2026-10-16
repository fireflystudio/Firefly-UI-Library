import { FaqCentered } from "./faq-centered-v1";

const ITEMS = [
  {
    question: "Do I need a credit card to start?",
    answer: "No. Start on the free plan with your work email and add billing details only when you decide to upgrade.",
  },
  {
    question: "Can I invite my whole team?",
    answer: "Yes. Invite as many people as you like. Permissions are set per workspace, so everyone sees only what they should.",
  },
  {
    question: "Does it work with the tools we already use?",
    answer: "It connects to the common calendar, chat and file tools out of the box, and there is an API for anything else.",
  },
  {
    question: "What happens to my data if I leave?",
    answer: "You can export everything in standard formats at any time. Thirty days after you close the account, it is deleted for good.",
  },
  {
    question: "Is there a discount for non-profits or schools?",
    answer: "Yes. Registered non-profits and schools get a reduced rate. Write to us with your details and we will set it up.",
  },
];

export default function Preview() {
  return <FaqCentered headline="Common questions," headlineMuted="straight answers." items={ITEMS} />;
}
