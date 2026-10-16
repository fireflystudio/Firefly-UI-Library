import { Footer } from "./footer-v1";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy policy", href: "#privacy" },
      { label: "Cookie policy", href: "#cookies" },
    ],
  },
];

export default function Preview() {
  return (
    <Footer
      tagline="The quiet layer under your product."
      columns={COLUMNS}
      signup={{ label: "Sign up for updates" }}
      legal="© 2026 Brand. All rights reserved."
    />
  );
}
