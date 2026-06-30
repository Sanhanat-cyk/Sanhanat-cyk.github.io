# Client-Side Scripts

## Overview

มีแค่ 3 script files — ทั้งหมดเป็น vanilla TypeScript, ไม่ใช้ framework:

```
src/scripts/
├── navigation.ts       ← Mobile hamburger menu
├── cookie-consent.ts   ← PDPA/GDPR consent banner
└── analytics.ts        ← GA4 (consent-gated)
```

## navigation.ts

**ทำอะไร**: Toggle mobile menu

- ฟัง click บน `[data-menu-toggle]` button
- Toggle `aria-expanded`, `hidden` attribute บน `[data-mobile-menu]`
- Toggle `body.menu-open` (scroll lock)
- ปิด menu เมื่อ click link หรือ resize ≥760px

## cookie-consent.ts

**ทำอะไร**: จัดการ cookie consent banner (PDPA compliance)

- Storage key: `chilltax-cookie-consent`
- Values: `'accepted'` | `'essential'`
- ถ้าไม่มีค่าใน localStorage → แสดง banner
- Accept → save 'accepted' + dispatch event
- Reject → save 'essential' + dispatch event
- Custom event: `chilltax:consent` (detail = consent value)

**DOM selectors**:
- `[data-cookie-banner]` — banner container
- `[data-cookie-accept]` — accept button
- `[data-cookie-reject]` — reject button

## analytics.ts

**ทำอะไร**: Load GA4 เฉพาะเมื่อ user ยินยอม

- อ่าน measurement ID จาก `<meta name="chilltax-ga4-id">`
- อ่าน debug mode จาก `<meta name="chilltax-ga4-debug">`
- Load gtag.js แบบ async เมื่อ consent = accepted
- Config: `anonymize_ip: true`, `debug_mode` ใน dev

**Triggers**:
1. On page load: ถ้า localStorage มี 'accepted' → load ทันที
2. On consent event: ฟัง `chilltax:consent` → load ถ้า accepted

## Consent Flow Diagram

```
Page loads
  ├── localStorage has value?
  │   ├── Yes: dispatch 'chilltax:consent' event → analytics.ts loads GA4 if accepted
  │   └── No: show cookie banner
  │
  └── User clicks accept/reject
      → save to localStorage
      → hide banner
      → dispatch 'chilltax:consent' event
      → analytics.ts listens → loads GA4 only if 'accepted'
```

## Analytics Component (src/components/seo/Analytics.astro)

Injects meta tags in `<head>` for scripts to read:

```html
<meta name="chilltax-ga4-id" content={measurementId} />
<meta name="chilltax-ga4-debug" content="true|false" />
```

Only renders if `PUBLIC_GA_MEASUREMENT_ID` is set.
