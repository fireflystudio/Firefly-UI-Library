export type CategoryId =
  | "base"
  | "navigation"
  | "hero"
  | "features"
  | "stats"
  | "carousels"
  | "logos"
  | "bento"
  | "testimonials"
  | "faq"
  | "cta"
  | "popups"
  | "footer";

export type Category = {
  id: CategoryId;
  name: string;
  /** One line shown under the category heading in the dashboard */
  description: string;
};

export type PropDoc = {
  name: string;
  type: string;
  default?: string;
  description: string;
};

export type ChangelogEntry = {
  version: string;
  /** ISO date, e.g. 2026-10-16 */
  date: string;
  notes: string;
};

export type RegistryFileType =
  | "registry:component"
  | "registry:ui"
  | "registry:lib"
  | "registry:hook"
  | "registry:file";

export type RegistryFile = {
  /** Path inside this repo */
  path: string;
  /** Path the file is written to in the consuming site */
  target: string;
  type: RegistryFileType;
};

/** Props every preview component receives */
export type PreviewProps = {
  /** true when rendered inside the assembled "Build site" page: skip demo filler (e.g. the nav's scroll content) */
  inBuild?: boolean;
};

export type CatalogueItem = {
  /** Registry id, kebab-case with version: "hero-split-v1" */
  id: string;
  /** Display name without version: "Hero Split" */
  name: string;
  version: number;
  category: CategoryId;
  description: string;
  /** Things to try in the live preview ("Click a step", "Drag the cards") */
  interactions?: string[];
  props: PropDoc[];
  changelog: ChangelogEntry[];
  files: RegistryFile[];
  /** npm packages the files import */
  dependencies?: string[];
  /** Other registry items this one needs (ids). Resolved to full URLs at build time. */
  registryDependencies?: string[];
  /** Position inside its category (lower first, default 50) */
  order?: number;
  /** Viewport width the dashboard card renders the component at (default 1440) */
  previewDevice?: 390 | 834 | 1440;
  /** Where a component shorter than the card window sits: top (default), center or bottom */
  previewAlign?: "top" | "center" | "bottom";
  /** Cap the preview frame height so the user scrolls inside it (needed to show scroll behaviour, e.g. a sticky nav) */
  previewScroll?: boolean;
  /** Websites (ids from lib/websites.ts) that use this component; shown as a small label on the card and page */
  usedOn?: string[];
  /** Set by the catalogue: the folder has an example.tsx (final design example with real content) */
  hasExample?: boolean;
};
