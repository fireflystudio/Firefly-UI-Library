import type { PreviewProps } from "@/lib/types";
import { NavigationSlideOut } from "./navigation-slide-out-v1";

const LINKS = [
  { label: "Product", href: "#product" },
  { label: "Customers", href: "#customers" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
];

const GROUPS = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Blog", href: "#blog" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Guides", href: "#guides" },
      { label: "Help centre", href: "#help" },
      { label: "Status", href: "#status" },
    ],
  },
];

export default function Preview({ inBuild }: PreviewProps) {
  return (
    <>
      <NavigationSlideOut
        links={LINKS}
        secondaryLink={{ label: "Log in", href: "#login" }}
        groups={GROUPS}
        activeHref="#customers"
      />
      {inBuild ? null : (
        /* Blank page below the bar so the frame can scroll and the menu has room; nothing else to look at */
        <div aria-hidden className="h-[640px] bg-surface-page" />
      )}
    </>
  );
}
