import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { reveal } from "@/components/ui/reveal-attr";

/** Catalogue page title: one plain headline, optional actions on the right. */
export function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <h1 {...reveal} className="text-[28px] font-normal leading-[1.1] tracking-[-0.02em] text-text-primary md:text-[32px]">
        {title}
      </h1>
      {children ? (
        <div {...reveal} className="flex flex-wrap items-center gap-2">
          {children}
        </div>
      ) : null}
    </Reveal>
  );
}
