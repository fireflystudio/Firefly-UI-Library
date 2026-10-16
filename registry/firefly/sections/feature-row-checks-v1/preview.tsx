import { FeatureRowChecks } from "./feature-row-checks-v1";

const ITEMS = [
  { title: "Clear ownership", body: "Every item has one owner and a due date, visible to the whole team." },
  { title: "Full history", body: "Each change is recorded with who made it and when, so nothing gets lost." },
  { title: "Works where you work", body: "Updates arrive in the tools you already have open, not in another inbox." },
];

export default function Preview() {
  return <FeatureRowChecks headline="Every detail covered," headlineMuted="nothing left to chance." items={ITEMS} />;
}
