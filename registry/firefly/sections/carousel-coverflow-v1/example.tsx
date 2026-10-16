import Image from "next/image";
import { CarouselCoverflow, type CarouselItem } from "./carousel-coverflow-v1";

/*
 * Final example: the Startupmap Reader "Browse all startup profiles" carousel
 * (startupmap/components/sections/reader/profiles.tsx). The source cards are image-only;
 * `title` is required here, so each card carries the source's alt text as its title.
 */
const DIR = "/images/examples/carousel-coverflow-v1";
// Card width is min(78vw, 320px) in the component
const SIZES = "(min-width: 420px) 320px, 78vw";

/** The 7 profile images, left → right as in the source. */
const PROFILES: { file: string; alt: string }[] = [
  { file: "profile-1-portrait-dark.png", alt: "Founder portrait in a black high-neck top against a dark dotted backdrop" },
  { file: "profile-2-sculpture.png", alt: "Chrome and smoked-glass sculpture" },
  { file: "profile-3-chart-dark.png", alt: "Glowing candlestick chart rising on a dark background" },
  { file: "profile-4-portrait-light.png", alt: "Founder in profile against a pale blue gradient" },
  { file: "profile-5-device.png", alt: "Titanium and rose-gold hardware device" },
  { file: "profile-6-chart-light.png", alt: "Upward-trending price chart on white" },
  { file: "profile-7-city.png", alt: "Lone figure on top of a lit tower at dusk" },
];

const ITEMS: CarouselItem[] = PROFILES.map((p, i) => ({
  title: p.alt,
  visual: <Image src={`${DIR}/${p.file}`} alt="" fill priority={i === 0} sizes={SIZES} className="object-cover" draggable={false} />,
}));

export default function Example() {
  return <CarouselCoverflow id="profiles" headline="Browse all startup profiles" headlineMuted="in one place." items={ITEMS} />;
}
