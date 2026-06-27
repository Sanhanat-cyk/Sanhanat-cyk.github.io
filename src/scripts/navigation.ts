const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const mobileMenu = document.querySelector<HTMLElement>('[data-mobile-menu]');

const closeMenu = (): void => {
	if (!menuButton || !mobileMenu) return;
	menuButton.setAttribute('aria-expanded', 'false');
	mobileMenu.hidden = true;
	document.body.classList.remove('menu-open');
};

menuButton?.addEventListener('click', () => {
	if (!mobileMenu) return;
	const shouldOpen = menuButton.getAttribute('aria-expanded') !== 'true';
	menuButton.setAttribute('aria-expanded', String(shouldOpen));
	mobileMenu.hidden = !shouldOpen;
	document.body.classList.toggle('menu-open', shouldOpen);
});

mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
window.addEventListener('resize', () => { if (window.innerWidth >= 760) closeMenu(); });
