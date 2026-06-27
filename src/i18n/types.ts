export type Locale = 'th' | 'en';

export interface SeoContent {
	title: string;
	description: string;
	openGraphTitle: string;
	openGraphDescription: string;
}

export interface NavItem {
	label: string;
	href: string;
}

export interface CommonContent {
	brand: string;
	navigation: NavItem[];
	startFree: string;
	menuLabel: string;
	footerDescription: string;
	privacyLabel: string;
	termsLabel: string;
	footerDisclaimer: string;
	copyright: string;
	cookie: {
		title: string;
		description: string;
		accept: string;
		reject: string;
		privacyLink: string;
	};
}

export interface CardContent {
	icon: string;
	title: string;
	description: string;
}

export interface LandingContent {
	seo: SeoContent;
	hero: {
		eyebrow: string;
		title: string;
		highlight: string;
		description: string;
		primaryCta: string;
		secondaryCta: string;
		trust: string[];
		chat: {
			assistant: string;
			status: string;
			userMessage: string;
			reply: string[];
			placeholder: string;
		};
	};
	demo: {
		title: string;
		highlight: string;
		description: string;
		videoLabel: string;
		steps: CardContent[];
		closing: string;
		cta: string;
	};
	painPoints: {
		title: string;
		description: string;
		items: CardContent[];
	};
	benefits: {
		title: string;
		description: string;
		items: CardContent[];
	};
	testimonials: {
		title: string;
		disclaimer: string;
		items: Array<{ quote: string; role: string; label: string }>;
	};
	comparison: {
		title: string;
		description: string;
		columns: string[];
		rows: Array<{ feature: string; values: string[] }>;
		closing: string;
		cta: string;
	};
	features: {
		title: string;
		description: string;
		items: CardContent[];
	};
	pricing: {
		title: string;
		description: string;
		popular: string;
		plans: Array<{
			name: string;
			price: string;
			period: string;
			subtitle: string;
			features: string[];
			cta: string;
			highlighted?: boolean;
		}>;
	};
	steps: {
		title: string;
		description: string;
		items: CardContent[];
		closing: string;
		cta: string;
	};
	faq: {
		title: string;
		items: Array<{ question: string; answer: string }>;
	};
	finalCta: {
		title: string;
		description: string;
		cta: string;
	};
}

export interface LegalPageContent {
	seo: SeoContent;
	title: string;
	updated: string;
	intro: string;
	sections: Array<{
		heading: string;
		paragraphs: string[];
		items?: string[];
	}>;
}
