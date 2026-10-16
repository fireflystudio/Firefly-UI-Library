import { Suspense } from "react";
import { CategoryBar, Sidebar, type SidebarCategory } from "@/components/catalogue/sidebar";
import { getItems } from "@/lib/catalogue";
import { CATEGORIES } from "@/lib/categories";
import type { CategoryId } from "@/lib/types";

/** UI Components area: persistent category menu on the left (desktop) or a row on top (smaller screens). */
export default async function LibraryLayout({ children }: { children: React.ReactNode }) {
  const items = await getItems();
  // Firefly Base is the install package, not a section: it stays out of the browsable list
  // and is reachable from the small link at the bottom of the menu.
  const sections = items.filter((i) => i.category !== "base");
  const categories: SidebarCategory[] = CATEGORIES.filter((c) => c.id !== "base")
    .map((c) => ({ id: c.id, name: c.name, count: sections.filter((i) => i.category === c.id).length }))
    .filter((c) => c.count > 0);
  const itemCategories = Object.fromEntries(items.map((i) => [i.id, i.category])) as Record<string, CategoryId>;
  const menuProps = { categories, total: sections.length, itemCategories };

  return (
    <div className="mx-auto max-w-[1392px] pt-[calc(64px+24px)] md:pt-[calc(64px+32px)] xl:grid xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-12">
      <aside className="hidden xl:block">
        <div className="sticky top-[88px] max-h-[calc(100vh-112px)] overflow-y-auto pr-2 [scrollbar-width:thin]">
          <Suspense fallback={null}>
            <Sidebar {...menuProps} />
          </Suspense>
        </div>
      </aside>
      <div className="min-w-0">
        <div className="mb-6 xl:hidden">
          <Suspense fallback={null}>
            <CategoryBar {...menuProps} />
          </Suspense>
        </div>
        {children}
      </div>
    </div>
  );
}
