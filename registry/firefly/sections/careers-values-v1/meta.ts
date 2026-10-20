import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "careers-values-v1",
  name: "Careers Values",
  version: 1,
  category: "careers",
  description: "“How we work”: a section headline and a two-column grid of short principles (title + one or two sentences). Single column on phones.",
  interactions: ["Scroll into view: the headline, then each principle, rise in (70ms apart)."],
  props: [
    { name: "headline", type: "string", description: "Section headline." },
    { name: "headlineMuted", type: "string", description: "Optional grey second half." },
    { name: "items", type: "{ title: string; body: string }[]", description: "4–8 principles." },
    { name: "containerClassName", type: "string", default: '"max-w-[1328px] px-5 md:px-10 xl:px-16"', description: "Width + side padding of the content column (match the site's nav/footer)." },
    { name: "id", type: "string", default: '"how-we-work"', description: "Section id." },
  ],
  changelog: [{ version: "1.5", date: "2026-10-20", notes: "Content column is now 1200px at 1440 (was 1072: max-w 1200 included the side padding). Same as the other library sections." }, { version: "1.4", date: "2026-10-20", notes: "Headline 24/28/32 (was 28/32/40); headline → grid 24/32px (was 40/48/56)." }, { version: "1.3", date: "2026-10-20", notes: "Default column back to max-w 1200 + 20/40/64px padding (the full footer width read too wide on the client's review); containerClassName still lets a site change it." }, { version: "1.2", date: "2026-10-20", notes: "containerClassName prop; the content column now defaults to the footer width (max-w 1440 + 20/40px padding) instead of 1200/1072px." }, { version: "1.1", date: "2026-10-20", notes: "Half section padding (32/48/60px) and headline→grid 40/48/56." }, { version: "1.0", date: "2026-10-20", notes: "First release (distilled from the Verb careers page)." }],
  files: [{ path: "registry/firefly/sections/careers-values-v1/careers-values-v1.tsx", target: "components/sections/careers-values-v1.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  order: 30,
};
