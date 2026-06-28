// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://sanhanat-cyk.github.io',
	i18n: {
		locales: ['th', 'en'],
		defaultLocale: 'th',
		routing: {
			prefixDefaultLocale: false,
		},
	},
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Noto Sans Thai',
			cssVariable: '--font-noto-sans-thai',
			weights: ['100 900'],
			styles: ['normal'],
			subsets: ['thai', 'latin'],
			fallbacks: ['sans-serif'],
		},
	],
});
