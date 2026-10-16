import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "navigation-sticky-v1",
  name: "Navigation Sticky",
  version: 1,
  category: "navigation",
  description:
    "Fixed header with a brand, text links and a primary pill. Turns translucent and compacts after a few pixels of scroll; on mobile a hamburger opens a simple panel.",
  interactions: [
    "Scroll inside the frame: the bar blurs, gains a hairline and compacts.",
    "Switch to Mobile and tap the hamburger.",
    "Hover a link: it fades to 60%.",
  ],
  props: [
    { name: "links", type: "{ label: string; href: string }[]", description: "Text links shown on tablet/desktop and in the mobile panel." },
    { name: "brand", type: "ReactNode", default: "neutral mark + “Brand”", description: "Logo or wordmark; pass your <Image> or inline SVG." },
    { name: "brandLabel", type: "string", default: '"Home"', description: "Accessible name of the brand link." },
    { name: "brandHref", type: "string", default: '"/"', description: "Where the brand links to." },
    { name: "cta", type: "{ label; href } | null", default: "Join waitlist → #cta", description: "Primary pill on the right. null hides it." },
    { name: "activeHref", type: "string", default: "current pathname", description: "Marks the matching link with aria-current." },
    { name: "className", type: "string", description: "Extra classes on the <header>." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-16", notes: "First release: scroll compaction, active link, mobile panel." }],
  files: [
    {
      path: "registry/firefly/sections/navigation-sticky-v1/navigation-sticky-v1.tsx",
      target: "components/sections/navigation-sticky-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  previewScroll: true,
};
