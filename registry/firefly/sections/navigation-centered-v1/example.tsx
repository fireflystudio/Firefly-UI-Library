import Image from "next/image";
import type { PreviewProps } from "@/lib/types";
import { SolveLogo } from "./example-logo";
import { NavigationCentered } from "./navigation-centered-v1";

/** Final example: the Solve site header over its hero photo (links, centred logo, waitlist pill). */

// Solve has one page per product; anchors here so the catalogue preview prefetches nothing.
const LINKS = [
  {
    label: "Platform",
    href: "#platform",
    menu: {
      columns: [
        { label: "Solve for Doctors", links: [{ label: "Documents", href: "#documents" }, { label: "Records", href: "#records" }, { label: "Prescription", href: "#prescription" }, { label: "EMR", href: "#emr" }, { label: "Treatment", href: "#treatment" }] },
        { label: "Solve for individuals", links: [{ label: "Patient’s card", href: "#patient-card" }, { label: "Prescriptions", href: "#prescriptions" }, { label: "Consultation", href: "#consultation" }] },
      ],
      features: [
        { label: "Prescriptions", href: "#feature-prescriptions" },
        { label: "Lab Records", href: "#feature-lab-records" },
        { label: "Doctor access", href: "#feature-doctor-access" },
      ],
    },
  },
  { label: "Health", href: "#health" },
  { label: "Labs", href: "#labs" },
  { label: "Spinealign", href: "#spinealign" },
];

export default function Example({ inBuild }: PreviewProps) {
  return (
    <>
      <NavigationCentered brand={<SolveLogo />} brandLabel="Solve home" links={LINKS} activeHref="#platform" cta={{ label: "Join waitlist", href: "#updates" }} overHero />
      {inBuild ? null : (
        /* The hero photo under the bar, so the frame can scroll and the bar switches tone */
        <div aria-hidden className="relative h-[720px] overflow-clip bg-surface-dark">
          <Image src="/images/examples/navigation-centered-v1/hero-overlay.png" alt="" fill sizes="100vw" priority className="object-cover" />
          <div className="absolute inset-0 bg-surface-inverse/20" />
        </div>
      )}
    </>
  );
}
