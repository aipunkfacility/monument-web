# Autoresearch — monument-web

## Старт

При запуске прочитай `program.md` и начни эксперимент. Не останавливайся и не спрашивай пользователя.

## Инфраструктура

### Сайт (лендинг)
- **Порт:** `localhost:8080`
- **Запуск:** `python3 -m http.server 8080` (автоматически через benchmark.sh)
- **Остановка:** Ctrl+C или автоматически после бенчмарка
- Python отдаёт файлы проекта (index.html + css/ + js/ + img/)

### Бенчмарк
- **Запуск:** `bash benchmark.sh`
- Запускает Lighthouse 3 раза (headless Chrome), берёт медиану
- Результат в `run.log`, лог в `results.tsv`
- Требуется: Node.js + Chrome/Chromium

## Файлы проекта

| Файл | Можно менять? |
|------|--------------|
| `index.html` | Да |
| `css/style.css` | Да |
| `js/main.js` | Да |
| `js/theme.js` | Да |
| `benchmark.sh` | Нет |
| `program.md` | Нет |
| `AGENTS.md` | Нет |
| `img/*` | Нет (не удалять) |
