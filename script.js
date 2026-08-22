const cfg = window.WAP_PORTFOLIO || {};
const instagram = document.querySelector('#instagramLink');
if (instagram && cfg.instagramUrl) {
  instagram.href = cfg.instagramUrl;
  instagram.textContent = cfg.instagramLabel || 'Instagram ↗';
  instagram.target = '_blank';
  instagram.rel = 'noopener';
} else if (instagram) {
  instagram.addEventListener('click', e => e.preventDefault());
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
