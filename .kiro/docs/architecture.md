# Architecture

## Directory Structure

```
src/
├── layouts/BaseLayout.astro       ← Single layout shell (ทุกหน้าใช้ร่วมกัน)
├── components/
│   ├── landing/                   ← Landing page sections (9 components)
│   ├── layout/                    ← Header, Footer, CookieBanner
│   ├── pages/                     ← Page-level orchestrators
│   └── seo/Analytics.astro        ← GA4 meta tag injection
├── i18n/
│   ├── config.ts                  ← Locale config, localizedPath() helper
│   ├── types.ts                   ← All content type definitions
│   └── locales/{th,en}/           ← Typed content objects per locale
├── pages/                         ← File-based routing
├── scripts/                       ← Client-side JS (3 files)
└── styles/global.css              ← Design tokens + base styles
```

## Component Hierarchy

```
BaseLayout.astro
├── <head> (SEO meta, fonts, analytics, JSON-LD)
├── Header.astro (sticky nav, mobile menu, LINE CTA)
├── <main> slot
│   ├── LandingPage.astro (orchestrator)
│   │   ├── HeroSection.astro
│   │   ├── DemoSection.astro
│   │   ├── CardGridSection.astro ×3 (painPoints, benefits, features)
│   │   ├── TestimonialsSection.astro
│   │   ├── ComparisonSection.astro
│   │   ├── PricingSection.astro
│   │   ├── StepsSection.astro
│   │   ├── FaqSection.astro
│   │   └── FinalCtaSection.astro
│   └── LegalPage.astro (privacy policy, terms)
├── Footer.astro
└── CookieBanner.astro
```

## Data Flow

```
Page (src/pages/*.astro)
  → imports locale content (th/landing.ts or en/landing.ts)
  → imports common content (th/common.ts or en/common.ts)
  → passes content as typed props to BaseLayout
    → BaseLayout passes common to Header, Footer, CookieBanner
    → Page slot passes landing content to LandingPage
      → LandingPage passes section-specific content to each section component
```

## Pages & Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/pages/index.astro` | Thai landing page |
| `/en/` | `src/pages/en/index.astro` | English landing page |
| `/privacy-policy/` | `src/pages/privacy-policy.astro` | Thai privacy policy |
| `/en/privacy-policy/` | `src/pages/en/privacy-policy.astro` | English privacy policy |
| `/terms-and-conditions/` | `src/pages/terms-and-conditions.astro` | Thai terms |
| `/en/terms-and-conditions/` | `src/pages/en/terms-and-conditions.astro` | English terms |
| `/sitemap.xml` | `src/pages/sitemap.xml.ts` | Dynamic XML sitemap |

## Landing Page Sections (in order)

1. **HeroSection** — Headline, chat mockup animation, trust badges, dual CTA
2. **DemoSection** — Video placeholder, 4-step visual flow
3. **CardGridSection** (Pain Points) — 3 cards, default tone
4. **CardGridSection** (Benefits) — 3 cards, `tone="warm"`
5. **TestimonialsSection** — Persona quotes (labeled as examples)
6. **ComparisonSection** — Feature comparison table
7. **CardGridSection** (Features) — 6 cards, `columns={3}`
8. **PricingSection** — 3 plans (Free/Pro/Unlimited)
9. **StepsSection** — 4-step onboarding
10. **FaqSection** — Accordion with `<details>`
11. **FinalCtaSection** — Dark panel with LINE CTA

## Reusable Components

**CardGridSection** — ใช้ 3 ครั้งในหน้า landing:
- Props: `id?`, `title`, `description`, `items: CardContent[]`, `tone?: 'warm'`, `columns?: 3`
- Accepts array of `{ icon, title, description }` cards

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `PUBLIC_SITE_URL` | Base URL ของเว็บ (sitemap, robots.txt, canonical, JSON-LD) |
| `PUBLIC_APP_URL` | Product URL สำหรับทุก CTA button |
| `PUBLIC_LINE_URL` | LINE OA (สำรองไว้ใช้เป็นลิงก์ติดต่อ) |
| `PUBLIC_GA_MEASUREMENT_ID` | GA4 measurement ID (consent-gated) |
| `PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console token |
