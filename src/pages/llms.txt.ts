export const GET = ({ site }: { site?: URL }): Response => {
	const base = site ?? new URL(import.meta.env.PUBLIC_SITE_URL || 'https://sanhanat-cyk.github.io');
	const url = (path: string): string => new URL(path, base).href;
	const appUrl = import.meta.env.PUBLIC_APP_URL || url('/');

	const body = `# ChillTax

> ผู้ช่วยภาษีในแชต LINE สำหรับฟรีแลนซ์ ครีเอเตอร์ และแม่ค้าออนไลน์ บันทึกรายได้ แยกมาตรา 40 คำนวณภาษี และรู้ยอดที่ต้องจ่ายใน 30 วินาที โดยไม่ต้องเก่งบัญชี

ChillTax (ชิลล์แทกซ์) เป็นผู้ช่วยภาษีที่ทำงานผ่านแชต LINE ออกแบบมาสำหรับคนที่มีรายได้หลายทาง
เช่น ค่ารีวิว รายได้จากการขายของออนไลน์ และงานฟรีแลนซ์ ระบบช่วยบันทึกรายได้ จัดประเภท
เงินได้ตามมาตรา 40 แห่งประมวลรัษฎากร คำนวณภาษีโดยประมาณ และแจ้งเตือนก่อนถึงเกณฑ์การยื่น

## หน้าหลัก

- [หน้าแรก (ภาษาไทย)](${url('/')}): ภาพรวมฟีเจอร์ ราคา และวิธีใช้งาน ChillTax
- [Home (English)](${url('/en/')}): English overview of ChillTax features, pricing, and how it works

## ข้อมูลทางกฎหมาย

- [นโยบายความเป็นส่วนตัว](${url('/privacy-policy/')}): การจัดการข้อมูลส่วนบุคคลตาม PDPA
- [ข้อกำหนดและเงื่อนไข](${url('/terms-and-conditions/')}): เงื่อนไขการใช้บริการ

## เริ่มใช้งาน

- [เริ่มใช้ ChillTax](${appUrl}): เข้าใช้งานแอป ChillTax

## หมายเหตุ

ChillTax เป็นเครื่องมือช่วยประมาณการภาษีเบื้องต้น ไม่ใช่คำแนะนำทางบัญชีหรือกฎหมายภาษี
การคำนวณอ้างอิงประเภทเงินได้ตามมาตรา 40 แห่งประมวลรัษฎากร ผู้ใช้ควรตรวจสอบกับ
ผู้เชี่ยวชาญด้านภาษีหรือกรมสรรพากรก่อนยื่นแบบแสดงรายการจริง
`;

	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
