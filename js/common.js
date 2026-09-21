/* ============================================================
   Tiny helpers shared by both pages: toast messages,
   copy-to-clipboard, and the reusable paw-print artwork.
   ============================================================ */

const PAW_PATH =
  '<ellipse cx="9" cy="16" rx="6" ry="8.5" transform="rotate(-16 9 16)"/>' +
  '<ellipse cx="20.5" cy="8" rx="6" ry="8.5" transform="rotate(-5 20.5 8)"/>' +
  '<ellipse cx="33.5" cy="8" rx="6" ry="8.5" transform="rotate(5 33.5 8)"/>' +
  '<ellipse cx="45" cy="16" rx="6" ry="8.5" transform="rotate(16 45 16)"/>' +
  '<path d="M27 25 C34.5 25 43 31 43 40 C43 48.5 36.5 53.5 29.5 53.5 ' +
  'C28 53.5 27.4 52.5 27 51.4 C26.6 52.5 26 53.5 24.5 53.5 ' +
  'C17.5 53.5 11 48.5 11 40 C11 31 19.5 25 27 25 Z"/>';

// Inline paw icon (used by the toast)
const PAW_ICON = '<svg viewBox="0 0 52 56" aria-hidden="true">' + PAW_PATH + '</svg>';

// Cute fallback image if the cat photo can't load
const PAW_PLACEHOLDER = "data:image/svg+xml," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">' +
  '<rect width="200" height="200" fill="#FFE9C7"/>' +
  '<g fill="#D9A05B" transform="translate(74 70)">' + PAW_PATH + '</g></svg>'
);

/* Small dark pill at the bottom of the screen (never alert/confirm) */
function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.innerHTML = PAW_ICON + "<span></span>";
    document.body.appendChild(toast);
  }
  toast.querySelector("span").textContent = message;
  requestAnimationFrame(function () { toast.classList.add("show"); });
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(function () { toast.classList.remove("show"); }, 2600);
}

/* Clipboard with a fallback for older / non-HTTPS contexts */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand("copy"); } catch (_) {}
    ta.remove();
    return ok;
  }
}