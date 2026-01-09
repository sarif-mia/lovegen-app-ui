// Background crossfade slider with click + swipe + pager
document.addEventListener('DOMContentLoaded', function () {
  const layerA = document.querySelector('.bg');
  const layerB = document.querySelector('.bg-next');
  const pager = document.querySelector('.pager');
  const chevronBtn = document.querySelector('.icon.chevron');
  const appEl = document.querySelector('.app');
  const badge = document.querySelector('.badge-new');
  if (!layerA || !layerB) return;

  // Slides with per-slide labels
  const slides = [
    { src: 'https://cdn.shopify.com/s/files/1/0837/4475/1921/files/DIP07395_443181f0-774e-4b17-a361-b2cc15dc9994.webp?v=1764613737', label: 'NEW' },
    { src: 'https://cdn.shopify.com/s/files/1/0837/4475/1921/files/lovegen-boxy-fit-premium-black-tee_8.webp?v=1763546270', label: 'WOMEN' },
    { src: 'https://cdn.shopify.com/s/files/1/0837/4475/1921/files/DIP07393_2f2746bd-42ac-4b03-9a1d-e3f443d81a0a.webp?v=1759909680', label: 'MEN' }
  ];

  // Preload
  slides.forEach(s => { const img = new Image(); img.src = s.src; });

  // Build pager
  if (pager) {
    pager.innerHTML = slides.map((_, i) => `<span class="dot" data-idx="${i}"></span>`).join('');
  }
  const dots = pager ? Array.from(pager.querySelectorAll('.dot')) : [];

  let current = 0;
  let activeLayer = layerA;
  let inactiveLayer = layerB;
  activeLayer.style.backgroundImage = `url("${slides[current].src}")`;
  inactiveLayer.style.backgroundImage = `url("${slides[(current + 1) % slides.length].src}")`;

  function updateDots() { dots.forEach((d, i) => d.classList.toggle('active', i === current)); }
  function updateBadge() { if (badge) badge.textContent = slides[current].label || ''; }
  updateDots();
  updateBadge();

  const intervalMs = 5000;
  let timer = null;
  function resetTimer() { if (timer) clearInterval(timer); timer = setInterval(nextSlide, intervalMs); }

  function showSlide(nextIndex) {
    const next = (nextIndex + slides.length) % slides.length;
    if (next === current) return;
    current = next;
    inactiveLayer.style.backgroundImage = `url("${slides[current].src}")`;
    inactiveLayer.style.opacity = '1';
    activeLayer.style.opacity = '0';
    const tmp = activeLayer; activeLayer = inactiveLayer; inactiveLayer = tmp;
    updateDots();
    updateBadge();
  }

  function nextSlide() { showSlide(current + 1); }
  function prevSlide() { showSlide(current - 1); }

  resetTimer();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { if (timer) clearInterval(timer); }
    else { resetTimer(); }
  });

  if (chevronBtn) chevronBtn.addEventListener('click', () => { resetTimer(); nextSlide(); });
  if (pager) pager.addEventListener('click', (e) => {
    const target = e.target.closest('.dot');
    if (target && target.dataset.idx != null) { resetTimer(); showSlide(parseInt(target.dataset.idx, 10)); }
    else { resetTimer(); nextSlide(); }
  });

  // Swipe/scroll
  let startX = 0, startY = 0, tracking = false;
  const SWIPE_THRESHOLD = 40;
  if (appEl) {
    appEl.addEventListener('pointerdown', (e) => { startX = e.clientX; startY = e.clientY; tracking = true; });
    appEl.addEventListener('pointerup', (e) => {
      if (!tracking) return; tracking = false;
      const dx = e.clientX - startX; const dy = e.clientY - startY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) { resetTimer(); if (dx < 0) nextSlide(); else prevSlide(); }
      else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > SWIPE_THRESHOLD) { resetTimer(); if (dy < 0) nextSlide(); else prevSlide(); }
    });
    let wheelLock = false;
    appEl.addEventListener('wheel', (e) => {
      if (wheelLock) return; wheelLock = true; resetTimer();
      if (e.deltaY > 0) nextSlide(); else prevSlide();
      setTimeout(() => wheelLock = false, 600);
    }, { passive: true });
  }
});