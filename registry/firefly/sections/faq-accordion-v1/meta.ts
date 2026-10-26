import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "faq-accordion-v1",
  name: "FAQ Accordion",
  version: 1,
  category: "faq",
  description:
    "Centred two-tone headline over a 900px list of questions with soft hairlines and a turning chevron. One answer open at a time; the shared FAQ for Solve and Verb.",
  interactions: ["Click a question: it opens and the open one closes.", "Hover a question: it nudges 5px right."],
  props: [
    { name: "headline", type: "string", description: "First part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the heading (same line)." },
    { name: "items", type: "{ question: string; answer: string }[]", description: "Questions in order." },
    { name: "defaultOpen", type: "number | null", default: "null", description: "Open on load; null = all closed." },
    { name: "id", type: "string", default: '"faq"', description: "Section id for anchor links." },
    { name: "className", type: "string", default: '"py-16 md:py-24 xl:py-[120px]"', description: "Section paddings (override at a colour change)." },
  ],
  changelog: [{ version: "1.1", date: "2026-10-26", notes: "Width follows max-w-content (the site token --container-content, default 1200px), so a site can switch to a wider layout in one place. No visual change at the default." }, { version: "1.0", date: "2026-10-21", notes: "First release: the Solve Platform FAQ made shared (soft hairlines, chevron), now used on Solve and Verb." }],
  files: [{ path: "registry/firefly/sections/faq-accordion-v1/faq-accordion-v1.tsx", target: "components/sections/faq-accordion-v1.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  usedOn: ["solve"],
  order: 5,
};
