import Link from "next/link";
import { WEBSITES } from "@/lib/websites";

function siteNames(ids: string[] = []) {
  return ids.map((id) => WEBSITES.find((w) => w.id === id)?.name ?? id);
}

/**
 * Tiny label in the top-left corner of a dashboard card preview: which live websites use this
 * component ("● Startupmap", "● Startupmap +1"). Decorative on the card (the card itself is the link).
 */
export function UsedOnBadge({ ids }: { ids?: string[] }) {
  const names = siteNames(ids);
  if (!names.length) return null;
  const label = names.length > 1 ? `${names[0]} +${names.length - 1}` : names[0];
  return (
    <span
      title={`Used on ${names.join(", ")}`}
      className="pointer-events-none absolute left-3 top-3 inline-flex h-[22px] items-center gap-1.5 rounded-pill border border-border-10 bg-surface-primary/90 px-2 text-[11px] font-medium leading-none text-text-primary backdrop-blur-xl"
    >
      <span aria-hidden className="size-1.5 rounded-full bg-status-positive" />
      <span className="sr-only">Used on </span>
      {label}
    </span>
  );
}

/** "Used on" row on a component page: each site links to the Websites tab. */
export function UsedOnRow({ ids }: { ids?: string[] }) {
  const names = siteNames(ids);
  if (!names.length) return null;
  return (
    <p className="flex flex-wrap items-center gap-2 text-[13px] text-text-nav">
      Used on
      {names.map((name) => (
        <Link
          key={name}
          href="/websites"
          className="inline-flex h-[22px] items-center gap-1.5 rounded-pill border border-border-10 bg-surface-primary px-2 text-[11px] font-medium leading-none text-text-primary transition-colors duration-150 hover:bg-button-secondary-hover"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-status-positive" />
          {name}
        </Link>
      ))}
    </p>
  );
}
