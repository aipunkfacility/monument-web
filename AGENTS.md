# AGENTS.md - Руководство по разработке для monument-web

## Обзор проекта

Статический HTML-сайт для сервиса ретуши фотографий (гравировка на памятниках).

### Структура проекта

```
monument-web/
├── index.html              # Основная страница (лендинг)
├── css/
│   ├── tokens/
│   │   └── variables.css   # Токены и темы
│   ├── base/
│   │   ├── reset.css       # Сброс стилей
│   │   ├── typography.css  # Типографика
│   │   └── buttons.css     # Кнопки
│   ├── layout/
│   │   ├── navbar.css      # Навбар
│   │   └── footer.css      # Футер
│   ├── sections/
│   │   ├── sections-common.css
│   │   ├── hero.css
│   │   ├── advantages.css
│   │   ├── process.css
│   │   ├── portfolio.css
│   │   ├── pricing.css
│   │   ├── trust.css
│   │   ├── faq.css
│   │   └── cta.css
│   └── system/
│       ├── utilities.css
│       ├── a11y.css
│       └── fallbacks.css
├── js/
│   ├── theme.js            # JavaScript для переключения тем
│   └── main.js             # Основной JavaScript (слайдер, мобильное меню)
├── img/
│   ├── favicon.svg         # Favicon
│   ├── hero-desktop/       # Слайдер для десктопа (4 изображения)
│   ├── hero-m.webp         # Изображение для мобильного
│   ├── brodskiy.webp       # Портфолио — Бродский
│   ├── gorkiy.webp         # Портфолио — Горький
│   └── tolstoi.webp        # Портфолио — Толстой
├── email/
│   └── email.html          # Email-шаблон для рассылки
├── .gitignore              # Игнорируемые файлы
├── README.md               # Документация проекта
├── AGENTS.md               # Это руководство
└── DESIGN_SYSTEM.md        # Описание дизайн-системы (v3.1)
```

Дизайн: **Glassmorphism** (тёмный фон, стеклянные карточки) + **светлая тема**.

## Команды

Это **статический HTML-проект** - нет npm команд, сборщиков или тестовых фреймворков.

### Запуск

- Откройте `index.html` в браузере
- Или: `python -m http.server 8000` → `http://localhost:8000`

---

## Правила стиля кода

### HTML

- Семантические HTML5 теги (header, main, section, footer)
- Атрибут `lang="ru"` на `<html>`
- UTF-8 и viewport meta
- Alt текст для изображений
- Стили подключаются через `<link rel="stylesheet" href="css/style.css">` (сборка через `style.css`)
- JavaScript подключается через `<script src="js/*.js" defer></script>`

### CSS - Glassmorphism v2.0 + Дизайн-система

- **Сетка:** Строго 8-пиксельная сетка через токены `--space-1` — `--space-16`.
- **Типографика:** Fluid Typography через `clamp()`. Текст — Inter, заголовки — Outfit.
- **Эффекты:** `backdrop-filter: blur(var(--blur-glass))`, семантические переменные `--surface-bg` и `--surface-border`.
- **Тени:** Системные переменные `--shadow-glass` и `--card-shadow`.
- **Радиусы:** Унифицированные `--radius-sm`, `--radius-md`, `--radius-lg`.
- **Темы:** Поддержка `:root` (Dark) и `[data-theme="light"]`.
- Все стили в отдельных CSS-файлах (см. структуру выше), не в `<style>` тегах.
- **Важно:** Любые новые отступы/размеры должны использовать системные токены.

### JavaScript

- `js/theme.js` — переключение тем с сохранением в localStorage
- `js/main.js` — слайдер в hero, мобильное меню,FAQ-аккордеон
- Используй IIFE для изоляции

### Иконки

- Remix Icon через CDN (`ri-sun-line`, `ri-moon-line`, `ri-menu-line`)
- Подключение: `<link href="https://cdn.jsdelivr.net/npm/remixicon@4.2.0/fonts/remixicon.css" rel="stylesheet">`
- Preconnect для CDN: `<link rel="preconnect" href="https://cdn.jsdelivr.net">`

### Форматирование

- Строчные теги и атрибуты
- Самозакрывающиеся теги: `<img />`, `<br />`
- CSS: 4-пробельная indentation, пустая строка между секциями

### Именование

- Файлы и CSS классы: строчные через дефис
- CSS секции комментируются: `/* --- Section Name --- */`

### Изображения

- Локальные файлы в `img/`
- Формат WebP
- Всегда `alt` атрибут
- Lazy loading: `loading="lazy"`

### Безопасность

- Все внешние ссылки с `target="_blank"` должны иметь `rel="noopener noreferrer"`

---

## Секции сайта

1. **Hero** — слайдер с 4 изображениями, заголовок, CTA-кнопки
2. **Преимущества** — 6 карточек с иконками
3. **Как это работает** — 4 шага процесса
4. **Бонус** — плашка о бесплатном восстановлении фото (между Process и Portfolio, ссылка в навигации не нужна)
5. **Портфолио** — карусель с 3 работами, на каждом слайде до/после (восстановленный оригинал + ретушь)
6. **Цены** — 3 карточки: портретная ретушь (700₽), сложная ретушь (1 000–1 500₽), для мастерских (индивидуально)
7. **FAQ** — аккордеон с 8 вопросами
8. **Почему нам доверяют** — 4 бейджа
9. **Контакты** — Telegram, WhatsApp, Email

---

## Рекомендации для агентов

1. Читайте файл перед изменениями
2. Минимальные точечные изменения
3. Проверяйте в браузере
4. Следуйте glassmorphism стилю (blur, transparency, тёмный фон)
5. Стили — только в `css/`
6. JavaScript — только в `js/`
7. При добавлении новых цветов — используйте CSS переменные.
8. **Обязательно** следуйте токенам из [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).
9. Обновляйте README.md, AGENTS.md и DESIGN_SYSTEM.md при изменении системных параметров.

---

## Чеклист

- [x] HTML валидный
- [x] Адаптивная вёрстка (320px, 768px)
- [x] Все ссылки работают
- [x] Изображения загружаются
- [x] Glassmorphism эффекты работают (blur)
- [x] Переключатель тем работает
- [x] Выбор темы сохраняется в localStorage
- [x] Lazy loading для изображений
- [x] WebP формат
- [x] Дизайн-система (8-point grid, fluid typography) внедрена

---

## Git

Репозиторий: https://github.com/aipunkfacility/monument-web

Ветка: main

---

## Примечания

- Простой статический сайт — без сборки
- Чистый HTML + CSS + JavaScript
- Поддержка тёмной и светлой темы
- Hero-слайдер на десктопе, статичное изображение на мобильном
- Портфолио с каруселью (одно изображение на слайд)
