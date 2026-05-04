export const analyticsTracking = `  document.addEventListener('click', function(e) {
    const el = e.target.closest('[data-track]');
    if (!el) return;
    if (typeof posthog !== 'undefined') posthog.capture(el.dataset.track);
  });`;

// Used on precincts page — passes precinct_name param when available
export const analyticsTrackingWithParams = `  document.addEventListener('click', function(e) {
    const el = e.target.closest('[data-track]');
    if (!el) return;
    const params = el.dataset.precinctName ? { precinct_name: el.dataset.precinctName } : undefined;
    if (typeof posthog !== 'undefined') posthog.capture(el.dataset.track, params);
  });`;

export const yearScript = `  document.getElementById('yr').textContent = new Date().getFullYear();`;

export const scrollRevealScript = `  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => observer.observe(el));`;
