import type { CatalogueItem } from "@/lib/types";

export const meta: CatalogueItem = {
  id: "verb-mobile-player-v1",
  name: "Mobile Player",
  version: 1,
  category: "app-flows",
  area: "app",
  brand: "verb",
  description:
    "The Verb Reader mobile player flow from Figma, working end to end: feed → mini player → full player with scrubber, speed list, summary, queue, menus and snackbars. All 16 designed states are reachable by clicking.",
  interactions: [
    "Feed: ▶ on a summary starts it (Loading, then Playing in the mini player). ⋮ opens Save / Add to queue / Copy / More on …; Add to queue shows a snackbar with Undo.",
    "Tap the mini player to open the full player; the chevron closes it.",
    "Full player: drag or tap the bar to seek, 1× opens the speed list, pause / play, next.",
    "See more opens the whole summary; tap it again to fold it.",
    "Queue: tap a row to play it, ⋮ → Remove (Undo) / Save / Open summary; Clear empties the queue (Undo, then the empty state and a disabled next).",
    "Top ⋮: Save, Copy (Copied), Unfollow, Share feedback, Close player.",
    "Play Design systems are org charts: it fails the first time (Couldn't play this); the retry button loads it again. Where clinical AI… has no cover: the source mark shows instead.",
  ],
  props: [
    { name: "items", type: "PlayerItem[]", default: "Figma sample (5 summaries)", description: "Feed content: { id, title, source, sourceSrc, age, duration (s), excerpt, summary?, cover?, topic?, failsOnce? }." },
    { name: "startId", type: "string | null", default: '"true-happiness"', description: "Summary already in the player on load; null = nothing playing." },
    { name: "startAt", type: "number", default: "32", description: "Seconds already played of the start summary." },
    { name: "queue", type: "string[]", default: "3 ids", description: "Ids queued after the current summary." },
    { name: "title", type: "string", default: '"For you"', description: "Feed header." },
    { name: "trending", type: "string[]", default: "6 topics", description: "Chips next to Trending." },
    { name: "avatarSrc", type: "string", default: "sample portrait", description: "Avatar in the app bar." },
    { name: "newLabel", type: "string", default: '"12m"', description: "Length on the New button (play everything new)." },
    { name: "className", type: "string", description: "Extra classes on the 390 × 844 screen." },
  ],
  changelog: [{ version: "1.0", date: "2026-10-21", notes: "First release from Figma Verb Website design, section Mobile Player (212:36053), 16 states." }],
  files: [
    {
      path: "registry/firefly/sections/verb-mobile-player-v1/verb-mobile-player-v1.tsx",
      target: "components/app/verb-mobile-player-v1.tsx",
      type: "registry:component",
    },
  ],
  registryDependencies: ["firefly-base"],
  order: 10,
  previewDevice: 834,
  previewAlign: "top",
};
