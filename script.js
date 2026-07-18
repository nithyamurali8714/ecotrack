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

// Log a habit — modal + dynamic list update
const logHabitBtn = document.getElementById('log-habit-btn');
const logHabitModal = document.getElementById('log-habit-modal');
const logHabitForm = document.getElementById('log-habit-form');
const logHabitCancel = document.getElementById('log-habit-cancel');
const habitList = document.getElementById('habit-list');

const categoryLabels = {
  transport: 'Transport',
  waste: 'Waste',
  food: 'Food',
  energy: 'Energy'
};

logHabitBtn.addEventListener('click', () => {
  logHabitModal.showModal();
  document.getElementById('habit-name-input').focus();
});

logHabitCancel.addEventListener('click', () => {
  logHabitForm.reset();
  logHabitModal.close();
});

// Close on backdrop click
logHabitModal.addEventListener('click', (e) => {
  const rect = logHabitModal.getBoundingClientRect();
  const inDialog =
    e.clientX >= rect.left && e.clientX <= rect.right &&
    e.clientY >= rect.top && e.clientY <= rect.bottom;
  if (!inDialog) logHabitModal.close();
});

logHabitForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('habit-name-input').value.trim();
  const category = document.getElementById('habit-category-input').value;
  const value = parseFloat(document.getElementById('habit-value-input').value) || 0;

  if (!name) return;

  const row = document.createElement('li');
  row.className = 'habit-row is-new';
  row.innerHTML = `
    <span class="habit-name"></span>
    <span class="habit-tag ${category}"></span>
    <span class="habit-value"></span>
  `;
  row.querySelector('.habit-name').textContent = name;
  row.querySelector('.habit-tag').textContent = categoryLabels[category];
  row.querySelector('.habit-value').textContent = `−${value.toFixed(1)} kg CO₂`;

  habitList.prepend(row);

  logHabitForm.reset();
  logHabitModal.close();
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