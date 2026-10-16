import Image from "next/image";
import { FeatureRowChecks } from "./feature-row-checks-v1";

/** Final example: the Startupmap /investors "Scrutinize every single deck" row (copy and product screen from the live site). */
export default function Example() {
  return (
    <FeatureRowChecks
      headline="Scrutinize every single deck"
      headlineMuted="for tiny details that matter"
      items={[
        { title: "Team and track record", body: "Prior exits, co-founder history, who has backed them before." },
        { title: "Market and moat", body: "Serviceable market, incumbents, and whether the edge survives contact." },
        { title: "Numbers that do not add up", body: "Churn, margin and burn cross-checked against the deck’s own claims." },
      ]}
      visual={
        <Image
          src="/images/examples/feature-row-checks-v1/review-queue.png"
          alt="Review queue with 3 decks: Arcwell (Healthcare, Seed) marked Review next, Meridian Pay (Fintech, Seed) with open questions, and Fieldwork (Climate, Pre-seed) to review. Arcwell first look: clinic workflow software with early customer pilots; follow up because paid usage is not broken out in the deck."
          fill
          sizes="(min-width: 1280px) 720px, (min-width: 768px) 55vw, 100vw"
          className="object-cover"
        />
      }
    />
  );
}
