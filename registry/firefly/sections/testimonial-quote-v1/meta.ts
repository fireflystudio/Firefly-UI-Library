import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "testimonial-quote-v1",
  name: "Testimonial Quote",
  version: 1,
  category: "testimonials",
  description:
    "One large centred quote with a 48px avatar, name and role, on a dark or light background. Optional mono eyebrow and company mark; eyebrow, quote and attribution fade in one after another.",
  interactions: ["Scroll into view: eyebrow, quote and attribution rise in with a 90ms stagger."],
  props: [
    { name: "quote", type: "string", description: "The quote, without quotation marks." },
    { name: "name", type: "string", description: "Who said it (15px medium)." },
    { name: "role", type: "string", description: "Role / company line under the name (14px muted)." },
    { name: "tone", type: '"dark" | "light"', default: '"dark"', description: "Dark section or the light page background." },
    { name: "eyebrow", type: "string", description: "Small mono label above the quote; becomes the section heading when present." },
    { name: "quoteMarks", type: "boolean", default: "true", description: "Wrap the quote in typographic “ ”." },
    { name: "avatar", type: "ReactNode", default: "neutral 48px circle", description: "Avatar slot; pass a round <Image>." },
    { name: "logo", type: "ReactNode", default: "none", description: "Small company mark next to the attribution." },
    { name: "id", type: "string", default: '"testimonial"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: dark/light tone, avatar and logo slots, staggered reveal." }, { version: "1.1", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Quote at the sub-headline size 28/24/22, line height 1.3 (was 36/28/24)." }],
  usedOn: ["startupmap"],
  files: [
    {
      path: "registry/firefly/sections/testimonial-quote-v1/testimonial-quote-v1.tsx",
      target: "components/sections/testimonial-quote-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 10,
};
