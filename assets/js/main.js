/* ============================================================
   SIR. — interactie
   Geen frameworks, geen build-stap. Vanilla JS.
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  /* ==========================================================
     1. OVERLAY MENU
     Drie knoppen bedienen hetzelfde menu: de hamburger in de
     header, de punt van "SIR." in de hero en het kruisje in
     het menu zelf.
     ========================================================== */
  (function menu() {
    var panel = document.getElementById('site-menu');
    if (!panel) return;

    var triggers = document.querySelectorAll('[aria-controls="site-menu"]');
    var links = panel.querySelectorAll('.menu__nav a');
    var lastFocused = null;
    var isOpen = false;

    function setOpen(open) {
      if (open === isOpen) return;
      isOpen = open;

      panel.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';

      triggers.forEach(function (btn) {
        btn.setAttribute('aria-expanded', String(open));
      });

      if (open) {
        lastFocused = document.activeElement;
        /* Een frame wachten: het paneel is nog visibility:hidden op het moment
           dat de klasse wordt gezet, en zo'n element kan geen focus krijgen. */
        window.requestAnimationFrame(function () {
          if (isOpen && links[0]) links[0].focus();
        });
      } else if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    triggers.forEach(function (btn) {
      btn.addEventListener('click', function () { setOpen(!isOpen); });
    });

    links.forEach(function (link) {
      link.addEventListener('click', function () { setOpen(false); });
    });

    document.addEventListener('keydown', function (e) {
      if (!isOpen) return;

      if (e.key === 'Escape') { setOpen(false); return; }
      if (e.key !== 'Tab') return;

      /* Focus binnen het menu houden. Bewust op index gebaseerd en niet op
         "staat de focus op het eerste/laatste element": als de focus buiten
         het menu is beland (bv. door een muisklik) haalt dit hem terug. */
      var items = Array.prototype.filter.call(
        panel.querySelectorAll(FOCUSABLE),
        function (el) { return el.offsetParent !== null; }
      );
      if (!items.length) return;

      var current = items.indexOf(document.activeElement);
      var next;

      if (current === -1) {
        next = e.shiftKey ? items.length - 1 : 0;
      } else {
        next = e.shiftKey ? current - 1 : current + 1;
        if (next >= items.length) next = 0;
        if (next < 0) next = items.length - 1;
      }

      e.preventDefault();
      items[next].focus();
    });
  })();

  /* ==========================================================
     2. STICKY HEADER
     Verschijnt pas zodra de hero uit beeld is.
     ========================================================== */
  (function header() {
    var el = document.getElementById('site-header');
    var hero = document.querySelector('.hero');
    if (!el || !hero || !('IntersectionObserver' in window)) {
      if (el) el.classList.add('is-visible');
      return;
    }

    new IntersectionObserver(function (entries) {
      el.classList.toggle('is-visible', !entries[0].isIntersecting);
    }, { rootMargin: '-20% 0px 0px 0px' }).observe(hero);
  })();

  /* ==========================================================
     3. ACTIEVE NAVIGATIE
     ========================================================== */
  (function activeNav() {
    var links = document.querySelectorAll('.site-header__nav a[href^="#"]');
    if (!links.length || !('IntersectionObserver' in window)) return;

    var map = {};
    var sections = [];

    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute('href'));
      if (section) { map[section.id] = link; sections.push(section); }
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.removeAttribute('aria-current'); });
        var active = map[entry.target.id];
        if (active) active.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -45% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  })();

  /* ==========================================================
     4. CARROUSELS
     Werkt op elk element met [data-carousel]. Het aantal slides
     wordt uit de DOM gelezen, dus een slide toevoegen in de
     HTML volstaat — hier hoeft niets te veranderen.
     ========================================================== */
  var carousels = [];

  (function buildCarousels() {
    var AUTOPLAY_MS = 6000;

    document.querySelectorAll('[data-carousel]').forEach(function (root) {
      var track = root.querySelector('.carousel__track');
      var slides = Array.prototype.slice.call(root.querySelectorAll('.carousel__slide'));
      var dotsBox = root.querySelector('.carousel__dots');
      var status = root.querySelector('.carousel__status');
      var prev = root.querySelector('.carousel__arrow--prev');
      var next = root.querySelector('.carousel__arrow--next');

      if (!track || slides.length === 0) return;

      /* Eén slide: bediening is dan zinloos. */
      if (slides.length < 2) {
        if (prev) prev.remove();
        if (next) next.remove();
        if (dotsBox) dotsBox.remove();
        return;
      }

      var index = 0;
      var timer = null;
      var dots = [];

      /* Autoplay draait alleen als GEEN enkele reden om te pauzeren geldt.
         Eén gedeelde toestand voorkomt dat mouseleave of een tab-wissel een
         pauze van een andere oorzaak stilzwijgend opheft. */
      var pause = { hover: false, focus: false, offscreen: true, hidden: false };

      function sync() {
        var run = !reduceMotion &&
          !pause.hover && !pause.focus && !pause.offscreen && !pause.hidden;

        if (run && !timer) {
          timer = window.setInterval(function () { goTo(index + 1, false); }, AUTOPLAY_MS);
        } else if (!run && timer) {
          window.clearInterval(timer);
          timer = null;
        }
      }

      function setPause(reason, on) {
        if (pause[reason] === on) return;
        pause[reason] = on;
        sync();
      }

      /* announce=false bij autoplay: anders leest een schermlezer ongevraagd
         elke zes seconden een nieuw fotonummer voor. */
      function goTo(i, announce) {
        index = (i + slides.length) % slides.length;
        track.style.transform = 'translateX(' + (-index * 100) + '%)';

        dots.forEach(function (d, n) {
          if (n === index) d.setAttribute('aria-current', 'true');
          else d.removeAttribute('aria-current');
        });
        slides.forEach(function (s, n) {
          s.setAttribute('aria-hidden', String(n !== index));
        });
        if (announce && status) {
          status.textContent = 'Foto ' + (index + 1) + ' van ' + slides.length;
        }
      }

      /* Na een gebruikersactie de klok opnieuw laten beginnen — maar alleen
         als er op dat moment geen pauzereden geldt. */
      function step(dir) {
        goTo(index + dir, true);
        if (timer) { window.clearInterval(timer); timer = null; }
        sync();
      }

      if (dotsBox) {
        slides.forEach(function (_, i) {
          var dot = document.createElement('button');
          dot.type = 'button';
          dot.setAttribute('aria-label', 'Foto ' + (i + 1) + ' van ' + slides.length);
          dot.addEventListener('click', function () {
            goTo(i, true);
            if (timer) { window.clearInterval(timer); timer = null; }
            sync();
          });
          dotsBox.appendChild(dot);
          dots.push(dot);
        });
      }

      if (prev) prev.addEventListener('click', function () { step(-1); });
      if (next) next.addEventListener('click', function () { step(1); });

      root.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
        if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      });

      root.addEventListener('mouseenter', function () { setPause('hover', true); });
      root.addEventListener('mouseleave', function () { setPause('hover', false); });
      /* Alleen pauzeren bij toetsenbordfocus. Een muisklik op een pijl of stip
         laat de focus achter op die knop; zou dat ook pauzeren, dan zou de
         autoplay na één klik nooit meer hervatten. */
      root.addEventListener('focusin', function (e) {
        var keyboard = true;
        try { keyboard = e.target.matches(':focus-visible'); } catch (err) { /* oudere browser */ }
        if (keyboard) setPause('focus', true);
      });
      root.addEventListener('focusout', function () { setPause('focus', false); });

      /* --- Vegen op touch --- */
      var startX = null;
      var startY = null;
      root.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse') return;
        startX = e.clientX; startY = e.clientY;
      }, { passive: true });

      root.addEventListener('pointerup', function (e) {
        if (startX === null) return;
        var dx = e.clientX - startX;
        var dy = e.clientY - startY;
        startX = startY = null;
        /* Alleen reageren op een duidelijk horizontale veeg. */
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
      }, { passive: true });

      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (entries) {
          setPause('offscreen', !entries[0].isIntersecting);
        }, { threshold: .25 }).observe(root);
      } else {
        setPause('offscreen', false);
      }

      goTo(0, false);
      carousels.push({ setPause: setPause });
    });
  })();

  /* Eén listener voor alle carrousels — niet één per carrousel. */
  document.addEventListener('visibilitychange', function () {
    carousels.forEach(function (c) { c.setPause('hidden', document.hidden); });
  });

  /* ==========================================================
     5. SCROLL-REVEAL
     ========================================================== */
  (function reveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: .12 });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* ==========================================================
     6. JAARTAL IN DE FOOTER
     ========================================================== */
  (function year() {
    var el = document.querySelector('[data-year]');
    if (el) el.textContent = String(new Date().getFullYear());
  })();

})();
