import Link from "next/link";
import { WEBSITES } from "@/lib/websites";

function siteNames(ids: string[] = []) {
  return ids.map((id) => WEBSITES.find((w) => w.id === id)?.name ?? id);
}

function MonitorIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1.75" y="2.25" width="12.5" height="8.5" rx="1.5" />
      <path d="M5.5 13.75h5M8 10.75v3" />
    </svg>
  );
}

/**
 * Small monitor icon in the top-right corner of a dashboard card preview. It only appears when
 * the component is used on a live website; hovering or focusing it opens a tooltip listing the
 * websites (scales to any number of sites, unlike a row of labels).
 */
export function UsedOnMenu({ ids }: { ids?: string[] }) {
  const names = siteNames(ids);
  if (!names.length) return null;
  const label = `Used on ${names.length} website${names.length > 1 ? "s" : ""}`;
  return (
    <div className="group/used absolute right-3 top-3 z-10">
      <button
        type="button"
        aria-label={`${label}: ${names.join(", ")}`}
        className="flex size-7 cursor-default items-center justify-center rounded-pill border border-border-10 bg-surface-primary/90 text-icon-secondary backdrop-blur-xl transition-colors duration-150 hover:bg-surface-primary hover:text-icon-primary focus-visible:outline-2 focus-visible:outline-border-interactive"
      >
        <MonitorIcon />
      </button>
      <div
        role="tooltip"
        className="pointer-events-none invisible absolute right-0 top-[calc(100%+6px)] min-w-[168px] translate-y-1 rounded-tile border border-border-06 bg-surface-primary p-2 opacity-0 shadow-card-drop transition-[opacity,translate,visibility] duration-150 ease-out group-hover/used:visible group-hover/used:translate-y-0 group-hover/used:opacity-100 group-focus-within/used:visible group-focus-within/used:translate-y-0 group-focus-within/used:opacity-100 motion-reduce:transition-none"
      >
        <p className="px-2 pb-1.5 pt-0.5 text-[11px] leading-[normal] text-text-quaternary">{label}</p>
        <ul className="flex flex-col">
          {names.map((name) => (
            <li key={name} className="flex items-center gap-2 rounded-chip px-2 py-1.5 text-[13px] leading-[normal] text-text-primary">
              <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-status-positive" />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
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
