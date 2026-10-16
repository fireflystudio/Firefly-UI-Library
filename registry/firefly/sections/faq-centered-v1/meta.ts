import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "faq-centered-v1",
  name: "FAQ Centered",
  version: 1,
  category: "faq",
  description:
    "Two-tone headline on top, a centred accordion (640px tablet / 760px desktop) below and a contact line with a ghost pill at the bottom. One question open at a time, the first open by default, with a rotating +/– glyph.",
  interactions: ["Click a question: the previous one closes.", "Click the open question to close it.", "Tab to a question and press Enter."],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured line of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second line of the heading." },
    { name: "items", type: "{ question: string; answer: string }[]", description: "Questions and answers, in order." },
    { name: "defaultOpen", type: "number | null", default: "0", description: "Index of the question open on load; null starts closed." },
    {
      name: "footerText",
      type: "string",
      default: '"Anything else, ask us directly. We reply within a day."',
      description: "Contact line under the accordion. Empty string hides it.",
    },
    { name: "cta", type: "{ label; href } | null", default: "Talk to us → #cta", description: "Ghost pill next to the contact line. null hides it." },
    { name: "id", type: "string", default: '"faq"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: centred layout, single-open accordion, animated answer, contact line." }],
  files: [
    {
      path: "registry/firefly/sections/faq-centered-v1/faq-centered-v1.tsx",
      target: "components/sections/faq-centered-v1.tsx",
      type: "registry:component",
    },
  ],
  dependencies: ["motion"],
  registryDependencies: ["firefly-base"],
  order: 20,
};
