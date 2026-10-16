import { Suspense } from "react";
import { CategoryBar } from "@/components/catalogue/sidebar";
import { getMenuProps } from "@/lib/menu";

/** UI Components area: below xl the categories show as a row above the content (the sidebar covers xl+). */
export default async function LibraryLayout({ children }: { children: React.ReactNode }) {
  const menu = await getMenuProps();
  return (
    <>
      <div className="mb-6 xl:hidden">
        <Suspense fallback={null}>
          <CategoryBar {...menu} />
        </Suspense>
      </div>
      {children}
    </>
  );
}
