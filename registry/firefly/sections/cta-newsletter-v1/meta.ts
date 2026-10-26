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
  changelog: [{ version: "1.2", date: "2026-10-26", notes: "Width follows max-w-content (the site token --container-content, default 1200px), so a site can switch to a wider layout in one place. No visual change at the default." }, { version: "1.0", date: "2026-10-16", notes: "First release: accessible pill form, shift-free confirmation, benefits, visual slot, dark/light tone." }, { version: "1.1", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Statement h2 48/40/30 (was 48/36/28, max width 1000px), lead 20/18/17, visual 64/56/40 below the form." }],
  usedOn: ["startupmap"],
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
