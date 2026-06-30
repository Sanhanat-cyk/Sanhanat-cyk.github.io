export const GET = ({ site }: { site?: URL }): Response => {
	const base = site ?? new URL(import.meta.env.PUBLIC_SITE_URL || 'https://sanhanat-cyk.github.io');
	const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', base).href}\n`;
	return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
