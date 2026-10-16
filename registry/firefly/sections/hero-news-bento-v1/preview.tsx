import { HeroNewsBento } from "./hero-news-bento-v1";

const LEAD = {
  kicker: "Product",
  title: "Why the best teams ship smaller releases, more often",
  dek: "A look at release cadence across forty teams, and what the fastest ones do differently. Four-minute read.",
  href: "#lead",
};

const ITEMS = [
  { kicker: "Design", title: "Design systems grow up: tokens, themes and fewer one-offs", href: "#story-1" },
  { kicker: "Engineering", title: "What a year of incident reports taught one platform team", href: "#story-2" },
  { kicker: "Research", title: "Nobody reads onboarding. Here is what people do instead", href: "#story-3" },
  { kicker: "Culture", title: "The quiet return of the written weekly update", href: "#story-4" },
];

export default function Preview() {
  return (
    <HeroNewsBento
      eyebrow="Daily briefing"
      headline="What changed this week."
      headlineMuted="Read in five minutes."
      intro="Short, sourced summaries of the stories that matter to people who build software. New every weekday morning."
      lead={LEAD}
      items={ITEMS}
    />
  );
}
