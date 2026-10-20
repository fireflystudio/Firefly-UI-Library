import Image from "next/image";
import { Footer } from "./footer-v1";

/** Final example: the Startupmap site footer (logo, tagline, columns and sign-up copy from the live site, typos included). */

const COLUMNS = [
  {
    title: "Discover",
    links: [
      { label: "Investors", href: "#investors" },
      { label: "Founders", href: "#founders" },
      { label: "Reader", href: "#reader" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Careers", href: "#careers" },
      {
        label: "Policies",
        links: [
          { label: "Terms", href: "#terms" },
          { label: "Privacy", href: "#privacy" },
          { label: "Cookie policy", href: "#cookies" },
        ],
      },
    ],
  },
];

const MASK = "url(/images/examples/footer-v1/logo-mark-mask.svg)";

/** Startupmap footer logo: 28px light tile with the glyph masked out in the footer colour + light wordmark (129.8 × 38.2). */
function StartupmapFooterLogo() {
  return (
    <span className="flex items-center gap-2">
      <span aria-hidden className="flex size-7 shrink-0 items-center justify-center rounded-[5.6px] bg-surface-muted">
        <span
          className="block size-[11.2px] bg-surface-dark"
          style={{
            maskImage: MASK,
            WebkitMaskImage: MASK,
            maskSize: "11.2px 11.2px",
            WebkitMaskSize: "11.2px 11.2px",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      </span>
      <Image
        src="/images/examples/footer-v1/logo-wordmark.svg"
        alt="Startupmap"
        width={129.816}
        height={38.228}
        className="h-[38.228px] w-[129.816px]"
      />
    </span>
  );
}

export default function Example() {
  return (
    <Footer
      brand={<StartupmapFooterLogo />}
      brandLabel="Startupmap home"
      tagline="The inteligence layer for ventures."
      columns={COLUMNS}
      signup={{
        label: "Sign up for updates",
        placeholder: "Enter email adress",
        confirmation: "Thanks — you’re subscribed.",
      }}
    />
  );
}
