<p align="right"><a href="README.md">English</a> · <b>Русский</b></p>

<p align="center">
  <img src="docs/assets/banner.jpg" alt="JARVIS Admin Dashboard — Aurora и Orbital" width="100%">
</p>

<h1 align="center">JARVIS Admin Dashboard</h1>
<p align="center"><b>Два футуристичных дашборда. Два мира. Без сборки.</b><br>
Открытые шаблоны админки для ИИ-агента, который управляет инфраструктурой.</p>

<p align="center">
  <a href="LICENSE"><img alt="License: MIT" src="https://img.shields.io/badge/license-MIT-A78BFA?style=flat-square"></a>
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&amp;logo=html5&amp;logoColor=white">
  <img alt="Vanilla JavaScript" src="https://img.shields.io/badge/Vanilla_JS-F7DF1E?style=flat-square&amp;logo=javascript&amp;logoColor=black">
  <img alt="No build step" src="https://img.shields.io/badge/build-none-8BE9FF?style=flat-square">
  <img alt="three.js r149" src="https://img.shields.io/badge/three.js-r149-white?style=flat-square&amp;logo=threedotjs&amp;logoColor=white">
</p>

<p align="center">
  <a href="https://fls-dev.github.io/JARVIS_Admin_Dashboard/">Live demo</a> ·
  <a href="#шаблоны">Шаблоны</a> ·
  <a href="#быстрый-старт">Быстрый старт</a> ·
  <a href="https://github.com/fls-dev/JARVIS_Admin_Dashboard/issues/new/choose">Оставить отзыв</a>
</p>

> **Демо:** ссылка заработает после включения GitHub Pages: **Settings → Pages → Build and deployment → Source → GitHub Actions**, затем запустить workflow **Deploy demo to GitHub Pages** (или сделать push в `main`).

## Шаблоны

### JARVIS Aurora

Стеклянная сфера управляет живым холстом из узлов задач с бегущими связями на фоне мягкого сияния авроры.

<a href="templates/aurora/index.html"><img src="docs/assets/aurora-cover.jpg" alt="JARVIS Aurora" width="100%"></a>

[Исходники](templates/aurora/) · [Демо](https://fls-dev.github.io/JARVIS_Admin_Dashboard/templates/aurora/index.html) · [Документация шаблона (EN)](templates/aurora/README.md)

- **10 HTML-страниц**: хаб, UI kit и 8 экранов приложения; у Fine-tuning есть пустое состояние и живой запуск (`#runs`).
- Меню-колесо на десктопе, нижний док и радиальное меню на планшете и телефоне, клавиши `1–9`, палитра `⌘K` / `Ctrl K`.
- Инспектор справа на десктопе превращается в нижнюю шторку на мобильном; холсты на телефоне становятся вертикальными потоками.
- Сфера на Canvas 2D, темы aurora и midnight, поддержка уменьшения анимации с ручным переключателем.

<table>
<tr>
<td align="center" width="33%"><a href="docs/screenshots/aurora/00-hub-desktop.jpg"><img src="docs/screenshots/aurora/00-hub-desktop.jpg" alt="Hub (desktop)" width="280"></a><br><sub><b>Hub</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/aurora/01-overview-desktop.jpg"><img src="docs/screenshots/aurora/01-overview-desktop.jpg" alt="Overview (desktop)" width="280"></a><br><sub><b>Overview</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/aurora/02-tasks-desktop.jpg"><img src="docs/screenshots/aurora/02-tasks-desktop.jpg" alt="Tasks (desktop)" width="280"></a><br><sub><b>Tasks</b></sub></td>
</tr>
<tr>
<td align="center" width="33%"><a href="docs/screenshots/aurora/03-local-chat-desktop.jpg"><img src="docs/screenshots/aurora/03-local-chat-desktop.jpg" alt="Local chat (desktop)" width="280"></a><br><sub><b>Local chat</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/aurora/04-fine-tuning-desktop.jpg"><img src="docs/screenshots/aurora/04-fine-tuning-desktop.jpg" alt="Fine-tuning (desktop)" width="280"></a><br><sub><b>Fine-tuning</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/aurora/05-fine-tuning-runs-desktop.jpg"><img src="docs/screenshots/aurora/05-fine-tuning-runs-desktop.jpg" alt="Fine-tuning · runs (desktop)" width="280"></a><br><sub><b>Fine-tuning · runs</b></sub></td>
</tr>
<tr>
<td align="center" width="33%"><a href="docs/screenshots/aurora/06-scheduled-desktop.jpg"><img src="docs/screenshots/aurora/06-scheduled-desktop.jpg" alt="Scheduled work (desktop)" width="280"></a><br><sub><b>Scheduled work</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/aurora/07-memory-desktop.jpg"><img src="docs/screenshots/aurora/07-memory-desktop.jpg" alt="Memory (desktop)" width="280"></a><br><sub><b>Memory</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/aurora/08-integrations-desktop.jpg"><img src="docs/screenshots/aurora/08-integrations-desktop.jpg" alt="Integrations (desktop)" width="280"></a><br><sub><b>Integrations</b></sub></td>
</tr>
<tr>
<td align="center" width="33%"><a href="docs/screenshots/aurora/09-audit-desktop.jpg"><img src="docs/screenshots/aurora/09-audit-desktop.jpg" alt="Audit trail (desktop)" width="280"></a><br><sub><b>Audit trail</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/aurora/10-ui-kit-desktop.jpg"><img src="docs/screenshots/aurora/10-ui-kit-desktop.jpg" alt="UI kit (desktop)" width="280"></a><br><sub><b>UI kit</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/aurora/12-command-palette-desktop.jpg"><img src="docs/screenshots/aurora/12-command-palette-desktop.jpg" alt="⌘K palette (desktop)" width="280"></a><br><sub><b>⌘K palette</b></sub></td>
</tr>
</table>

### JARVIS Orbital

Девять комнат вращаются вокруг живой 3D-планеты; каждая страница — набор стеклянных окон в сумеречном небе, а каждый переход — полёт камеры.

<a href="templates/orbital/index.html"><img src="docs/assets/orbital-cover.jpg" alt="JARVIS Orbital" width="100%"></a>

[Исходники](templates/orbital/) · [Демо](https://fls-dev.github.io/JARVIS_Admin_Dashboard/templates/orbital/index.html) · [Документация шаблона (EN)](templates/orbital/README.md)

- **11 HTML-страниц**: хаб, UI kit и 9 комнат, включая полноценную **Operations**; плюс заготовка `_blank.html`.
- Планета на three.js с дугами трафика, кольцами и спутниками-интеграциями; у каждой комнаты своя поза.
- Пилюля внизу раскрывается в дугу из девяти порталов (`G`); на телефоне — лист 3 × 3.
- three.js и шрифты в комплекте — работает офлайн. Без WebGL показывается CSS-планета, при уменьшении анимации — статичный кадр.

<table>
<tr>
<td align="center" width="33%"><a href="docs/screenshots/orbital/00-hub-desktop.jpg"><img src="docs/screenshots/orbital/00-hub-desktop.jpg" alt="Hub (desktop)" width="280"></a><br><sub><b>Hub</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/orbital/01-overview-desktop.jpg"><img src="docs/screenshots/orbital/01-overview-desktop.jpg" alt="Overview (desktop)" width="280"></a><br><sub><b>Overview</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/orbital/02-tasks-desktop.jpg"><img src="docs/screenshots/orbital/02-tasks-desktop.jpg" alt="Tasks (desktop)" width="280"></a><br><sub><b>Tasks</b></sub></td>
</tr>
<tr>
<td align="center" width="33%"><a href="docs/screenshots/orbital/03-operations-desktop.jpg"><img src="docs/screenshots/orbital/03-operations-desktop.jpg" alt="Operations (desktop)" width="280"></a><br><sub><b>Operations</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/orbital/04-local-chat-desktop.jpg"><img src="docs/screenshots/orbital/04-local-chat-desktop.jpg" alt="Local chat (desktop)" width="280"></a><br><sub><b>Local chat</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/orbital/05-fine-tuning-desktop.jpg"><img src="docs/screenshots/orbital/05-fine-tuning-desktop.jpg" alt="Fine-tuning (desktop)" width="280"></a><br><sub><b>Fine-tuning</b></sub></td>
</tr>
<tr>
<td align="center" width="33%"><a href="docs/screenshots/orbital/06-scheduled-desktop.jpg"><img src="docs/screenshots/orbital/06-scheduled-desktop.jpg" alt="Scheduled work (desktop)" width="280"></a><br><sub><b>Scheduled work</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/orbital/07-memory-desktop.jpg"><img src="docs/screenshots/orbital/07-memory-desktop.jpg" alt="Memory (desktop)" width="280"></a><br><sub><b>Memory</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/orbital/08-integrations-desktop.jpg"><img src="docs/screenshots/orbital/08-integrations-desktop.jpg" alt="Integrations (desktop)" width="280"></a><br><sub><b>Integrations</b></sub></td>
</tr>
<tr>
<td align="center" width="33%"><a href="docs/screenshots/orbital/09-audit-desktop.jpg"><img src="docs/screenshots/orbital/09-audit-desktop.jpg" alt="Audit trail (desktop)" width="280"></a><br><sub><b>Audit trail</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/orbital/10-ui-kit-desktop.jpg"><img src="docs/screenshots/orbital/10-ui-kit-desktop.jpg" alt="UI kit (desktop)" width="280"></a><br><sub><b>UI kit</b></sub></td>
<td align="center" width="33%"><a href="docs/screenshots/orbital/11-orbit-dial-open-desktop.jpg"><img src="docs/screenshots/orbital/11-orbit-dial-open-desktop.jpg" alt="Orbit dial (desktop)" width="280"></a><br><sub><b>Orbit dial</b></sub></td>
</tr>
<tr>
<td align="center" width="33%"><a href="docs/screenshots/orbital/12-command-palette-desktop.jpg"><img src="docs/screenshots/orbital/12-command-palette-desktop.jpg" alt="⌘K palette (desktop)" width="280"></a><br><sub><b>⌘K palette</b></sub></td>
</tr>
</table>

Мобильные скриншоты обоих шаблонов — в [английском README](README.md#templates) и в папке [`docs/screenshots/`](docs/screenshots/).

## Сравнение

| | Aurora | Orbital |
| --- | --- | --- |
| Мир | Фиолетово-розовая аврора, живой холст | Сумеречное небо, коралловый горизонт |
| Ядро | Стеклянная сфера · Canvas 2D | Планета · three.js r149 / WebGL |
| Навигация | Колесо; док + радиальное меню | Пилюля → дуга порталов; лист 3 × 3 |
| Детали | Инспектор → нижняя шторка | Drawer |
| Страниц | 10 | 11 |
| Operations | Заглушка (toast) | Полноценная комната |
| Шрифты | Google Fonts | В комплекте |

## Быстрый старт

```bash
git clone https://github.com/fls-dev/JARVIS_Admin_Dashboard.git
cd JARVIS_Admin_Dashboard
python3 -m http.server 8080   # или: npx serve .
```

Откройте http://localhost:8080/ или просто `index.html` с диска. Устанавливать и собирать ничего не нужно.

> Это **статические UI-шаблоны, а не готовое приложение**: все задачи, хосты, суммы и сообщения — вымышленные демо-данные, бэкенда и реальных интеграций нет.

## Кастомизация

- Цвета, стекло, типографика, радиусы, анимация — `templates/<name>/assets/css/tokens.css`.
- Весь демо-контент и маршруты меню — `templates/<name>/assets/js/data.js`.
- Логика страниц — `templates/<name>/assets/js/pages/<page>.js`; позы планеты Orbital — `assets/js/scene.js`.

## Roadmap

- [ ] **Страница Operations для Aurora** (сейчас заглушка)
- [ ] Проверка на реальных устройствах Safari и на GPU
- [ ] Аудит доступности (клавиатура, скринридеры, контраст)
- [ ] Визуальные регрессионные тесты

## Отзывы

Репозиторий открыт ради обратной связи: какой мир ближе, понятна ли навигация, что бы вы изменили?
[Отзыв о дизайне](https://github.com/fls-dev/JARVIS_Admin_Dashboard/issues/new?template=design_feedback.yml) · [Баг](https://github.com/fls-dev/JARVIS_Admin_Dashboard/issues/new?template=bug_report.yml) · [Идея](https://github.com/fls-dev/JARVIS_Admin_Dashboard/issues/new?template=feature_request.yml) · [Discussions](https://github.com/fls-dev/JARVIS_Admin_Dashboard/discussions)

## Автор и лицензия

Дизайн и разработка — **[fls-dev](https://github.com/fls-dev)**. Лицензия [MIT](LICENSE) © 2026 fls-dev (Pavel Misko). Сторонние компоненты (three.js, шрифты) — под своими лицензиями, см. CREDITS в папках шаблонов.
