import type { ComponentType } from "react";
import { BASE_ITEM_ID } from "./registry-url";
import type { PreviewProps } from "./types";

/**
 * Loads the "final" example (real content) for a section, or null when the folder has no example.tsx.
 */
export async function loadExample(id: string): Promise<ComponentType<PreviewProps> | null> {
  if (!/^[a-z0-9-]+$/.test(id)) return null;
  try {
    const mod = (await import(`@/registry/firefly/sections/${id}/example`)) as { default: ComponentType<PreviewProps> };
    return mod.default;
  } catch {
    return null;
  }
}

/**
 * Loads the preview component for an item (server side). Previews live next to the
 * component: registry/firefly/sections/<id>/preview.tsx, default export.
 */
export async function loadPreview(id: string): Promise<ComponentType<PreviewProps> | null> {
  if (id === BASE_ITEM_ID) return (await import("@/registry/firefly/base/preview")).default;
  if (!/^[a-z0-9-]+$/.test(id)) return null;
  try {
    const mod = (await import(`@/registry/firefly/sections/${id}/preview`)) as { default: ComponentType<PreviewProps> };
    return mod.default;
  } catch {
    return null;
  }
}
