import { BeforeAfterCompare } from "./before-after-compare-v1";

const BEFORE = {
  title: "Work scattered across tools",
  points: [
    "Status lives in five places and matches in none",
    "Reviews wait for whoever happens to be online",
    "Context is retyped for every handoff",
    "Nobody can say what changed last week",
  ],
};

const AFTER = {
  title: "One place, always current",
  points: [
    "One view of status everyone can trust",
    "Reviews move on the same day",
    "Context travels with the work",
    "Every change has a record and a reason",
  ],
};

export default function Preview() {
  return (
    <BeforeAfterCompare
      headline="Three tools and a shared spreadsheet."
      headlineMuted="Or one place everyone trusts."
      intro="The same team, the same week. Only the way work moves through it changes."
      before={BEFORE}
      after={AFTER}
    />
  );
}
