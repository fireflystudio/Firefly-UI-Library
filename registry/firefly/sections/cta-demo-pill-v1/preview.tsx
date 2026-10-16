import { Placeholder } from "@/components/ui/placeholder";
import { CtaDemoPill } from "./cta-demo-pill-v1";

export default function Preview() {
  return (
    <CtaDemoPill
      tag="Get started"
      headline="Ready when you are."
      headlineMuted="Start in an afternoon."
      body="Set up your workspace, invite the team and see the first results before the day is out. No contracts, no onboarding calls unless you want one."
      note="No credit card · Cancel anytime"
      visual={<Placeholder ratio="16 / 9" label="Product visual" tone="dark" />}
    />
  );
}
