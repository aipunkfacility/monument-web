# RetouchGrav Design System v3.1

Объединённая дизайн-система лендинга RetouchGrav. Берёт glassmorphism и эмоциональный стиль лендинга, системность и доступность из Granite CRM.

---

## Принципы

1. **Glassmorphism** — полупрозрачные поверхности с blur, тени, глубина
2. **Минеральная семантика** — цвета названы по камням (Лабрадорит, Малахит, Янтарь...), что идеально ложится в тематику ретуши памятников
3. **WCAG AA+** — все текстовые контрасты от 4.5:1, крупные акценты от 3:1
4. **Outfit + Inter** — выразительные заголовки, читабельный текст
5. **8-Point Grid** — единый ритм отступов

---

## Сетка и отступы

| Токен | Значение | Применение |
|:---|:---|:---|
| `--space-1` | 4px | Микро-отступы |
| `--space-2` | 8px | Гэпы иконок, мелкие паддинги |
| `--space-3` | 12px | Списки, карточки |
| `--space-4` | 16px | Стандартный отступ, мобильный контейнер |
| `--space-5` | 20px | Десктопный контейнер |
| `--space-6` | 24px | Крупные внутренние отступы |
| `--space-8` | 32px | Гэпы в гридах (Advantages, Pricing) |
| `--space-10` | 40px | CTA, крупные компоненты |
| `--space-12` | 48px | Вертикальный ритм (мобильные секции) |
| `--space-16` | 64px | Вертикальный ритм секций (десктоп) |

---

## Типографика

### Шрифтовые пары

- **Заголовки (H1-H6, кнопки, лого, цены):** `Outfit`, weight 600-700
- **Текст (body, caption):** `Inter`, weight 400-500

### Флюидная шкала

H1 и H2 масштабируются через `clamp()`:

| Токен | Mobile | Desktop | Применение |
|:---|:---|:---|:---|
| `--text-4xl` | 40px | 72px | Главный заголовок (H1) |
| `--text-3xl` | 32px | 48px | Заголовки секций (H2) |
| `--text-2xl` | 24px | 24px | Подзаголовки (H3) |
| `--text-xl` | 20px | 20px | Лого, крупные подписи |
| `--text-lg` | 18px | 18px | Описания секций |
| `--text-base` | 16px | 16px | Основной текст |
| `--text-sm` | 14px | 14px | Body карточек, FAQ |
| `--text-xs` | 12px | 12px | Примечания, футер |

---

## Цветовая палитра

### Минеральная семантика

Все цвета названы по минералам — это бренд-идентичность, которая резонирует с темой памятников и камня.

| Роль | Минерал | Dark | Light | Контраст (dark) |
|:---|:---|:---|:---|:---|
| Primary | Лабрадорит | `#7C8CF8` | `#6B7BE5` | 6.2:1 на `#1A1B20` |
| Success | Малахит | `#34D399` | `#2B9E6F` | 8.4:1 |
| Warning | Янтарь | `#FBBF24` | `#C49008` | 10.7:1 |
| Destructive | Гранат | `#F43F5E` | `#DC2643` | 4.5:1 |
| Info | Сапфир | `#60A5FA` | `#2E7DB5` | 5.9:1 |
| Accent | Аметист | `#C084FC` | `#8B5ABF` | 5.1:1 |

### CSS-переменные

```css
/* Семантические цвета (единые для dark и light — адаптируются в [data-theme]) */
--color-primary: #7C8CF8;         /* Лабрадорит */
--color-primary-hover: #6B7BE5;
--color-success: #34D399;         /* Малахит */
--color-warning: #FBBF24;         /* Янтарь */
--color-destructive: #F43F5E;     /* Гранат */
--color-info: #60A5FA;            /* Сапфир */
--color-accent: #C084FC;          /* Аметист */
```

Light-варианты переопределяются в `[data-theme="light"]`:

```css
[data-theme="light"] {
    --color-primary: #6B7BE5;
    --color-primary-hover: #5A6AD4;
    --color-success: #2B9E6F;
    --color-warning: #C49008;
    --color-destructive: #DC2643;
    --color-info: #2E7DB5;
    --color-accent: #8B5ABF;
}
```

---

## Тёмная тема (Dark — Granite Palette)

### Фоны (Гранитная тональная шкала)

| Токен | Значение | Применение |
|:---|:---|:---|
| `--bg-primary` | `#3D3F45` (Гранит) | Основной фон |
| `--bg-gradient` | `135deg, #3D3F45 → #2A2C32 → #3D3F45` | Градиентный фон секций |
| `--bg-gradient-hero` | `135deg, #3D3F45 → #2A2C32 → #1A1B20 → #2A2C32` | Hero-секция |
| `--footer-bg` | `rgba(42, 44, 50, 0.6)` | Футер (полупрозрачный) |

### Поверхности (Granite)

| Токен | Значение | Применение |
|:---|:---|:---|
| `--surface-bg` | `#484A50` (Поверхность) | Карточки, FAQ, CTA-бокс |
| `--surface-hover` | `#55575E` | Hover-состояние карточек |
| `--surface-border` | `#565860` (Бордюр) | Бордюр элементов |
| `--navbar-bg` | `rgba(42, 44, 50, 0.85)` (Сланец) | Навбар (blur) |
| `--navbar-border` | `#565860` (Бордюр) | Бордюр навбара |
| `--footer-border` | `#565860` (Бордюр) | Бордюр футера |

### Секции (зональная контрастность)

| Зона | Токен | Значение | Секции |
|:---|:---|:---|:---|
| Глубокая | (нет background) | body gradient | Advantages, Portfolio, FAQ |
| Нейтральная | `--section-bg` | `#3A3C42` | Process, Pricing, Trust |
| Акцентная | `--section-alt-bg` | `#2A2C32` | CTA |

### Hero Overlay

| Токен | Значение | Применение |
|:---|:---|:---|
| `--hero-overlay` | `linear-gradient(90deg, rgba(0,0,0,0.85)→rgba(0,0,0,0.6)→rgba(0,0,0,0.4)→transparent)` | Оверлей hero-секции |
| `--hero-text-color` | `#ffffff` | Цвет заголовка hero |
| `--hero-text-shadow` | `0 2px 20px rgba(0,0,0,0.5)` | Тень текста hero |
| `--hero-subtitle-color` | `#ffffff` | Цвет подзаголовка hero |
| `--hero-subtitle-shadow` | `0 1px 10px rgba(0,0,0,0.3)` | Тень подзаголовка hero |
| `--hero-badge-color` | `var(--accent-color)` | Цвет badge в hero |
| `--hero-badge-border` | `var(--accent-color)` | Бордюр badge в hero |

Hero-title использует отдельный clamp: `clamp(28px, 4.5vw, 48px)` — не через токен `--text-4xl`.

### Текст

| Токен | Значение | Контраст | Применение |
|:---|:---|:---|:---|
| `--heading-color` | `#E4E5E9` (Кварц) | 13.5:1 | H1-H6 |
| `--text-color` | `#E4E5E9` (Кварц) | 13.5:1 | Body |
| `--text-muted` | `#B0B3BA` | 8.5:1 | Подписи, описания |
| `--text-dim` | `#9DA1A9` | 6.0:1 | Вторичный текст |
| `--footer-note-color` | `#9DA1A9` | 6.0:1 | Примечания футера |

### Тени и эффекты

| Токен | Значение | Применение |
|:---|:---|:---|
| `--blur-glass` | `16px` | backdrop-filter для glass |
| `--shadow-glass` | `0 8px 32px rgba(0,0,0,0.3)` | Glass-тень |
| `--btn-shadow` | `0 4px 15px rgba(124, 140, 248, 0.4)` | Кнопка primary |
| `--card-shadow` | `0 10px 30px rgba(0,0,0,0.3)` | Карточки при hover |


---

## Светлая тема (Light)

### Фоны

| Токен | Значение | Применение |
|:---|:---|:---|
| `--bg-primary` | `#EDEAE5` | Основной фон (песчаник) |
| `--bg-gradient` | `135deg, #EDEAE5 → #E2DED8 → #D8D4CC` | Градиент секций |
| `--bg-gradient-hero` | `135deg, #E2DED8 → #EDEAE5 → #E2DED8 → #D8D4CC` | Hero-секция |
| `--footer-bg` | `rgba(200, 196, 190, 0.4)` | Футер |

### Поверхности (Glass)

| Токен | Значение | Применение |
|:---|:---|:---|
| `--surface-bg` | `rgba(255, 255, 255, 0.6)` | Карточки |
| `--surface-hover` | `rgba(255, 255, 255, 0.85)` | Hover-состояние |
| `--surface-border` | `rgba(0, 0, 0, 0.12)` | Бордюр glass |
| `--navbar-bg` | `rgba(237, 234, 229, 0.92)` | Навбар |
| `--navbar-border` | `rgba(0, 0, 0, 0.08)` | Бордюр навбара |
| `--section-bg` | `rgba(255, 255, 255, 0.35)` | Process, Pricing, Trust |
| `--section-alt-bg` | `#D8D4CC` | CTA (акцентная зона) |

### Hero Overlay (Variant C: индиго-тонированный + белый текст)

| Токен | Значение | Применение |
|:---|:---|:---|
| `--hero-overlay` | `linear-gradient(90deg, rgba(30,30,60,0.58)→rgba(30,30,60,0.38)→rgba(30,30,60,0.18)→rgba(30,30,60,0.05)→transparent)` | Индиго-тонированный оверлей |
| `--hero-text-color` | `#ffffff` | Белый текст на тёмном оверлее |
| `--hero-text-shadow` | `0 2px 20px rgba(30,30,60,0.5), 0 0 60px rgba(30,30,60,0.25)` | Тень с индиго-оттенком |
| `--hero-subtitle-color` | `#ffffff` | Подзаголовок — белый |
| `--hero-subtitle-shadow` | `0 1px 10px rgba(30,30,60,0.3)` | Тень подзаголовка с индиго-оттенком |
| `--hero-badge-color` | `#ffffff` | Badge — белый на тёмном фоне |
| `--hero-badge-border` | `rgba(255,255,255,0.5)` | Полупрозрачный белый бордюр |

Индиго-тон связывает hero с акцентным цветом бренда (`#6B7BE5`), сохраняет драматизм, устраняет эффект «чёрной дыры».
`.hero .btn-outline` в лайт-теме: белый бордер + белый текст.

### Текст

| Токен | Значение | Контраст | Применение |
|:---|:---|:---|:---|
| `--heading-color` | `#2C2926` | 12.1:1 | H1-H6 |
| `--text-color` | `#4A4540` | 8.2:1 | Body |
| `--text-muted` | `#5C5750` | 6.1:1 | Подписи |
| `--text-dim` | `#7A756E` | 3.8:1 (large) / 4.5:1 (small) | Вторичный |
| `--footer-note-color` | `#7A756E` | 4.5:1 | Футер |

### Тени и эффекты

| Токен | Значение | Применение |
|:---|:---|:---|
| `--shadow-glass` | `0 8px 32px rgba(0,0,0,0.06)` | Glass-тень (мягкая) |
| `--btn-shadow` | `0 4px 15px rgba(107, 123, 229, 0.15)` | Кнопка primary |
| `--card-shadow` | `0 10px 30px rgba(0,0,0,0.06)` | Карточки hover |


---

## Скругления

| Токен | Значение | Применение |
|:---|:---|:---|
| `--radius-sm` | `8px` | Навбар-ссылки, теги, мелкие элементы |
| `--radius-md` | `12px` | Кнопки, FAQ, pricing-бейджи, инпуты |
| `--radius-lg` | `20px` | Карточки, CTA-бокс, glass-контейнеры |
| `--radius-full` | `9999px` | Иконки-кружки, section-tag, hero-badge |

---

## Focus-ring (доступность)

Единый стиль фокуса для всех интерактивных элементов:

```css
:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

/* Для кнопок — внутри, без смещения */
.btn:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
}

/* Для glass-элементов — ring вместо outline */
.glass-element:focus-visible {
    box-shadow: 0 0 0 3px rgba(var(--color-primary), 0.3);
}
```

---

## Транзиции

Три уровня скорости — от CRM для микро, от лендинга для макро:

| Токен | Значение | Применение |
|:---|:---|:---|
| `--transition-micro` | `0.15s ease` | Кнопки, toggle, FAQ-аккордеон, icon hover |
| `--transition-fast` | `0.2s ease` | Навбар-ссылки, badge hover, мелкие смены |
| `--transition-normal` | `0.3s ease` | Карточки, theme switch, FAQ expand |
| `--transition-slow` | `0.5s ease` | Hero slide, page-level fade |

---

## Glassmorphism

Стандартный glass-элемент:

```css
.glass-card {
    background: var(--surface-bg);
    backdrop-filter: blur(var(--blur-glass));
    -webkit-backdrop-filter: blur(var(--blur-glass));
    border: 1px solid var(--surface-border);
    border-radius: var(--radius-lg);
}
```

**Правила glass:**
- Никогда не делать blur-поверхность полностью непрозрачной (минимум 0.5 opacity)
- Всегда добавлять бордюр 1px с `surface-border` — без него glass-элемент сливается с фоном
- На мобильных (`<=900px`) отключать `backdrop-filter` для навбара — вызывает stacking context issues
- На «глубоких» секциях (без background) `backdrop-filter: blur(16px)` работает на body gradient — обеспечивает визуальную сепарацию карточек

---

## Кнопки

| Вариант | Стиль | Применение |
|:---|:---|:---|
| Primary | Заливка `--color-primary`, белый текст | Главный CTA |
| Outline | Прозрачный, бордюр `--color-primary` | Вторичный CTA |
| Telegram | `rgba(0,136,204,0.8)` | Связь через Telegram |
| WhatsApp | `rgba(37,211,102,0.8)` | Связь через WhatsApp |
| Email | `rgba(52,152,219,0.8)` | Связь через email |

**Размеры:**
- Default: `padding: 16px 32px`, font-size 16px, border-radius 12px
- Large: `padding: 18px 36px`, font-size 17px (hero CTA)
- Block: `width: 100%` (мобильные CTA)

**Hover:** `translateY(-2px)` + `--btn-shadow`. Транзиция: `0.15s ease`.

---

## Адаптивность

| Breakpoint | Container | Секции | Особенности |
|:---|:---|:---|:---|
| `>1024px` | 1200px, pad 20px | 64px top/bottom | 3-колоночные гриды |
| `<=1024px` | 100% | 64px | 2 колонки для advantages/pricing/trust |
| `<=900px` | 100%, pad 20px | 48px | Бургер-меню, backdrop-filter off |
| `<=768px` | 100%, pad 16px | 48px | Мобильный hero, 1 колонка |

Навбар: фиксированная высота `72px` (9 * 8px grid).

---

## Переключение темы

Через `data-theme` атрибут на `<html>`:
- Отсутствие атрибута или `data-theme="dark"` — тёмная тема (по умолчанию)
- `data-theme="light"` — светлая тема
- `data-theme="system"` — следует за `prefers-color-scheme`
- Сохранение выбора в `localStorage`
- Ключ: `retouchgrav-theme`

---

## Иконки

**Библиотека:** Remix Icon (`ri-*`)
**Размеры:**
- Logo icon: 24px
- Section icons: 32px (в контейнере 64x64)
- Button icons: 18-20px
- Footer icons: 18px
- Scroll-top: 14px
- Theme toggle: 18px

---

## Структура CSS-переменных (reference)

### `:root` (Dark — default)
```
Spacing:    --space-1 через --space-16
Type:       --text-xs через --text-4xl
Radius:     --radius-sm, --radius-md, --radius-lg, --radius-full
Effects:    --blur-glass, --shadow-glass, --btn-shadow, --card-shadow
Sections:   --section-bg, --section-alt-bg
Hero:       --hero-overlay, --hero-text-color, --hero-text-shadow, --hero-subtitle-color, --hero-subtitle-shadow, --hero-badge-color, --hero-badge-border
BG:         --bg-primary, --bg-gradient, --bg-gradient-hero
Surface:    --surface-bg, --surface-hover, --surface-border
Navbar:     --navbar-bg, --navbar-border
Text:       --heading-color, --text-color, --text-muted, --text-dim
Colors:     --color-primary, --color-success, --color-warning, --color-destructive, --color-info, --color-accent
Buttons:    --btn-primary-bg, --btn-primary-hover
Footer:     --footer-bg, --footer-border, --footer-note-color
Theme:      --theme-toggle-bg, --theme-toggle-border, --theme-toggle-color
Transitions: --transition-micro, --transition-fast, --transition-normal, --transition-slow
Focus:      --focus-ring: 0 0 0 3px rgba(var(--color-primary), 0.3)
```

### `[data-theme="light"]` — переопределяет:
- Все `--bg-*` (песчаник)
- Все `--surface-*` (белые стекла)
- Все `--text-*` (тёмные)
- Все `--color-*` (приглушённые минералы)
- Все тени (мягче, с меньшим opacity)
- Footer и navbar переменные
