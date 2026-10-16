import { FaqCentered } from "./faq-centered-v1";

/** Final example: the Startupmap /founders FAQ (copy from the live site). */
const ITEMS = [
  {
    question: "Who is Startupmap for?",
    answer:
      "Founders who are raising or about to raise and want to find the right investors and reach them well.",
  },
  {
    question: "What do I get with a profile?",
    answer:
      "One place for your company, traction, round and team. Startupmap turns it into an investor-ready deck, a matched investor list and outreach drafts, and keeps them in sync.",
  },
  {
    question: "How does it help me find investors?",
    answer:
      "It matches you with funds that back your stage and sector, checks each one for conflicts with your competitors and shows which of your contacts can introduce you.",
  },
  {
    question: "Will my company data be private?",
    answer:
      "Yes. Your company data is visible only to you and the investors you choose to share it with.",
  },
  {
    question: "How much does it cost?",
    answer:
      "It depends on where you are in your raise. Join the waitlist or book a demo and we will walk you through the options.",
  },
  {
    question: "Can I use it before I am ready to raise?",
    answer:
      "Yes. Build your profile early, see which investors fit and warm up your network, so you are ready to move when the round opens.",
  },
];

export default function Example() {
  return (
    <FaqCentered
      headline="Frequently asked,"
      headlineMuted="answered directly."
      items={ITEMS}
      footerText="Anything else, ask us directly. We reply within a day."
      cta={{ label: "Talk to us", href: "#cta" }}
    />
  );
}
