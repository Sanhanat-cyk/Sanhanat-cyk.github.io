/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_GA_MEASUREMENT_ID?: string;
	readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
	readonly PUBLIC_LINE_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
