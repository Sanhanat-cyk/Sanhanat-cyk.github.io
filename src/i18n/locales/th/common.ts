import type { CommonContent } from '../../types';

export const commonTh = {
	brand: 'ChillTax',
	navigation: [
		{ label: 'ฟีเจอร์', href: '#features' },
		{ label: 'ราคา', href: '#pricing' },
		{ label: 'บทความ', href: '#' },
	],
	startFree: 'เริ่มฟรี',
	menuLabel: 'เปิดเมนู',
	footerDescription: 'ภาษีเรื่องชิล แค่พิมพ์ในไลน์',
	privacyLabel: 'นโยบายความเป็นส่วนตัว',
	termsLabel: 'ข้อกำหนดและเงื่อนไข',
	footerDisclaimer:
		'ChillTax เป็นผู้ช่วยภาษีในแชต ช่วยประเมินและเตรียมภาษีให้ง่ายขึ้น ไม่ใช่คำแนะนำทางกฎหมายหรือการบัญชี กรณีซับซ้อนควรปรึกษาผู้เชี่ยวชาญด้านภาษี',
	copyright: '© 2026 ChillTax · ข้อมูลของคุณเก็บตามมาตรฐาน PDPA',
	cookie: {
		title: 'เราให้ความสำคัญกับความเป็นส่วนตัว',
		description:
			'เราใช้คุกกี้ที่จำเป็นเพื่อให้เว็บไซต์ทำงาน และจะใช้คุกกี้วิเคราะห์เมื่อคุณยินยอมเท่านั้น',
		accept: 'ยอมรับคุกกี้วิเคราะห์',
		reject: 'ใช้เฉพาะที่จำเป็น',
		privacyLink: 'อ่านนโยบายความเป็นส่วนตัว',
	},
} satisfies CommonContent;
