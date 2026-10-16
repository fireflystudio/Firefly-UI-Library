import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "hero-centered-v1",
  name: "Hero Centered",
  version: 1,
  category: "hero",
  description:
    "Centred copy with a stacked two-tone h1, optional eyebrow and body, the dark + ghost CTA pair, and a large visual underneath. The copy reveals line by line on load; the visual follows and drifts down as it scrolls out.",
  interactions: [
    "Reload: eyebrow, headline lines, body and buttons rise in one after another; the visual follows 300ms later.",
    "Scroll down: the visual drifts down up to 60px (exit parallax).",
    "Hover a button: it lifts 1px.",
  ],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured line of the h1." },
    { name: "headlineMuted", type: "string", description: "Grey second line, stacked under the first." },
    { name: "eyebrow", type: "string", description: "Small mono uppercase line above the headline." },
    { name: "body", type: "string", description: "Short paragraph under the headline (max 560px wide)." },
    { name: "primaryCta", type: "{ label; href }", default: "Join waitlist → #cta", description: "Dark pill." },
    { name: "secondaryCta", type: "{ label; href } | null", default: "Book a demo → #cta", description: "Ghost pill. null hides it." },
    { name: "visual", type: "ReactNode", default: "<Placeholder label=\"Hero visual\" />", description: "Visual under the copy, in a clipped rounded frame. Pass your <Image fill> or mockup." },
    { name: "visualRatio", type: "string", default: '"1392 / 720"', description: "CSS aspect-ratio of the visual frame." },
    { name: "id", type: "string", default: '"hero"', description: "Section id for anchor links; the heading id is <id>-heading." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: stacked two-tone h1, staggered load reveal, exit parallax on the visual." }],
  files: [
    {
      path: "registry/firefly/sections/hero-centered-v1/hero-centered-v1.tsx",
      target: "components/sections/hero-centered-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 10,
};
