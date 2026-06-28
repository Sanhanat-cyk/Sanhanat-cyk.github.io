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

1. Commit the intended release on `master`. The script can push committed changes after confirmation.
2. Run `deploy.bat` from Windows. On the first run, it can install [GitHub CLI](https://cli.github.com/) through `winget` and open the GitHub sign-in flow automatically.

The script verifies that the working tree is clean and synchronized with `origin/master`, runs the checks and production build locally, asks for confirmation, then triggers the `workflow_dispatch` deployment.

## Configuration

Copy `.env.example` to `.env` and provide the production values:

- `PUBLIC_LINE_URL` — LINE OA destination used by calls to action
- `APP_ENV` — selects `development`, `staging`, or `production`
- `GA_MEASUREMENT_ID_DEV` — GA4 property used by development and staging
- `GA_MEASUREMENT_ID_PROD` — GA4 property used by production
- `PUBLIC_GOOGLE_SITE_VERIFICATION` — Google Search Console verification token

## Structure

- `src/layouts/` — shared page shell, metadata, analytics, navigation, footer, and consent UI
- `src/components/landing/` — scoped landing-page sections
- `src/i18n/locales/` — typed Thai and English content
- `src/scripts/` — client-side behavior kept separate from presentation
- `src/pages/` — file-based routes for both locales and legal pages
