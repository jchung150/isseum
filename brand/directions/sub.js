// Shared behaviour for the draft's sub-pages: notice ticker pace, notice close, EN/KOR label.
(() => {
  const tick = document.querySelector('[data-ticker]');
  const setPace = () => {
    if (!tick) return;
    const d = (tick.offsetWidth + innerWidth) / 58;
    tick.style.animationDuration = d + 's';
    tick.style.animationDelay = (-d * 0.4) + 's';
  };
  setPace(); addEventListener('resize', setPace);

  const promo = document.querySelector('[data-promo]');
  const close = document.querySelector('[data-promo-close]');
  if (promo && close) close.addEventListener('click', () => {
    promo.style.height = promo.offsetHeight + 'px';
    promo.offsetHeight;
    promo.style.height = '0px';
    const done = () => { promo.hidden = true; };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) done();
    else promo.addEventListener('transitionend', done, { once: true });
  });

  const lang = document.querySelector('[data-lang]');
  if (lang) lang.addEventListener('click', () => { lang.textContent = lang.textContent === 'EN' ? 'KOR' : 'EN'; });
})();
