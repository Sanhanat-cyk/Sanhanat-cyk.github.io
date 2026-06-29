declare global {
	interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; }
}

const measurementId = document.querySelector<HTMLMetaElement>('meta[name="chilltax-ga4-id"]')?.content;
const debugMode = document.querySelector<HTMLMetaElement>('meta[name="chilltax-ga4-debug"]')?.content === 'true';
let loaded = false;

const loadAnalytics = (): void => {
	if (!measurementId || loaded) return;
	loaded = true;
	const script = document.createElement('script');
	script.async = true;
	script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
	document.head.append(script);
	window.dataLayer = window.dataLayer ?? [];
	window.gtag = function gtag(..._args: unknown[]): void {
		window.dataLayer?.push(arguments);
	};
	window.gtag('js', new Date());
	window.gtag('config', measurementId, { anonymize_ip: true, debug_mode: debugMode });
};

try { if (localStorage.getItem('chilltax-cookie-consent') === 'accepted') loadAnalytics(); } catch { /* storage unavailable */ }
window.addEventListener('chilltax:consent', ((event: CustomEvent<string>) => { if (event.detail === 'accepted') loadAnalytics(); }) as EventListener);

export {};
