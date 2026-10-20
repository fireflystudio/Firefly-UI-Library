import type { PreviewProps } from "@/lib/types";
import { NavigationSticky } from "./navigation-sticky-v1";

const LINKS = [
  {
    label: "Product",
    href: "#product",
    menu: {
      columns: [
        { label: "For teams", links: [{ label: "Documents", href: "#documents" }, { label: "Records", href: "#records" }, { label: "Integrations", href: "#integrations" }] },
        { label: "For individuals", links: [{ label: "Profile", href: "#profile" }, { label: "Consultation", href: "#consultation" }] },
      ],
      features: [
        { label: "Documents", href: "#feature-1" },
        { label: "Records", href: "#feature-2" },
        { label: "Access", href: "#feature-3" },
      ],
    },
  },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

export default function Preview({ inBuild }: PreviewProps) {
  return (
    <>
      <NavigationSticky links={LINKS} activeHref="#customers" secondaryCta={{ label: "Log in", href: "#login" }} cta={{ label: "Sign up", href: "#signup" }} />
      {inBuild ? null : (
        /* Blank page below the bar so the frame can scroll and the menu has room; nothing else to look at */
        <div aria-hidden className="h-[640px] bg-surface-page" />
      )}
    </>
  );
}
