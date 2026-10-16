import Image from "next/image";
import { FeatureRowInteractive } from "./feature-row-interactive-v1";

const IMG = "/images/examples/feature-row-interactive-v1";
const SIZES = "(min-width: 1280px) 720px, (min-width: 768px) 55vw, 100vw";

function Screen({ src, alt }: { src: string; alt: string }) {
  return <Image src={`${IMG}/${src}`} alt={alt} fill sizes={SIZES} className="object-cover" />;
}

/** Final example: the Startupmap homepage "Product / Investors" row (copy and product screens from the live site). */
export default function Example() {
  return (
    <FeatureRowInteractive
      headline="Automated due diligence"
      headlineMuted="for angels and small funds."
      items={[
        {
          title: "Screen the whole pipeline",
          body: "Drop in a deck or a data room. Startupmap runs the diligence, flags the risks and writes the one-page memo in about two minutes.",
          visual: (
            <Screen
              src="startup-cards-mockup.png"
              alt="Startupmap pipeline showing two startup cards, Nexora and Veltrix, with descriptions, sector tags and scores"
            />
          ),
        },
        {
          title: "Decide with institutional discipline",
          body: "Every deal is scored on the checklist an investment committee uses: team, market, traction and terms. You see the reasoning and the red flags before you commit.",
          visual: (
            <Screen
              src="memo-veltrix.png"
              alt="Investment memo for Veltrix: overall score 4.1 out of 5 with verdict Invest; Team 4.5, Market 4.0, Traction 3.5, Terms 4.5; two risks flagged: customer concentration and 9 months of runway"
            />
          ),
        },
        {
          title: "Track every deal in one pipeline",
          body: "From first look to term sheet, every deal sits on one board with its memo, notes and next step attached. Nothing slips between inbox and spreadsheet.",
          visual: (
            <Screen
              src="pipeline-board.png"
              alt="Deal pipeline board with three columns: Screening (Nexora, Verdal), Diligence (Veltrix, Nomi Health) and Decision (Lumio, investment committee on Monday)"
            />
          ),
        },
      ]}
    />
  );
}
