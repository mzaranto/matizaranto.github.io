/* Interacciones autónomas de la portada. Sin jQuery ni plugins externos. */
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.editorial-menu-toggle');
  var menu = document.querySelector('.editorial-mobile-menu');
  function closeMenu() {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('inert', '');
    menu.classList.remove('is-open');
    document.body.classList.remove('menu-is-open');
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var willOpen = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(willOpen));
      toggle.setAttribute('aria-label', willOpen ? 'Cerrar menú' : 'Abrir menú');
      menu.setAttribute('aria-hidden', String(!willOpen));
      if (willOpen) menu.removeAttribute('inert'); else menu.setAttribute('inert', '');
      menu.classList.toggle('is-open', willOpen);
      document.body.classList.toggle('menu-is-open', willOpen);
    });
    menu.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape') closeMenu(); });
    window.addEventListener('resize', function () { if (window.innerWidth > 760) closeMenu(); });
  }

  // Galería ampliable sin plugin adicional.
  var modal = document.getElementById('gallery-lightbox');
  if (modal) {
    var modalImage = modal.querySelector('img');
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
    var current = 0;
    function showImage(index) {
      if (!items.length) return;
      current = (index + items.length) % items.length;
      var link = items[current];
      var img = link.querySelector('img');
      modalImage.src = link.getAttribute('href');
      modalImage.alt = img ? img.alt : 'Fotografía de una presentación';
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      modal.querySelector('.lightbox-close').focus();
    }
    function closeImage() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      modalImage.removeAttribute('src');
      document.body.style.overflow = '';
    }
    items.forEach(function (item, index) {
      item.addEventListener('click', function (event) { event.preventDefault(); showImage(index); });
    });
    modal.querySelector('.lightbox-close').addEventListener('click', closeImage);
    modal.querySelector('.lightbox-prev').addEventListener('click', function () { showImage(current - 1); });
    modal.querySelector('.lightbox-next').addEventListener('click', function () { showImage(current + 1); });
    modal.addEventListener('click', function (event) { if (event.target === modal) closeImage(); });
    document.addEventListener('keydown', function (event) {
      if (!modal.classList.contains('is-open')) return;
      if (event.key === 'Escape') closeImage();
      if (event.key === 'ArrowLeft') showImage(current - 1);
      if (event.key === 'ArrowRight') showImage(current + 1);
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Evita íconos de imagen rota: conserva el espacio y muestra un fondo neutro.
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      img.classList.add('image-unavailable');
      img.setAttribute('aria-label', 'Imagen no disponible');
      img.style.visibility = 'hidden';
      if (img.parentElement) img.parentElement.classList.add('image-placeholder');
    }, { once: true });
  });

  // Eventos GA4; los enlaces siguen navegando normalmente.
  function track(name, extra) {
    if (typeof window.gtag === 'function') window.gtag('event', name, Object.assign({ page_path: window.location.pathname }, extra || {}));
  }
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) { a.addEventListener('click', function () { track('whatsapp_click'); }); });
  document.querySelectorAll('a[href*="instagram.com"]').forEach(function (a) { a.addEventListener('click', function () { track('instagram_click'); }); });
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) { a.addEventListener('click', function () { track('email_click'); }); });
  document.querySelectorAll('a[href="closeup.html"]').forEach(function (a) { a.addEventListener('click', function () { track('closeup_click'); }); });
  document.querySelectorAll('a[href="salon.html"]').forEach(function (a) { a.addEventListener('click', function () { track('salon_click'); }); });
});
