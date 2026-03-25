// Main JavaScript for Monument Web
(function() {
    'use strict';

    // ============================================
    // Utility Functions
    // ============================================
    
    /**
     * Throttle function to limit execution rate
     * @param {Function} fn - Function to throttle
     * @param {number} ms - Minimum time between executions
     * @returns {Function} Throttled function
     */
    function throttle(fn, ms) {
        let lastTime = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastTime >= ms) {
                fn.apply(this, args);
                lastTime = now;
            }
        };
    }

    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    const navbar = document.getElementById('navbar');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            const icon = navbarToggle.querySelector('i');
            if (navbarMenu.classList.contains('active')) {
                icon.className = 'ri-close-line';
                navbarToggle.setAttribute('aria-label', 'Закрыть меню');
            } else {
                icon.className = 'ri-menu-line';
                navbarToggle.setAttribute('aria-label', 'Открыть меню');
            }
        });

        // Close menu on link click
        const menuLinks = navbarMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbarMenu.classList.remove('active');
                const icon = navbarToggle.querySelector('i');
                icon.className = 'ri-menu-line';
                navbarToggle.setAttribute('aria-label', 'Открыть меню');
            });
        });
    }

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', throttle(handleScroll, 16));

    // ============================================
    // FAQ Accordion
    // ============================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                faq.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ============================================
    // Portfolio Slider
    // ============================================
    const portfolioSlider = document.getElementById('portfolioSlider');
    
    if (portfolioSlider) {
        const track = portfolioSlider.querySelector('.portfolio-track');
        const slides = portfolioSlider.querySelectorAll('.portfolio-slide');
        const prevBtn = document.getElementById('portfolioPrev');
        const nextBtn = document.getElementById('portfolioNext');
        const dotsContainer = document.getElementById('portfolioDots');
        
        let currentIndex = 0;
        const totalSlides = slides.length;
        
        // Create dots
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'portfolio-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Слайд ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        const dots = dotsContainer.querySelectorAll('.portfolio-dot');
        
        function updateSlider() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateSlider();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        }
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', prevSlide);
            nextBtn.addEventListener('click', nextSlide);
        }
        
        // Keyboard navigation for slider
        portfolioSlider.setAttribute('tabindex', '0');
        portfolioSlider.setAttribute('role', 'region');
        portfolioSlider.setAttribute('aria-label', 'Галерея работ');
        
        portfolioSlider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        });
        
        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        portfolioSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        portfolioSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
    }

    // ============================================
    // Scroll to Top Button
    // ============================================
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        function toggleScrollTop() {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        window.addEventListener('scroll', throttle(toggleScrollTop, 100));

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Animate on Scroll
    // ============================================
    const animateElements = document.querySelectorAll('.advantage-card, .pricing-card, .process-step, .trust-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-on-scroll', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach((el, index) => {
        el.classList.add('animate-on-scroll');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // ============================================
    // Active Navigation Link
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-menu a[href^="#"]');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', throttle(updateActiveLink, 100));
    updateActiveLink();

})();
