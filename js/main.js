// ── Mobile nav toggle ──────────────────────────────────
const toggle   = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── Publication tabs ────────────────────────────────────
function showPubs(type, btn) {
  document.querySelectorAll('.pub-group').forEach(g => g.classList.add('hidden'));
  document.querySelectorAll('.pub-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('pub-' + type).classList.remove('hidden');
  btn.classList.add('active');
}

// ── Navbar accent on scroll ─────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.borderBottomColor = window.scrollY > 60
    ? 'rgba(184,149,42,.5)'
    : 'rgba(184,149,42,.25)';
});

// ── Active nav link highlight ───────────────────────────
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('.nav-links a');
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navItems.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.style.color = '#d4af50';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' }).observe
&& sections.forEach(s => new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navItems.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active) active.style.color = '#d4af50';
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' }).observe(s));

// ── Lightbox for gallery & conference photos ─────────────
const lb    = document.createElement('div');
lb.id       = 'lightbox';
lb.innerHTML = '<button id="lightbox-close" aria-label="Close">&times;</button><img id="lb-img" src="" alt="" />';
document.body.appendChild(lb);

const lbImg   = document.getElementById('lb-img');
const lbClose = document.getElementById('lightbox-close');

function openLightbox(src, alt) {
  lbImg.src = src; lbImg.alt = alt || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
lbClose.addEventListener('click', closeLightbox);
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
function closeLightbox() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

// Wire up all gallery and conf-photo images
document.querySelectorAll('.gallery-item img, .conf-photos img').forEach(img => {
  img.style.cursor = 'pointer';
  img.addEventListener('click', () => openLightbox(img.src, img.alt));
});
