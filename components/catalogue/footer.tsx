import Link from "next/link";

export function CatalogueFooter() {
  return (
    <footer className="border-t border-border-06">
      <div className="flex flex-col gap-3 px-5 py-8 text-[13px] text-text-nav md:flex-row md:items-center md:justify-between md:px-8 xl:px-10">
        <p>
          <span className="font-medium text-text-primary">Firefly UI Library</span> · content-free, versioned sections for Firefly websites.
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-5">
          <Link href="/" className="transition-opacity duration-200 ease-out hover:opacity-60">
            UI Components
          </Link>
          <Link href="/websites" className="transition-opacity duration-200 ease-out hover:opacity-60">
            Websites
          </Link>
          <Link href="/build" className="transition-opacity duration-200 ease-out hover:opacity-60">
            Build site
          </Link>
          <Link href="/design-system/buttons" className="transition-opacity duration-200 ease-out hover:opacity-60">
            Design system
          </Link>
          <a href="https://github.com/lukasznosekk/Firefly-UI-Library" target="_blank" rel="noreferrer" className="transition-opacity duration-200 ease-out hover:opacity-60">
            GitHub ↗
          </a>
        </nav>
      </div>
    </footer>
  );
}
