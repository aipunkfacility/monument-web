// Theme Toggle
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Check for saved theme preference or default to dark
    // Use try-catch for localStorage (Safari private mode throws error)
    let savedTheme = 'dark';
    try {
        const stored = localStorage.getItem('theme');
        if (stored) {
            savedTheme = stored;
        }
    } catch (e) {
        // localStorage not available (private mode, cookies disabled)
        console.warn('localStorage not available, using default theme');
    }
    
    html.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', newTheme);
        
        try {
            localStorage.setItem('theme', newTheme);
        } catch (e) {
            // localStorage not available, theme will reset on page reload
            console.warn('Could not save theme preference');
        }
        
        updateToggleIcon(newTheme);
    });

    function updateToggleIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'ri-sun-line';
            themeToggle.setAttribute('aria-label', 'Переключить на светлую тему');
        } else {
            themeIcon.className = 'ri-moon-line';
            themeToggle.setAttribute('aria-label', 'Переключить на тёмную тему');
        }
    }
})();