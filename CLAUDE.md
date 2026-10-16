# Firefly UI Library

This is the shared component library + public catalogue for all Firefly sites. It is **not** a client site.

Rules live in the Firefly Web Guide Book: `../Firefly web guide book/FIREFLY-WEB-GUIDEBOOK.md` (skill `firefly-web-guidebook`). The library plan and all decisions: `../Firefly web guide book/FIREFLY-UI-LIBRARY-PLAN.md`. Re-read both at the start of every conversation.

## Project facts
- Folder: `FIREFLY/firefly-ui-library`
- Figma: none (components are seeded from Startupmap patterns, rebuilt content-free; the catalogue is designed here in Firefly style)
- GitHub: https://github.com/lukasznosekk/Firefly-UI-Library (public)
- Vercel: (pending — add the `*.vercel.app` URL after the import, then set it in `lib/registry-url.ts` and rebuild the registry)

## How this repo is organised
- `app/` — the catalogue site: `(catalogue)/` (UI Components dashboard, `/components/[id]`, `/websites`, `/build`) and `preview/` (bare pages rendered inside the preview iframes).
- `components/catalogue/` — catalogue UI only (top bar, cards, scaled iframe frames, selection for "Build site"). Never shipped to sites.
- `registry/firefly/` — the **source of truth** for everything that ships:
  - `styles/firefly.css` + `ui/*` = the `firefly-base` item (tokens, reveal, parallax, buttons, placeholder…). Also used by the catalogue itself via the tsconfig alias `@/components/ui/* → registry/firefly/ui/*`.
  - `base/meta.ts`, `base/preview.tsx` = catalogue entry for the base.
  - `sections/<id>/` = one folder per component: `<id>.tsx` (ships), `meta.ts` (catalogue + registry data), `preview.tsx` (placeholder render). **Auto-discovered** — adding a folder is all it takes.
- `lib/catalogue.ts` reads the folders; `scripts/build-registry.ts` writes `public/r/<id>.json` (+ `registry.json`) — runs automatically before `next build` (`prebuild`), or `npm run registry:build`.
- `public/components.json` — the shadcn config a fresh Firefly site should copy before its first `npx shadcn add`.
- `docs/ADDING-COMPONENTS.md` — the complete brief for adding a component (conventions, tokens, rules, QA). Follow it for every new item; hand it to parallel builders as their brief.

## Working rules
- Components never contain client content, brands or logos. Props for everything, `<Placeholder>` for every visual by default.
- Never hardcode hex in components — token utilities only (`text-text-primary`, `bg-surface-page` …). Tokens are defined once in `registry/firefly/styles/firefly.css`.
- A change that alters how an existing component looks or behaves = **new version folder** (`hero-split-v2`). Old versions stay.
- "dodaj tę sekcję do biblioteki jako <Name> vN": read the site's section, strip its content, generalise props, create the folder per `docs/ADDING-COMPONENTS.md`, QA, `npm run build`, `npm run lint`.
- Don't run `npm run build` while `npm run dev` is running (shared `.next`). Use `npx tsc --noEmit` + `npm run lint` meanwhile.
- "push" = commit all + push. Never push unasked.
