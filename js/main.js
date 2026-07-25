document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  // Check local storage or system preference
  const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      if (current === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
    });
  });

  // RTL/LTR Toggle (#36 Show only active mode)
  const dirToggles = document.querySelectorAll('.dir-toggle');
  let currentDir = localStorage.getItem('dir') || 'ltr';
  
  const updateDirUI = (dir) => {
    document.documentElement.setAttribute('dir', dir);
    dirToggles.forEach(toggle => {
      // Display only the active mode (if in LTR, show LTR. Wait, usually if you are in LTR, a toggle button might say "Switch to RTL".
      // But the spec says: "Display only the active mode in the RTL/LTR toggle — show 'LTR' when in LTR mode and 'RTL' when in RTL mode."
      toggle.textContent = dir.toUpperCase();
    });
  };

  updateDirUI(currentDir);

  dirToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      currentDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      localStorage.setItem('dir', currentDir);
      updateDirUI(currentDir);
    });
  });

  // Mobile Menu (#33 Relocate controls to hamburger)
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});
