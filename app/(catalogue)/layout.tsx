import { Suspense } from "react";
import { CatalogueFooter } from "@/components/catalogue/footer";
import { SelectionProvider } from "@/components/catalogue/selection";
import { Sidebar } from "@/components/catalogue/sidebar";
import { TopBar } from "@/components/catalogue/top-bar";
import { ViewModeProvider } from "@/components/catalogue/view-mode";
import { getMenuProps } from "@/lib/menu";

/**
 * App shell (Solve app pattern): the sidebar sits on a grey background; everything else lives on
 * one big rounded content card, inset 8px from the top, right and bottom. The card stays a lighter
 * grey so the white component cards keep standing out. Below xl: a fixed top bar, no card.
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
          className="sr-only rounded-pill bg-button-primary px-4 py-2 text-[13px] font-medium text-button-content-primary focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60]"
        >
          Skip to content
        </a>
        <TopBar />
        <div className="min-h-screen bg-catalogue-bg xl:grid xl:grid-cols-[248px_minmax(0,1fr)] xl:bg-catalogue-shell">
          <aside className="hidden xl:block">
            <div className="sticky top-0 h-screen overflow-y-auto px-3 py-5 [scrollbar-width:thin]">
              <Suspense fallback={null}>
                <Sidebar {...menu} />
              </Suspense>
            </div>
          </aside>
          <div className="flex min-h-screen min-w-0 flex-col bg-catalogue-bg xl:my-2 xl:mr-2 xl:min-h-[calc(100vh-16px)] xl:rounded-frame xl:border xl:border-border-06">
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
