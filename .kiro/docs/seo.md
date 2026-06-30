# SEO & AI Discoverability

## Goals

- ให้ Google / AI Overview ดึงข้อมูลได้แม่นยำ (FAQPage, HowTo, SoftwareApplication)
- Semantic HTML ช่วย Generative Engine เข้าใจ hierarchy โดยไม่ต้องเดา
- ครบทั้ง canonical, hreflang, OG/Twitter, sitemap, robots.txt

## JSON-LD Schema Markup

### Landing Pages (`/`, `/en/`)

มี 4 schemas:

1. **SoftwareApplication** — ข้อมูลแอพ, pricing offers, URL
2. **FAQPage** — คำถาม-คำตอบทั้งหมด (ดึงจาก `faq.items`)
3. **HowTo** — ขั้นตอนการเริ่มใช้ (ดึงจาก `steps.items`)
4. **Organization** — ข้อมูลแบรนด์, logo

```typescript
// ตัวอย่าง (src/pages/index.astro)
const schema = [
  { '@type': 'SoftwareApplication', ... offers, url },
  { '@type': 'FAQPage', mainEntity: [...questions] },
  { '@type': 'HowTo', step: [...steps] },
  { '@type': 'Organization', name, url, logo },
];
```

### Legal Pages (`/privacy-policy/`, `/terms-and-conditions/`)

มี 1 schema:

- **WebPage** — ชื่อหน้า, description, inLanguage, dateModified, isPartOf WebSite

```typescript
const schema = {
  '@type': 'WebPage',
  name, description, url, inLanguage, dateModified,
  isPartOf: { '@type': 'WebSite', name: 'ChillTax', url: siteUrl },
};
```

### เพิ่มหน้าใหม่ต้องทำ:
1. เลือก schema type ที่เหมาะสม (WebPage, Article, FAQPage, HowTo, etc.)
2. สร้าง schema object ใน page file
3. ส่งผ่าน `schema` prop ให้ BaseLayout

## Semantic HTML Standards

### ที่ใช้ในโปรเจค:

| Element | ใช้ตรงไหน | หน้าที่ |
|---------|-----------|---------|
| `<header>` | BaseLayout (site-header), section headings | Document/section header |
| `<nav>` | Header | Navigation landmark |
| `<main>` | BaseLayout | Primary content |
| `<section>` | ทุก landing section | Thematic grouping |
| `<article>` | CardGrid, PricingSection | Self-contained content |
| `<figure>` + `<figcaption>` | DemoSection (video), Testimonials | Media/quote with caption |
| `<blockquote>` | TestimonialsSection | Quoted content |
| `<details>` + `<summary>` | FaqSection | Collapsible FAQ items |
| `<ol>` / `<ul>` | StepsSection, DemoSection | Ordered/unordered lists |
| `<table>` + `<th scope>` | ComparisonSection | Data table with headers |
| `<time>` | LegalPage | Machine-readable date |
| `<footer>` | BaseLayout, DemoSection (closing) | Section/document footer |
| `<aside>` | CookieBanner | Tangential content (dialog) |

### Rules เมื่อสร้าง component ใหม่:

- ใช้ `<section>` สำหรับ thematic section ที่มี heading
- ใช้ `<article>` สำหรับ self-contained content (card, plan)
- ใช้ `<header>` สำหรับ section-heading (แทน `<div class="section-heading">`)
- ใช้ `<figure>` สำหรับ media content ที่มี caption
- ใช้ `<time>` สำหรับ date/time values
- ใช้ `<footer>` สำหรับ closing/CTA areas ใน section
- เพิ่ม `aria-hidden="true"` สำหรับ decorative elements (icons, shapes)
- ใช้ `aria-label` สำหรับ non-text landmarks

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
<meta property="og:locale" content="th_TH | en_US" />
<meta property="og:title" content={seo.openGraphTitle} />
<meta property="og:description" content={seo.openGraphDescription} />
<meta property="og:image" content="/og-image.svg" />
<meta name="twitter:card" content="summary_large_image" />
```

## Sitemap

Dynamic endpoint at `src/pages/sitemap.xml.ts` — lists all 6 pages.
อัพเดทเมื่อเพิ่มหน้าใหม่

## robots.txt

Dynamic endpoint at `src/pages/robots.txt.ts` — อ่าน site URL จาก env.

## Google Search Console

Conditional meta tag จาก `PUBLIC_GOOGLE_SITE_VERIFICATION` env variable.

## Checklist เมื่อเพิ่มหน้าใหม่

1. ✅ เพิ่ม `SeoContent` ใน locale content
2. ✅ Set canonical URL via `canonicalPath` prop
3. ✅ เพิ่ม hreflang alternates (ทั้ง th + en version)
4. ✅ OG/Twitter meta (auto จาก BaseLayout)
5. ✅ เพิ่มใน `sitemap.xml.ts`
6. ✅ เลือก JSON-LD schema type ที่เหมาะสม
7. ✅ ใช้ semantic HTML tags ที่ถูกต้อง
8. ✅ เพิ่ม `aria-` attributes สำหรับ accessibility
