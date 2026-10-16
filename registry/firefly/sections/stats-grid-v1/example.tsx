import { StatsGrid } from "./stats-grid-v1";

/**
 * Final example: the Startupmap Investors "Results in numbers" section (copy verbatim from the live site,
 * typos included). The original has no visible heading, only the quote.
 */
const STATS = [
  { value: "1000x", label: "More startups analysed than by hand" },
  { value: "95%", label: "Less time spend per every deal" },
  { value: "12min", label: "From deck to first investment verdict" },
  { value: "4 -15", label: "The team size it feels like" },
];

export default function Example() {
  return (
    <StatsGrid
      tone="dark"
      quote={{
        text: "I review more startups in less time, with the clarity and confidence of having a full investment team behind me.",
        author: "Alexander Reed",
        role: "Partner, Alderwick Ventures",
      }}
      stats={STATS}
    />
  );
}
