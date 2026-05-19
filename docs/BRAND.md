# BRAND

Визуальная система Method для лендинга интенсива и всех последующих коммуникаций. Источник истины правил — `CLAUDE.md` секция «Brand — non-negotiable visual rules». Этот файл — точные значения (hex, шрифты, ассеты).

---

## Цветовая палитра

| Слот | Hex | Описание |
|---|---|---|
| `--bg` | **`#ebebeb`** | Основной фон. Light gray, sampled из `materials/Method 3.0/P1_01.jpg` (брендовая страница программы). RGB(235, 235, 235). **Используется как фон каждого экрана лендинга.** |
| `--ink` | `#0a0a0a` | Основной текст (heading + body). Не чисто-чёрный — почти-чёрный для мягкости на сером фоне. |
| `--ink-soft` | `#3a3a3a` | Secondary text (подписи, captions, footer). |
| `--ink-muted` | `#6a6a6a` | Метаданные, тонкие подписи, числа. |
| `--line` | `#cccccc` | Тонкие линии-разделители, рамки. |

**Палитра — строго монохром.** Никаких акцентных цветов (синий/красный/жёлтый/etc). Это non-negotiable правило из `CLAUDE.md`.

CSS variables (для копирования в `<style>`):
```css
:root {
  --bg: #ebebeb;
  --ink: #0a0a0a;
  --ink-soft: #3a3a3a;
  --ink-muted: #6a6a6a;
  --line: #cccccc;
}
```

---

## Типографика

**Шрифт:** `Inter` (Google Fonts). Free, веса 400-900 доступны.

Подключение в `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap" rel="stylesheet">
```

**Шрифт-стек:**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
```

**Веса:**
- **900 (Black)** — hero headline (один на экран)
- **800 (Extrabold)** — секционные заголовки (section heading)
- **700 (Bold)** — sub-heading, акцент в body
- **500 (Medium)** — body strong / labels
- **400 (Regular)** — body text

**Размеры (рекомендация):**
- Hero headline: clamp(2.5rem, 6vw, 4.5rem) / line-height 1.05 / letter-spacing -0.03em
- Section heading: clamp(1.75rem, 3.5vw, 2.5rem) / line-height 1.15 / letter-spacing -0.02em
- Sub-heading: 1.25rem / line-height 1.3
- Body: 1.0625rem (17px) / line-height 1.55
- Caption: 0.875rem (14px) / line-height 1.4

---

## Сигнатурный визуальный элемент: isometric cube cropped by canvas

**Правило (non-negotiable):**
- **Куб должен видимо пересекать / обрезаться рамкой canvas** хотя бы на одной стороне.
- **NOT hexagon. NOT polygon. NOT generic 3D-shape.**
- Использовать готовые ассеты из `/assets/`, **не воссоздавать программно** через CSS-shapes или SVG-from-scratch.

**Доступные ассеты куба:** `assets/cube.png`, `assets/cube-1.png` (обе версии — изометрические кубы, PNG с прозрачным фоном).

**Рекомендация применения для лендинга:**
- Hero: один большой куб, обрезанный правым/нижним краем экрана. Прозрачный фон PNG позволяет накладывать на серый bg без обводки.
- Section dividers: меньший куб, обрезанный краем секции.
- CTA: маленький куб как «маркер» рядом с кнопкой.

**CSS-паттерн:**
```css
.cube {
  position: absolute;
  z-index: 0;
  pointer-events: none;
}
.cube--hero {
  right: -8vw;       /* отрицательный offset = cropped by canvas */
  bottom: -10vh;
  width: clamp(300px, 50vw, 800px);
  opacity: 0.9;
}
```

---

## Все ассеты в `/assets/`

| Файл | Назначение | Прим. |
|---|---|---|
| `cube.png` | Главный изометрический куб | Использовать в hero |
| `cube-1.png` | Альтернативная версия куба | Backup |
| `S1.png`, `S1-1.png` | Серия S1 (вариации брендового знака) | Для section dividers |
| `S2.png`, `S2-1.png`, `S2.jpg` | Серия S2 | Аналогично |
| `S3.png`, `S3-1.png`, `S3-2.png` | Серия S3 | Аналогично |
| `S4.png`, `S4-1.png`, `S4-2.png` | Серия S4 | Аналогично |
| `Union.png`, `Union-1.png` – `Union-4.png` | Серия Union (доп. геометрия) | Для accent-блоков |
| `Vector 10.png` | Vector-знак | Для small marks |
| `Group 6.png`, `Group 7.png`, `Group 8.png` | Group-знаки | Для small marks |
| `Diploma #1.png` | Графика диплома | Phase 2 (full-course context) |
| `P3_*.jpg` | Страницы программы P3 | Reference, не для прямого использования |

**Принцип отбора:** для stub-лендинга достаточно `cube.png` + 1-2 знака из S/Union серии для тонких акцентов. Не перегружать.

---

## Запрещено

- ❌ Любые акцентные цвета кроме монохромной шкалы.
- ❌ Hexagon / polygon / другие 3D-shape под видом «творческой интерпретации куба».
- ❌ Воссоздание ассетов в CSS / SVG из ноля (когда есть готовый PNG).
- ❌ Скруглённые углы на самих кубах (изометрические грани — острые).
- ❌ Тени / glow / любые градиенты на кубе.
- ❌ Эмодзи в копи лендинга (точечно — только в дословных цитатах студентов, если они там есть в оригинале).
