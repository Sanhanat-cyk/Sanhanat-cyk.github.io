// Lightweight YouTube facade: loads the iframe only when the user clicks play.
// Keeps the initial page free of any third-party YouTube requests (zero perf cost).
const facade = document.querySelector<HTMLElement>('[data-video-facade]');

const loadVideo = (): void => {
	if (!facade) return;
	const videoId = facade.dataset.videoId;
	if (!videoId) return;

	const iframe = document.createElement('iframe');
	// YouTube Shorts use the same /embed/ endpoint — no special URL needed.
	iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0&playsinline=1`;
	iframe.title = facade.dataset.videoTitle ?? 'Video';
	iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
	iframe.allowFullscreen = true;
	iframe.className = 'video-frame';

	// Append iframe inside the facade (don't replace — keep the container alive)
	facade.innerHTML = '';
	facade.appendChild(iframe);
	facade.style.cursor = 'default';
	facade.removeAttribute('role');
	facade.removeAttribute('tabindex');
};

facade?.addEventListener('click', loadVideo);
facade?.addEventListener('keydown', (event: KeyboardEvent) => {
	if (event.key === 'Enter' || event.key === ' ') {
		event.preventDefault();
		loadVideo();
	}
});

export {};
