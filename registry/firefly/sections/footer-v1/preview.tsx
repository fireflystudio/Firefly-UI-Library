import { Footer } from "./footer-v1";

const COLUMNS = [
  {
    title: "Discover",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#changelog" },
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
