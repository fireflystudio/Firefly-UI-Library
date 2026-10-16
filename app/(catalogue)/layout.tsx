import { CatalogueFooter } from "@/components/catalogue/footer";
import { SelectionProvider } from "@/components/catalogue/selection";
import { TopBar } from "@/components/catalogue/top-bar";

export default function CatalogueLayout({ children }: { children: React.ReactNode }) {
  return (
    <SelectionProvider>
      <a
        href="#main"
        className="sr-only rounded-pill bg-button-primary px-4 py-2 text-[13px] font-medium text-button-content-primary focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
      >
        Skip to content
      </a>
      <TopBar />
      <main id="main" className="px-5 md:px-8">
        {children}
      </main>
      <CatalogueFooter />
    </SelectionProvider>
  );
}
