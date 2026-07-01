# Architecture Decision Records (ADR)

> บันทึกการตัดสินใจเชิงสถาปัตยกรรม แต่ละอันเขียนแบบ: **บริบท → ทางเลือก → ตัดสินใจ → trade-off**
> เพื่อให้คนอ่านเข้าใจว่า "ถ้าบริบทเปลี่ยน อาจเลือกต่างได้" ไม่ใช่กฎตายตัว

รูปแบบ: แต่ละ ADR มีสถานะ `Accepted` / `Superseded` / `Deprecated`

---

## ADR-001: ใช้ Astro เป็น framework หลัก

**สถานะ:** Accepted

**บริบท:** ต้องการ landing page ที่เร็วที่สุดและ SEO ดีที่สุด ทีมเขียน TS/component ได้

**ทางเลือกที่พิจารณา:**
- **Next.js** — ทรงพลังแต่ลาก React runtime มาด้วย (เกินจำเป็นสำหรับหน้า static)
- **HTML/CSS เปล่า** — เบาสุดแต่ไม่มี component reuse, ไม่มี type safety, ทำ i18n ยาก
- **Astro** — เขียน component ได้ แต่ ship เป็น HTML static (zero JS by default)

**ตัดสินใจ:** Astro

**Trade-off ที่ยอมรับ:**
- ✅ ได้ component reuse + TypeScript + zero-JS output
- ✅ มี island architecture เผื่ออนาคตถ้าต้อง interactive
- ⚠️ ทีมต้องเรียนรู้ Astro syntax (แต่คล้าย HTML+JSX เรียนรู้เร็ว)

---

## ADR-002: i18n ด้วย typed TS object ไม่ใช้ i18n library

**สถานะ:** Accepted

**บริบท:** ต้อง 2 ภาษา (ไทย default, อังกฤษ) เนื้อหาเป็น marketing copy ยาวๆ

**ทางเลือกที่พิจารณา:**
- **i18next / astro-i18n** — ทรงพลัง แต่ overhead สูง, runtime lookup, เหมาะกับ string สั้นๆ จำนวนมาก
- **JSON files** — ไม่มี type safety, ลืม field ไม่มีใครเตือน
- **Typed TS object + `satisfies`** — type-safe เต็มที่, ไม่มี runtime cost, IDE autocomplete

**ตัดสินใจ:** Typed TS object ต่อ locale (`th/landing.ts`, `en/landing.ts`) + `satisfies LandingContent`

**Trade-off ที่ยอมรับ:**
- ✅ TypeScript บังคับให้ทุกภาษามี field ครบ (ลืมแปล = build fail)
- ✅ ไม่มี runtime overhead — content ฝังตอน build
- ⚠️ เพิ่มภาษาที่ 3 ต้อง copy โครงสร้างทั้งก้อน (ยอมรับได้ที่ 2-3 ภาษา ถ้าเกิน 5 ภาษาค่อยพิจารณา library)

---

## ADR-003: Thai เป็น default locale ที่ `/`, English ที่ `/en/`

**สถานะ:** Accepted

**บริบท:** กลุ่มเป้าหมายหลักคือคนไทย (ฟรีแลนซ์/แม่ค้าออนไลน์ไทย)

**ตัดสินใจ:** `prefixDefaultLocale: false` — ไทยอยู่ root, อังกฤษมี prefix `/en/`

**Trade-off ที่ยอมรับ:**
- ✅ URL หลัก (`/`) เป็นไทย ตรงกับกลุ่มเป้าหมายส่วนใหญ่
- ✅ `hreflang` + `x-default` ชี้ root ให้ Google เข้าใจ
- ⚠️ ถ้าวันหนึ่งตลาดต่างชาติโตกว่า อาจต้องทบทวน (เปลี่ยน default locale)

---

## ADR-004: External URLs เป็น environment variables

**สถานะ:** Accepted (superseded ADR เดิมที่ hardcode LINE URL)

**บริบท:** CTA เคยชี้ LINE OA ภายหลังเปลี่ยนเป็น product URL (`chilltax.onrender.com/app`)

**ตัดสินใจ:** ทุก external URL = env (`PUBLIC_APP_URL`, `PUBLIC_LINE_URL`, `PUBLIC_SITE_URL`)

**Trade-off ที่ยอมรับ:**
- ✅ เปลี่ยนปลายทางไม่ต้องแตะโค้ด
- ✅ `PUBLIC_LINE_URL` เก็บไว้แม้ยังไม่ใช้ (อนาคตเป็นลิงก์ติดต่อ)
- ⚠️ ต้อง sync env ใน 3 ที่ (`.env`, `env.d.ts`, `deploy.yml`) — มี how-to กำกับ

---

## ADR-005: robots.txt / sitemap.xml / llms.txt เป็น dynamic endpoint

**สถานะ:** Accepted

**บริบท:** ไฟล์เหล่านี้ต้องใส่ base URL ที่ต่างกันตาม environment

**ทางเลือกที่พิจารณา:**
- **Static file ใน `public/`** — ง่าย แต่ hardcode URL, แก้ env ไม่ได้
- **Dynamic endpoint (`.ts` ใน pages/)** — gen ตอน build อ่าน URL จาก env

**ตัดสินใจ:** Dynamic endpoint ทั้งสามไฟล์

**Trade-off ที่ยอมรับ:**
- ✅ URL มาจาก env เดียว ไม่ต้อง hardcode
- ✅ sitemap อัปเดตง่ายเมื่อเพิ่มหน้า
- ⚠️ ต้องจำว่าไฟล์เหล่านี้เป็น code ไม่ใช่ static (อยู่ใน `src/pages/` ไม่ใช่ `public/`)

---

## ADR-006: JSON-LD + llms.txt สำหรับ AI discoverability

**สถานะ:** Accepted

**บริบท:** ผู้ใช้เริ่มถาม AI (ChatGPT/Perplexity) แทน search engine

**ตัดสินใจ:** ใส่ JSON-LD (SoftwareApplication/FAQPage/HowTo/Organization) ทุกหน้า + สร้าง `llms.txt` bilingual

**Trade-off ที่ยอมรับ:**
- ✅ AI ดึงข้อมูลแม่นขึ้น, กล้าอ้างอิงแบรนด์
- ✅ ผ่าน Lighthouse "Agentic Browsing" audit
- ⚠️ ต้อง maintain schema ให้ตรงกับ content (ดึงจาก locale object ได้ ลดความเสี่ยง)

---

## ADR-007: CSS scroll-driven animation แทน JS

**สถานะ:** Accepted

**บริบท:** อยากเพิ่มลูกเล่นตอน scroll โดยไม่เสีย Performance 100

**ทางเลือกที่พิจารณา:**
- **IntersectionObserver + JS** — รองรับทุก browser แต่เพิ่ม main-thread work
- **AOS / library** — เพิ่ม JS bundle
- **CSS `animation-timeline: view()`** — zero JS, compositor thread, แต่รองรับเฉพาะ browser ใหม่

**ตัดสินใจ:** CSS scroll-driven + `@supports` fallback

**Trade-off ที่ยอมรับ:**
- ✅ TBT ยัง 0, CLS ยัง 0
- ✅ browser เก่าเห็นเนื้อหาปกติ (degrade ได้)
- ⚠️ browser เก่า (Firefox/Safari บางเวอร์ชัน) ไม่เห็น animation — ยอมรับได้เพราะเป็น enhancement ไม่ใช่ core

---

## ADR-008: ตัด content-visibility ออกเพื่อให้ animation ทำงาน

**สถานะ:** Accepted (superseded การใช้ content-visibility ก่อนหน้า)

**บริบท:** เคยใส่ `content-visibility: auto` เพื่อ defer การ render section นอกจอ

**ปัญหาที่เจอ:** มันตีกับ `animation-timeline: view()` — section ที่ถูก skip จะกระโดดไปจบ animation ทันทีที่ render ทำให้ไม่เห็นการ fade

**ตัดสินใจ:** เอา content-visibility ออก ใช้ scroll animation แทน

**Trade-off ที่ยอมรับ:**
- ✅ animation ทำงานเห็นชัด
- ✅ หน้าเล็กพอ (ไม่กี่ section) ไม่จำเป็นต้องมี content-visibility — Performance ยัง 100
- ⚠️ ถ้าหน้ายาวขึ้นมากในอนาคต อาจต้องหาทางใช้ทั้งคู่ (เช่น content-visibility เฉพาะ section ที่ไม่มี animation)

---

## ADR-009: Video facade pattern แทน iframe ตรงๆ

**สถานะ:** Accepted

**บริบท:** ต้องฝังคลิปสาธิต (YouTube Short) ในหน้า demo

**ทางเลือกที่พิจารณา:**
- **iframe ตรงๆ** — ง่าย แต่โหลด YouTube JS+cookie ทันที = Performance ร่วง
- **lite-youtube-embed (library)** — ดี แต่เพิ่ม dependency
- **Facade เขียนเอง** — โชว์ poster ก่อน คลิกค่อยโหลด iframe

**ตัดสินใจ:** Facade เขียนเอง (`video-facade.ts`) + `youtube-nocookie.com`

**Trade-off ที่ยอมรับ:**
- ✅ 0 request ไป YouTube ตอนโหลดหน้า
- ✅ ไม่เพิ่ม dependency
- ⚠️ ผู้ใช้ต้องคลิก 1 ครั้งก่อนดู (ยอมรับได้ — แลกกับ perf)

---

## ADR-010: Deploy แบบ manual (workflow_dispatch) ไม่ auto-deploy

**สถานะ:** Accepted

**บริบท:** ใช้ GitHub Pages, ไม่อยากให้ทุก push ขึ้น production

**ตัดสินใจ:** Deploy ผ่าน `deploy.bat` → trigger `workflow_dispatch` manual เท่านั้น

**Trade-off ที่ยอมรับ:**
- ✅ ควบคุมได้ว่าจะ deploy เมื่อไหร่ (push ไม่ = deploy)
- ✅ `deploy.bat` ตรวจ (check + build) ก่อน trigger
- ⚠️ ต้องรัน deploy เอง (ไม่ใช่ปัญหาสำหรับโปรเจคขนาดนี้)

---

## ADR-011: Versioning ด้วย Git tag เท่านั้น ไม่ใส่ version ในตัวเว็บ

**สถานะ:** Accepted

**บริบท:** เว็บ static ไม่เหมือนแอปมือถือที่ผู้ใช้ค้างเวอร์ชันเก่า

**ตัดสินใจ:** ใช้ Git tag (`v1.0.0` = deploy แรก, `v1.1.0` = รอบนี้) ตาม semver. `package.json` version เป็นแค่ placeholder

**Trade-off ที่ยอมรับ:**
- ✅ ผู้ใช้เห็นเวอร์ชันล่าสุดเสมอ (ไม่มี version skew)
- ✅ Git history + tag = audit trail ครบ
- ⚠️ ไม่มีเลข version แสดงบนเว็บ (ไม่จำเป็นสำหรับ landing page)
