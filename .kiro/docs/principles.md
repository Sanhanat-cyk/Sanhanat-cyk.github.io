# Principles — วิญญาณของโปรเจค

> เอกสารนี้ไม่ได้บอกว่าโค้ด "ทำอะไร" (อันนั้นดูที่ architecture.md) แต่บอกว่า **"ทำไมถึงเขียนแบบนี้"**
> เป้าหมายคือ ถ้าต้องสร้าง landing page ตัวใหม่ตั้งแต่ศูนย์ ให้เอาหลักคิดเหล่านี้ไปใช้ซ้ำได้ทันที โดยไม่ต้องเจ็บซ้ำ

---

## หลักคิดแม่บท (North Star)

Landing page ตัวนี้ **ไม่ใช่แอป** — มันคือเครื่องมือการตลาดที่มีหน้าที่เดียว:
**ทำให้คนเข้าใจ ChillTax แล้วกดปุ่มไปใช้งานจริง**

ทุกการตัดสินใจทางเทคนิคจึงวัดด้วยคำถาม 3 ข้อ:

1. **มันทำให้หน้าโหลดเร็วขึ้นหรือช้าลง?** (เร็ว = คนไม่หนี = conversion สูง)
2. **มันทำให้ Google / AI เข้าใจเนื้อหาง่ายขึ้นไหม?** (เจอเรา = มีคนเข้า)
3. **มันทำให้แก้ content / เพิ่มภาษา ได้ง่ายขึ้นไหม?** (เนื้อหาเปลี่ยนบ่อยกว่าโค้ด)

ถ้า feature ไหนไม่ตอบ 3 ข้อนี้ — มันอาจไม่ควรอยู่ในโปรเจคนี้

---

## 1. ทำไม Astro + Zero-JS

**บริบท:** landing page วัดผลที่ความเร็ว + SEO ไม่ใช่ความ interactive

**เหตุผล:**
- JavaScript ทุก KB ที่ส่งไป browser = เวลาที่ใช้ parse + execute = **Total Blocking Time (TBT)** ที่ทำให้หน้า "ค้าง" ตอนโหลด
- Astro render เป็น HTML static ตั้งแต่ build time → browser แค่วาด ไม่ต้องคิด
- เราเขียน TypeScript/component ตอน dev ได้สบาย แต่ผลลัพธ์ที่ส่งให้ user คือ HTML + CSS เกือบล้วน

**กฎที่ตามมา:**
- JS ใส่เฉพาะที่ "ต้องมี interactivity จริงๆ" เท่านั้น (เมนูมือถือ, cookie consent, โหลดวิดีโอ)
- JS ทุกชิ้นต้องเป็น progressive enhancement — ถ้า JS ไม่รัน หน้าต้องยังใช้ได้
- ผลที่ได้: TBT ≈ 0ms, Performance 100

**ถ้าบริบทเปลี่ยน:** ถ้าวันหนึ่งต้องมี dashboard / form ที่ interactive จริง ค่อยพิจารณา island architecture (Astro รองรับ) — แต่ห้ามลาก framework ทั้งก้อนมาเพราะ section เดียว

---

## 2. ทำไม Content แยกจาก Component (typed i18n objects)

**บริบท:** เนื้อหา marketing เปลี่ยนบ่อยมาก (คำโปรย ราคา ฟีเจอร์) และต้องมี 2 ภาษา

**เหตุผล:**
- ถ้า hardcode ข้อความใน component → แก้คำต้องแตะ markup → เสี่ยงพัง layout + ทำ 2 ภาษาต้อง duplicate ทั้ง component
- แยก content เป็น typed object (`th/landing.ts`, `en/landing.ts`) แล้วส่งเข้า component ผ่าน props:
  - แก้ข้อความ = แตะไฟล์เดียว ไม่แตะ UI
  - เพิ่มภาษา = เพิ่ม locale file ใหม่ ใช้ component ตัวเดิม
  - **TypeScript บังคับว่าทุกภาษาต้องมี field ครบ** — ลืมแปลแล้ว build fail ทันที (ดู `satisfies LandingContent`)

**กฎที่ตามมา:**
- Component **ห้าม** import locale file ตรงๆ — รับผ่าน props เท่านั้น
- เพิ่ม field ใหม่ ต้องเพิ่มใน `types.ts` ก่อน แล้ว TS จะไล่บอกว่าต้องเติมที่ไหนบ้าง
- หลักนี้คือสิ่งที่ทำให้ landing page หลายภาษา "scale" ได้โดยไม่ duplicate

---

## 3. ทำไม External Links เป็น Environment Variable

**บริบท:** ปลายทางของปุ่ม CTA เปลี่ยนได้ (เคยชี้ LINE, ตอนนี้ชี้ product URL, อนาคตอาจเปลี่ยนอีก)

**เหตุผล:**
- ถ้า hardcode URL ในทุก component → เปลี่ยนปลายทางทีต้องไล่แก้ทั้งโปรเจค + เสี่ยงตกหล่น
- ดึงออกเป็น env (`PUBLIC_APP_URL`, `PUBLIC_LINE_URL`, `PUBLIC_SITE_URL`):
  - เปลี่ยนปลายทาง = แก้ค่าเดียว
  - แยก config ออกจาก code (12-factor)
  - URL จริงไม่ปนใน source control (อยู่ใน `.env` + GitHub variables)

**กฎที่ตามมา:**
- URL ภายนอกทุกตัว, GA ID, verification token = env ทั้งหมด
- มี fallback เสมอ (`|| '#app'`) เพื่อไม่ให้ build พังตอน env หาย
- `PUBLIC_LINE_URL` เก็บไว้แม้ยังไม่ใช้ — เพราะรู้ว่าอนาคตต้องใช้เป็นลิงก์ติดต่อ

---

## 4. ทำไม SEO ต้องคิดเผื่อ AI ไม่ใช่แค่ Google

**บริบท:** คนเริ่มถาม ChatGPT / Perplexity แทนการ search ปกติ เราอยากให้ AI อ้างอิงแบรนด์เรา

**เหตุผล:**
- **JSON-LD structured data** — บอก machine ตรงๆ ว่าข้อมูลคืออะไร (FAQPage, HowTo, SoftwareApplication) แทนที่จะให้มันเดาจาก markup
- **Semantic HTML** — `<header><nav><main><article>` ช่วยให้ AI เข้าใจลำดับชั้นเนื้อหาโดยไม่ต้องเดา
- **`llms.txt`** — มาตรฐานใหม่ บอก AI ว่าเว็บเรามีอะไร ใช้ยังไง (เหมือน robots.txt แต่สำหรับ LLM)
- **Explicit attribution** — ระบุที่มาข้อมูล (มาตรา 40 ประมวลรัษฎากร) เพื่อให้ AI มั่นใจในความถูกต้องแล้วกล้าอ้างอิง

**กฎที่ตามมา:**
- ทุกหน้าต้องมี JSON-LD ที่เหมาะกับเนื้อหา
- ข้อมูลที่อ้างความถูกต้อง (กฎหมาย ภาษี) ต้องบอกแหล่งที่มา
- เนื้อหา bilingual ใน llms.txt เพื่อให้ AI ทุกภาษาเข้าใจ

---

## 5. ทำไม Animation ต้องเป็น CSS Scroll-Driven

**บริบท:** อยากให้เว็บดูมีชีวิตตอน scroll แต่ห้ามแลกกับ performance ที่ได้ 100 มา

**เหตุผล:**
- วิธีเดิมๆ (IntersectionObserver + JS) = เพิ่ม main-thread work = เสี่ยง TBT
- CSS scroll-driven animation (`animation-timeline: view()`) รันบน **compositor thread** = ไม่แตะ main thread = TBT ยัง 0
- animate **เฉพาะ `opacity` + `transform`** เท่านั้น — สอง property นี้ GPU จัดการได้ ไม่ทำให้ layout ขยับ = **CLS ยัง 0**
- ครอบด้วย `@supports` + `prefers-reduced-motion` → browser เก่าเห็นเนื้อหาปกติ, คนที่ปิด motion ไม่เห็น animation

**กฎที่ตามมา:**
- ห้าม animate `width`/`height`/`margin`/`top` (ทำให้ reflow = CLS พุ่ง)
- ทุก animation ต้องมี fallback (เนื้อหาแสดงครบโดยไม่มี animation ก็ได้)
- hover effect ใช้ `transform` + `box-shadow` + `opacity` เท่านั้นด้วยเหตุผลเดียวกัน

---

## 6. ทำไม Video ต้องใช้ Facade Pattern

**บริบท:** อยากฝังคลิป YouTube แต่ third-party iframe คือตัวฆ่า performance อันดับต้นๆ

**เหตุผล:**
- YouTube iframe โหลด JS + cookie + request หลายสิบตัวทันทีที่หน้าโหลด → Performance ร่วง
- **Facade pattern:** แสดงแค่ "หน้าปก" (gradient + ปุ่ม play) ก่อน → โหลด iframe จริง **เฉพาะตอนผู้ใช้กด**
- ผล: ตอนโหลดหน้า = 0 request ไป YouTube = Performance ไม่กระทบเลย
- ใช้ `youtube-nocookie.com` เพื่อความเป็นส่วนตัว (PDPA)

**กฎที่ตามมา:**
- third-party embed ทุกชนิด (วิดีโอ, แผนที่, social) ควรใช้ facade
- โหลด resource หนักเมื่อ "ผู้ใช้แสดงเจตนา" เท่านั้น ไม่ใช่ตอนโหลดหน้า

---

## 7. บทเรียนที่เจ็บมาแล้ว (อย่าพลาดซ้ำ)

### Dev server ≠ Production
วัด Lighthouse บน `astro dev` (port 4321) ได้ **57 คะแนน** เพราะ dev mode โหลด Vite client + HMR + dev toolbar.
**Production build จริงได้ 100.** → วัด performance ต้อง build แล้ว serve static เท่านั้น (`audit.bat` ใช้ port 8080 แยกจาก dev)

### content-visibility ตีกับ scroll-driven animation
`content-visibility: auto` (ช่วย perf โดยข้าม render ของ section นอกจอ) **ทำให้ scroll animation ไม่ทำงาน** — เพราะตอน section ถูก render มันอยู่ในจอแล้ว view-timeline เลยกระโดดไปจบ animation.
→ เลือกอย่างใดอย่างหนึ่ง หน้านี้เล็กพอ เลยตัด content-visibility ออก ใช้ animation แทน

### npx ใน batch ต้องมี `call`
`npx` บน Windows เป็น `.cmd` — เรียกใน batch โดยไม่มี `call` นำหน้า มันจะ **โยน control ไปไม่กลับมา** ทำให้ audit รันแค่ครั้งเดียวแล้วเงียบ
→ `call npx ...` เสมอ

### ฟอนต์: โหลดเท่าที่ใช้
เดิมโหลด Noto Sans Thai ทั้ง latin + thai subset (ซ้ำซ้อนกับ Outfit) → เสีย 30KB ฟรี
→ Thai font เอาแค่ thai subset, Latin ให้ Outfit จัดการ, preload เฉพาะ font ที่ critical (Thai เพราะ content หลักเป็นไทย)

### Node libuv assertion ตอน deploy บน Windows
`Assertion failed: !(handle->flags & UV_HANDLE_CLOSING)` เกิดตอน process ปิดตัวหลัง build เสร็จแล้ว — เป็น bug ของ Node บน Windows ไม่กระทบผลลัพธ์ ไม่ต้องแก้

---

## 8. Performance Budget (เส้นที่ห้ามข้าม)

| Metric | เป้า | ทำไม |
|--------|------|------|
| Performance | 100 (ยอมรับ 99 จาก variance) | เร็ว = conversion |
| TBT | 0ms | ไม่มี JS บล็อก main thread |
| CLS | 0 | ไม่มี layout ขยับ = ไม่หงุดหงิด |
| LCP | < 1.6s | hero text ต้องเห็นไว |
| ฟอนต์รวม | ~58KB (2 ไฟล์) | ทุก KB คือเวลาโหลด |

**ก่อน merge อะไรก็ตาม ที่อาจกระทบ perf → รัน `audit.bat` ยืนยันว่ายังอยู่ใน budget**

---

## สรุปวิญญาณเป็นประโยคเดียว

> **เขียนให้ developer สบายตอน dev, แต่ส่งให้ user เบาที่สุดตอน runtime —
> ทุกอย่างที่ส่งไป browser ต้องมีเหตุผลว่าทำไมมันคุ้มกับน้ำหนักที่เพิ่ม**
