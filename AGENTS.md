# ChillTax Landing Page — AI Agent Guide

Static bilingual landing page for **ChillTax** (LINE chatbot tax assistant). Astro 7, GitHub Pages.
**Not the app itself** — marketing site only. Goals: max performance + best SEO.

## Quick Commands

```sh
pnpm install
pnpm astro dev --background       # Dev server (background mode)
pnpm run check                    # TypeScript + Astro diagnostics
pnpm run build                    # Production build
```

## Conventions

- Pure Astro components only (no React/Vue/Svelte, no CSS framework)
- i18n via typed TS objects → components receive content as props
- Thai at `/`, English at `/en/`
- All CTAs → LINE OA via `PUBLIC_LINE_URL`
- Analytics consent-gated (PDPA), manual deploy only

## Detailed Documentation

Read from `.kiro/docs/` when working on specific areas:

| File | Topic |
|------|-------|
| `.kiro/docs/architecture.md` | Project structure, component hierarchy, data flow |
| `.kiro/docs/i18n.md` | Internationalization system, types, locale files |
| `.kiro/docs/styling.md` | CSS design tokens, utility classes, typography |
| `.kiro/docs/seo.md` | Meta tags, structured data, sitemap, hreflang |
| `.kiro/docs/scripts.md` | Client-side JS, consent flow, analytics |
| `.kiro/docs/deployment.md` | CI/CD pipeline, env vars, deploy.bat |
| `.kiro/docs/how-to.md` | Step-by-step: add sections, pages, content |

## Astro Documentation

https://docs.astro.build — Consult for routing, components, styling, i18n.
