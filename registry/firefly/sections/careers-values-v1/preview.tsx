import { CareersValues } from "./careers-values-v1";

export default function Preview() {
  return (
    <CareersValues
      headline="How do we work?"
      items={[
        { title: "Everyone controls their own schedule", body: "We organise the work around uninterrupted time. A few calls a week are fixed; outside of those, you decide when you work." },
        { title: "We are a flat team", body: "Anyone can talk to anyone, including the founders. Decisions go to the people closest to the work." },
        { title: "We ship, measure and fix", body: "Things go wrong. We catch problems early, fix them in the open and apply what we learned." },
        { title: "We hire people who finish", body: "Remote work depends on self-direction. We hire people who can own an outcome and follow through." },
        { title: "We write things down", body: "A written note beats a meeting. When we do meet, there is a reason for it and a clear outcome expected." },
        { title: "We rest properly", body: "Burnout costs more than it saves. We work hard, and we make sure people actually switch off." },
      ]}
    />
  );
}
