import type { PreviewProps } from "@/lib/types";
import { NavigationCentered } from "./navigation-centered-v1";

const LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Health", href: "#health" },
  { label: "Labs", href: "#labs" },
  { label: "About", href: "#about" },
];

export default function Preview({ inBuild }: PreviewProps) {
  return (
    <>
      <NavigationCentered links={LINKS} activeHref="#platform" secondaryCta={{ label: "Log in", href: "#login" }} cta={{ label: "Join waitlist", href: "#cta" }} />
      {inBuild ? null : (
        /* Blank page below the bar so the frame can scroll and the menu has room; nothing else to look at */
        <div aria-hidden className="h-[640px] bg-surface-page" />
      )}
    </>
  );
}
