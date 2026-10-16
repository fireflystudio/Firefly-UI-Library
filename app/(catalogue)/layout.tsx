import { Suspense } from "react";
import { CatalogueFooter } from "@/components/catalogue/footer";
import { SelectionProvider } from "@/components/catalogue/selection";
import { Sidebar } from "@/components/catalogue/sidebar";
import { TopBar } from "@/components/catalogue/top-bar";
import { ViewModeProvider } from "@/components/catalogue/view-mode";
import { getMenuProps } from "@/lib/menu";

/**
 * App shell: slightly grey background, a full-height sidebar on desktop (brand, sections,
 * categories), a compact fixed top bar below the xl breakpoint. Content uses the full width.
 */
export default async function CatalogueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menu = await getMenuProps();
  return (
    <SelectionProvider>
      <ViewModeProvider>
        <a
          href="#main"
          className="sr-only rounded-pill bg-button-primary px-4 py-2 text-[13px] font-medium text-button-content-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
        >
          Skip to content
        </a>
        <TopBar />
        <div className="min-h-screen bg-catalogue-bg xl:grid xl:grid-cols-[248px_minmax(0,1fr)]">
          <aside className="hidden xl:block">
            <div className="sticky top-0 h-screen overflow-y-auto border-r border-border-06 px-3 py-5 [scrollbar-width:thin]">
              <Suspense fallback={null}>
                <Sidebar {...menu} />
              </Suspense>
            </div>
          </aside>
          <div className="flex min-h-screen min-w-0 flex-col">
            <main
              id="main"
              className="flex-1 px-5 pt-[calc(64px+24px)] md:px-8 xl:px-10 xl:pt-8"
            >
              {children}
            </main>
            <CatalogueFooter />
          </div>
        </div>
      </ViewModeProvider>
    </SelectionProvider>
  );
}
