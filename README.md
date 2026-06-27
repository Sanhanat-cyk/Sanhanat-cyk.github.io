# ChillTax Landing Page

Static, bilingual landing page built with Astro. Thai is served at `/` and English at `/en/`.

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

## Manual deployment

Deployment is intentionally manual so regular pushes do not consume GitHub Actions minutes.

1. Commit and push the intended release to `master`.
2. Make sure [GitHub CLI](https://cli.github.com/) is installed and authenticated with `gh auth login`.
3. Run `deploy.bat` from Windows.

The script verifies that the working tree is clean and synchronized with `origin/master`, runs the checks and production build locally, asks for confirmation, then triggers the `workflow_dispatch` deployment.

## Configuration

Copy `.env.example` to `.env` and provide the production values:

- `PUBLIC_LINE_URL` — LINE OA destination used by calls to action
- `PUBLIC_GA_MEASUREMENT_ID` — GA4 measurement ID; analytics loads only after consent
- `PUBLIC_GOOGLE_SITE_VERIFICATION` — Google Search Console verification token

## Structure

- `src/layouts/` — shared page shell, metadata, analytics, navigation, footer, and consent UI
- `src/components/landing/` — scoped landing-page sections
- `src/i18n/locales/` — typed Thai and English content
- `src/scripts/` — client-side behavior kept separate from presentation
- `src/pages/` — file-based routes for both locales and legal pages
