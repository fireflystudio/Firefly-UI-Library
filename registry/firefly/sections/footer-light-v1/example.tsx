import { Footer } from "../footer-v1/footer-v1";
import { SolveLogo } from "../navigation-centered-v1/example-logo";

/** Final example: the Solve site footer (logo, tagline, two link columns, sign-up copy and legal line from the live site). */

const COLUMNS = [
  {
    title: "Discover",
    links: [
      { label: "Platform", href: "#platform" },
      { label: "Labs", href: "#labs" },
      { label: "Health", href: "#health" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "About Solve", href: "#about" },
      { label: "Encyclopedia", href: "#encyclopedia" },
    ],
  },
];

export default function Example() {
  return (
    <Footer
      tone="light"
      brand={
        <span className="inline-flex text-text-primary">
          <SolveLogo height={20} />
        </span>
      }
      brandLabel="Solve home"
      tagline="Medicine keeps advancing while the work around it stands still"
      columns={COLUMNS}
      signup={{ label: "Sign up for updates", placeholder: "Enter email adress", confirmation: "Thanks — you're on the list.", buttonLabel: "Sign up" }}
      legal="© 2026 Solve"
    />
  );
}
