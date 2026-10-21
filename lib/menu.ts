import { BRANDS } from "./brands";
import { getItems } from "./catalogue";
import { APP_CATEGORIES, WEB_CATEGORIES } from "./categories";
import type { CategoryId } from "./types";

export type MenuCategory = { id: CategoryId; name: string; count: number };
export type MenuBrand = { id: string; name: string; count: number; categories: MenuCategory[] };
export type ItemInfo = { category: CategoryId; area: "web" | "app"; brand?: string };
export type MenuProps = {
  /** Web sections tab: categories with their counts */
  categories: MenuCategory[];
  /** number of browsable web sections (Firefly Base excluded) */
  total: number;
  /** UI Components tab: brands, each with its element / flow counts */
  brands: MenuBrand[];
  /** component id → where it lives, so a component page highlights its tab and category */
  itemInfo: Record<string, ItemInfo>;
};

/** Data for the left menu. Firefly Base is the install package, not a section: it stays out of the list. */
export async function getMenuProps(): Promise<MenuProps> {
  const items = await getItems();
  const web = items.filter((i) => i.category !== "base" && i.area !== "app");
  const app = items.filter((i) => i.area === "app");
  const categories = WEB_CATEGORIES.filter((c) => c.id !== "base")
    .map((c) => ({ id: c.id, name: c.name, count: web.filter((i) => i.category === c.id).length }))
    .filter((c) => c.count > 0);
  const brands = BRANDS.map((b) => {
    const mine = app.filter((i) => i.brand === b.id);
    return {
      id: b.id,
      name: b.name,
      count: mine.length,
      categories: APP_CATEGORIES.map((c) => ({ id: c.id, name: c.name, count: mine.filter((i) => i.category === c.id).length })),
    };
  });
  const itemInfo = Object.fromEntries(
    items.map((i) => [i.id, { category: i.category, area: i.area ?? "web", brand: i.brand }])
  ) as Record<string, ItemInfo>;
  return { categories, total: web.length, brands, itemInfo };
}
