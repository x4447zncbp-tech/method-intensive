// Серверная функция скачивания «Метод Помощник».
// Пароль — в переменной окружения Netlify DOWNLOAD_PASSWORD (не в коде страницы).
// Файлы отдаются только после проверки пароля. Email+код логируются на сервере.

const FILES = require('./files-data.js');

// порядок и флаги (контент берётся из FILES по dest)
const ORDER = [
  { dest: 'assistant-instruction.md', inject: true, instr: true },
  { dest: 'lectures-index.md' },
  { dest: 'handoff-template.md' },
  { dest: 'knowledge/00-kak-ustroen-metod.md' },
  { dest: 'knowledge/00-dekompoziciya.md' },
  { dest: 'knowledge/01-sinhronizaciya.md' },
  { dest: 'knowledge/02-issledovanie.md' },
  { dest: 'knowledge/03-sintez.md' },
  { dest: 'knowledge/04-1-sborka-brifa.md' },
  { dest: 'knowledge/04-2-generaciya.md' },
  { dest: 'knowledge/05-otbor-finalizaciya.md' },
  { dest: 'knowledge/06-feedback-sessiya.md' },
  { dest: 'knowledge/90-dop-znaniya.md' },
];

function genCode() {
  const t = Date.now().toString(36).toUpperCase();
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let r = '';
  for (let i = 0; i < 4; i++) r += a[Math.floor(Math.random() * a.length)];
  return 'MX-' + t + '-' + r;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ ok: false, error: 'method' }) };
  }
  let d = {};
  try { d = JSON.parse(event.body || '{}'); } catch (e) {}
  const email = (d.email || '').trim();
  const pass = d.password || '';

  // пароль из переменной окружения Netlify; дефолт — чтобы работало сразу после деплоя (в приватном репо, не на странице)
  const PASSWORD = process.env.DOWNLOAD_PASSWORD || 'NegovoriNikomu!';
  if (pass !== PASSWORD) {
    return { statusCode: 401, body: JSON.stringify({ ok: false, error: 'bad_password' }) };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ ok: false, error: 'bad_email' }) };
  }

  const code = genCode();
  const files = ORDER.map((f) => {
    let content = FILES[f.dest] || '';
    if (f.inject) content = content.split('{{INSTANCE_CODE}}').join(code);
    return { dest: f.dest, content, instr: !!f.instr };
  });

  // лог email+код на сервере (в Google-таблицу через Apps Script)
  const LOG_URL = process.env.LOG_URL || 'https://script.google.com/macros/s/AKfycbwfm8rw6kW9zk3b9lubDuu6Iid1i55Dr9GiD8ipdKPNPmQ1UrRr_jsxHmGdIOOfh8Ffow/exec';
  if (LOG_URL) {
    try {
      await fetch(LOG_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          code, email,
          platform: d.platform || '',
          format: d.format || '',
          ts: new Date().toISOString(),
          ua: event.headers['user-agent'] || '',
          ip: event.headers['x-nf-client-connection-ip'] || event.headers['client-ip'] || '',
        }),
      });
    } catch (e) {}
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ok: true, code, files }),
  };
};
