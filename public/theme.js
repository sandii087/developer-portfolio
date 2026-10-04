// Run before paint to avoid a flash when a saved preference is present.
try {
  const theme = localStorage.getItem('portfolio-theme');
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme;
} catch { /* System preference remains the fallback when storage is unavailable. */ }
