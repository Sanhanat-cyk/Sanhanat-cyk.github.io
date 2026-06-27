import type { Locale } from './types';

export const defaultLocale: Locale = 'th';
export const locales = ['th', 'en'] as const satisfies readonly Locale[];

export const localeTags: Record<Locale, string> = {
	th: 'th-TH',
	en: 'en-US',
};

export const localizedPath = (locale: Locale, path = ''): string => {
	const normalizedPath = path.replace(/^\/+|\/+$/g, '');
	const prefix = locale === defaultLocale ? '' : `/${locale}`;
	return `${prefix}/${normalizedPath}`.replace(/\/{2,}/g, '/');
};
