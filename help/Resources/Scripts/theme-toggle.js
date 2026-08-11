/**
 * Theme toggle for Chess Smackdown HTML5 Help — CSP-safe version.
 *
 * This file is loaded via an external <script src="theme-toggle.js"> tag
 * (not inline), so it works under a strict Content-Security-Policy like
 * default-src 'self' — CSP blocks inline <script> content and inline
 * onclick="" attributes, but NOT externally-referenced .js files.
 *
 * applyThemeNow() runs immediately, synchronously, the moment this file
 * is parsed — no separate inline <script>applyStoredThemeEarly()</script>
 * call needed. As long as this <script> tag is placed early in <head>,
 * before any stylesheet links, the theme gets set before first paint,
 * avoiding a flash of the wrong theme on every topic page load.
 */
(function () {
  function applyThemeNow() {
    var stored = null;
    try {
      stored = localStorage.getItem('uc-theme');
    } catch (e) {
      // Storage can throw in locked-down contexts — fall through to
      // system preference instead of erroring out the page.
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

  // Exposed on window so toolbar-buttons.js can call it from a real
  // addEventListener handler (CSP-safe) instead of an inline onclick.
  window.ucToggleTheme = function () {
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
  };
})();
