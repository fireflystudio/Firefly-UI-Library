// Server-side only (reads the registry folder). Pages pass the resulting data to client components.
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { CATEGORIES } from "./categories";
import { BASE_ITEM_ID } from "./registry-url";
import type { CatalogueItem } from "./types";

const SECTIONS_DIR = join(process.cwd(), "registry", "firefly", "sections");

/** Folder names under registry/firefly/sections — one per component, named by its id. */
export function listSectionIds(): string[] {
  return readdirSync(SECTIONS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("_") && !d.name.startsWith("."))
    .map((d) => d.name)
    .sort();
}

/**
 * Every item in the library, in catalogue order: Firefly Base first, then sections grouped by
 * category (dashboard order), then by `order`, then by name. Metadata is discovered from
 * registry/firefly/sections/<id>/meta.ts so adding a component is just adding a folder.
 */
export async function getItems(): Promise<CatalogueItem[]> {
  const base = (await import("@/registry/firefly/base/meta")).meta;
  const sections = await Promise.all(
    listSectionIds().map(async (id) => {
      const mod = (await import(`@/registry/firefly/sections/${id}/meta`)) as { meta: CatalogueItem };
      if (mod.meta.id !== id) {
        throw new Error(`registry/firefly/sections/${id}/meta.ts declares id "${mod.meta.id}" — it must equal the folder name.`);
      }
      return mod.meta;
    })
  );
  const categoryRank = new Map(CATEGORIES.map((c, i) => [c.id, i]));
  sections.sort(
    (a, b) =>
      (categoryRank.get(a.category) ?? 99) - (categoryRank.get(b.category) ?? 99) ||
      (a.order ?? 50) - (b.order ?? 50) ||
      a.name.localeCompare(b.name) ||
      a.version - b.version
  );
  return [base, ...sections];
}

export async function getItem(id: string): Promise<CatalogueItem | undefined> {
  if (id === BASE_ITEM_ID) return (await import("@/registry/firefly/base/meta")).meta;
  if (!listSectionIds().includes(id)) return undefined;
  return (await import(`@/registry/firefly/sections/${id}/meta`)).meta as CatalogueItem;
}
