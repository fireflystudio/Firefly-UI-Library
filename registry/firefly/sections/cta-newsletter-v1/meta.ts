import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "cta-newsletter-v1",
  name: "CTA Newsletter",
  version: 1,
  category: "cta",
  description:
    "Centred email sign-up: two-tone heading, one line of body and a pill form with a labelled email field and a dark submit button. The confirmation appears in a reserved status slot, so nothing shifts. Optional ticked benefits and a visual slot. Nothing is sent until a backend is connected.",
  interactions: ["Type an email and press Enter: the confirmation replaces the note without moving anything.", "Type again: the confirmation clears."],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the heading." },
    { name: "tone", type: '"dark" | "light"', default: '"light"', description: "Light page background or the dark section." },
    { name: "eyebrow", type: "string", description: "Small mono label above the heading." },
    { name: "body", type: "string", description: "One line under the heading." },
    { name: "label", type: "string", default: '"Email address"', description: "Visually hidden label of the email field." },
    { name: "placeholder", type: "string", default: '"Enter your email"', description: "Placeholder inside the field." },
    { name: "buttonLabel", type: "string", default: '"Subscribe"', description: "Label of the submit pill." },
    { name: "confirmation", type: "string", default: "\"Thanks — you're on the list.\"", description: "Shown in the status slot after submit." },
    { name: "privacyNote", type: "string", description: "Small line under the form; swaps with the confirmation in the same slot." },
    { name: "benefits", type: "string[]", description: "Up to three short ticked items under the form." },
    { name: "visual", type: "ReactNode", default: "none", description: "Card below the form, e.g. a sample issue." },
    { name: "id", type: "string", default: '"newsletter"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: accessible pill form, shift-free confirmation, benefits, visual slot, dark/light tone." }],
  files: [
    {
      path: "registry/firefly/sections/cta-newsletter-v1/cta-newsletter-v1.tsx",
      target: "components/sections/cta-newsletter-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 20,
};
