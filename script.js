// small helpers: theme toggle, reveal on scroll, contact AJAX
document.addEventListener('DOMContentLoaded', () => {
  // year
  document.getElementById('year').textContent = new Date().getFullYear();

  // theme toggle (light/dark inversion)
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.addEventListener('click', () => {
    document.documentElement.classList.toggle('light-theme');
    // you can add more theme toggles or localStorage if you want
  });

  // reveal on scroll
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('show'); obs.unobserve(e.target); }
    });
  }, {threshold: 0.15});
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // contact form AJAX (Formspree)
  window.addEventListener('load', () => {
  const overlay = document.getElementById('welcomeOverlay');
  setTimeout(() => {
    if (overlay) overlay.remove();
  }, 4500); // Matches your animation duration (3.5s delay + 1s fade)
});
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.textContent = 'Sending…';
      const data = new FormData(form);
      try {
        const res = await fetch(form.action, {
          method: form.method,
          body: data,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          msg.textContent = 'Thanks — message sent!';
          form.reset();
        } else {
          const err = await res.json();
          msg.textContent = err?.error || 'Error sending message';
        }
      } catch (err) {
        msg.textContent = 'Network error — try again';
      }
    });
  }
});
