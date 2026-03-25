// Theme Toggle with System Preference Support
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Theme states: 'dark', 'light', 'system'
    const THEME_STATES = ['dark', 'light', 'system'];
    
    // Get system preferred theme
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    // Apply theme to document
    function applyTheme(themeState) {
        let actualTheme;
        
        if (themeState === 'system') {
            actualTheme = getSystemTheme();
        } else {
            actualTheme = themeState;
        }
        
        html.setAttribute('data-theme', actualTheme);
        html.setAttribute('data-theme-mode', themeState); // Store the mode (dark/light/system)
    }
    
    // Update toggle button icon
    function updateToggleIcon(themeState) {
        const icons = {
            dark: 'ri-moon-line',
            light: 'ri-sun-line',
            system: 'ri-computer-line'
        };
        
        const labels = {
            dark: 'Переключить на светлую тему',
            light: 'Переключить на системную тему',
            system: 'Переключить на тёмную тему'
        };
        
        themeIcon.className = icons[themeState] || icons.system;
        themeToggle.setAttribute('aria-label', labels[themeState]);
    }
    
    // Get saved theme preference or default to 'system'
    let savedThemeState = 'system';
    try {
        const stored = localStorage.getItem('theme-mode');
        if (stored && THEME_STATES.includes(stored)) {
            savedThemeState = stored;
        }
    } catch (e) {
        console.warn('localStorage not available, using default theme');
    }
    
    // Apply initial theme
    applyTheme(savedThemeState);
    updateToggleIcon(savedThemeState);

    // Toggle through theme states
    themeToggle.addEventListener('click', () => {
        const currentIndex = THEME_STATES.indexOf(html.getAttribute('data-theme-mode') || 'system');
        const nextIndex = (currentIndex + 1) % THEME_STATES.length;
        const newThemeState = THEME_STATES[nextIndex];
        
        applyTheme(newThemeState);
        updateToggleIcon(newThemeState);
        
        try {
            localStorage.setItem('theme-mode', newThemeState);
        } catch (e) {
            console.warn('Could not save theme preference');
        }
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const currentMode = html.getAttribute('data-theme-mode');
        
        // Only update if in system mode
        if (currentMode === 'system') {
            applyTheme('system');
        }
    });
})();