import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "careers-hero-v1",
  name: "Careers Hero",
  version: 1,
  category: "careers",
  description:
    "Opener of a careers page: centred stacked two-tone h1 and a wide clipped frame for a team photo. The headline reveals first, the visual 300ms later.",
  interactions: ["Click “See open roles”: the page scrolls to the roles list.", "Scroll into view: the headline, lead and button, then the photo frame, rise in."],
  props: [
    { name: "headline", type: "string", description: "First, primary-coloured line of the h1." },
    { name: "headlineMuted", type: "string", description: "Grey second line." },
    { name: "body", type: "string", description: "Two-line lead under the headline (keep it under ~140 characters)." },
    { name: "cta", type: "{ label; href } | null", default: "See open roles → #open-roles", description: "Primary pill under the lead; scrolls to the Careers Roles section. null hides it." },
    { name: "visual", type: "ReactNode", default: "<Placeholder label=\"Team photo\" />", description: "Team photo; pass your <Image fill sizes=…>." },
    { name: "visualRatio", type: "string", default: '"1200 / 520"', description: "Aspect ratio of the frame from 768px up." },
    { name: "visualRatioMobile", type: "string", default: '"4 / 3"', description: "Aspect ratio below 768px." },
    { name: "containerClassName", type: "string", default: '"max-w-[1200px] px-5 md:px-10 xl:px-16"', description: "Width + side padding of the content column (match the site's nav/footer)." },
    { name: "id", type: "string", default: '"careers-hero"', description: "Section id; the heading id is `${id}-heading`." },
  ],
  changelog: [{ version: "1.5", date: "2026-10-20", notes: "Lead paragraph (body) and a primary CTA that scrolls to #open-roles (See open roles), as on the ElevenLabs careers page." }, { version: "1.4", date: "2026-10-20", notes: "Subpage headline size 30/40/48 (was 34/48/64); photo 32/40/48 below it." }, { version: "1.3", date: "2026-10-20", notes: "Default column back to max-w 1200 + 20/40/64px padding (the full footer width read too wide on the client's review); containerClassName still lets a site change it." }, { version: "1.2", date: "2026-10-20", notes: "containerClassName prop; the content column now defaults to the footer width (max-w 1440 + 20/40px padding) instead of 1200/1072px." }, { version: "1.1", date: "2026-10-20", notes: "Bottom padding 32/48/60px to match the half rhythm of the other careers sections." }, { version: "1.0", date: "2026-10-20", notes: "First release (distilled from the Verb careers page)." }],
  files: [{ path: "registry/firefly/sections/careers-hero-v1/careers-hero-v1.tsx", target: "components/sections/careers-hero-v1.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  order: 10,
};
