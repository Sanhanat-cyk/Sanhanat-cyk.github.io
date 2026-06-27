const pages = ['/', '/privacy-policy/', '/terms-and-conditions/', '/en/', '/en/privacy-policy/', '/en/terms-and-conditions/'];
export const GET = ({ site }: { site?: URL }): Response => {
	const base = site ?? new URL('https://chilltax.app');
	const urls = pages.map((path) => `<url><loc>${new URL(path, base).href}</loc></url>`).join('');
	return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
