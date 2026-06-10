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
    // Hero Slider
    // ============================================
    const heroSlider = document.querySelector('.hero-slider');
    
    if (heroSlider) {
        const slides = heroSlider.querySelectorAll('.hero-slide');
        let currentSlide = 0;
        let transitioning = false;
        let zIndexCounter = 1;  // ensures incoming slide always renders on top
        const totalSlides = slides.length;
        const slideInterval = 5000; // 5 seconds
        const fadeDuration = 1500;  // must match CSS transition: opacity 1.5s

        // Set first slide as active
        if (slides.length > 0) {
            slides[0].classList.add('active');
            slides[0].style.zIndex = zIndexCounter;
        }

        function nextSlide() {
            if (transitioning) return;
            transitioning = true;

            const prevSlide = currentSlide;
            currentSlide = (currentSlide + 1) % totalSlides;

            // Incoming slide gets a higher z-index → always renders on top
            zIndexCounter++;
            slides[currentSlide].style.zIndex = zIndexCounter;
            slides[currentSlide].classList.add('active');

            // After transition completes, hide the old slide underneath
            setTimeout(() => {
                slides[prevSlide].classList.remove('active');
                slides[prevSlide].style.zIndex = '';
                transitioning = false;
            }, fadeDuration + 50); // +50ms safety margin
        }

        // Auto-advance slides
        if (totalSlides > 1) {
            setInterval(nextSlide, slideInterval);
        }
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
        const currentScroll = window.scrollY;
        
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

        // Lightbox
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxClose = document.getElementById('lightboxClose');

        if (lightbox && lightboxImage && lightboxClose) {
            // Open on image click (supports multiple images per slide)
            slides.forEach(function(slide) {
                var imgs = slide.querySelectorAll('.portfolio-figure img');
                imgs.forEach(function(img) {
                    if (img) {
                        img.addEventListener('click', function() {
                            lightboxImage.src = img.src;
                            lightboxImage.alt = img.alt;
                            lightbox.classList.add('active');
                            document.body.style.overflow = 'hidden';
                        });
                    }
                });
            });

            // Close handlers
            function closeLightbox() {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }

            lightboxClose.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                    closeLightbox();
                }
            });
        }
    }

    // ============================================
    // Scroll to Top Button
    // ============================================
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        function toggleScrollTop() {
            if (window.scrollY > 500) {
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
                const targetPosition = target.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = targetPosition - navbarHeight;
                
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
        rootMargin: '100px 0px', // Start animation 100px before element enters viewport
        threshold: 0
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
        // Reduced delay: 0.05s instead of 0.1s
        el.style.transitionDelay = `${index * 0.05}s`;
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

    // ============================================
    // Yandex.Metrica — Event Tracking
    // ============================================
    /**
     * Отправка события в Яндекс.Метрику
     * Безопасно вызывается даже если Метрика не загружена
     * @param {string} targetName — имя цели (без пробелов, до 50 символов)
     */
    function ymReach(targetName) {
        if (typeof ym === 'function') {
            ym(108345194, 'reachGoal', targetName);
        }
    }

    // --- Hero CTA: «Получить бесплатный тест» ---
    const heroCtaTest = document.querySelector('.hero-cta .btn-primary');
    if (heroCtaTest) {
        heroCtaTest.addEventListener('click', () => {
            ymReach('hero_cta_test');
        });
    }

    // --- Hero CTA: «Смотреть работы» ---
    const heroCtaPortfolio = document.querySelector('.hero-cta .btn-outline');
    if (heroCtaPortfolio) {
        heroCtaPortfolio.addEventListener('click', () => {
            ymReach('hero_cta_portfolio');
        });
    }

    // --- Кнопки в секции цен ---
    document.querySelectorAll('.pricing-card a[href="#contact"]').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            const label = i === 0 ? 'portrait' : 'montage';
            ymReach('pricing_cta_' + label);
        });
    });

    // Кнопка «Обсудить» в карточке «Для мастерских»
    const pricingPartners = document.querySelector('.pricing-featured .btn-primary');
    if (pricingPartners) {
        pricingPartners.addEventListener('click', () => {
            ymReach('pricing_cta_partners');
        });
    }

    // --- Контакты: Telegram ---
    document.querySelectorAll('.btn-telegram').forEach(btn => {
        btn.addEventListener('click', () => {
            ymReach('click_telegram');
        });
    });

    // --- Контакты: WhatsApp ---
    document.querySelectorAll('.btn-whatsapp').forEach(btn => {
        btn.addEventListener('click', () => {
            ymReach('click_whatsapp');
        });
    });

    // --- Контакты: Email ---
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', () => {
            ymReach('click_email');
        });
    });

    // --- FAQ: раскрытие вопроса ---
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            ymReach('faq_open');
        });
    });

    // --- Навигация: клик по ссылке в меню ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            ymReach('nav_click');
        });
    });

    // --- Футер: клик по ссылкам ---
    document.querySelectorAll('.footer-links a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            ymReach('footer_nav_click');
        });
    });

    // --- Кнопка «Наверх» ---
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            ymReach('scroll_to_top');
        });
    }

    // --- Досcroll до секции: отслеживание просмотра ключевых секций ---
    const scrollGoals = document.querySelectorAll('#contact, #portfolio, #pricing');
    const scrollGoalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const goalMap = {
                    '#contact': 'scroll_to_contact',
                    '#portfolio': 'scroll_to_portfolio',
                    '#pricing': 'scroll_to_pricing'
                };
                ymReach(goalMap['#' + entry.target.id]);
                scrollGoalObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    scrollGoals.forEach(el => scrollGoalObserver.observe(el));

})();
// cache bust 1774539095
