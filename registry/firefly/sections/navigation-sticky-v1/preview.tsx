import { Placeholder } from "@/components/ui/placeholder";
import type { PreviewProps } from "@/lib/types";
import { NavigationSticky } from "./navigation-sticky-v1";

const LINKS = [
  { label: "Product", href: "#product" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export default function Preview({ inBuild }: PreviewProps) {
  return (
    <>
      <NavigationSticky links={LINKS} activeHref="#customers" />
      {inBuild ? null : (
        /* Demo page body so the scroll compaction can be seen (not part of the component) */
        <div aria-hidden className="bg-surface-page px-5 pb-24 pt-[calc(72px+56px)] md:px-10 md:pt-[calc(76px+80px)] xl:px-16">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
            <p className="max-w-[720px] text-[30px] font-normal leading-[1.06] tracking-[-0.03em] text-text-primary md:text-[44px]">
              Page content goes here. <span className="text-text-muted">Scroll to watch the bar compact.</span>
            </p>
            <Placeholder ratio="1200 / 560" label="Hero visual" className="rounded-frame" />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <Placeholder ratio="4 / 3" label="Card" className="rounded-frame" />
              <Placeholder ratio="4 / 3" label="Card" className="rounded-frame" />
              <Placeholder ratio="4 / 3" label="Card" className="rounded-frame" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
