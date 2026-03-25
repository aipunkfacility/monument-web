// Main JavaScript for Monument Web
(function() {
    'use strict';

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

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });

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
    // Scroll to Top Button
    // ============================================
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

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

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

})();
