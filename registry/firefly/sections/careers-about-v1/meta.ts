import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "careers-about-v1",
  name: "Careers About",
  version: 1,
  category: "careers",
  description: "“Who we are”: a section headline and a column of short lead-size paragraphs capped at 760px. Paragraphs stagger in after the headline.",
  interactions: ["Scroll into view: the headline, then each paragraph, rise in."],
  props: [
    { name: "headline", type: "string", description: "Section headline." },
    { name: "headlineMuted", type: "string", description: "Optional grey second half (a short clause like “Who we are” stays one colour)." },
    { name: "paragraphs", type: "string[]", description: "One paragraph per entry, 3–6 recommended." },
    { name: "id", type: "string", default: '"about"', description: "Section id." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-20", notes: "First release (distilled from the Verb careers page)." }],
  files: [{ path: "registry/firefly/sections/careers-about-v1/careers-about-v1.tsx", target: "components/sections/careers-about-v1.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  order: 20,
};
