# Portfolio Section Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the current portfolio slider (2 slides × 3 columns: original/retouch/stone) with a simple single-image carousel (3 slides: brodskiy, gorkiy, tolstoi).

**Architecture:** The portfolio is a static section with HTML structure, CSS styling, and JS carousel logic. HTML defines slides in a flex track; CSS controls layout, glassmorphism, and responsive behaviour; JS handles navigation (buttons, dots, keyboard, swipe). All three layers need coordinated changes — HTML structure simplified, grid CSS removed, JS preload logic removed. Visual mockup at `portfolio-mockup.html` for reference.

**Tech Stack:** Static HTML5 + CSS3 (glassmorphism, CSS variables, 8-point grid) + vanilla JS (IIFE). No build tools, no test framework. Visual verification = open in browser.

---

### Task 1: HTML — Simplify portfolio section markup

**Files:**
- Modify: `index.html:251-310`

**Step 1: Read current portfolio section**

Open `index.html` lines 251–310. Current structure:
```html
<section class="section portfolio" id="portfolio">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Примеры работ</h2>
        </div>
        
        <div class="portfolio-slider" id="portfolioSlider">
            <button class="portfolio-btn portfolio-btn-prev" id="portfolioPrev" aria-label="Предыдущий">
                <i class="ri-arrow-left-s-line"></i>
            </button>
            <div class="portfolio-track-viewport">
                <div class="portfolio-track">
                    <!-- 2 slides, each with h3 + 3-column grid of img + label -->
                </div>
            </div>
            <button class="portfolio-btn portfolio-btn-next" id="portfolioNext" aria-label="Следующий">
                <i class="ri-arrow-right-s-line"></i>
            </button>
        </div>
        
        <div class="portfolio-dots" id="portfolioDots" style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;"></div>
    </div>
</section>
```

**Step 2: Replace with simplified markup**

Each `.portfolio-slide` becomes: `<div class="portfolio-slide"><img src="..." alt="..."></div>`

Replace the entire portfolio section (lines 251–310) with:

```html
    <!-- Portfolio Section -->
    <section class="section portfolio" id="portfolio">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Примеры работ</h2>
            </div>
            
            <div class="portfolio-slider" id="portfolioSlider">
                <button class="portfolio-btn portfolio-btn-prev" id="portfolioPrev" aria-label="Предыдущий">
                    <i class="ri-arrow-left-s-line"></i>
                </button>
                <div class="portfolio-track-viewport">
                    <div class="portfolio-track">
                        <div class="portfolio-slide">
                            <img src="img/brodskiy.webp" alt="Портрет — Бродский">
                        </div>
                        <div class="portfolio-slide">
                            <img src="img/gorkiy.webp" alt="Портрет — Горький">
                        </div>
                        <div class="portfolio-slide">
                            <img src="img/tolstoi.webp" alt="Портрет — Толстой">
                        </div>
                    </div>
                </div>
                <button class="portfolio-btn portfolio-btn-next" id="portfolioNext" aria-label="Следующий">
                    <i class="ri-arrow-right-s-line"></i>
                </button>
            </div>
            
            <div class="portfolio-dots" id="portfolioDots"></div>
        </div>
    </section>
```

Key changes:
- Removed `h3.portfolio-title`
- Removed `.portfolio-grid` (was `display: grid; grid-template-columns: repeat(3, 1fr)`)
- Removed `.portfolio-item` wrappers
- Removed `.portfolio-label` spans
- Removed inline `style` on `#portfolioDots` (CSS handles it now)
- Changed dots container from `display: flex; justify-content: center; gap: 10px; margin-top: 20px;` inline to just the class (CSS will style it)

**Step 3: Verify**

Open `index.html`, inspect portfolio section. Should show 3 slides in the track, each containing just one `<img>`.

No commit yet — will commit after CSS+JS are done.

---

### Task 2: CSS — Rewrite portfolio styles for single-image carousel

**Files:**
- Modify: `css/sections/portfolio.css` (entire file)

**Step 1: Read current CSS**

Current `css/sections/portfolio.css` (220 lines) contains:
- `.portfolio-grid` — 3-column grid, gap, item styles
- `.portfolio-item` — border, hover, image styles
- `.portfolio-label` — absolute positioned label with glassmorphism
- `.portfolio-title` — heading style
- Complex responsive breakpoints for 2-col and 1-col grids
- Mobile fallbacks for label backgrounds (no backdrop-filter)

All of this is dead code after the refactor.

**Step 2: Write new CSS**

Replace entire file with:

```css
/* sections/portfolio.css — Portfolio section */

.portfolio-slider {
    position: relative;
    margin: 0 70px;
}

.portfolio-track-viewport {
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-lg);
}

.portfolio-track {
    display: flex;
    width: 100%;
    transition: transform var(--transition-slow);
}

.portfolio-slide {
    flex: 0 0 100%;
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-5);
}

.portfolio-slide img {
    display: block;
    max-width: 100%;
    max-height: 70vh;
    width: auto;
    height: auto;
    object-fit: contain;
    border-radius: var(--radius-md);
    box-shadow: var(--card-shadow);
}

.portfolio-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 44px;
    height: 44px;
    background: var(--surface-bg);
    backdrop-filter: blur(var(--blur-glass));
    -webkit-backdrop-filter: blur(var(--blur-glass));
    border: 1px solid var(--surface-border);
    border-radius: 50%;
    cursor: pointer;
    color: var(--heading-color);
    font-size: 20px;
    transition: all var(--transition-micro);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
}

.portfolio-btn-prev {
    left: -55px;
}

.portfolio-btn-next {
    right: -55px;
}

.portfolio-btn:hover {
    background: var(--accent-color);
    color: #ffffff;
    border-color: var(--accent-color);
}

.portfolio-dots {
    display: flex;
    justify-content: center;
    gap: var(--space-2);
    margin-top: var(--space-6);
}

.portfolio-dot {
    width: 10px;
    height: 10px;
    background: var(--surface-border);
    border-radius: 50%;
    cursor: pointer;
    transition: all var(--transition-micro);
    border: none;
    padding: 0;
}

.portfolio-dot:hover,
.portfolio-dot.active {
    background: var(--accent-color);
    transform: scale(1.2);
}

@media (max-width: 768px) {
    .portfolio-slider {
        margin: 0 40px;
    }

    .portfolio-btn-prev {
        left: -35px;
    }

    .portfolio-btn-next {
        right: -35px;
    }

    .portfolio-slide {
        padding: var(--space-3);
    }

    .portfolio-slide img {
        max-height: 50vh;
    }
}

@media (max-width: 480px) {
    .portfolio-slider {
        margin: 0 30px;
    }

    .portfolio-btn {
        width: 36px;
        height: 36px;
        font-size: 18px;
    }

    .portfolio-btn-prev {
        left: -30px;
    }

    .portfolio-btn-next {
        right: -30px;
    }
}
```

Key changes from old CSS:
- **Removed:** `.portfolio-grid`, `.portfolio-item`, `.portfolio-title`, `.portfolio-label`, `.portfolio-slider-wrapper`
- **Removed:** All 3-column grid styles and their responsive variants
- **Removed:** Mobile `backdrop-filter` fallbacks for labels
- **Removed:** `max-width: 1024px` breakpoint (was for 2-col grid)
- **Removed:** `max-width: 360px` breakpoint
- **Changed:** `.portfolio-slide` now uses `display: flex + justify-content: center` instead of being a block container
- **Changed:** Image uses `max-width/max-height` with `object-fit: contain` instead of `width: 100%; height: auto`
- **Changed:** `.portfolio-dots` uses `--space-2` gap and `--space-6` margin-top (design tokens)
- **Changed:** `.portfolio-track` transition uses `--transition-slow` token
- **Changed:** Buttons moved slightly farther out (left/right: -55px vs -50px) for visual balance with centered images

**Step 3: Verify**

Open `index.html` in browser. Portfolio section should show:
- Single centered image with shadow
- Arrow buttons on left/right
- Dots below
- Image should resize on window resize (max-height: 70vh)
- Mobile: smaller padding, smaller buttons, max-height: 50vh

Test both themes.

---

### Task 3: JS — Clean up portfolio slider

**Files:**
- Modify: `js/main.js:148-259`

**Step 1: Read current JS**

Lines 148–259 contain `Portfolio Slider` block. Key parts:
- `preloadSlideImages()` — creates Image objects to preload (lines 164-175)
- `setTimeout(preloadSlideImages, 100)` — delayed preload call (line 178)
- Dot creation (lines 181-187)
- `updateSlider()` / `goToSlide()` / `nextSlide()` / `prevSlide()` (lines 191-212)
- Keyboard + swipe handlers (lines 220-258)

All logic still works with new HTML — the API is identical (`.portfolio-track`, `.portfolio-slide`, `translateX`).

**Step 2: Remove preload function and call**

Remove lines 163-178 (whole `preloadSlideImages` function + `setTimeout` call).

After removal, the JS should be:
```js
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
```

**Step 3: Verify**

Open `index.html`. Should work:
- Click next/prev buttons → slides change
- Dots update with active state
- Keyboard left/right arrows work (click on slider first)
- Swipe works on mobile

---

### Task 4: Clean up unused image files

**Files:**
- Delete: `img/woman_original.webp`
- Delete: `img/woman_retouch.webp`
- Delete: `img/woman_stone.webp`
- Delete: `img/man_original.webp`
- Delete: `img/man_retouch.webp`
- Delete: `img/man_stone.webp`
- Delete: `img/male.webp`
- Delete: `img/female.webp`

**Step 1: Verify no remaining references**

Before deleting, grep for references to these files in the codebase:
```
rg "woman_original|woman_retouch|woman_stone|man_original|man_retouch|man_stone|male\.webp|female\.webp"
```
Should return no results (they were removed in Task 1).

**Step 2: Delete files**

Remove all 8 files. They are no longer referenced anywhere.

**Step 3: Verify**

Open `index.html` in browser — no broken images.

---

### Task 5: Update documentation

**Files:**
- Modify: `AGENTS.md` — update structure section
- Modify: `DESIGN_SYSTEM.md` — not needed (doesn't describe portfolio internals)
- Modify: `README.md` — not needed (doesn't describe portfolio internals)

**Step 1: Update AGENTS.md**

In the "Секции сайта" section (line ~70), update the Portfolio entry:

From:
```
4. **Портфолио** — 2 вкладки (мужские/женские работы), 3 колонки (оригинал/ретушь/камень)
```

To:
```
4. **Портфолио** — карусель с 3 работами (одиночное изображение на слайд)
```

**Step 2: Verify**

Read AGENTS.md to confirm the update reads correctly.

---

### Task 6: Visual verification

**Step 1: Open in browser**

Open `index.html` in Chrome/Firefox. Verify:

**Desktop (>768px):**
- Image centered with padding, max-height ~70vh
- Glassmorphism arrow buttons visible on both sides (not cut off)
- Dots centered below, active dot has accent color
- Click next/prev → smooth slide transition
- Keyboard arrows work after clicking slider
- Resize window → image scales proportionally

**Mobile (<768px):**
- Smaller padding, smaller buttons
- Image max-height ~50vh
- Swipe works (touch left/right)

**Both themes:**
- Dark theme (default): dark background, glass buttons, image shadow
- Light theme (`data-theme="light"`): light background, softer shadows

**Step 2: Check no regressions**

- Navbar still works
- Other sections unchanged
- No broken image icons
- Portfolio section scrolls to correct position on nav link click

---

### Task 7: Commit

**Step 1: Stage and commit**

```bash
git add index.html css/sections/portfolio.css js/main.js img/woman_original.webp img/woman_retouch.webp img/woman_stone.webp img/man_original.webp img/man_retouch.webp img/man_stone.webp img/male.webp img/female.webp AGENTS.md docs/plans/2026-06-04-portfolio-refactor.md
git rm img/woman_original.webp img/woman_retouch.webp img/woman_stone.webp img/man_original.webp img/man_retouch.webp img/man_stone.webp img/male.webp img/female.webp
git commit -m "refactor: portfolio section — single-image carousel

- Replace 2-slide × 3-column grid slider with 3-slide single-image carousel
- New images: brodskiy, gorkiy, tolstoi
- Remove unused woman_*/man_*/male/female images
- Simplify CSS (remove grid, labels, title styles)
- Clean up JS (remove preloadSlideImages)
- Update AGENTS.md section description"
```

**Step 2: Verify commit**

`git log --oneline -3` should show the new commit at top.
`git status` should show clean working tree.
