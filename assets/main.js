/* Constance Weber, portfolio: language switch and two small entrance effects */
(function () {
  "use strict";
  const I18N = window.I18N, LANGS = ["en", "fr", "ja"];
  const root = document.documentElement;
  root.classList.add("js");

  function detect() {
    const q = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(q)) return q;
    try { const s = localStorage.getItem("cw-lang"); if (LANGS.includes(s)) return s; } catch (e) { /* ignore */ }
    const nav = (navigator.language || "en").slice(0, 2);
    return LANGS.includes(nav) ? nav : "en";
  }

  function apply(lang) {
    const t = I18N[lang];
    root.lang = lang;
    document.querySelectorAll("[data-k]").forEach((el) => {
      const v = t[el.dataset.k];
      if (v !== undefined) el.textContent = v;
    });
    document.title = t.meta_title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.content = t.meta_desc;
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    // CV: French file in French, English file otherwise
    document.querySelectorAll("[data-cv]").forEach((a) => {
      a.href = lang === "fr" ? I18N.cv.fr : I18N.cv.en;
      a.hidden = !I18N.cv.available;
    });
  }

  // Email links are hidden until an address is set in content/config.json
  document.querySelectorAll('a[href="mailto:"]').forEach((a) => { (a.closest(".mail-text") || a).hidden = true; });

  let lang = detect();
  apply(lang);
  document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => {
    lang = b.dataset.lang;
    try { localStorage.setItem("cw-lang", lang); } catch (e) { /* ignore */ }
    apply(lang);
  }));

  // Name slides up once the fonts are ready
  const ready = () => root.classList.add("ready");
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ready); else ready();
  setTimeout(ready, 1200);

  // The career line draws itself when it comes into view
  const metro = document.querySelector(".metro");
  metro.querySelectorAll("li").forEach((li, i) => li.style.setProperty("--i", i));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { metro.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(metro);
  } else metro.classList.add("in");

  // Thin border under the header once the page scrolls
  const top = document.querySelector(".top");
  const onScroll = () => top.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
