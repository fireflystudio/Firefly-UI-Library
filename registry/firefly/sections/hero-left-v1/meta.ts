import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "hero-left-v1",
  name: "Hero Left",
  version: 1,
  category: "hero",
  description:
    "Hero Centered with the copy aligned left (the ElevenLabs layout): stacked two-tone h1 and the CTA pair in the left column, the lead paragraph in the right column centred on the headline, and the same large visual underneath. Same sizes, reveal and parallax as Hero Centered.",
  interactions: [
    "Reload: headline lines, lead and buttons rise in one after another; the visual follows 300ms later.",
    "Scroll down: the visual drifts down up to 60px (exit parallax).",
    "Switch to Mobile: the lead moves under the headline, everything stays left-aligned.",
  ],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured line of the h1." },
    { name: "headlineMuted", type: "string", description: "Grey second line, stacked under the first." },
    { name: "eyebrow", type: "string", description: "Small mono uppercase line above the headline." },
    { name: "body", type: "string", description: "Lead paragraph in the right column (under the headline on phones). Max 180 characters: 3 lines at 20px. Longer text warns in dev." },
    { name: "primaryCta", type: "{ label; href }", default: "Join waitlist → #cta", description: "Primary pill." },
    { name: "secondaryCta", type: "{ label; href } | null", default: "Book a demo → #cta", description: "Secondary pill. null hides it." },
    { name: "visual", type: "ReactNode", default: "<Placeholder label=\"Hero visual\" />", description: "Visual under the copy, in a clipped rounded frame. Pass your <Image fill> or mockup." },
    { name: "visualRatio", type: "string", default: '"1392 / 720"', description: "CSS aspect-ratio of the visual frame." },
    { name: "visualRatioMobile", type: "string", default: "visualRatio", description: "Taller frame below 768px, e.g. \"350 / 420\". Pair it with an art-directed <picture> so phones get their own crop." },
    { name: "id", type: "string", default: '"hero"', description: "Section id for anchor links; the heading id is <id>-heading." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-20", notes: "First release: Hero Centered's sizes, reveal and parallax with left-aligned copy and the lead in the right column (ElevenLabs layout)." }],
  files: [
    {
      path: "registry/firefly/sections/hero-left-v1/hero-left-v1.tsx",
      target: "components/sections/hero-left-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 11,
};
