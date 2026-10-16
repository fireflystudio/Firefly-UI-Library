import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "feature-row-checks-v1",
  name: "Feature Row Checks",
  version: 1,
  category: "features",
  description:
    "Compact two-tone headline and a static list of ✓ + title + body items on one side, one 720×560 visual on the other. Every item is open; nothing collapses.",
  interactions: ["Scroll: the visual drifts 30px.", "Switch devices: the list tightens to 32px spacing on tablet."],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the heading." },
    { name: "items", type: "{ title: string; body?: string }[]", description: "Check items in order. The body is optional." },
    { name: "visual", type: "ReactNode", default: "Placeholder", description: "Fills the 720×560 frame; pass an <Image fill> or your own mockup." },
    { name: "reverse", type: "boolean", default: "false", description: "Visual on the left on tablet and desktop." },
    { name: "id", type: "string", default: '"feature-checks"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: static check list, shared parallax visual." }],
  files: [
    {
      path: "registry/firefly/sections/feature-row-checks-v1/feature-row-checks-v1.tsx",
      target: "components/sections/feature-row-checks-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 20,
};
