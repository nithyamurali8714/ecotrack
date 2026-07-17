// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu after choosing a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// Dashboard category filter (visual only — swaps the active state)
const categoryLinks = document.querySelectorAll('.category-list a');
categoryLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    categoryLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
