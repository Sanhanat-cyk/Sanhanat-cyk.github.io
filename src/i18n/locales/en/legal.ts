import type { LegalPageContent } from '../../types';

export const privacyEn = {
	seo: { title: 'Privacy Policy | ChillTax', description: 'How ChillTax collects, uses, and protects personal data.', openGraphTitle: 'Privacy Policy | ChillTax', openGraphDescription: 'How ChillTax handles personal data.' },
	title: 'Privacy Policy', updated: 'Last updated: June 27, 2026',
	intro: 'ChillTax respects your privacy. This policy describes the data we may collect, why we use it, and the choices available to you under applicable law.',
	sections: [
		{ heading: 'Information we collect', paragraphs: ['We collect only information reasonably needed to provide and secure the service.'], items: ['Account and contact information', 'Income, expense, and tax documents you provide', 'Usage, device, and technical log data', 'Cookie consent preferences'] },
		{ heading: 'How we use information', paragraphs: ['We use data to provide tax organization and estimation features, improve the service, prevent abuse, send service notices, and comply with legal obligations.'] },
		{ heading: 'Cookies and analytics', paragraphs: ['Essential storage remembers your privacy choice. Analytics runs only after consent. You can reset the choice by clearing this site’s browser data.'] },
		{ heading: 'Sharing and retention', paragraphs: ['We may use infrastructure providers under data-protection obligations. We do not sell personal data and retain information only as long as needed for its purpose or required by law.'] },
		{ heading: 'Your rights', paragraphs: ['Subject to applicable law, you may request access, correction, deletion, portability, objection, or withdrawal of consent.'] },
		{ heading: 'Contact', paragraphs: ['For privacy questions or rights requests, contact ChillTax through the official channel published on this website.'] },
	],
} satisfies LegalPageContent;

export const termsEn = {
	seo: { title: 'Terms & Conditions | ChillTax', description: 'Terms governing the use of ChillTax.', openGraphTitle: 'Terms & Conditions | ChillTax', openGraphDescription: 'Terms governing the use of ChillTax.' },
	title: 'Terms & Conditions', updated: 'Last updated: June 27, 2026',
	intro: 'By accessing ChillTax, you agree to these terms. Please read them before using the service.',
	sections: [
		{ heading: 'Service scope', paragraphs: ['ChillTax helps record, organize, and estimate tax information. It is not an accounting firm, law firm, or tax filing representative unless expressly stated in writing.'] },
		{ heading: 'Your responsibilities', paragraphs: ['You are responsible for complete and accurate input, reviewing outputs, and meeting filing obligations.'], items: ['Do not use the service unlawfully', 'Keep your account and devices secure', 'Verify outputs against original documents'] },
		{ heading: 'Plans and payment', paragraphs: ['Plan features, prices, and limits may change with reasonable notice. Renewal and cancellation follow the terms shown during purchase.'] },
		{ heading: 'Limitations', paragraphs: ['Estimates depend on user-provided data and supported rules. Seek qualified advice for complex circumstances.'] },
		{ heading: 'Intellectual property and suspension', paragraphs: ['ChillTax software, names, marks, and content are protected. We may suspend activity that breaches these terms or threatens the service.'] },
		{ heading: 'Changes and contact', paragraphs: ['We may update these terms and will display the latest revision date. Contact us through the official channel shown on this website with questions.'] },
	],
} satisfies LegalPageContent;
