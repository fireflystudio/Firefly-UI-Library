import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "careers-values-v1",
  name: "Careers Values",
  version: 1,
  category: "careers",
  description: "“How we work”: a section headline and a two-column grid of short principles (title + one or two sentences). Single column on phones.",
  interactions: ["Scroll into view: the headline, then each principle, rise in (70ms apart)."],
  props: [
    { name: "headline", type: "string", description: "Section headline." },
    { name: "headlineMuted", type: "string", description: "Optional grey second half." },
    { name: "items", type: "{ title: string; body: string }[]", description: "4–8 principles." },
    { name: "id", type: "string", default: '"how-we-work"', description: "Section id." },
  ],
  changelog: [{ version: "1.1", date: "2026-10-20", notes: "Half section padding (32/48/60px) and headline→grid 40/48/56." }, { version: "1.0", date: "2026-10-20", notes: "First release (distilled from the Verb careers page)." }],
  files: [{ path: "registry/firefly/sections/careers-values-v1/careers-values-v1.tsx", target: "components/sections/careers-values-v1.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  order: 30,
};
