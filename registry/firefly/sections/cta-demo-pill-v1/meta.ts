import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "cta-demo-pill-v1",
  name: "CTA Demo Pill",
  version: 1,
  category: "cta",
  description:
    "Centred closing call to action: a small mono pill tag, a big two-tone heading, a short body, the primary + ghost button pair and a small note. Optional product visual below in a rounded frame with a 30px parallax. Dark or light.",
  interactions: ["Hover a button: it lifts 1px.", "Scroll: the visual drifts 30px."],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured part of the heading." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the heading." },
    { name: "tone", type: '"dark" | "light"', default: '"dark"', description: "Dark section or the light page background." },
    { name: "tag", type: "string", description: "Small bordered mono pill above the heading." },
    { name: "body", type: "string", description: "One or two short sentences under the heading." },
    { name: "primaryCta", type: "{ label; href }", default: "Join waitlist → #cta", description: "Primary pill (white on dark)." },
    { name: "secondaryCta", type: "{ label; href } | null", default: "Book a demo → #cta", description: "Ghost pill. null hides it." },
    { name: "note", type: "string", description: "Small muted line under the buttons, e.g. “No credit card · Cancel anytime”." },
    { name: "visual", type: "ReactNode", default: "none", description: "Visual below the buttons, clipped in a rounded frame with parallax." },
    { name: "id", type: "string", default: '"cta"', description: "Section id for anchor links." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: dark/light tone, pill tag, CTA pair, note, parallax visual slot." }, { version: "1.1", date: "2026-10-20", notes: "Type scale + vertical rhythm (2026-10-20), sizes desktop / tablet / mobile: Statement h2 48/40/30 (was 56/40/32, max width 1000px), section padding 120/96/64 (was 160/128/96), lead 20/18/17, headline → lead 20/20/16, visual 64/56/40 below the buttons." }],
  usedOn: ["startupmap", "trendmd"],
  files: [
    {
      path: "registry/firefly/sections/cta-demo-pill-v1/cta-demo-pill-v1.tsx",
      target: "components/sections/cta-demo-pill-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 10,
};
