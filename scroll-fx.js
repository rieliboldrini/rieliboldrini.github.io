/* =========================================================================
   Rieli Portfolio — scroll effects
   Dependency-free. Two restrained, editorial motions per the DS:
     1. Reveal-on-scroll  — blocks fade + rise gently as they enter view.
     2. Image parallax    — full-bleed case band + work-card covers drift
        slowly within their frames for depth. No bounce, no overshoot.
   Reveals are driven by getBoundingClientRect on a rAF-throttled scroll
   loop (NOT IntersectionObserver, which is unreliable in some embed
   contexts) so above-the-fold content is never left invisible. A
   MutationObserver re-scans on route changes. Honors reduced-motion.
   ========================================================================= */
(function () {
  var docEl = document.documentElement;
  docEl.classList.add('fx-ready');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var noParallax = reduce || window.matchMedia('(max-width: 880px)').matches;

  /* ---- which blocks reveal ---- */
  var REVEAL = '.samples, .work-head, .work-grid, .cs-lede, ' +
    '.rk-cs-section, .rk-cs-quote, .cs-results, .about-intro, .about-cta, .foot';
  var FADE = '.cs-band';                 // transform-sensitive (already translated)
  var STAGGER = '.cs-meta, .about-meta, .ir-table tbody';

  /* ---- parallax config: element selector + container + amplitude + scale ---- */
  var PX = [
    { sel: '.cs-band img', container: '.cs-band', amp: 30, scale: 1.18 },
    { sel: '.case-card-bg', container: '.case-card', amp: 24, scale: 1.16 }
  ];

  /* ---------- collect reveal targets ---------- */
  var revealItems = [];
  function tagReveal(sel, cls) {
    var els = document.querySelectorAll(sel);
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.__fx) continue;
      el.__fx = 1;
      el.classList.add(cls);
      if (reduce) { el.classList.add('fx-in'); continue; }
      revealItems.push(el);
    }
  }

  /* ---------- parallax ---------- */
  var pxItems = [];
  function collectParallax() {
    if (noParallax) return;
    pxItems = [];
    for (var c = 0; c < PX.length; c++) {
      var cfg = PX[c];
      var els = document.querySelectorAll(cfg.sel);
      for (var i = 0; i < els.length; i++) {
        var el = els[i];
        var container = el.closest(cfg.container) || el.parentElement;
        el.classList.add('fx-px');
        pxItems.push({ el: el, container: container, amp: cfg.amp, scale: cfg.scale });
      }
    }
  }

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  /* ---------- unified rAF loop: reveals + parallax ---------- */
  var ticking = false;
  function update() {
    var vh = window.innerHeight || docEl.clientHeight;

    /* reveal anything whose top has crossed 88% of the viewport */
    if (revealItems.length) {
      var trigger = vh * 0.88;
      var still = [];
      for (var i = 0; i < revealItems.length; i++) {
        var el = revealItems[i];
        var top = el.getBoundingClientRect().top;
        if (top < trigger) { el.classList.add('fx-in'); }
        else { still.push(el); }
      }
      revealItems = still;
    }

    /* parallax drift */
    if (!noParallax) {
      for (var p = 0; p < pxItems.length; p++) {
        var it = pxItems[p];
        var r = it.container.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        var center = r.top + r.height / 2;
        var travel = (center - vh / 2) / (vh / 2 + r.height / 2);
        var y = clamp(travel, -1, 1) * it.amp;
        it.el.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0) scale(' + it.scale + ')';
      }
    }
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  /* ---------- scan + wire ---------- */
  function scan() {
    tagReveal(REVEAL, 'fx-reveal');
    tagReveal(FADE, 'fx-fade');
    tagReveal(STAGGER, 'fx-stagger');
    collectParallax();
    onScroll();
  }

  var scanQueued = false;
  function queueScan() {
    if (scanQueued) return;
    scanQueued = true;
    requestAnimationFrame(function () { scanQueued = false; scan(); });
  }

  var root = document.getElementById('root');
  if (root && 'MutationObserver' in window) {
    new MutationObserver(queueScan).observe(root, { childList: true, subtree: true });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', function () { collectParallax(); onScroll(); }, { passive: true });

  /* route changes also reset scroll → re-evaluate reveals */
  window.addEventListener('hashchange', function () { setTimeout(scan, 30); setTimeout(scan, 200); });

  // initial passes (React may still be mounting)
  scan();
  setTimeout(scan, 60);
  setTimeout(scan, 300);
})();
