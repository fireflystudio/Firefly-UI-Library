import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";

/** Catalogue page opener: mono eyebrow, two-tone headline, lead paragraph, optional actions. */
export function PageHeader({
  eyebrow,
  title,
  titleMuted,
  lead,
  children,
  size = "lg",
}: {
  eyebrow?: ReactNode;
  title: string;
  titleMuted?: string;
  lead?: ReactNode;
  children?: ReactNode;
  size?: "lg" | "md";
}) {
  return (
    <Reveal stagger={100} className="mx-auto flex max-w-[1392px] flex-col items-start gap-5 pt-[calc(64px+40px)] md:gap-6 md:pt-[calc(64px+64px)]">
      {eyebrow ? (
        <p {...reveal} className="catalogue-eyebrow">
          {eyebrow}
        </p>
      ) : null}
      <h1
        {...reveal}
        className={`max-w-[900px] text-balance font-normal text-text-primary ${
          size === "lg"
            ? "text-[34px] leading-[1.04] tracking-[-0.03em] md:text-[48px] xl:text-[56px]"
            : "text-[30px] leading-[1.06] tracking-[-0.025em] md:text-[40px]"
        }`}
      >
        {title}
        {titleMuted ? <span className="text-text-muted"> {titleMuted}</span> : null}
      </h1>
      {lead ? (
        <p {...reveal} className="max-w-[600px] text-pretty text-[16px] leading-[1.55] text-text-nav md:text-[18px]">
          {lead}
        </p>
      ) : null}
      {children ? (
        <div {...reveal} className="flex flex-wrap items-center gap-2">
          {children}
        </div>
      ) : null}
    </Reveal>
  );
}
