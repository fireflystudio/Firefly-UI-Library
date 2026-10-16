import { StatsRows } from "./stats-rows-v1";

/**
 * Final example: the Startupmap Founders "Outreach" stats (copy from the live site).
 * Source rows are value + caption only, so each caption is the row title and there is no description.
 */
const ITEMS = [
  { value: "38", title: "investors matched to your stage and sector" },
  { value: "12", title: "warm paths found in your own network" },
  { value: "3", title: "meetings booked in the first week" },
];

export default function Example() {
  return <StatsRows headline="Reach the right investors first." headlineMuted="With intro from your network" items={ITEMS} cta={null} />;
}
