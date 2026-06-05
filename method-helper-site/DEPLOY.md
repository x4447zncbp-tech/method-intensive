# Метод Помощник — лендинг со скачиванием (серверная версия). Деплой

## Как это работает (безопасно)
- **Лендинг открыт** (`public/index.html`) — стиль Метода, выбор платформы, пиксели.
- **Скачивание — через серверную функцию** `netlify/functions/download.js`. Пароль и сами файлы НЕ лежат в коде страницы:
  - пароль хранится в переменной окружения Netlify `DOWNLOAD_PASSWORD`;
  - файлы инструкции/знаний вшиты в функцию (`files-data.js`) и отдаются только после проверки пароля;
  - на каждое скачивание генерится **уникальный код**, вшивается в инструкцию;
  - **email + код пишутся на сервере** (функция шлёт в Google-таблицу, видит даже IP).
- Из кода страницы пароль и файлы достать нельзя — это нормальная защита, не «мягкий замок».

## Файлы
- `public/index.html` — лендинг (единственное, что публикуется).
- `netlify/functions/download.js` — серверная функция.
- `netlify/functions/files-data.js` — встроенные файлы (генерится из `files/`).
- `files/` — исходники инструкции/знаний (НЕ публикуются; источник для регенерации).
- `apps-script.gs` — приёмник лога в Google-таблицу.

## Деплой (Netlify, отдельный сайт — основной лендинг НЕ трогаем)
1. **Netlify → Add new site → Import from Git** → репозиторий `method-intensive`.
2. В настройках сборки:
   - **Base directory:** `method-helper-site`
   - **Publish directory:** `method-helper-site/public` (или `public` относительно base)
   - Functions подхватятся из `netlify.toml` (`netlify/functions`).
3. **Site configuration → Environment variables** — добавь:
   - `DOWNLOAD_PASSWORD` = `NegovoriNikomu!` (или свой пароль)
   - `LOG_URL` = URL веб-приложения Apps Script (для лога email+код; см. ниже). Можно пока пусто — тогда скачивание работает, но почты не пишутся.
4. **Domain settings** → добавь поддомен (напр. `pomoshnik.gotaddedvalue.com`).
5. Deploy.

## Лог email+код в таблицу
1. Создай Google-таблицу → Расширения → Apps Script → вставь `apps-script.gs` → сохрани.
2. Развернуть → Веб-приложение → доступ «Все» → скопируй URL.
3. Вставь URL в Netlify env `LOG_URL`. Готово — функция сама будет писать туда email, код, платформу, время, IP.

## Пиксели — уже стоят
Meta Pixel `1514480906783549` + GA4 `G-YEF15G0CEV`. События: `PageView`, `select_platform`, `DownloadMetod` (с кодом и платформой).

## Если меняешь инструкцию/знания позже
Файлы вшиты в функцию. После правок в `method-assistant/` обнови их в сайте:
```
cp method-assistant/assistant-instruction.md method-helper-site/files/
cp method-assistant/knowledge/*.md method-helper-site/files/knowledge/
cp method-assistant/lectures-index.md method-helper-site/handoff-template.md method-helper-site/files/ 2>/dev/null
# затем регенерируй встроенные данные:
python3 -c "import os,json;b='method-helper-site/files';d={};[d.__setitem__(os.path.relpath(os.path.join(r,f),b),open(os.path.join(r,f),encoding='utf-8').read()) for r,_,fs in os.walk(b) for f in fs];open('method-helper-site/netlify/functions/files-data.js','w',encoding='utf-8').write('module.exports = '+json.dumps(d,ensure_ascii=False)+';\n')"
```
(не забудь, что в `assistant-instruction.md` внутри `files/` есть плейсхолдер `{{INSTANCE_CODE}}` — он нужен, не удаляй.)

## Локальный предпросмотр
- Лендинг: `cd method-helper-site/public && python3 -m http.server 8799` → `http://localhost:8799`.
- ⚠️ Скачивание локально не сработает (нужна функция). Чтобы протестить скачивание локально — поставь `netlify-cli` и запусти `netlify dev`. Иначе проверяй после деплоя.
