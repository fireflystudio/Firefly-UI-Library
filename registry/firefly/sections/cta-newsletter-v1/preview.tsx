import { CtaNewsletter } from "./cta-newsletter-v1";

export default function Preview() {
  return (
    <CtaNewsletter
      headline="Get the weekly update."
      headlineMuted="Five minutes, every Friday."
      body="Release notes, a few things we learned and the occasional opinion. No filler."
      privacyNote="No spam, ever. Unsubscribe with one click."
      benefits={["Free forever", "One email a week", "Unsubscribe anytime"]}
    />
  );
}
