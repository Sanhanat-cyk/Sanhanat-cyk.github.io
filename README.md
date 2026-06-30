# ChillTax Landing Page

Static, bilingual landing page for [ChillTax](https://sanhanat-cyk.github.io) — a LINE chatbot tax assistant for Thai freelancers, creators, and online sellers.

Built with **Astro 7** for maximum performance (zero JS shipped by default) and optimized for SEO.

- Thai (default): `/`
- English: `/en/`

## Development

```sh
pnpm install
pnpm astro dev --background
```

Manage the background server with:

```sh
pnpm astro dev status
pnpm astro dev logs
pnpm astro dev stop
```

Run validation before deployment:

```sh
pnpm check
pnpm build
```

## Manual Deployment

Deployment is intentionally manual so regular pushes do not consume GitHub Actions minutes.

1. Commit the intended release on `master`. The script can push committed changes after confirmation.
2. Run `deploy.bat` from Windows. On the first run, it can install [GitHub CLI](https://cli.github.com/) through `winget` and open the GitHub sign-in flow automatically.

The script verifies that the working tree is clean and synchronized with `origin/master`, runs the checks and production build locally, asks for confirmation, then triggers the `workflow_dispatch` deployment.

## Configuration

Copy `.env.example` to `.env` and provide the production values:

| Variable | Purpose |
|----------|---------|
| `PUBLIC_LINE_URL` | LINE OA destination used by all calls to action |
| `PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID; analytics loads only after consent |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification token |

## Project Structure

```
src/
├── layouts/BaseLayout.astro       — Page shell (SEO, fonts, analytics, navigation, consent)
├── components/
│   ├── landing/                   — Scoped landing-page sections (11 sections)
│   ├── layout/                    — Header, Footer, CookieBanner
│   ├── pages/                     — Page-level orchestrators
│   └── seo/                       — Analytics component
├── i18n/
│   ├── types.ts                   — All content type definitions
│   ├── config.ts                  — Locale helpers
│   └── locales/{th,en}/           — Typed content objects
├── pages/                         — File-based routes (6 pages + sitemap.xml)
├── scripts/                       — Client-side behavior (navigation, consent, GA4)
└── styles/global.css              — Design tokens and base styles
```

## AI Agent Documentation

For AI coding assistants working on this project:

- **Kiro**: `.kiro/steering/project-overview.md` (auto-loaded as context)
- **Claude Code**: `CLAUDE.md`
- **GitHub Copilot / Others**: `AGENTS.md`

All three point to the same comprehensive project documentation.
