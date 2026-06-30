# SEO Implementation

## Overview

SEO ถูก implement ใน `src/layouts/BaseLayout.astro` เป็นหลัก ทุกหน้าใช้ layout เดียวกัน

## Meta Tags (in BaseLayout)

```html
<title>{seo.title}</title>
<meta name="description" content={seo.description} />
<link rel="canonical" href={canonical} />
<link rel="alternate" hreflang="th-TH" href={...} />
<link rel="alternate" hreflang="en-US" href={...} />
<link rel="alternate" hreflang="x-default" href="/" />
```

## hreflang Strategy

- `th-TH` → canonical URL ของหน้า Thai
- `en-US` → URL ของหน้า English
- `x-default` → ชี้ไปที่ root `/` (Thai version)

## Open Graph & Twitter Cards

```html
<meta property="og:type" content="website" />
<meta property="og:locale" content="th_TH" /> <!-- or en_US -->
<meta property="og:title" content={seo.openGraphTitle} />
<meta property="og:description" content={seo.openGraphDescription} />
<meta property="og:image" content="/og-image.svg" />
<meta name="twitter:card" content="summary_large_image" />
```

## Structured Data (JSON-LD)

Landing pages inject 2 schemas via `schema` prop:

1. **SoftwareApplication** — App metadata + pricing offers
2. **FAQPage** — FAQ questions/answers

```astro
{schema && <script is:inline type="application/ld+json" set:html={JSON.stringify(schema)} />}
```

Schemas are constructed in page files (`src/pages/index.astro`, `src/pages/en/index.astro`).

## Sitemap

Dynamic endpoint at `src/pages/sitemap.xml.ts`:

```ts
const pages = ['/', '/privacy-policy/', '/terms-and-conditions/',
               '/en/', '/en/privacy-policy/', '/en/terms-and-conditions/'];
```

เมื่อเพิ่มหน้าใหม่ ต้องเพิ่มใน array นี้ด้วย

## robots.txt

```
User-agent: *
Allow: /
Sitemap: https://sanhanat-cyk.github.io/sitemap.xml
```

## Google Search Console

```html
{googleVerification && <meta name="google-site-verification" content={googleVerification} />}
```

ค่ามาจาก `PUBLIC_GOOGLE_SITE_VERIFICATION` env variable

## Checklist เมื่อเพิ่มหน้าใหม่

1. ✅ เพิ่ม `SeoContent` ใน locale content
2. ✅ Set canonical URL
3. ✅ เพิ่ม hreflang alternates (ทั้ง th + en + x-default)
4. ✅ เพิ่ม OG/Twitter meta
5. ✅ เพิ่มใน `sitemap.xml.ts`
6. ✅ เพิ่ม JSON-LD ถ้าเหมาะสม
