/**
 * Метод Помощник — логирование скачиваний в Google-таблицу.
 * Пишет: дата, уникальный код, email, время (клиент), браузер, источник.
 *
 * Установка:
 * 1. Создай новую Google-таблицу.
 * 2. В ней: Расширения → Apps Script.
 * 3. Вставь этот код, сохрани.
 * 4. Развернуть → Новое развёртывание → тип «Веб-приложение».
 *    - «Запуск от имени»: Я.
 *    - «У кого есть доступ»: Все (Anyone).
 *    - Развернуть → скопируй URL веб-приложения.
 * 5. Вставь этот URL в index.html → CONFIG.appsScriptUrl.
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Дата (сервер)', 'Код', 'Email', 'Время (клиент)', 'Браузер', 'Источник']);
    }
    var d = {};
    try { d = JSON.parse(e.postData.contents); } catch (err) {}
    sheet.appendRow([new Date(), d.code || '', d.email || '', d.ts || '', d.ua || '', d.ref || '']);
    return ContentService.createTextOutput('ok');
  } catch (err) {
    return ContentService.createTextOutput('err: ' + err);
  }
}

function doGet() {
  return ContentService.createTextOutput('Метод Помощник — лог скачиваний активен.');
}
