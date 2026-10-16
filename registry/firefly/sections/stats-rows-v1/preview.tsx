import { StatsRows } from "./stats-rows-v1";

const ITEMS = [
  {
    value: "01",
    title: "Connect your tools",
    description: "Link the accounts your team already uses. Nothing to migrate, nothing to re-enter.",
  },
  {
    value: "02",
    title: "Set the rules once",
    description: "Decide what counts as done, who signs off and when to escalate. The rules apply everywhere from then on.",
  },
  {
    value: "03",
    title: "Review in minutes",
    description: "Every change arrives summarised, with the context attached. Approve, comment or send it back.",
  },
  {
    value: "04",
    title: "Ship with confidence",
    description: "A clear record of what changed, who agreed and why, ready whenever someone asks.",
  },
];

export default function Preview() {
  return (
    <StatsRows
      eyebrow="How it works"
      headline="Four steps from sign-up to first result."
      headlineMuted="No setup project required."
      intro="Most teams finish setup in a single session. Here is what happens along the way."
      items={ITEMS}
    />
  );
}
