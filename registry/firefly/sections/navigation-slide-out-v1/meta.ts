import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "navigation-slide-out-v1",
  name: "Navigation Slide-out",
  version: 1,
  category: "navigation",
  description:
    "Fixed header with a brand, text links, a quiet secondary link, a primary pill and a dot-grid menu button on every breakpoint. The button opens a right-side panel that slides in over a dimmed page: big primary links, the CTA again and small link groups at the bottom. Compacts on scroll like Navigation Sticky.",
  interactions: [
    "Click the dot grid: the panel slides in from the right.",
    "Press Escape or click the overlay to close.",
    "Scroll inside the frame: the bar compacts.",
  ],
  props: [
    { name: "links", type: "{ label: string; href: string }[]", description: "Primary links: text links in the bar (tablet+) and the big list in the panel." },
    { name: "brand", type: "ReactNode", default: "neutral mark + “Brand”", description: "Logo or wordmark; pass your <Image> or inline SVG." },
    { name: "brandLabel", type: "string", default: '"Home"', description: "Accessible name of the brand link." },
    { name: "brandHref", type: "string", default: '"/"', description: "Where the brand links to." },
    { name: "secondaryLink", type: "{ label; href } | null", default: "null", description: "Quiet text link next to the CTA (e.g. “Log in”). Tablet+ in the bar, always in the panel." },
    { name: "cta", type: "{ label; href } | null", default: "Join waitlist → #cta", description: "Primary pill in the bar and in the panel. null hides it." },
    { name: "groups", type: "{ title: string; links: { label; href }[] }[]", default: "[]", description: "Up to two small link groups at the bottom of the panel, each with a 13px label." },
    { name: "menuTitle", type: "string", default: '"Menu"', description: "Title in the panel's top row and the dialog's accessible name." },
    { name: "exploreLabel", type: "string", default: '"Explore"', description: "Mono label above the big links in the panel." },
    { name: "activeHref", type: "string", default: "current pathname", description: "Marks the matching link with aria-current." },
    { name: "className", type: "string", description: "Extra classes on the <header>." },
  ],
  changelog: [
    { version: "1.0", date: "2026-10-16", notes: "First release: scroll compaction, dot-grid button, slide-out dialog with overlay, focus return, scroll lock." },
  ],
  files: [
    {
      path: "registry/firefly/sections/navigation-slide-out-v1/navigation-slide-out-v1.tsx",
      target: "components/sections/navigation-slide-out-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 20,
  previewScroll: true,
  previewDevice: 834,
};
