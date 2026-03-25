# AGENTS.md - Руководство по разработке для monument-web

## Обзор проекта

Статический HTML-сайт для сервиса ретуши фотографий (гравировка на памятниках).

### Структура проекта

```
monument-web/
├── index.html          # Основная страница (лендинг)
├── css/
│   └── style.css       # Все стили (glassmorphism + темы)
├── js/
│   └── theme.js        # JavaScript для переключения тем
├── img/
│   ├── favicon.svg     # Favicon
│   ├── male.webp       # Пример ретуши (мужской портрет)
│   └── female.webp     # Пример ретуши (женский портрет)
├── email/
│   └── email.html      # Email-шаблон для рассылки
├── README.md           # Документация проекта
└── AGENTS.md           # Это руководство
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
- Стили подключаются через `<link rel="stylesheet" href="css/style.css">`
- JavaScript подключается через `<script src="js/theme.js" defer></script>`

### CSS - Glassmorphism + Темы

- Фон: тёмный градиент `#1a1a2e → #0f3460`
- Карточки: `backdrop-filter: blur()`, полупрозрачные `rgba(255,255,255,0.08)`
- Границы: `1px solid rgba(255,255,255,0.15)`
- Светлый текст, 4-пробельная indentation
- Flexbox и Grid для вёрстки
- Media queries для мобильных (600px breakpoint)
- Все стили в `css/style.css`, не в `<style>` тегах
- **CSS переменные** для тем (`:root` и `[data-theme="light"]`)
- **Переключатель тем** в header (кнопка с иконкой)
- **Fallback** для старых браузеров без backdrop-filter (`@supports`)

### JavaScript

- Минимальный код для переключения тем
- Сохранение выбора в `localStorage`
- Обновление иконки кнопки
- Используй IIFE (immediately invoked function expression) для изоляции

### Иконки

- Remix Icon через CDN (`ri-sun-line`, `ri-moon-line`)
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
- Формат WebP с fallback на JPG
- Всегда `alt` атрибут
- Lazy loading: `loading="lazy"`
- Используй `<picture>` для WebP с fallback

### Безопасность

- Все внешние ссылки с `target="_blank"` должны иметь `rel="noopener noreferrer"`

---

## Рекомендации для агентов

1. Читайте файл перед изменениями
2. Минимальные точечные изменения
3. Проверяйте в браузере
4. Следуйте glassmorphism стилю (blur, transparency, тёмный фон)
5. Стили — только в `css/style.css`
6. JavaScript — только в `js/`
7. При добавлении новых цветов — используйте CSS переменные

---

## Чеклист

- [x] HTML валидный
- [x] Адаптивная вёрстка (320px, 768px)
- [x] Все ссылки работают
- [x] Изображения загружаются
- [x] Glassmorphism эффекты работают (blur)
- [x] Переключатель тем работает
- [x] Выбор темы сохраняется
- [x] Lazy loading для изображений
- [x] WebP формат с fallback

---

## Git

Репозиторий: https://github.com/aipunkfacility/monument-web

Ветка: main

---

## Примечания

- Простой статический сайт - без сборки
- Чистый HTML + CSS + JavaScript
- Поддержка тёмной и светлой темы
- Email шаблон включает HTML и plain-text версию