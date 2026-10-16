# Firefly UI Library

This is the shared component library + public catalogue for all Firefly sites. It is **not** a client site.

Rules live in the Firefly Web Guide Book: `../Firefly web guide book/FIREFLY-WEB-GUIDEBOOK.md` (skill `firefly-web-guidebook`). The library plan and all decisions: `../Firefly web guide book/FIREFLY-UI-LIBRARY-PLAN.md`. Re-read both at the start of every conversation.

## Project facts
- Folder: `FIREFLY/firefly-ui-library`
- Figma: none (components are seeded from Startupmap patterns, rebuilt content-free; the catalogue is designed here in Firefly style)
- GitHub: https://github.com/lukasznosekk/Firefly-UI-Library (public)
- Vercel: (pending — add the `*.vercel.app` URL after the import)

## How this repo is organised
- `app/` — the catalogue site (UI Components dashboard, component pages, Websites gallery, Build site).
- `registry/<item-id>/` — the **source of truth** for each library component (`<Category> <Variant> v<N>`, kebab-case id like `hero-split-v1`). Content-free: placeholder copy and images only, everything via props, only token utility classes.
- `registry/registry.json` — the shadcn-style registry index; `npm run registry:build` writes `public/r/<item>.json` for every item.
- `lib/catalogue.ts` — metadata shown in the catalogue (name, version, category, description, props, changelog).

## Working rules
- Components never contain client content, brands or logos. Props for everything, placeholders by default.
- Never hardcode hex in components — token utilities only (`text-text-primary`, `bg-surface-page` …). Tokens are defined once in `firefly-base`.
- A change that alters how an existing component looks or behaves = **new version** (`-v2`). Old versions stay.
- Adding a section from a site: strip its content, generalise props, add catalogue metadata + registry item, run `npm run registry:build`, `npm run build`, `npm run lint`.
- "push" = commit all + push. Never push unasked.
