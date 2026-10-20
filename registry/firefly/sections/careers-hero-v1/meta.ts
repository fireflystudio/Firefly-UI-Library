import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "careers-hero-v1",
  name: "Careers Hero",
  version: 1,
  category: "careers",
  description:
    "Opener of a careers page: centred stacked two-tone h1 and a wide clipped frame for a team photo. The headline reveals first, the visual 300ms later.",
  interactions: ["Scroll into view: the headline, then the photo frame, rise in."],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured line of the h1." },
    { name: "headlineMuted", type: "string", description: "Grey second line." },
    { name: "visual", type: "ReactNode", default: "<Placeholder label=\"Team photo\" />", description: "Team photo; pass your <Image fill sizes=…>." },
    { name: "visualRatio", type: "string", default: '"1200 / 520"', description: "Aspect ratio of the frame from 768px up." },
    { name: "visualRatioMobile", type: "string", default: '"4 / 3"', description: "Aspect ratio below 768px." },
    { name: "id", type: "string", default: '"careers-hero"', description: "Section id; the heading id is `${id}-heading`." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-20", notes: "First release (distilled from the Verb careers page)." }],
  files: [{ path: "registry/firefly/sections/careers-hero-v1/careers-hero-v1.tsx", target: "components/sections/careers-hero-v1.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  order: 10,
};
