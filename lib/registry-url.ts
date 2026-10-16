/**
 * Public base URL of the catalogue. The registry JSON files live at `<url>/r/<id>.json`.
 * Set NEXT_PUBLIC_REGISTRY_URL on Vercel (or edit the fallback) once the project has its domain.
 */
export const REGISTRY_URL = (
  process.env.NEXT_PUBLIC_REGISTRY_URL ?? "https://firefly-ui-library.vercel.app"
).replace(/\/$/, "");

export const BASE_ITEM_ID = "firefly-base";

export const itemUrl = (id: string) => `${REGISTRY_URL}/r/${id}.json`;

/** One command that installs every given item (shadcn accepts several URLs). */
export const installCommand = (ids: string[]) =>
  `npx shadcn@latest add ${ids.map(itemUrl).join(" ")}`;
