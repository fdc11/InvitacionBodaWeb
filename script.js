// ═══════════════════════════════════════════
// INIT GSAP PLUGINS
// ═══════════════════════════════════════════
gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create("expo.out", "M0,0 C0.16,1 0.3,1 1,1");
CustomEase.create("soft.out", "M0,0 C0.25,1 0.5,1 1,1");

// ═══════════════════════════════════════════
// CURSOR DUAL
// ═══════════════════════════════════════════
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');

gsap.set([cursorDot, cursorRing], { opacity: 0, left: -100, top: -100 });

let mouseX = -100, mouseY = -100;
let ringX  = -100, ringY  = -100;
let cursorVisible = false;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  gsap.set(cursorDot, { left: mouseX, top: mouseY });
  if (!cursorVisible) {
    cursorVisible = true;
    gsap.to([cursorDot, cursorRing], { duration: 0.4, opacity: 1, ease: 'power2.out' });
  }
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.1;
  ringY += (mouseY - ringY) * 0.1;
  gsap.set(cursorRing, { left: ringX, top: ringY });
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .gallery-h-item, .detail-card, .tilt-frame').forEach(el => {
  el.addEventListener('mouseenter', () => {
    gsap.to(cursorDot,  { duration: 0.25, scale: 0, opacity: 0, ease: 'power2.out' });
    gsap.to(cursorRing, { duration: 0.4, width: 56, height: 56, marginLeft: -28, marginTop: -28, borderColor: 'rgba(201,169,110,0.9)', ease: 'power3.out' });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(cursorDot,  { duration: 0.25, scale: 1, opacity: 1, ease: 'power2.out' });
    gsap.to(cursorRing, { duration: 0.4, width: 36, height: 36, marginLeft: -18, marginTop: -18, borderColor: 'rgba(201,169,110,0.6)', ease: 'power3.out' });
  });
});

document.addEventListener('mouseleave', () => {
  gsap.to([cursorDot, cursorRing], { duration: 0.3, opacity: 0 });
  cursorVisible = false;
});
document.addEventListener('mouseenter', () => {
  if (cursorVisible) gsap.to([cursorDot, cursorRing], { duration: 0.3, opacity: 1 });
});

// ═══════════════════════════════════════════
// LOADER
// ═══════════════════════════════════════════
const loader      = document.getElementById('luxury-loader');
const mainContent = document.getElementById('wedding-content');
let loaderDone    = false;

function openInvitation() {
  if (loaderDone) return;
  loaderDone = true;

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(loader, {
        duration: 0.9,
        opacity: 0,
        ease: 'power2.inOut',
        onComplete: () => {
          loader.classList.add('hidden');
          mainContent.classList.remove('hidden');
          document.body.style.overflow = 'auto';
          requestAnimationFrame(() => {
            initHeroAnimation();
            initScrollAnimations();
            startCountdown();
            initTiltEffect();
            initGalleryDrag();
            initMagneticButton();
            initRSVP();
            initGalleryLightbox();
          });
        }
      });
    }
  });

  tl
    .to('.envelope-flap', {
      duration: 0.9,
      rotationX: -180,
      transformOrigin: 'top center',
      ease: 'power3.inOut'
    })
    .to('.envelope-letter', {
      duration: 0.8,
      y: -100,
      ease: 'back.out(1.4)'
    }, '-=0.5')
    .to('.envelope-seal', {
      duration: 0.35,
      scale: 0,
      opacity: 0,
      ease: 'power2.in'
    }, '-=0.5')
    .to('.loader-bottom', {
      duration: 0.3,
      opacity: 0,
      y: 10
    }, '-=0.2')
    .to('.envelope-premium', {
      duration: 0.4,
      scale: 0.95,
      opacity: 0,
      ease: 'power2.in'
    });
}

loader.addEventListener('click', openInvitation);
setTimeout(() => { if (!loaderDone) openInvitation(); }, 4500);

// ═══════════════════════════════════════════
// HERO ANIMATION
// ═══════════════════════════════════════════
function initHeroAnimation() {
  const tl = gsap.timeline({ delay: 0.1 });

  tl.from('.hero-img', {
    duration: 2,
    scale: 1.15,
    ease: 'expo.out'
  });

  tl.from('.hero-eyebrow', {
    duration: 1,
    opacity: 0,
    y: 20,
    ease: 'power2.out'
  }, '-=1.6');

  tl.to('.name-first', {
    duration: 1,
    y: 0, opacity: 1,
    ease: 'expo.out'
  }, '-=1.2');

  tl.to('.ampersand-block em', {
    duration: 0.8,
    y: 0, opacity: 1,
    ease: 'expo.out'
  }, '-=0.75');

  tl.to('.name-second', {
    duration: 1,
    y: 0, opacity: 1,
    ease: 'expo.out'
  }, '-=0.8');

  tl.to('.hero-rule', {
    duration: 0.8,
    opacity: 1,
    ease: 'power2.out'
  }, '-=0.4');

  tl.to(['.rule-line.left', '.rule-line.right'], {
    duration: 0.8,
    scaleX: 1,
    ease: 'expo.out',
    stagger: 0
  }, '-=0.6');

  tl.to('.hero-meta', {
    duration: 0.7,
    opacity: 1,
    y: 0,
    ease: 'power2.out'
  }, '-=0.4');

  tl.to('.scroll-cta', {
    duration: 0.7,
    opacity: 1,
    ease: 'power2.out'
  }, '-=0.2');

  gsap.to('.hero-img', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5
    },
    y: 180,
    ease: 'none'
  });

  gsap.to('.hero-content', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'center center',
      end: 'bottom top',
      scrub: 1
    },
    opacity: 0,
    y: -60,
    ease: 'none'
  });
}

// ═══════════════════════════════════════════
// SCROLL ANIMATIONS (sin SplitText)
// ═══════════════════════════════════════════
function initScrollAnimations() {

  // COUNTDOWN
  gsap.from('.count-number', {
    scrollTrigger: { trigger: '.countdown-premium', start: 'top 75%' },
    y: 60, opacity: 0, duration: 1, stagger: 0.12, ease: 'expo.out'
  });
  gsap.from('.count-unit', {
    scrollTrigger: { trigger: '.countdown-premium', start: 'top 70%' },
    y: 20, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.3
  });
  gsap.from('.countdown-deco', {
    scrollTrigger: { trigger: '.countdown-premium', start: 'top 75%' },
    x: 60, opacity: 0, duration: 1.2, ease: 'expo.out', delay: 0.4
  });
  gsap.from('.countdown-sub', {
    scrollTrigger: { trigger: '.countdown-premium', start: 'top 65%' },
    y: 20, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.5
  });

  // HISTORIA
  gsap.from('.tilt-frame', {
    scrollTrigger: { trigger: '.story-luxury', start: 'top 70%' },
    x: -80, opacity: 0, duration: 1.4, ease: 'expo.out'
  });
  gsap.from('.floating-badge', {
    scrollTrigger: { trigger: '.story-luxury', start: 'top 70%' },
    scale: 0, opacity: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 0.6
  });

  // Título de historia (animación completa, sin SplitText)
  gsap.from('.story-heading', {
    scrollTrigger: { trigger: '.story-luxury', start: 'top 75%' },
    y: 40, opacity: 0, duration: 1.2, ease: 'expo.out', delay: 0.3
  });

  gsap.from('.story-divider', {
    scrollTrigger: { trigger: '.story-right', start: 'top 80%' },
    width: 0, duration: 0.8, ease: 'power2.out', delay: 0.6
  });

  gsap.from('.story-paragraph', {
    scrollTrigger: { trigger: '.story-right', start: 'top 80%' },
    y: 30, opacity: 0, duration: 1, stagger: 0.2, ease: 'power2.out', delay: 0.5
  });

  gsap.from('.timeline-item', {
    scrollTrigger: { trigger: '.story-timeline', start: 'top 85%' },
    x: -30, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out'
  });

  // DETALLES
  gsap.from(['.section-label', '.section-title.centered'], {
    scrollTrigger: { trigger: '.details-elegant', start: 'top 75%' },
    y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'expo.out'
  });
  gsap.from('.detail-card', {
    scrollTrigger: { trigger: '.cards-container', start: 'top 80%' },
    y: 60, opacity: 0, duration: 1.1, stagger: 0.2, ease: 'expo.out'
  });
  gsap.from('.info-item', {
    scrollTrigger: { trigger: '.info-grid', start: 'top 85%' },
    y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out'
  });

  // GALERÍA
  gsap.from('.gallery-header .section-label, .gallery-header .section-title', {
    scrollTrigger: { trigger: '.gallery-luxury', start: 'top 80%' },
    y: 30, opacity: 0, duration: 1, stagger: 0.15, ease: 'expo.out'
  });
  gsap.from('.gallery-h-item', {
    scrollTrigger: { trigger: '.gallery-h-wrap', start: 'top 85%' },
    y: 80, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out'
  });

  // CITA
  gsap.from('.quote-mark', {
    scrollTrigger: { trigger: '.quote-section', start: 'top 75%' },
    y: 20, opacity: 0, duration: 0.8, ease: 'power2.out'
  });
  gsap.from('blockquote', {
    scrollTrigger: { trigger: '.quote-section', start: 'top 75%' },
    y: 30, opacity: 0, duration: 0.9, ease: 'power2.out', delay: 0.2
  });
  gsap.from('cite', {
    scrollTrigger: { trigger: '.quote-section', start: 'top 70%' },
    y: 15, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.6
  });

  // RSVP
  gsap.from('.rsvp-container .section-label', {
    scrollTrigger: { trigger: '.rsvp-premium', start: 'top 75%' },
    y: 30, opacity: 0, duration: 0.8, ease: 'expo.out'
  });
  gsap.from('.rsvp-container .section-title', {
    scrollTrigger: { trigger: '.rsvp-premium', start: 'top 72%' },
    y: 40, opacity: 0, duration: 1, ease: 'expo.out', delay: 0.15
  });
  gsap.from('.rsvp-deadline', {
    scrollTrigger: { trigger: '.rsvp-premium', start: 'top 68%' },
    y: 20, opacity: 0, duration: 0.7, ease: 'power2.out', delay: 0.3
  });
  gsap.from('.input-group', {
    scrollTrigger: { trigger: '.luxury-form', start: 'top 85%' },
    y: 25, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', delay: 0.2
  });
  gsap.from('.btn-submit', {
    scrollTrigger: { trigger: '.luxury-form', start: 'top 75%' },
    y: 20, opacity: 0, duration: 0.8, ease: 'expo.out', delay: 0.6
  });

  // FOOTER
  gsap.from('.footer-monogram', {
    scrollTrigger: { trigger: '.footer-luxury', start: 'top 80%' },
    scale: 0.85, opacity: 0, duration: 1.2, ease: 'expo.out'
  });

  // NÚMEROS DE SECCIÓN
  gsap.utils.toArray('.section-number').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el.closest('section'), start: 'top 70%' },
      opacity: 0, y: -20, duration: 1, ease: 'power2.out'
    });
  });

  // ORBS RSVP
  gsap.to('.orb-1', {
    scrollTrigger: { trigger: '.rsvp-premium', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    y: -100, ease: 'none'
  });
  gsap.to('.orb-2', {
    scrollTrigger: { trigger: '.rsvp-premium', start: 'top bottom', end: 'bottom top', scrub: 1.5 },
    y: 80, ease: 'none'
  });
}

// ═══════════════════════════════════════════
// COUNTDOWN
// ═══════════════════════════════════════════
function startCountdown() {
  const target = new Date('2024-11-30T14:00:00').getTime();
  const els = {
    days:    document.getElementById('days'),
    hours:   document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
  };

  function animateFlip(el, val) {
    const newVal = String(val).padStart(2, '0');
    if (el.textContent === newVal) return;
    gsap.timeline()
      .to(el, { duration: 0.15, y: -12, opacity: 0, ease: 'power2.in' })
      .set(el, { textContent: newVal })
      .to(el, { duration: 0.25, y: 0, opacity: 1, ease: 'back.out(1.5)' });
  }

  function update() {
    const diff = target - Date.now();
    if (diff <= 0) {
      Object.values(els).forEach(el => el.textContent = '00');
      return;
    }
    animateFlip(els.days,    Math.floor(diff / 86400000));
    animateFlip(els.hours,   Math.floor((diff % 86400000) / 3600000));
    animateFlip(els.minutes, Math.floor((diff % 3600000) / 60000));
    animateFlip(els.seconds, Math.floor((diff % 60000) / 1000));
  }

  update();
  setInterval(update, 1000);
}

// ═══════════════════════════════════════════
// TILT 3D EFECTO
// ═══════════════════════════════════════════
function initTiltEffect() {
  const frame = document.getElementById('tiltFrame');
  if (!frame) return;

  frame.addEventListener('mousemove', (e) => {
    const r = frame.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  - 0.5) * 2;
    const y = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    gsap.to(frame, {
      duration: 0.6,
      rotateY:  x * 9,
      rotateX: -y * 7,
      transformPerspective: 900,
      ease: 'power2.out'
    });
    gsap.to(frame.querySelector('.tilt-overlay'), {
      duration: 0.4,
      background: `radial-gradient(circle at ${(x * 50) + 50}% ${(y * 50) + 50}%, rgba(201,169,110,0.18), transparent 60%)`,
      ease: 'none'
    });
  });

  frame.addEventListener('mouseleave', () => {
    gsap.to(frame, {
      duration: 0.9,
      rotateY: 0, rotateX: 0,
      ease: 'elastic.out(1, 0.4)'
    });
    gsap.to(frame.querySelector('.tilt-overlay'), {
      duration: 0.4,
      background: 'linear-gradient(135deg, rgba(201,169,110,0.12), transparent 60%)'
    });
  });
}

// ═══════════════════════════════════════════
// GALERÍA DRAG HORIZONTAL
// ═══════════════════════════════════════════
function initGalleryDrag() {
  const wrap  = document.getElementById('galleryWrap');
  const track = document.getElementById('galleryTrack');
  if (!wrap || !track) return;

  let isDragging = false;
  let startX = 0;
  let currentX = 0;
  let targetX = 0;
  const maxDrag = -(track.scrollWidth - wrap.clientWidth + 80);

  function clamp(val, min, max) { return Math.min(Math.max(val, min), max); }

  wrap.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - currentX;
    wrap.style.cursor = 'grabbing';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    targetX = clamp(e.clientX - startX, maxDrag, 0);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
    wrap.style.cursor = 'grab';
  });

  wrap.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX - currentX;
  }, { passive: true });

  wrap.addEventListener('touchmove', (e) => {
    targetX = clamp(e.touches[0].clientX - startX, maxDrag, 0);
  }, { passive: true });

  function dragLoop() {
    currentX += (targetX - currentX) * 0.1;
    gsap.set(track, { x: currentX });
    requestAnimationFrame(dragLoop);
  }
  dragLoop();

  let hasDragged = false;
  wrap.addEventListener('mousedown', () => { hasDragged = false; });
  wrap.addEventListener('mousemove', () => { hasDragged = true; });

  document.querySelectorAll('.gallery-h-item').forEach(item => {
    item.addEventListener('click', () => {
      if (hasDragged) return;
      const imgSrc = item.querySelector('img').src;
      openLightbox(imgSrc);
    });
  });
}

// ═══════════════════════════════════════════
// LIGHTBOX
// ═══════════════════════════════════════════
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(src) {
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

function initGalleryLightbox() {
  // ya integrada arriba
}

// ═══════════════════════════════════════════
// BOTÓN MAGNÉTICO
// ═══════════════════════════════════════════
function initMagneticButton() {
  const btn = document.getElementById('rsvpSubmitBtn');
  if (!btn) return;

  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width  / 2) * 0.28;
    const y = (e.clientY - r.top  - r.height / 2) * 0.28;
    gsap.to(btn, { duration: 0.5, x, y, ease: 'power2.out' });
  });

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { duration: 0.7, x: 0, y: 0, ease: 'elastic.out(1, 0.5)' });
  });
}

// ═══════════════════════════════════════════
// RSVP FORM
// ═══════════════════════════════════════════
function initRSVP() {
  const toggleBtns   = document.querySelectorAll('.toggle-option');
  const dietaryGroup = document.getElementById('dietaryGroup');
  const form         = document.getElementById('rsvpForm');
  const successMsg   = document.getElementById('rsvpSuccessMessage');

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const isYes = btn.dataset.assist === 'yes';
      gsap.to(dietaryGroup, {
        duration: 0.4,
        autoAlpha: isYes ? 1 : 0.35,
        ease: 'power2.out'
      });
      dietaryGroup.querySelector('input').disabled = !isYes;
    });
  });

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');

    gsap.timeline()
      .to(btn, { duration: 0.1, scale: 0.97, ease: 'power2.in' })
      .to(btn, { duration: 0.2, scale: 1, ease: 'back.out(2)' });

    setTimeout(() => {
      const formEls = form.querySelectorAll('.form-row, .input-group.full, .btn-submit');
      gsap.to(formEls, {
        duration: 0.4,
        y: -20,
        opacity: 0,
        stagger: 0.05,
        ease: 'power2.in',
        onComplete: () => {
          formEls.forEach(el => el.style.display = 'none');
          gsap.fromTo(successMsg,
            { opacity: 0, scale: 0.85, display: 'block' },
            { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)', display: 'block' }
          );
          successMsg.classList.remove('hidden');
        }
      });
    }, 600);
  });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    gsap.to(window, {
      duration: 1.4,
      scrollTo: { y: target, offsetY: 0 },
      ease: 'expo.out'
    });
  });
});