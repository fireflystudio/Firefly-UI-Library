import type { PreviewProps } from "@/lib/types";
import { NavigationCentered } from "./navigation-centered-v1";

const LINKS = [
  {
    label: "Platform",
    href: "#platform",
    menu: {
      columns: [
        { label: "For teams", links: [{ label: "Documents", href: "#documents" }, { label: "Records", href: "#records" }, { label: "Prescriptions", href: "#prescriptions" }, { label: "Integrations", href: "#integrations" }, { label: "Treatment", href: "#treatment" }] },
        { label: "For individuals", links: [{ label: "Profile", href: "#profile" }, { label: "Prescriptions", href: "#prescriptions-2" }, { label: "Consultation", href: "#consultation" }] },
      ],
      features: [
        { label: "Prescriptions", href: "#feature-1" },
        { label: "Lab records", href: "#feature-2" },
        { label: "Access", href: "#feature-3" },
      ],
    },
  },
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
