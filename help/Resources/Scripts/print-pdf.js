/**
 * Print-to-PDF for Ultimate Chess HTML5 Help — CSP-safe version.
 * Same hidden-iframe-with-fallback logic as before; the only change is
 * exposing the function on window so toolbar-buttons.js can wire it up
 * via addEventListener rather than an inline onclick="" attribute
 * (which a strict Content-Security-Policy blocks).
 *
 * IMPORTANT: update PDF_URL below once the corrected PDF's real location
 * is finalized (see project notes — it should live outside any
 * Flare-managed output folder so a future rebuild can't overwrite it).
 */
window.UC_PDF_URL = 'Resources/PrintPDF/UltimateChessPlayersGuide.pdf';

window.ucPrintOrOpenPdf = function (pdfUrl) {
  pdfUrl = pdfUrl || window.UC_PDF_URL;

  if (isLikelyUnsupported()) {
    window.open(pdfUrl, '_blank', 'noopener');
    return;
  }

  var settled = false;
  var iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.setAttribute('aria-hidden', 'true');

  function cleanUp() {
    window.removeEventListener('blur', onBlur);
    if (iframe.parentNode) {
      setTimeout(function () {
        if (iframe.parentNode) iframe.parentNode.removeChild(iframe);
      }, 1000);
    }
  }

  function fallBackToOpen() {
    if (settled) return;
    settled = true;
    cleanUp();
    window.open(pdfUrl, '_blank', 'noopener');
  }

  function confirmSuccess() {
    if (settled) return;
    settled = true;
    cleanUp();
  }

  function onBlur() {
    confirmSuccess();
  }
  window.addEventListener('blur', onBlur);

  iframe.onload = function () {
    try {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    } catch (err) {
      fallBackToOpen();
      return;
    }
    setTimeout(fallBackToOpen, 2500);
  };

  iframe.onerror = function () {
    fallBackToOpen();
  };

  iframe.src = pdfUrl;
  document.body.appendChild(iframe);
};

function isLikelyUnsupported() {
  var ua = navigator.userAgent || '';
  var isIOS = /iPad|iPhone|iPod/.test(ua);
  var isAndroid = /Android/.test(ua);
  return isIOS || isAndroid;
}