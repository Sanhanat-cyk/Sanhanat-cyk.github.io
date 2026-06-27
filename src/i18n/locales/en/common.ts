import type { CommonContent } from '../../types';

export const commonEn = {
	brand: 'ChillTax',
	navigation: [
		{ label: 'Features', href: '#features' },
		{ label: 'Pricing', href: '#pricing' },
		{ label: 'Articles', href: '#' },
	],
	startFree: 'Start free',
	menuLabel: 'Open menu',
	footerDescription: 'Taxes, made chill — right inside LINE.',
	privacyLabel: 'Privacy Policy',
	termsLabel: 'Terms & Conditions',
	footerDisclaimer:
		'ChillTax is a chat-based tax assistant that helps you estimate and prepare your taxes. It is not legal or accounting advice. Please consult a qualified professional for complex cases.',
	copyright: '© 2026 ChillTax · Your data is handled in line with PDPA standards.',
	cookie: {
		title: 'Your privacy matters',
		description:
			'We use essential cookies to run this website. Analytics cookies are used only with your permission.',
		accept: 'Accept analytics',
		reject: 'Essential only',
		privacyLink: 'Read our Privacy Policy',
	},
} satisfies CommonContent;
