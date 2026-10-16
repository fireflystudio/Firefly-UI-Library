import Image from "next/image";
import { LensesList } from "./lenses-list-v1";

const IMG = "/images/examples/lenses-list-v1";
const SIZES = "(min-width: 1280px) 300px, (min-width: 768px) 240px, 280px";

const LENSES = [
  {
    name: "Team.",
    description: "Founder-market fit, prior exits, who has built together before and the gaps the first hires need to close.",
    image: "team-scene.png",
  },
  {
    name: "Market.",
    description: "Serviceable market, growth and timing, built bottom-up from real customers rather than copied from a report.",
    image: "market-investor.png",
  },
  {
    name: "Moat.",
    description: "Feature parity, switching costs, data advantage and distribution, scored against the three nearest incumbents.",
    image: "moat-scene.png",
  },
  {
    name: "Retention.",
    description: "Cohort curves, net revenue retention and churn reasons, checked against the deck's own claims.",
    image: "retention-scene.png",
  },
  {
    name: "Terms.",
    description: "Valuation, round size and instrument, benchmarked against comparable rounds closed this year.",
    image: "terms-scene.png",
  },
  {
    name: "Cap table.",
    description: "Founder ownership, option pool, earlier investors and preferences, flagged where they could block the next round.",
    image: "cap-table-scene.png",
  },
];

/** Final example: the Startupmap /investors "What a run checks" section (six lenses and their scenes from the live site). */
export default function Example() {
  return (
    <LensesList
      headline="Every deal is checked"
      headlineMuted="against the same six lenses."
      defaultActive={0}
      items={LENSES.map((lens) => ({
        name: lens.name,
        description: lens.description,
        visual: <Image src={`${IMG}/${lens.image}`} alt="" fill sizes={SIZES} className="object-cover" />,
      }))}
    />
  );
}
