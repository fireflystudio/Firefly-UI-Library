import { FaqSplit } from "./faq-split-v1";

const ITEMS = [
  {
    question: "How long does the setup take?",
    answer: "Most teams are up and running in an afternoon. Connect your account, import what you already have and invite the people who need access.",
  },
  {
    question: "Can I change my plan later?",
    answer: "Yes. Upgrade or downgrade at any time from the billing page; changes apply from the next billing cycle and nothing is lost in between.",
  },
  {
    question: "Is my data private?",
    answer: "Your data is visible only to you and the people you invite. It is never shared with other customers or used to train anything.",
  },
  {
    question: "What does it cost?",
    answer: "Pricing depends on the size of your team and how much you use. Book a short call and we will walk you through the plans that fit.",
  },
  {
    question: "Do you offer support?",
    answer: "Every plan includes email support with a reply within one business day. Larger plans add a shared channel with the team.",
  },
];

export default function Preview() {
  return <FaqSplit headline="Anything else, ask us directly." headlineMuted="We reply within a day." items={ITEMS} />;
}
