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
        /* Blank page below the bar so the frame can scroll and the menu has room; nothing else to look at */
        <div aria-hidden className="h-[640px] bg-surface-page" />
      )}
    </>
  );
}
