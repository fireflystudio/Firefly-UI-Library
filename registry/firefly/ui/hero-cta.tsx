import { Button } from "@/components/ui/button";

export type CtaLink = { label: string; href: string };

/**
 * Hero call-to-action pair used on every page: a dark primary pill + a ghost secondary pill
 * (no arrow-only buttons). Pass `onDark` on dark sections.
 */
export function HeroCta({
  primary = { label: "Join waitlist", href: "#cta" },
  secondary = { label: "Book a demo", href: "#cta" },
  onDark = false,
  className = "",
}: {
  primary?: CtaLink;
  secondary?: CtaLink | null;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <Button href={primary.href} variant={onDark ? "light" : "dark"}>
        {primary.label}
      </Button>
      {secondary ? (
        <Button
          href={secondary.href}
          variant="ghost"
          className={onDark ? "border-text-on-dark/25 bg-transparent text-text-on-dark" : ""}
        >
          {secondary.label}
        </Button>
      ) : null}
    </div>
  );
}
