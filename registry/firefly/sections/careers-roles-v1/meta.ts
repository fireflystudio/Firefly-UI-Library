import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "careers-roles-v1",
  name: "Careers Roles",
  version: 1,
  category: "careers",
  description: "“Open roles”: a section headline and a hairline list of roles; each row links to the role page, with its facts (type, location) and an arrow on the right. Empty state text when there are no roles.",
  interactions: ["Hover a row: the title nudges 5px right and the arrow fades in.", "Each row is a link to the role page."],
  props: [
    { name: "headline", type: "string", description: "Section headline." },
    { name: "headlineMuted", type: "string", description: "Optional grey second half." },
    { name: "roles", type: "{ title; href; meta?: string[]; prefetch? }[]", description: "One row per role; `meta` are the short facts on the right (e.g. Full-time, Remote)." },
    { name: "emptyText", type: "string", default: '"No open roles right now. Check back soon."', description: "Shown instead of the list when `roles` is empty." },
    { name: "containerClassName", type: "string", default: '"max-w-[1440px] px-5 md:px-10"', description: "Width + side padding of the content column (match the site's nav/footer)." },
    { name: "id", type: "string", default: '"open-roles"', description: "Section id." },
  ],
  changelog: [{ version: "1.2", date: "2026-10-20", notes: "containerClassName prop; the content column now defaults to the footer width (max-w 1440 + 20/40px padding) instead of 1200/1072px." }, { version: "1.1", date: "2026-10-20", notes: "Half section padding (32/48/60px) and headline→list 40/48/56." }, { version: "1.0", date: "2026-10-20", notes: "First release (distilled from the Verb careers page)." }],
  files: [{ path: "registry/firefly/sections/careers-roles-v1/careers-roles-v1.tsx", target: "components/sections/careers-roles-v1.tsx", type: "registry:component" }],
  registryDependencies: ["firefly-base"],
  order: 40,
};
