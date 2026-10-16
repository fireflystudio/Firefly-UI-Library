import Image from "next/image";
import { StepsCards } from "./steps-cards-v1";

/** Final example: the Startupmap Founders "Find the best-fit investor" timeline (copy and icons from the live site). */
const DIR = "/images/examples/steps-cards-v1";

function Icon({ name }: { name: string }) {
  return <Image src={`${DIR}/icon-${name}.svg`} alt="" width={72} height={72} className="block size-[72px]" />;
}

const STEPS = [
  { icon: <Icon name="profile" />, title: "Create Profile", body: "Company, traction, round, team. Once." },
  { icon: <Icon name="deck" />, title: "Create Deck", body: "Investor-ready, built from the profile." },
  { icon: <Icon name="list" />, title: "Find Investor", body: "Funds that back your stage and sector." },
  { icon: <Icon name="outreach" />, title: "Outreach", body: "Warm intros first, cold where needed." },
  { icon: <Icon name="term" />, title: "Get term sheet", body: "With every version of your story in sync." },
];

export default function Example() {
  return (
    <StepsCards
      headline="Find the best-fit investor"
      headlineMuted="in six weeks."
      intro="Most founders rebuild the same facts four times: deck, data room, investor list, emails. Startupmap builds them once."
      steps={STEPS}
    />
  );
}
