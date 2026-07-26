/**
 * Injects the print and theme-toggle buttons into the page after it
 * loads — this sidesteps needing to know Flare's exact internal toolbar
 * markup (which isn't exposed in the Skin's XML file, and would require
 * finding/editing a compiled template we don't have direct access to).
 *
 * Tries a short list of likely selectors for Flare's real toolbar/search
 * area first. If none match, falls back to a small fixed-position
 * floating button pair in the top-right corner — so the feature is
 * ALWAYS present and functional, even if it doesn't end up perfectly
 * inline with Flare's native search box.
 *
 * All event binding uses addEventListener, not inline onclick — required
 * for compatibility with the page's Content-Security-Policy.
 */
document.addEventListener('DOMContentLoaded', function () {
  var container = document.createElement('span');
  container.className = 'uc-toolbar-buttons';

  container.appendChild(buildPrintButton());
  container.appendChild(buildThemeButton());

  var target = findToolbarTarget();
  if (target) {
    target.appendChild(container);
  } else {
    // Fallback: fixed-position floating pair, top-right corner.
    container.classList.add('uc-toolbar-buttons-floating');
    document.body.appendChild(container);
  }
});

/**
 * Tries several likely selectors for Flare's real search/toolbar area.
 * Update or extend this list once you've confirmed the actual class
 * name via browser dev tools (right-click the search box -> Inspect).
 * @returns {Element|null}
 */
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
  btn.addEventListener('click', function () {
    window.ucPrintOrOpenPdf();
  });
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

  btn.addEventListener('click', function () {
    window.ucToggleTheme();
  });
  return btn;
}
