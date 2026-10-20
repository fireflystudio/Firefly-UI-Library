import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "faq-split-v1",
  name: "FAQ Split",
  version: 1,
  category: "faq",
  description:
    "Two-tone headline and a ghost button on the left, accordion on the right. One question open at a time, the first open by default, with a rotating +/– glyph.",
  interactions: ["Click a question: the previous one closes.", "Click the open question to close it.", "Tab to a question and press Enter."],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the heading." },
    { name: "items", type: "{ question: string; answer: string }[]", description: "Questions and answers, in order." },
    { name: "cta", type: "{ label; href } | null", default: "Talk to us → #cta", description: "Ghost pill under the headline. null hides it." },
    { name: "defaultOpen", type: "number | null", default: "0", description: "Index of the question open on load; null starts closed." },
    { name: "id", type: "string", default: '"faq"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: single-open accordion, animated answer, two-tone headline." }, { version: "1.1", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Section h2 40/32/28 (was 44/30/26), section padding 120/96/64 (was 160/96/64), headline → CTA 40/40/32, questions 18/17/16, answers 16/15." }],
  files: [
    {
      path: "registry/firefly/sections/faq-split-v1/faq-split-v1.tsx",
      target: "components/sections/faq-split-v1.tsx",
      type: "registry:component",
    },
  ],
  dependencies: ["motion"],
  registryDependencies: ["firefly-base"],
  order: 10,
};
