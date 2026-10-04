const nav = document.querySelector('#main-nav');
const menu = document.querySelector('.menu-toggle');
const themeButton = document.querySelector('.theme-toggle');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
const isDark = () => document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : systemTheme.matches;

function updateThemeLabel() {
  themeButton.setAttribute('aria-label', `Switch to ${isDark() ? 'light' : 'dark'} theme`);
  themeButton.setAttribute('title', `Switch to ${isDark() ? 'light' : 'dark'} theme`);
  document.querySelector('meta[name="theme-color"]').content = isDark() ? '#111916' : '#f7f8f5';
}
themeButton.hidden = false;
updateThemeLabel();
themeButton.addEventListener('click', () => {
  const theme = isDark() ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('portfolio-theme', theme); } catch { /* Theme still works for this page. */ }
  updateThemeLabel();
});
systemTheme.addEventListener('change', updateThemeLabel);

function closeMenu(returnFocus = false) {
  nav.classList.remove('is-open');
  menu.setAttribute('aria-expanded', 'false');
  if (returnFocus) menu.focus();
}
document.documentElement.classList.add('js');
menu.hidden = false;
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
});
document.addEventListener('keydown', e => { if (e.key === 'Escape' && nav.classList.contains('is-open')) closeMenu(true); });
document.addEventListener('click', e => { if (!e.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 1101px)').addEventListener('change', () => closeMenu());
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  closeMenu();
  const target = document.querySelector(link.hash);
  if (target) { target.setAttribute('tabindex','-1'); target.focus({preventScroll:true}); }
}));

const cards = [...document.querySelectorAll('[data-category]')];
const filterButtons = [...document.querySelectorAll('[data-filter]')];
document.querySelector('.project-filters').hidden = false;
function filterProjects(category) {
  let count = 0;
  cards.forEach(card => { card.hidden = category !== 'All' && card.dataset.category !== category; if (!card.hidden) count++; });
  filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  document.querySelector('#filter-status').textContent = `${count} ${category === 'All' ? '' : category.toLowerCase() + ' '}projects shown.`;
}
filterButtons.forEach(button => button.addEventListener('click', () => filterProjects(button.dataset.filter)));

// Deep links remain usable even after a project filter has hidden their target.
function revealHashTarget(hash = window.location.hash) {
  if (!hash.startsWith('#project-')) return;
  const target = document.getElementById(hash.slice(1));
  if (target?.hidden) filterProjects('All');
}
document.querySelectorAll('a[href^="#project-"]').forEach(a => a.addEventListener('click', () => revealHashTarget(a.hash)));
window.addEventListener('hashchange', () => revealHashTarget());
revealHashTarget();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      nav.querySelectorAll('a').forEach(a => {
        if (a.hash === `#${entry.target.id}`) a.setAttribute('aria-current','location');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-12% 0px -65% 0px', threshold: 0 });
  document.querySelectorAll('main > section[id], #projects').forEach(section => observer.observe(section));
}
