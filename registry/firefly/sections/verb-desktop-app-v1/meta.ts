import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "verb-desktop-app-v1",
  name: "Desktop App",
  version: 1,
  category: "app-flows",
  area: "app",
  brand: "verb",
  description:
    "The Verb Reader desktop app from Figma (For You · 1280, Desktop Player, Audio queue), working end to end at 1280 × 800: sidebar, feed in Excerpt and Compact layouts, article side panel, topic feeds, Add interest, loading / error / empty states, the floating player with queue, speed, menus and snackbars.",
  interactions: [
    "Sidebar: For you, Explore (Pick your sources / people: Sources ↔ Authors, category chips, click a tile to Follow, Following · N lists them), Saved, Summaries; click an interest to open its feed; hover an interest or a source for delete / unfollow (Undo); Show more; collapse to icons.",
    "Feed: hover a row for ▶ and ⋮ (Save / Add to queue / Copy); See more; the list icon top right switches Excerpt ↔ Compact; click a row to open the article panel (previous / next, full width, menu, close).",
    "Trending: scroll the chips, open a topic (Politics fails once: Retry). Add interest: type, pick a suggestion or press Enter.",
    "Audio: Playing · Xm left pauses the session (Resume); New on another feed starts it and offers Restore previous queue; at the end Continue or All caught up.",
    "Player: click the title for the queue (play a row, ⋮ Remove / Save / Open summary, Clear with Undo), 1× for speeds, ⋮ for Save / Copy / Open original / Unfollow / Share feedback / Close player, click the bar to seek.",
  ],
  props: [
    { name: "width / height", type: "number", default: "1280 / 800", description: "Screen size. Use 1728 / 1080 (the Figma desktop frame) when the app is scaled down on a marketing page: everything reads smaller and calmer." },
    { name: "className", type: "string", description: "Extra classes on the screen. Content is the Figma sample." },
  ],
  changelog: [{ version: "1.2", date: "2026-10-21", notes: "Explore screen from Figma (Explore grid – Desktop): Sources / Authors, category chips, masonry grid, Follow adds to the sidebar; 20 tile images in public/images/verb-player/explore." }, { version: "1.1", date: "2026-10-21", notes: "width / height props (Verb hero renders it at 1728 × 1080); type sizes from Figma; article body 16/26." }, { version: "1.0", date: "2026-10-21", notes: "First release from Figma Verb – Reader v2: For You · 1280 (13 frames), 3.1 Desktop Player (12), 3.2 Audio queue desktop (14)." }],
  files: [
    {
      path: "registry/firefly/sections/verb-desktop-app-v1/verb-desktop-app-v1.tsx",
      target: "components/app/verb-desktop-app-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  usedOn: ["verb"],
  order: 5,
  previewDevice: 1440,
  previewAlign: "top",
};
