import Image from "next/image";
import { LogoMarquee } from "./logo-marquee-v1";

/**
 * Final example: the "Copanies in startupmap" strip from the Startupmap /investors page
 * (exact site copy): three company logos on 150 × 82 tiles, two rows running opposite ways
 * at 70s per loop.
 */

// Intrinsic sizes of the SVGs at 18px tall (rounded: next/image warns in dev on fractional width/height attributes)
const LOGOS = [
  { name: "Hero Gaming", file: "hero-gaming.svg", width: 51 },
  { name: "OONA", file: "oona.svg", width: 76 },
  { name: "ISC Research", file: "isc-research.svg", width: 97 },
];

export default function Example() {
  return (
    <LogoMarquee
      id="companies"
      label="Copanies in startupmap"
      rows={2}
      speed={70}
      logos={LOGOS.map((logo) => (
        <span key={logo.file} className="flex h-[82px] w-[150px] items-center justify-center rounded-tile bg-surface-muted">
          <Image
            src={`/images/examples/logo-marquee-v1/${logo.file}`}
            alt={logo.name}
            width={logo.width}
            height={18}
            className="block h-[18px] w-auto"
          />
        </span>
      ))}
    />
  );
}
