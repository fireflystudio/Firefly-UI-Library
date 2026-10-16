import { StatsGrid } from "./stats-grid-v1";

const STATS = [
  { value: "2.4×", label: "faster reviews" },
  { value: "98%", label: "of teams renew" },
  { value: "12 min", label: "to first result" },
  { value: "40 h", label: "saved each month" },
];

export default function Preview() {
  return (
    <StatsGrid
      headline="Less time in review,"
      headlineMuted="more time building."
      quote={{
        text: "We stopped arguing about the data and started shipping.",
        author: "Sam Rivera",
        role: "Head of Product, mid-size SaaS",
      }}
      stats={STATS}
    />
  );
}
