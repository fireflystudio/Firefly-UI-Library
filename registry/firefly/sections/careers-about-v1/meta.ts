import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "careers-about-v1",
  name: "Careers About",
  version: 1,
  category: "careers",
  description: "“Who we are”: a section headline and a column of short lead-size paragraphs capped at 920px. Paragraphs stagger in after the headline.",
  interactions: ["Scroll into view: the headline, then each paragraph, rise in."],
  props: [
    { name: "headline", type: "string", description: "Section headline." },
    { name: "headlineMuted", type: "string", description: "Optional grey second half (a short clause like “Who we are” stays one colour)." },
    { name: "paragraphs", type: "string[]", description: "One paragraph per entry, 3–6 recommended." },
    { name: "containerClassName", type: "string", default: '"max-w-[1200px] px-5 md:px-10 xl:px-16"', description: "Width + side padding of the content column (match the site's nav/footer)." },
    { name: "id", type: "string", default: '"about"', description: "Section id." },
  ],
  changelog: [{ version: "1.4", date: "2026-10-20", notes: "Paragraph column 920px (760 wrapped too tightly, the full column read as a wall of text)." }, { version: "1.3", date: "2026-10-20", notes: "Default column back to max-w 1200 + 20/40/64px padding (the full footer width read too wide on the client's review); containerClassName still lets a site change it; paragraphs capped at 920px again." }, { version: "1.2", date: "2026-10-20", notes: "containerClassName prop; the content column now defaults to the footer width (max-w 1440 + 20/40px padding) instead of 1200/1072px; paragraphs run the full column width (no 760px cap)." }, { version: "1.1", date: "2026-10-20", notes: "Half section padding (32/48/60px): text sections stacked on one page read better than the 64/96/120 rhythm." }, { version: "1.0", date: "2026-10-20", notes: "First release (distilled from the Verb careers page)." }],
  files: [{ path: "registry/firefly/sections/careers-about-v1/careers-about-v1.tsx", target: "components/sections/careers-about-v1.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  order: 20,
};
