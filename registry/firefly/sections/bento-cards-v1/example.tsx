import Image from "next/image";
import { BentoCards, type BentoItem } from "./bento-cards-v1";

/*
 * Final example: the Startupmap homepage "Problems that had never been solved." case-study grid
 * (startupmap/components/sections/case-studies.tsx). Copy is verbatim, trailing spaces included.
 */
const DIR = "/images/examples/bento-cards-v1";

const ITEMS: BentoItem[] = [
  {
    tone: "photo",
    label: "Founder story",
    title: "How a $1B company hired their first founding engineer ",
    visual: (
      <Image
        src={`${DIR}/founder-story-cover.png`}
        alt=""
        fill
        sizes="(min-width: 1280px) 319px, (min-width: 768px) 50vw, 100vw"
        className="object-cover object-top"
      />
    ),
  },
  {
    tone: "dark",
    label: "Hiring stories",
    title: "Brex hires faster with Startupmap ",
    // The source shows the client wordmark as large centred text (41.8 / 44.3 / 38.09px)
    visual: (
      <p className="flex h-full w-full items-center justify-center text-center text-[41.8px] font-semibold leading-[normal] md:text-[44.3px] xl:text-[38.09px]">
        ▱ Brex
      </p>
    ),
  },
  {
    tone: "light",
    label: "Hiring insights",
    title: "What is a Design Engineer and what do they do?",
    // Source: a 67px icon in the top-right corner, level with the label
    visual: (
      <div className="flex h-full w-full items-start justify-end">
        <Image
          src={`${DIR}/hiring-insights-icon.svg`}
          alt=""
          width={67}
          height={67}
          className="size-[73.51px] md:size-[77.92px] xl:size-[67px]"
        />
      </div>
    ),
  },
  {
    tone: "photo",
    label: "Investor stories",
    title: "Building an exceptional team with Startupmap",
    // Source: 334×501 photo, flipped horizontally, left-aligned, 13px above the card top
    visual: (
      <div className="absolute top-[-3.57%] left-0 aspect-[334/501] w-[104.7%] -scale-x-100">
        <Image
          src={`${DIR}/investor-story-portrait.png`}
          alt=""
          fill
          sizes="(min-width: 1280px) 334px, (min-width: 768px) 52vw, 105vw"
          className="object-cover"
        />
      </div>
    ),
  },
];

export default function Example() {
  return <BentoCards id="case-studies" headline="Problems that had never been solved." headlineMuted="So we finally solved them." items={ITEMS} />;
}
