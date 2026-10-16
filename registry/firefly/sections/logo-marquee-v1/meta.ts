import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "logo-marquee-v1",
  name: "Logo Marquee",
  version: 1,
  category: "logos",
  description:
    "A compact strip of logos sliding sideways on a CSS transform loop, with an optional mono eyebrow and soft edge fades. One row, or two rows moving in opposite directions; pauses on hover and stands still under reduced motion.",
  interactions: [
    "Hover the strip: both rows pause.",
    "Set rows to 2: the second row runs the other way.",
    "Reduced motion: the rows stay still, nothing is hidden.",
  ],
  props: [
    { name: "label", type: "string", description: "Centred mono eyebrow above the strip, e.g. “Trusted by teams at”. Omit to hide it." },
    { name: "logos", type: "ReactNode[]", default: "8 placeholder tiles", description: "Logos in order; each becomes one tile. Pass <Image> or inline SVG elements." },
    { name: "speed", type: "number", default: "40", description: "Seconds for one full loop of a row. Lower is faster." },
    { name: "rows", type: "1 | 2", default: "1", description: "One row moving left, or two rows moving in opposite directions." },
    { name: "tone", type: '"light" | "dark"', default: '"light"', description: "“dark” puts the strip on the dark surface and inverts the tile colours." },
    { name: "id", type: "string", default: '"logos"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: CSS marquee, one or two rows, light/dark tone, placeholder tiles." }],
  files: [
    {
      path: "registry/firefly/sections/logo-marquee-v1/logo-marquee-v1.tsx",
      target: "components/sections/logo-marquee-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 10,
  previewAlign: "center",
};
