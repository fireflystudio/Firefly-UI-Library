import { Button } from "@/components/ui/button";

export type CtaLink = { label: string; href: string };

/**
 * Call-to-action pair used in heroes and closing sections: primary pill + secondary pill,
 * 44px, 8px apart (the ElevenLabs "Sign up · Contact sales" pair). Pass `onDark` on dark sections.
 */
export function HeroCta({
  primary = { label: "Join waitlist", href: "#cta" },
  secondary = { label: "Book a demo", href: "#cta" },
  onDark = false,
  size = "lg",
  className = "",
}: {
  primary?: CtaLink;
  secondary?: CtaLink | null;
  onDark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <Button href={primary.href} variant={onDark ? "primary-on-dark" : "primary"} size={size}>
        {primary.label}
      </Button>
      {secondary ? (
        <Button href={secondary.href} variant={onDark ? "secondary-on-dark" : "secondary"} size={size}>
          {secondary.label}
        </Button>
      ) : null}
    </div>
  );
}
