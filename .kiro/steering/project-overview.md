---
inclusion: always
---

# ChillTax Landing Page — Project Index

## What is this?

ChillTax Landing Page — เว็บ static สำหรับนำเสนอแอพ ChillTax (ผู้ช่วยภาษีในแชต LINE) ไม่ใช่ตัวแอพ
เป้าหมาย: Performance สูงสุด + SEO ดีที่สุด + PDPA compliant

## Tech Stack

Astro 7 (static, zero JS) · TypeScript 6 (strict) · pnpm 10 · Node ≥22.12 · GitHub Pages

**ไม่มี UI framework, ไม่มี CSS framework** — Pure Astro components + CSS variables + scoped styles

## Quick Commands

```sh
pnpm install                        # Install
pnpm astro dev --background         # Dev server
pnpm run check                      # Validate
pnpm run build                      # Build
deploy.bat                          # Manual deploy (Windows)
```

## Documentation Index

รายละเอียดแต่ละหมวดอยู่ใน `.kiro/docs/` — อ่านเมื่อต้องทำงานเกี่ยวข้อง:

| File | เมื่อไหร่ต้องอ่าน |
|------|-------------------|
| `.kiro/docs/architecture.md` | ต้องเข้าใจโครงสร้างโปรเจค, component hierarchy, file layout |
| `.kiro/docs/i18n.md` | เพิ่ม/แก้ข้อความ, เพิ่มภาษา, ทำงานกับ locale files |
| `.kiro/docs/styling.md` | แก้ CSS, เพิ่ม component styles, ใช้ design tokens |
| `.kiro/docs/seo.md` | แก้ meta tags, structured data, sitemap, hreflang |
| `.kiro/docs/scripts.md` | แก้ client-side JS, consent flow, analytics |
| `.kiro/docs/deployment.md` | Deploy, CI/CD, environment variables |
| `.kiro/docs/how-to.md` | เพิ่ม section ใหม่, เพิ่มหน้าใหม่, เพิ่ม content |

## Key Files (Quick Lookup)

- **Layout shell**: `src/layouts/BaseLayout.astro`
- **All types**: `src/i18n/types.ts`
- **i18n helper**: `src/i18n/config.ts`
- **Design tokens**: `src/styles/global.css`
- **Landing orchestrator**: `src/components/pages/LandingPage.astro`
- **Sitemap**: `src/pages/sitemap.xml.ts`
- **Astro config**: `astro.config.mjs`

## Conventions (ต้องจำ)

- Components รับ content ผ่าน **typed props** เท่านั้น — ห้าม import locale files ใน component
- Thai = default locale ที่ `/`, English ที่ `/en/`
- ทุก CTA ชี้ไป product ผ่าน `PUBLIC_APP_URL`
- Analytics โหลดหลัง consent เท่านั้น
- Deploy เป็น manual workflow_dispatch (ไม่ auto-deploy on push)
- **Semantic HTML** — ใช้ `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<figure>`, `<time>`, `<details>` ให้ถูกต้อง
- **JSON-LD Schema** — ทุกหน้าต้องมี structured data ที่เหมาะสม (ดู `.kiro/docs/seo.md`)
