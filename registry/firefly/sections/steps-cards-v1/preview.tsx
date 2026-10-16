import { StepsCards } from "./steps-cards-v1";

const STEPS = [
  { title: "Set up your space", body: "Name it, pick a plan and you are in. Nothing to install." },
  { title: "Invite the team", body: "Everyone sees the same thing from day one, with the right access." },
  { title: "Connect your tools", body: "Link the accounts you already use. Nothing to migrate." },
  { title: "Review together", body: "Comments, approvals and history in one place, not in email." },
  { title: "Launch with confidence", body: "Ship with a clear record of what changed and why." },
];

export default function Preview() {
  return (
    <StepsCards
      headline="A clear path"
      headlineMuted="from idea to launch."
      intro="Most teams redo the same work several times along the way. This path is set up once and keeps every step in sync."
      steps={STEPS}
    />
  );
}
