const STORAGE_KEY = 'chilltax-cookie-consent';
type ConsentValue = 'accepted' | 'essential';

const banner = document.querySelector<HTMLElement>('[data-cookie-banner]');
const acceptButton = banner?.querySelector<HTMLButtonElement>('[data-cookie-accept]');
const rejectButton = banner?.querySelector<HTMLButtonElement>('[data-cookie-reject]');

const saveConsent = (value: ConsentValue): void => {
	localStorage.setItem(STORAGE_KEY, value);
	banner?.setAttribute('hidden', '');
	window.dispatchEvent(new CustomEvent('chilltax:consent', { detail: value }));
};

try {
	const saved = localStorage.getItem(STORAGE_KEY) as ConsentValue | null;
	if (!saved) banner?.removeAttribute('hidden');
	else window.dispatchEvent(new CustomEvent('chilltax:consent', { detail: saved }));
} catch {
	banner?.removeAttribute('hidden');
}

acceptButton?.addEventListener('click', () => saveConsent('accepted'));
rejectButton?.addEventListener('click', () => saveConsent('essential'));
