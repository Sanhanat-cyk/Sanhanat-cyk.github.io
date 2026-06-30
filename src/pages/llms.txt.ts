export const GET = ({ site }: { site?: URL }): Response => {
	const base = site ?? new URL(import.meta.env.PUBLIC_SITE_URL || 'https://sanhanat-cyk.github.io');
	const url = (path: string): string => new URL(path, base).href;
	const appUrl = import.meta.env.PUBLIC_APP_URL || url('/');

	const body = `# ChillTax

> ผู้ช่วยภาษีในแชต LINE สำหรับฟรีแลนซ์ ครีเอเตอร์ และแม่ค้าออนไลน์ บันทึกรายได้ แยกมาตรา 40 คำนวณภาษี และรู้ยอดที่ต้องจ่ายใน 30 วินาที โดยไม่ต้องเก่งบัญชี
> A LINE chat-based tax assistant for Thai freelancers, creators, and online sellers. Logs income, classifies it under Revenue Code Section 40, estimates tax owed, and warns before filing thresholds — all within 30 seconds.

ChillTax (ชิลล์แทกซ์) เป็นผู้ช่วยภาษีที่ทำงานผ่านแชต LINE ออกแบบมาสำหรับคนที่มีรายได้หลายทาง
เช่น ค่ารีวิว รายได้จากการขายของออนไลน์ และงานฟรีแลนซ์ ระบบช่วยบันทึกรายได้ จัดประเภท
เงินได้ตามมาตรา 40 แห่งประมวลรัษฎากร คำนวณภาษีโดยประมาณ และแจ้งเตือนก่อนถึงเกณฑ์การยื่น

ChillTax is a tax assistant that operates through LINE chat, built for people with multiple
income streams such as review fees, online sales, and freelance work. It records income,
classifies it under Section 40 of the Thai Revenue Code, estimates the approximate tax due,
and alerts users before they reach filing thresholds.

## หน้าหลัก / Main pages

- [หน้าแรก (ภาษาไทย)](${url('/')}): ภาพรวมฟีเจอร์ ราคา และวิธีใช้งาน ChillTax
- [Home (English)](${url('/en/')}): English overview of ChillTax features, pricing, and how it works

## ข้อมูลทางกฎหมาย / Legal

- [นโยบายความเป็นส่วนตัว / Privacy Policy (TH)](${url('/privacy-policy/')}): การจัดการข้อมูลส่วนบุคคลตาม PDPA
- [Privacy Policy (EN)](${url('/en/privacy-policy/')}): How personal data is handled under Thailand's PDPA
- [ข้อกำหนดและเงื่อนไข / Terms (TH)](${url('/terms-and-conditions/')}): เงื่อนไขการใช้บริการ
- [Terms and Conditions (EN)](${url('/en/terms-and-conditions/')}): Terms of service

## เริ่มใช้งาน / Get started

- [เริ่มใช้ ChillTax / Open the app](${appUrl}): เข้าใช้งานแอป ChillTax

## หมายเหตุ / Disclaimer

ChillTax เป็นเครื่องมือช่วยประมาณการภาษีเบื้องต้น ไม่ใช่คำแนะนำทางบัญชีหรือกฎหมายภาษี
การคำนวณอ้างอิงประเภทเงินได้ตามมาตรา 40 แห่งประมวลรัษฎากร ผู้ใช้ควรตรวจสอบกับ
ผู้เชี่ยวชาญด้านภาษีหรือกรมสรรพากรก่อนยื่นแบบแสดงรายการจริง

ChillTax provides preliminary tax estimates only and is not accounting or tax-law advice.
Calculations are based on income categories under Section 40 of the Thai Revenue Code.
Users should verify with a qualified tax professional or the Revenue Department before
filing an actual return.
`;

	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
