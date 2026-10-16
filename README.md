# Firefly UI Library

Shared, versioned, content-free sections and components for Firefly websites, with a public catalogue.

- **Catalogue:** every component with a live preview at 390 / 834 / 1440, props, install command and changelog. Tick components to assemble a page in **Build site**.
- **Distribution:** shadcn-style registry served from `public/r/`. Sites copy the files and own them.
- **Versioning:** a change in look or behaviour ships as a new folder (`hero-split-v2`); old versions stay available.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4 and `motion`, following the Firefly Web Guide Book.

## Install into a Firefly site

```bash
# once per site: shadcn config, then the base (tokens, reveal, parallax, buttons…)
curl -fsSL https://<catalogue>/components.json -o components.json
npx shadcn@latest add https://<catalogue>/r/firefly-base.json
# then any section
npx shadcn@latest add https://<catalogue>/r/hero-split-v1.json
```

After the base: add `@import "./firefly.css";` under the Tailwind import in `app/globals.css`, load Inter and IBM Plex Mono with `next/font` (`--font-inter`, `--font-plex-mono`) and put `<MotionScript />` in the root layout's `<head>`.

## Build site (AI planner)

`/build` has a chat: describe the site (audience, offer, tone) and the planner composes a page from the library, writes the copy in the house style and proposes one photo per image slot. "Generate images" renders those photos in the cinematic style from the Web Guide Book. The plan lives in the browser (localStorage + IndexedDB) and can be refined in conversation.

Environment variables (Vercel → Settings → Environment Variables, and `.env.local` locally — see `.env.example`):

| Variable | Used for | Without it |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | the planner (Claude Opus 5.5) | production returns a clear error; development returns a sample plan |
| `OPENAI_API_KEY` | photo generation (gpt-image-1) | production returns a clear error; development returns gradient stand-ins |
| `AI_MOCK=1` | force the offline sample mode | — |

## Develop

```bash
npm install
npm run dev            # catalogue on http://localhost:3000
npm run registry:build # regenerate public/r (also runs before next build)
npm run build && npm run lint
```

Adding a component: see `docs/ADDING-COMPONENTS.md`.
