import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "faq-split-v2",
  name: "FAQ Split",
  version: 2,
  category: "faq",
  description:
    "Two-tone headline and a ghost button on the left, accordion on the right. One question open at a time, all closed by default, with a rotating +/– glyph.",
  interactions: ["Click a question: the previous one closes.", "Click the open question to close it.", "Tab to a question and press Enter."],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the heading." },
    { name: "items", type: "{ question: string; answer: string }[]", description: "Questions and answers, in order." },
    { name: "cta", type: "{ label; href } | null", default: "Talk to us → #cta", description: "Ghost pill under the headline. null hides it." },
    { name: "defaultOpen", type: "number | null", default: "null", description: "Index of the question open on load; null starts closed." },
    { name: "id", type: "string", default: '"faq"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "2.1", date: "2026-10-26", notes: "Width follows max-w-content (the site token --container-content, default 1200px), so a site can switch to a wider layout in one place. No visual change at the default." }, { version: "2.0", date: "2026-10-21", notes: "Boxed FAQ Split: each question in a soft stroked rounded box that expands with the answer (same look as FAQ Centered v2). v1 (hairline rows) stays." }],
  usedOn: ["trendmd"],
  files: [
    {
      path: "registry/firefly/sections/faq-split-v2/faq-split-v2.tsx",
      target: "components/sections/faq-split-v2.tsx",
      type: "registry:component",
    },
  ],
  dependencies: ["motion"],
  registryDependencies: ["firefly-base"],
  order: 11,
};
