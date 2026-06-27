// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://chilltax.app',
	i18n: {
		locales: ['th', 'en'],
		defaultLocale: 'th',
		routing: {
			prefixDefaultLocale: false,
		},
	},
});
