import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "hero-split-v1",
  name: "Hero Split",
  version: 1,
  category: "hero",
  description:
    "Copy on one side, visual on the other: left-aligned two-tone h1, optional eyebrow, body and mono note, the dark + ghost CTA pair. Stacks copy-first on mobile; `reverse` puts the visual on the left.",
  interactions: [
    "Reload: eyebrow, headline, body, buttons and note rise in one after another; the visual follows 300ms later.",
    "Scroll down: the visual drifts down up to 60px (exit parallax).",
    "Switch to Mobile: the copy stacks above the visual.",
  ],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured part of the h1." },
    { name: "headlineMuted", type: "string", description: "Grey second half of the h1 (inline)." },
    { name: "eyebrow", type: "string", description: "Small mono uppercase line above the headline." },
    { name: "body", type: "string", description: "Short paragraph under the headline (max 480px wide)." },
    { name: "primaryCta", type: "{ label; href }", default: "Join waitlist → #cta", description: "Dark pill." },
    { name: "secondaryCta", type: "{ label; href } | null", default: "Book a demo → #cta", description: "Ghost pill. null hides it." },
    { name: "note", type: "string", description: "Small mono line under the buttons, e.g. “No credit card needed”." },
    { name: "visual", type: "ReactNode", default: "<Placeholder label=\"Hero visual\" />", description: "Visual in the second column, in a clipped rounded frame. Pass your <Image fill> or mockup." },
    { name: "visualRatio", type: "string", default: '"720 / 560"', description: "CSS aspect-ratio of the visual frame." },
    { name: "reverse", type: "boolean", default: "false", description: "Visual on the left from tablet up." },
    { name: "id", type: "string", default: '"hero"', description: "Section id for anchor links; the heading id is <id>-heading." },
    { name: "className", type: "string", description: "Extra classes on the <section>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: 5/7 split, reverse option, mono note, exit parallax on the visual." }],
  files: [
    {
      path: "registry/firefly/sections/hero-split-v1/hero-split-v1.tsx",
      target: "components/sections/hero-split-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 20,
};
