import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "navigation-centered-v1",
  name: "Navigation Centered",
  version: 1,
  category: "navigation",
  description:
    "Fixed 64px header with the links on the left, the brand centred and the CTAs on the right. Same styling as the other navigations (14px pill links with a grey hover fill, 36px pills, round hamburger). With overHero it starts transparent over a hero photo in light text with a thin divider, and becomes the standard bar on scroll.",
  interactions: [
    "Hover a link: a soft grey pill fills behind it.",
    "Hover or focus Platform: a full-width dropdown card rises in under the bar (link columns + picture tiles); Escape or moving away closes it.",
    "Final view: scroll inside the frame to watch the bar switch from the photo to the standard look.",
    "Switch to Mobile and tap the hamburger.",
  ],
  props: [
    { name: "links", type: "{ label: string; href: string; prefetch?: boolean; menu?: CenteredNavMenu }[]", description: "Text links on the left (tablet+) and in the mobile panel." },
    { name: "links[].menu", type: "{ columns: { label; links[] }[]; features?: { label; href; image?: ReactNode }[]; label? }", description: "Optional dropdown under that link: link columns on the left, up to three 212×199 picture tiles with captions on the right (Placeholder unless `image` is passed). Opens on hover / focus from md; its links are listed under the link in the mobile panel." },
    { name: "brand", type: "ReactNode", default: "Firefly mark + “Brand”", description: "Logo or wordmark, centred from md. Draw it in currentColor so it follows the bar's tone over a hero." },
    { name: "brandLabel", type: "string", default: '"Home"', description: "Accessible name of the brand link." },
    { name: "brandHref", type: "string", default: '"/"', description: "Where the brand links to." },
    { name: "cta", type: "{ label; href } | null", default: "Join waitlist → #cta", description: "Primary pill on the right (a light outline pill while over the hero). null hides it." },
    { name: "secondaryCta", type: "{ label; href } | null", default: "null", description: "White secondary pill before the primary one (e.g. Log in). Hidden on phones." },
    { name: "overHero", type: "boolean", default: "false", description: "Start transparent over a hero photo with light text and a thin divider; switch to the standard bar after 8px of scroll." },
    { name: "activeHref", type: "string", default: "current pathname", description: "Marks the matching link with aria-current." },
    { name: "containerClassName", type: "string", default: '"max-w-[1440px] px-5 md:px-10"', description: "Width + side padding of the bar's content, so it lines up with the site's sections (pass the site's container classes)." },
    { name: "className", type: "string", description: "Extra classes on the <header>." },
  ],
  changelog: [
    { version: "1.0", date: "2026-10-19", notes: "First release: the Solve layout (links left, brand centred, CTA right) on the Firefly navigation rules; overHero mode." },
    { version: "1.1", date: "2026-10-19", notes: "Wider bar: content up to 1440px with 40px side padding (was 1328px / 64px), so the brand and CTA sit closer to the screen edges." },
    { version: "1.2", date: "2026-10-19", notes: "Optional dropdown per link (`menu`): a full-width card under the bar with link columns and picture tiles, the button shadow, a soft rise-in with staggered contents; opens on hover or focus, closes on Escape / leaving / navigation. Sub-links appear in the mobile panel. Used on Solve (Platform)." },
  ],
  files: [
    {
      path: "registry/firefly/sections/navigation-centered-v1/navigation-centered-v1.tsx",
      target: "components/sections/navigation-centered-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  previewScroll: true,
  previewDevice: 834,
  order: 15,
};
