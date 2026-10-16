# Firefly UI Library

This is the shared component library + public catalogue for all Firefly sites. It is **not** a client site.

Rules live in the Firefly Web Guide Book: `../Firefly web guide book/FIREFLY-WEB-GUIDEBOOK.md` (skill `firefly-web-guidebook`). The library plan and all decisions: `../Firefly web guide book/FIREFLY-UI-LIBRARY-PLAN.md`. Re-read both at the start of every conversation.

## Project facts
- Folder: `FIREFLY/firefly-ui-library`
- Figma: none (components are seeded from Startupmap patterns, rebuilt content-free; the catalogue is designed here in Firefly style)
- GitHub: https://github.com/lukasznosekk/Firefly-UI-Library (public)
- Vercel: https://firefly-ui-library.vercel.app (auto-deploys from `main`; same URL is the registry base in `lib/registry-url.ts`)

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

## Site builder (`/build`)
- `components/catalogue/build-chat.tsx` → `POST /api/plan` (Claude Opus 5.5 via `@anthropic-ai/sdk`, system prompt in `lib/plan/prompt.ts`, component contracts in `lib/plan/catalogue-schema.ts`, plan schema in `lib/plan/types.ts`) → plan stored in localStorage (`components/catalogue/selection.tsx`) → rendered by `lib/plan/render.tsx` on `/preview/plan`.
- Images: `POST /api/images` (OpenAI gpt-image-1, house style appended from `IMAGE_STYLE`), stored in IndexedDB (`lib/plan/image-store.ts`), referenced as `idb:<key>`.
- Keys: `ANTHROPIC_API_KEY`, `OPENAI_API_KEY` (Vercel env + `.env.local`). `AI_MOCK=1` or missing keys in development → `lib/plan/mock-plan.ts` and gradient images, so the UI can be tested offline.
- When a component's props change, update its entry in `catalogue-schema.ts` and the mapping in `render.tsx`.

## Working rules
- Components never contain client content, brands or logos. Props for everything, `<Placeholder>` for every visual by default.
- Never hardcode hex in components — token utilities only (`text-text-primary`, `bg-surface-page` …). Tokens are defined once in `registry/firefly/styles/firefly.css`.
- A change that alters how an existing component looks or behaves = **new version folder** (`hero-split-v2`). Old versions stay.
- "dodaj tę sekcję do biblioteki jako <Name> vN": read the site's section, strip its content, generalise props, create the folder per `docs/ADDING-COMPONENTS.md`, QA, `npm run build`, `npm run lint`.
- Don't run `npm run build` while `npm run dev` is running (shared `.next`). Use `npx tsc --noEmit` + `npm run lint` meanwhile.
- "push" = commit all + push. Never push unasked.
