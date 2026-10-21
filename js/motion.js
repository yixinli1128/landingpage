(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll(
    '.section-heading, .hero-copy, .hero-phones, .step, .match-phone, .chat-phones, .support-phones, .archive-phones, .final-copy, .final-phone, .glass-card'
  );

  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min((index % 5) * 80, 320)}ms`);
  });

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.16 });
    revealTargets.forEach(element => observer.observe(element));
  } else {
    revealTargets.forEach(element => element.classList.add('is-visible'));
  }

  const header = document.querySelector('.site-header');
  const navLinks = [...document.querySelectorAll('.desktop-nav a, .mobile-menu a')];
  const sections = [...document.querySelectorAll('main section[id]')];

  function updateHeader() {
    header.classList.toggle('is-scrolled', window.scrollY > 18);
  }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  document.querySelectorAll('a.main-button, a.nav-prototype').forEach(button => {
    button.addEventListener('pointerdown', event => {
      if (reduceMotion) return;
      const rect = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'button-ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      button.append(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => { document.querySelector('#menu-toggle').checked = false; });
  });
})();
