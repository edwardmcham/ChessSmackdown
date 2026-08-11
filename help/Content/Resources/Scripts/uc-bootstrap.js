/**
 * Chess Smackdown HTML5 Help — toolbar bootstrap.
 *
 * Everything (theme handling, print-to-PDF, and toolbar button injection)
 * lives in this single file so the project's "Add content to head" field
 * — which only accepts exactly ONE root XML element — can reference it
 * with a single <script src="..."> tag instead of four separate lines.
 *
 * Also dynamically injects the toolbar.css <link> tag itself, for the
 * same one-root-element reason — a static <link> alongside a <script>
 * in that field would be a second sibling and fail validation.
 */
(function () {
		'use strict';

		/* ============================================================
		0. Inject the stylesheet link (can't be a static tag — see above)
		============================================================ */
		var cssLink = document.createElement('link');
		cssLink.rel = 'stylesheet';
		cssLink.href = 'Resources/Scripts/toolbar.css';
		document.head.appendChild(cssLink);

		var faviconLink = document.createElement('link');
		faviconLink.rel = 'icon';
		faviconLink.href = 'Resources/Images/favicon.png';
		document.head.appendChild(faviconLink);

		/* ============================================================
		1. THEME — applied immediately, synchronously, before paint
		============================================================ */
		function applyThemeNow() {
			var stored = null;
			try {
				stored = localStorage.getItem('uc-theme');
			} catch (e) {
				// Storage can throw in locked-down contexts — fall through.
			}
			var theme = stored;
			if (!theme) {
				var prefersDark = window.matchMedia &&
					window.matchMedia('(prefers-color-scheme: dark)').matches;
				theme = prefersDark ? 'dark' : 'light';
			}
			document.documentElement.setAttribute('data-theme', theme);
		}
		applyThemeNow();

		function toggleTheme() {
			var current = document.documentElement.getAttribute('data-theme');
			var next = current === 'dark' ? 'light' : 'dark';
			document.documentElement.setAttribute('data-theme', next);
			try {
				localStorage.setItem('uc-theme', next);
			} catch (e) {
				// Toggle still works for this page view even if it can't persist.
			}
			var btn = document.querySelector('.theme-toggle-btn');
			if (btn) {
				btn.setAttribute(
					'aria-label',
					next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
					);
			}
		}

		/* ============================================================
		2. PRINT — opens the PDF in a new tab. No hidden-iframe/silent-
		print trick: testing showed it's unreliable even on desktop
		(the print dialog would open then immediately get closed by
		our own cleanup logic misreading whether it succeeded), and it
		outright fails under file:// during local testing since every
		file is treated as a separate security origin. A plain new-tab
		open works identically on every device and every browser, with
		nothing fragile to debug — one extra click, zero flakiness.
		============================================================ */
		var PDF_URL = 'Resources/PrintPDF/ChessSmackdownPlayersGuide.pdf';

		function printOrOpenPdf() {
			window.open(PDF_URL, '_blank', 'noopener');
		}

		/* ============================================================
		3. TOOLBAR BUTTONS — built and inserted after DOM is ready
		============================================================ */
		function findToolbarTarget() {
			var candidates = [
				'.mc-search-bar',
				'.MCWebHelpFramesetTop',
				'.mc-header-search',
				'.mc-toolbar',
				'header .mc-search',
				'[class*="search-bar"]',
				'[class*="Header"]',
				];
			for (var i = 0; i < candidates.length; i++) {
				var el = document.querySelector(candidates[i]);
				if (el) return el;
			}
			return null;
		}

		function buildPrintButton() {
			var btn = document.createElement('button');
			btn.className = 'print-icon-btn';
			btn.type = 'button';
			btn.setAttribute('aria-label', 'Print user guide');
			btn.title = 'Print user guide';
			btn.innerHTML =
				'<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">' +
				'<path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/>' +
				'</svg>';
			btn.addEventListener('click', printOrOpenPdf);
			return btn;
		}

		function buildThemeButton() {
			var btn = document.createElement('button');
			btn.className = 'theme-toggle-btn';
			btn.type = 'button';
			btn.setAttribute('aria-label', 'Toggle light/dark mode');
			btn.title = 'Toggle light/dark mode';

			var iconDark = document.createElement('span');
			iconDark.className = 'icon-dark';
			iconDark.setAttribute('aria-hidden', 'true');
			iconDark.innerHTML =
				'<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">' +
				'<path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>' +
				'</svg>';

			var iconLight = document.createElement('span');
			iconLight.className = 'icon-light';
			iconLight.setAttribute('aria-hidden', 'true');
			iconLight.innerHTML =
				'<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">' +
				'<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z"/>' +
				'</svg>';

			btn.appendChild(iconDark);
			btn.appendChild(iconLight);
			btn.addEventListener('click', toggleTheme);
			return btn;
		}

		document.addEventListener('DOMContentLoaded', function () {
				var container = document.createElement('span');
				container.className = 'uc-toolbar-buttons';
				container.appendChild(buildPrintButton());
				container.appendChild(buildThemeButton());

				var target = findToolbarTarget();
				if (target) {
					target.appendChild(container);
				} else {
					container.classList.add('uc-toolbar-buttons-floating');
					document.body.appendChild(container);
				}
			});
	})();