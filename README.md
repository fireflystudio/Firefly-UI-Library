# Firefly UI Library

Shared, versioned, content-free sections and components for Firefly websites, with a public catalogue.

- **Catalogue:** browse every component with a live preview, props, install command and changelog.
- **Distribution:** shadcn-style registry. In a Firefly site run
  `npx shadcn@latest add https://<catalogue-url>/r/<item>.json` to copy a component into that project.
  Install `firefly-base` first (tokens, reveal system, parallax, buttons).
- **Versioning:** improvements ship as a new version (`navigation-sticky-v2`); old versions stay available.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4 and `motion`, following the Firefly Web Guide Book.

## Develop

```bash
npm install
npm run dev
```

`npm run build` and `npm run lint` must pass before pushing.
