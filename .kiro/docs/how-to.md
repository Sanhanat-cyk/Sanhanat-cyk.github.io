# How-To Guide

## เพิ่ม Landing Section ใหม่

1. สร้าง component: `src/components/landing/NewSection.astro`
2. เพิ่ม type ใน `src/i18n/types.ts`:
   - เพิ่ม property ใน `LandingContent` interface
3. เพิ่ม content ใน **ทั้งสอง** locale:
   - `src/i18n/locales/th/landing.ts`
   - `src/i18n/locales/en/landing.ts`
4. Import + วางใน `src/components/pages/LandingPage.astro`

### ตัวอย่าง component pattern:

```astro
---
interface Props { content: { title: string; description: string } }
const { content } = Astro.props;
---
<section class="new-section section">
  <div class="container">
    <div class="section-heading">
      <h2>{content.title}</h2>
      <p>{content.description}</p>
    </div>
    <!-- section content -->
  </div>
</section>
<style>
  /* scoped styles here */
</style>
```

## เพิ่มหน้าใหม่

1. สร้าง route files:
   - `src/pages/new-page.astro` (Thai)
   - `src/pages/en/new-page.astro` (English)
2. เพิ่ม content type ใน `src/i18n/types.ts`
3. เพิ่ม content ใน locale files (ทั้ง th + en)
4. **อัพเดท sitemap**: เพิ่ม path ใน `src/pages/sitemap.xml.ts` array
5. เพิ่ม link ใน Header/Footer ถ้าต้องการ

### ตัวอย่าง page pattern:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { commonTh } from '../i18n/locales/th/common';
import { newPageTh } from '../i18n/locales/th/new-page';
const lineUrl = import.meta.env.PUBLIC_LINE_URL || '#line';
---
<BaseLayout locale="th" seo={newPageTh.seo} common={commonTh}
  canonicalPath="/new-page/" alternatePath="/en/new-page/">
  <!-- page content -->
</BaseLayout>
```

## แก้ไขข้อความ (Content)

1. หา locale file ที่เกี่ยวข้อง (`th/common.ts`, `th/landing.ts`, หรือ `th/legal.ts`)
2. แก้ข้อความ
3. แก้ **ไฟล์ en/ ด้วย** ถ้าต้อง sync
4. `pnpm run check` เพื่อ verify types

## เพิ่ม Navigation Link

แก้ `navigation` array ใน:
- `src/i18n/locales/th/common.ts`
- `src/i18n/locales/en/common.ts`

```ts
navigation: [
  { label: 'ฟีเจอร์', href: '#features' },
  { label: 'ราคา', href: '#pricing' },
  { label: 'New Link', href: '#new-section' },  // ← เพิ่มตรงนี้
],
```

## เพิ่ม Environment Variable ใหม่

1. เพิ่มใน `.env.example`
2. เพิ่มใน `.env` (local)
3. เพิ่ม type ใน `src/env.d.ts`:
   ```ts
   readonly PUBLIC_NEW_VAR?: string;
   ```
4. เพิ่มใน `.github/workflows/deploy.yml` env section
5. ตั้งค่าใน GitHub repository variables

## ใช้ CardGridSection ซ้ำ

CardGridSection รับ props:

```ts
{
  id?: string;           // สำหรับ anchor link
  title: string;
  description: string;
  items: CardContent[];  // { icon, title, description }[]
  tone?: 'warm';         // เปลี่ยนสีพื้นหลัง
  columns?: 3;           // default = 4 cards per row
}
```

## เพิ่ม JSON-LD Schema

ใส่ใน page file ผ่าน `schema` prop ของ BaseLayout:

```astro
---
const schema = [
  { '@context': 'https://schema.org', '@type': 'WebPage', name: '...' }
];
---
<BaseLayout schema={schema} ...>
```
