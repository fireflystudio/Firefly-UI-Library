import { getItems } from "./catalogue";
import { CATEGORIES } from "./categories";
import type { CategoryId } from "./types";

export type MenuCategory = { id: CategoryId; name: string; count: number };
export type MenuProps = {
  categories: MenuCategory[];
  /** number of browsable sections (Firefly Base excluded) */
  total: number;
  /** component id → category, so a component page highlights its category */
  itemCategories: Record<string, CategoryId>;
};

/** Data for the category menu. Firefly Base is the install package, not a section: it stays out of the list. */
export async function getMenuProps(): Promise<MenuProps> {
  const items = await getItems();
  const sections = items.filter((i) => i.category !== "base");
  const categories = CATEGORIES.filter((c) => c.id !== "base")
    .map((c) => ({ id: c.id, name: c.name, count: sections.filter((i) => i.category === c.id).length }))
    .filter((c) => c.count > 0);
  const itemCategories = Object.fromEntries(items.map((i) => [i.id, i.category])) as Record<string, CategoryId>;
  return { categories, total: sections.length, itemCategories };
}
