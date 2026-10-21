import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "faq-accordion-v2",
  name: "FAQ Accordion Boxed",
  version: 2,
  category: "faq",
  description:
    "Centred two-tone headline over a 900px list where every question sits in its own rounded stroked box; opening one grows the box and shows the answer inside. One answer open at a time.",
  interactions: ["Click a question: it opens and the open one closes.", "Hover a box: its stroke darkens."],
  props: [
    { name: "headline", type: "string", description: "First part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the heading (same line)." },
    { name: "items", type: "{ question: string; answer: string }[]", description: "Questions in order." },
    { name: "defaultOpen", type: "number | null", default: "0", description: "Open on load; null = all closed." },
    { name: "id", type: "string", default: '"faq"', description: "Section id for anchor links." },
    { name: "className", type: "string", default: '"py-16 md:py-24 xl:py-[120px]"', description: "Section paddings (override at a colour change)." },
  ],
  changelog: [{ version: "2.1", date: "2026-10-21", notes: "Box stroke = the v1 separator colour (surface-muted); border-10 on hover and when open." }, { version: "2.0", date: "2026-10-21", notes: "Boxed variant of FAQ Accordion: stroked rounded box per question, the box expands to show the answer, +/– toggle. Tried on Verb first." }],
  files: [{ path: "registry/firefly/sections/faq-accordion-v2/faq-accordion-v2.tsx", target: "components/sections/faq-accordion-v2.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  usedOn: ["verb"],
  order: 6,
};
