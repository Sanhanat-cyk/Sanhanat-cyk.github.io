/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly APP_ENV?: 'development' | 'staging' | 'production';
	readonly GA_MEASUREMENT_ID_DEV?: string;
	readonly GA_MEASUREMENT_ID_PROD?: string;
	readonly PUBLIC_GOOGLE_SITE_VERIFICATION?: string;
	readonly PUBLIC_LINE_URL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
