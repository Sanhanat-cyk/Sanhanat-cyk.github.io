// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://sanhanat-cyk.github.io',
	compressHTML: true,
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
			weights: ['400 800'],
			styles: ['normal'],
			subsets: ['thai'],
			fallbacks: ['sans-serif'],
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Outfit',
			cssVariable: '--font-outfit',
			weights: ['700 800'],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
		},
	],
});
