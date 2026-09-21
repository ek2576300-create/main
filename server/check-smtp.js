// Проверка почтовых доступов без тестовой покупки:
//   npm run mail-check          — только логин на SMTP
//   npm run mail-check -- --send — плюс тестовое письмо на MAIL_TO
import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST;
const port = Number(process.env.SMTP_PORT || 465);
const secure = process.env.SMTP_SECURE !== 'false';
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASSWORD;

const mask = (value) => (value ? `${value.slice(0, 2)}${'*'.repeat(Math.max(value.length - 2, 0))}` : '(пусто)');

console.log('Настройки из server/.env:');
console.log(`  SMTP_HOST     ${host || '(пусто)'}`);
console.log(`  SMTP_PORT     ${port}${secure ? ' (secure: да)' : ' (secure: нет)'}`);
console.log(`  SMTP_USER     ${user || '(пусто)'}`);
console.log(`  SMTP_PASSWORD ${mask(pass)} — длина ${pass ? pass.length : 0}`);
console.log(`  MAIL_FROM     ${process.env.MAIL_FROM || '(пусто)'}`);
console.log(`  MAIL_TO       ${process.env.MAIL_TO || '(пусто)'}`);

if (process.env.MAIL_FROM && user && process.env.MAIL_FROM !== user) {
  console.log('\n! MAIL_FROM не совпадает с SMTP_USER — Яндекс отклонит такие письма (550 Sender address rejected).');
}
// Этот адрес годами лежал в .env.example, но такого ящика не существует:
// письма о заявках уходили и возвращались отбивкой «554 Unknown user».
if (process.env.MAIL_TO === 'askhow-egorbanderenko@yandex.ru') {
  console.log('\n! MAIL_TO указывает на несуществующий ящик askhow-egorbanderenko@yandex.ru.');
  console.log('  Уведомления о заявках будут возвращаться отбивкой. Впишите реальный адрес.');
}
if (secure && port === 587) console.log('\n! Порт 587 требует SMTP_SECURE=false.');
if (!secure && port === 465) console.log('\n! Порт 465 требует SMTP_SECURE=true.');

const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });

try {
  await transporter.verify();
  console.log('\nЛогин на SMTP: OK');
} catch (error) {
  console.error('\nЛогин на SMTP не прошёл:', error.message);
  if (/Invalid user or password/i.test(error.message)) {
    console.error('  → Нужен пароль приложения: id.yandex.ru → Безопасность → Пароли приложений → Почта.');
    console.error('    Обычный пароль от аккаунта Яндекс для SMTP не подходит.');
  }
  if (/does not have access rights/i.test(error.message)) {
    console.error('  → Для ящика закрыт доступ по протоколам. Яндекс Почта → Все настройки →');
    console.error('    Почтовые программы → разрешить доступ по IMAP (в Яндекс 360 — в админке организации).');
  }
  process.exit(1);
}

if (process.argv.includes('--send')) {
  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: 'AskHow — проверка отправки',
    text: 'Если это письмо пришло, отправка с сервера работает.',
  });
  console.log(`Тестовое письмо отправлено на ${process.env.MAIL_TO}: ${info.messageId}`);
  console.log('Это значит, что Яндекс письмо принял. Если ящика не существует,');
  console.log('отбивка «554 Unknown user» придёт отдельным письмом через минуту.');
}
