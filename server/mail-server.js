import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import { isContentError, publishedArticles, readArticles, saveArticles } from './content-store.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = Number(process.env.MAIL_PORT || process.env.PORT || 3020);
const ENDPOINT_PATH = process.env.MAIL_ENDPOINT_PATH || '/api/lead';
const PAID_PATH = process.env.MAIL_PAID_PATH || '/api/lead/paid';
const ADMIN_LEADS_PATH = process.env.ADMIN_LEADS_PATH || '/api/admin/leads';
const CONTENT_PATH = process.env.CONTENT_PATH || '/api/content';
const ADMIN_CONTENT_PATH = process.env.ADMIN_CONTENT_PATH || '/api/admin/content';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const MAIL_API_KEY = process.env.MAIL_API_KEY || '';
const ADMIN_KEY = process.env.ADMIN_KEY || '';
const LEADS_FILE = process.env.LEADS_FILE || path.join(__dirname, 'data', 'leads.json');
const MAX_BODY_BYTES = 64 * 1024;
// A whole collection of articles is a different order of magnitude from a
// lead, so the content endpoint gets its own ceiling.
const MAX_CONTENT_BODY_BYTES = 2 * 1024 * 1024;
const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE !== 'false',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const JSON_HEADERS = { 'Content-Type': 'application/json; charset=utf-8' };

const seenIdempotencyKeys = new Map();

function pruneIdempotencyKeys() {
  const now = Date.now();
  for (const [key, expiresAt] of seenIdempotencyKeys) {
    if (expiresAt <= now) seenIdempotencyKeys.delete(key);
  }
}

function applyCors(req, res) {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key, X-Admin-Key, Idempotency-Key');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
}

function readJsonBody(req, maxBytes = MAX_BODY_BYTES) {
  return new Promise((resolve, reject) => {
    let received = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      received += chunk.length;
      if (received > maxBytes) {
        reject(new Error('payload_too_large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        resolve(chunks.length ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {});
      } catch {
        reject(new Error('invalid_json'));
      }
    });
    req.on('error', reject);
  });
}

function isValidEmail(value) {
  return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const TELEGRAM_URL = 'https://t.me/+J1XU4RVIVQM1NjBi';
const MAX_SUPPORT_URL = 'https://max.ru/join/Ylp_WbRcr8wnnJBmtBFfB6FpT9b_rh0VIV2o9byrtbc';
const SITE_URL = 'https://catalog.askhow.ru';
const COURSE_URL_BASE = `${SITE_URL}/catalog/course`;

// The AskHow wordmark and the messenger marks travel with the letter as inline
// (cid:) attachments rather than as hotlinks: mail clients that block remote
// images still show them, and nothing depends on the site being reachable.
// A missing file must never cost us the email, so anything that fails to load
// simply falls back to text.
const EMAIL_IMAGES = [
  { cid: 'askhow-logo', file: 'askhow-logo.png' },
  { cid: 'icon-telegram', file: 'icon-telegram.png' },
  { cid: 'icon-max', file: 'icon-max.png' },
];

const emailImages = new Map();
for (const image of EMAIL_IMAGES) {
  try {
    emailImages.set(image.cid, readFileSync(path.join(__dirname, 'assets', image.file)));
  } catch (error) {
    console.error(`Email image missing (${image.file}):`, error.message);
  }
}

const inlineAttachments = EMAIL_IMAGES.filter((image) => emailImages.has(image.cid)).map((image) => ({
  filename: image.file,
  cid: image.cid,
  content: emailImages.get(image.cid),
  contentType: 'image/png',
  contentDisposition: 'inline',
}));

function renderInlineImage(cid, { width, height, alt = '', style = '' }) {
  if (!emailImages.has(cid)) return '';
  return `<img src="cid:${cid}" width="${width}" height="${height}" alt="${escapeHtml(alt)}" style="display:inline-block;border:0;outline:none;width:${width}px;height:${height}px;${style}" />`;
}

function courseUrl(courseId) {
  return courseId ? `${COURSE_URL_BASE}/${encodeURIComponent(courseId)}` : '';
}

// Some of the values we link (the page a lead came from) arrive straight from
// the browser, so they are quoted for the attribute and limited to the schemes
// a letter has any business linking.
function safeUrl(value) {
  const url = String(value ?? '').trim();
  if (!/^(https?:|mailto:)/i.test(url)) return '';
  return escapeHtml(url);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);
}

const MAIL_TEMPLATE_VERSION = '2026-09-18-course-links';
const FONT_STACK = "'Manrope',Arial,Helvetica,sans-serif";

function formatMoscowTime(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return String(value);
  try {
    return `${date.toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })} МСК`;
  } catch {
    // Node built without full ICU throws on a named time zone — format the
    // +03:00 offset by hand rather than lose the whole email over a date.
    const moscow = new Date(date.getTime() + 3 * 60 * 60 * 1000);
    const pad = (part) => String(part).padStart(2, '0');
    return `${pad(moscow.getUTCDate())}.${pad(moscow.getUTCMonth() + 1)}.${moscow.getUTCFullYear()}, ${pad(
      moscow.getUTCHours(),
    )}:${pad(moscow.getUTCMinutes())} МСК`;
  }
}

// Building a letter must never take the request down with it: a template
// error is logged and the endpoint still answers the visitor.
function sendMail(kind, build, envelope) {
  let letter;
  try {
    letter = build();
  } catch (error) {
    console.error(`${kind} template error:`, error.message);
    return;
  }

  transporter
    .sendMail({
      ...envelope,
      subject: letter.subject,
      text: letter.text,
      html: letter.html,
      attachments: inlineAttachments,
    })
    .then((info) => console.log(`${kind} delivered:`, info.messageId))
    .catch((error) => console.error(`${kind} error:`, error.message));
}

// Rows of a summary card: the same "label on the left, value on the right"
// list the thank-you page shows. A third element turns the value into a link —
// that is how the course row points at the course itself.
function renderSummaryRows(rows) {
  return rows
    .filter(([, value]) => value)
    .map(([label, value, href], index) => {
      const text = escapeHtml(value);
      const link = safeUrl(href);
      const content = link ? `<a href="${link}" style="color:#181818;text-decoration:underline;">${text}</a>` : text;
      return `
        <tr>
          <td style="padding:11px 15px;font-size:12px;color:#999999;${index ? 'border-top:1px solid #f2f2f2;' : ''}">${escapeHtml(label)}</td>
          <td align="right" style="padding:11px 15px;font-size:12px;font-weight:600;color:#181818;${index ? 'border-top:1px solid #f2f2f2;' : ''}">${content}</td>
        </tr>`;
    })
    .join('');
}

// Numbered steps, same as the thank-you page.
function renderSteps(steps) {
  return steps
    .map(
      ([number, title, text], index) => `
        <tr>
          <td width="21" valign="top" style="padding:${index ? '13px' : '0'} 0 0;">
            <table role="presentation" cellpadding="0" cellspacing="0"><tr>
              <td width="21" height="21" align="center" valign="middle" style="width:21px;height:21px;border-radius:999px;background:#f7f7f7;font-size:10px;font-weight:700;color:#888888;">${number}</td>
            </tr></table>
          </td>
          <td valign="top" style="padding:${index ? '13px' : '0'} 0 0 11px;">
            <div style="font-size:12px;font-weight:600;color:#181818;">${escapeHtml(title)}</div>
            <div style="margin-top:2px;font-size:11px;line-height:1.5;color:#888888;">${escapeHtml(text)}</div>
          </td>
        </tr>`,
    )
    .join('');
}

// The AskHow wordmark, with the plain-text version kept as the fallback for
// clients that refuse inline images altogether.
function renderLogo() {
  const image = renderInlineImage('askhow-logo', { width: 104, height: 20, alt: 'AskHow' });
  return image || '<div style="font-size:21px;font-weight:800;letter-spacing:-1.2px;color:#181818;">askhow</div>';
}

// A messenger pill: brand mark plus name, and just the name if the mark is
// unavailable.
function renderMessengerLink(href, cid, label) {
  const icon = renderInlineImage(cid, {
    width: 14,
    height: 14,
    style: 'border-radius:4px;vertical-align:middle;margin-right:6px;',
  });
  return `<a href="${href}" style="display:inline-block;padding:8px 14px;border-radius:999px;background:#f7f7f7;color:#555555;font-size:11px;font-weight:600;text-decoration:none;">${icon}<span style="vertical-align:middle;">${escapeHtml(label)}</span></a>`;
}

// Shared chrome, deliberately plain so every email reads like the site: a
// white card with hairline borders, the AskHow wordmark, and quiet grey type.
function renderEmailShell({ preheader = '', title, bodyHtml }) {
  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;font-family:${FONT_STACK};">
    <span style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;padding:20px 14px 40px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #ececec;border-radius:24px;">
            <tr>
              <td align="center" style="padding:36px 28px 30px;color:#181818;">
                ${renderLogo()}
                ${bodyHtml}
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin:14px auto 0;">
                  <tr>
                    <td style="padding-right:8px;">${renderMessengerLink(TELEGRAM_URL, 'icon-telegram', 'Telegram')}</td>
                    <td>${renderMessengerLink(MAX_SUPPORT_URL, 'icon-max', 'MAX')}</td>
                  </tr>
                </table>
                <p style="margin:22px 0 0;font-size:10px;line-height:1.6;color:#b5b5b5;">ООО «АСКХАУ» · ИНН 1655479795 · <a href="${SITE_URL}" style="color:#b5b5b5;text-decoration:none;">${SITE_URL.replace('https://', '')}</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildEmail(lead) {
  const isFree = !lead.price || lead.price === 'Бесплатно';
  const courseLink = courseUrl(lead.course_id);
  const rows = [
    ['Имя', lead.name],
    ['E-mail', lead.email, lead.email ? `mailto:${lead.email}` : ''],
    ['Курс', lead.course_title || lead.course_id || '—', courseLink],
    ['Цена', isFree ? 'Бесплатно' : `${lead.price ?? '—'} ${lead.currency || ''}`.trim()],
    ['Источник', lead.source || '—'],
    ['Форма', lead.form_name || lead.form_id || '—'],
    ['Страница', lead.page_url || '—', lead.page_url || ''],
    ['Время', formatMoscowTime(lead.received_at || lead.time)],
  ];

  const note = lead.repeat_lead
    ? '<p style="margin:10px 0 0;font-size:11px;color:#888888;">Повторная заявка — человек уже оставлял данные по этому курсу.</p>'
    : '';

  const bodyHtml = `
    <h1 style="margin:22px 0 0;font-size:26px;font-weight:600;line-height:1.15;letter-spacing:-0.03em;color:#181818;">Новая заявка</h1>
    <p style="margin:10px auto 0;max-width:380px;font-size:12px;line-height:1.7;color:#777777;">${escapeHtml(
      isFree ? 'Заявка на бесплатный курс в каталоге AskHow.' : 'Заявка перед оплатой курса в каталоге AskHow.',
    )}</p>
    ${note}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;border:1px solid #ececec;border-radius:15px;text-align:left;">
      ${renderSummaryRows(rows)}
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px auto 0;">
      <tr>
        <td align="center" style="border-radius:999px;background:#ffdc00;">
          <a href="${SITE_URL}/admin/leads" style="display:inline-block;padding:14px 26px;font-size:12px;font-weight:600;color:#181818;text-decoration:none;">Открыть заявки в админке</a>
        </td>
      </tr>
    </table>`;

  return {
    subject: `Новая заявка: ${lead.course_title || lead.course_id || 'без курса'}`,
    text: [
      'Новая заявка',
      '',
      ...rows.map(([label, value]) => `${label}: ${value}`),
      lead.repeat_lead ? '\nПовторная заявка — человек уже оставлял данные по этому курсу.' : null,
      '',
      courseLink ? `Курс на сайте: ${courseLink}` : null,
      `Заявки: ${SITE_URL}/admin/leads`,
    ]
      .filter((line) => line !== null)
      .join('\n'),
    html: renderEmailShell({
      title: 'Новая заявка — AskHow',
      preheader: `${lead.name || lead.email} · ${lead.course_title || lead.course_id || 'без курса'}`,
      bodyHtml,
    }),
  };
}

function buildThankYouEmail(lead) {
  const courseTitle = lead.course_title || lead.course_id || 'курс';
  const greeting = lead.name ? `Здравствуйте, ${lead.name}!` : 'Здравствуйте!';
  const priceLine = lead.price ? `${lead.price} ${lead.currency || ''}`.trim() : null;
  // Without this the letter tells someone their course is open and then leaves
  // them to find it themselves.
  const courseLink = courseUrl(lead.course_id);

  const steps = [
    ['1', 'Оплата получена', 'Платёж уже отражён в системе.'],
    ['2', 'Письмо с доступом', 'Придёт на этот e-mail в ближайшее время.'],
    [
      '3',
      'Можно учиться',
      courseLink
        ? 'Курс уже открыт — перейдите к нему по кнопке ниже или вернитесь в каталог в любое время.'
        : 'Курс открыт — возвращайтесь в каталог в любое время.',
    ],
  ];

  // Mirrors public/thanks.html so the letter and the page read as one thing.
  const bodyHtml = `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px auto 0;">
      <tr>
        <td width="44" height="44" align="center" valign="middle" style="width:44px;height:44px;border-radius:999px;background:#22c55e;font-size:22px;line-height:44px;color:#ffffff;">&#10003;</td>
      </tr>
    </table>
    <h1 style="margin:18px 0 0;font-size:31px;font-weight:600;line-height:1.1;letter-spacing:-0.035em;color:#181818;">Спасибо!</h1>
    <p style="margin:10px auto 0;max-width:380px;font-size:12px;line-height:1.7;color:#777777;">
      ${escapeHtml(greeting)} Оплата курса «${escapeHtml(courseTitle)}» прошла успешно. Информацию о доступе отправим на этот e-mail.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;border:1px solid #ececec;border-radius:15px;text-align:left;">
      ${renderSummaryRows([
        ['Курс', courseTitle, courseLink],
        ['Оплачено', priceLine],
        ['E-mail', lead.email],
      ])}
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 0;text-align:left;">
      ${renderSteps(steps)}
    </table>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:26px auto 0;">
      <tr>
        <td align="center" style="border-radius:999px;background:#ffdc00;">
          <a href="${courseLink || SITE_URL}" style="display:inline-block;padding:14px 26px;font-size:12px;font-weight:600;color:#181818;text-decoration:none;">${
            courseLink ? 'Перейти к курсу' : 'Вернуться в каталог'
          }</a>
        </td>
      </tr>
    </table>
    ${
      courseLink
        ? `<p style="margin:12px 0 0;font-size:11px;"><a href="${SITE_URL}" style="color:#777777;font-weight:600;text-decoration:underline;">Вернуться в каталог</a></p>`
        : ''
    }`;

  return {
    subject: `Спасибо за оплату — ${courseTitle}`.slice(0, 180),
    text: [
      greeting,
      '',
      `Оплата курса «${courseTitle}» прошла успешно.`,
      priceLine ? `Оплачено: ${priceLine}` : null,
      '',
      '1. Оплата получена — платёж уже отражён в системе.',
      '2. Письмо с доступом — придёт на этот e-mail в ближайшее время.',
      '3. Можно учиться — курс открыт в каталоге.',
      '',
      courseLink ? `Курс «${courseTitle}»: ${courseLink}` : null,
      `Каталог: ${SITE_URL}`,
      `Telegram: ${TELEGRAM_URL}`,
      `MAX: ${MAX_SUPPORT_URL}`,
      '',
      'Команда AskHow',
    ]
      .filter((line) => line !== null)
      .join('\n'),
    html: renderEmailShell({
      title: 'Спасибо за оплату — AskHow',
      preheader: `Оплата курса «${courseTitle}» прошла успешно`,
      bodyHtml,
    }),
  };
}

// Reads/writes go through this promise chain so concurrent leads never race
// on the same leads.json (there is no framework/db here, just a flat file).
let writeQueue = Promise.resolve();

async function readLeads() {
  try {
    const raw = await readFile(LEADS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

function withLeadsFile(mutator) {
  const task = writeQueue.then(async () => {
    await mkdir(path.dirname(LEADS_FILE), { recursive: true });
    const leads = await readLeads();
    const result = await mutator(leads);
    await writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
    return result;
  });
  // Keep the queue alive even if this write failed, so later calls still run;
  // the failure itself is still delivered to whoever awaited `task`.
  writeQueue = task.catch(() => {});
  return task;
}

function appendLead(record) {
  return withLeadsFile((leads) => {
    const email = typeof record.email === 'string' ? record.email.trim().toLowerCase() : '';
    const courseId = typeof record.course_id === 'string' ? record.course_id.trim() : '';
    // Someone who already has a saved lead for this course (e.g. filled the
    // free-access form, then later filled it again from the "Получить
    // рассылку" button) is opting into the newsletter — flag it for the
    // admin panel instead of silently treating it as a plain duplicate.
    record.repeat_lead = leads.some(
      (lead) =>
        typeof lead.email === 'string' &&
        lead.email.trim().toLowerCase() === email &&
        (typeof lead.course_id === 'string' ? lead.course_id.trim() : '') === courseId,
    );
    leads.push(record);
  });
}

function markLeadPaid(key) {
  return withLeadsFile((leads) => {
    const lead = leads.find((item) => item.id === key || item.idempotency_key === key);
    if (!lead) return { found: false };
    if (lead.paid) return { found: true, alreadyPaid: true, lead };
    lead.paid = true;
    lead.paid_at = new Date().toISOString();
    return { found: true, alreadyPaid: false, lead };
  });
}

const server = createServer(async (req, res) => {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // nginx rewrites /mail-api/* to /api/*, so the health check arrives as
  // /api/health from the outside and as /health from localhost — answer both
  // (and any other prefix a proxy might add).
  if (req.method === 'GET' && url.pathname.replace(/\/+$/, '').endsWith('/health')) {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    // `templates` tells at a glance whether the running process already has
    // the current email layout, without having to send a test letter.
    res.end(JSON.stringify({ ok: true, service: 'mail-server', templates: MAIL_TEMPLATE_VERSION }));
    return;
  }

  // What the site reads to render author articles and the blog catalogue.
  // Public on purpose: it is the published content, and the site fetches it
  // from the visitor's browser.
  if (req.method === 'GET' && url.pathname === CONTENT_PATH) {
    let articles;
    try {
      articles = publishedArticles(await readArticles());
    } catch (error) {
      console.error('Content read error:', error.message);
      res.writeHead(500, JSON_HEADERS);
      res.end(JSON.stringify({ ok: false, error: 'storage_failed' }));
      return;
    }

    res.writeHead(200, { ...JSON_HEADERS, 'Cache-Control': 'no-cache' });
    res.end(JSON.stringify({ ok: true, count: articles.length, articles }));
    return;
  }

  if (url.pathname === ADMIN_CONTENT_PATH && (req.method === 'GET' || req.method === 'PUT')) {
    if (!ADMIN_KEY || req.headers['x-admin-key'] !== ADMIN_KEY) {
      res.writeHead(401, JSON_HEADERS);
      res.end(JSON.stringify({ ok: false, error: 'unauthorized' }));
      return;
    }

    if (req.method === 'GET') {
      let articles;
      try {
        articles = await readArticles();
      } catch (error) {
        console.error('Content read error:', error.message);
        res.writeHead(500, JSON_HEADERS);
        res.end(JSON.stringify({ ok: false, error: 'storage_failed' }));
        return;
      }

      res.writeHead(200, JSON_HEADERS);
      res.end(JSON.stringify({ ok: true, count: articles.length, articles }));
      return;
    }

    let body;
    try {
      body = await readJsonBody(req, MAX_CONTENT_BODY_BYTES);
    } catch (error) {
      const status = error.message === 'payload_too_large' ? 413 : 400;
      res.writeHead(status, JSON_HEADERS);
      res.end(JSON.stringify({ ok: false, error: error.message }));
      return;
    }

    try {
      // The panel always sends the full collection, so a save is a replace —
      // no partial state to reconcile and nothing to merge on the server.
      const articles = await saveArticles(body?.articles);
      console.log(`Content saved: ${articles.length} article(s)`);
      res.writeHead(200, JSON_HEADERS);
      res.end(JSON.stringify({ ok: true, count: articles.length, articles }));
    } catch (error) {
      if (isContentError(error)) {
        res.writeHead(400, JSON_HEADERS);
        res.end(JSON.stringify({ ok: false, error: 'invalid_content', message: error.message }));
        return;
      }
      console.error('Content storage error:', error.message);
      res.writeHead(500, JSON_HEADERS);
      res.end(JSON.stringify({ ok: false, error: 'storage_failed' }));
    }
    return;
  }

  if (req.method === 'GET' && url.pathname === ADMIN_LEADS_PATH) {
    if (!ADMIN_KEY || req.headers['x-admin-key'] !== ADMIN_KEY) {
      res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: 'unauthorized' }));
      return;
    }

    const leads = (await readLeads()).slice().reverse();
    const limit = Number(url.searchParams.get('limit'));
    const sliced = Number.isFinite(limit) && limit > 0 ? leads.slice(0, limit) : leads;

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, count: leads.length, leads: sliced }));
    return;
  }

  if (req.method === 'POST' && url.pathname === PAID_PATH) {
    let body;
    try {
      body = await readJsonBody(req);
    } catch (error) {
      const status = error.message === 'payload_too_large' ? 413 : 400;
      res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: error.message }));
      return;
    }

    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
    const courseId = typeof body.course_id === 'string' ? body.course_id.trim() : '';

    if (!isValidEmail(email) || !courseId) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: 'invalid_request' }));
      return;
    }

    const result = await markLeadPaid(`${courseId}:${email}`);

    if (!result.found) {
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: false, error: 'lead_not_found' }));
      return;
    }

    if (!result.alreadyPaid) {
      sendMail('Thank-you email', () => buildThankYouEmail(result.lead), {
        from: process.env.MAIL_FROM,
        to: result.lead.email,
      });
    }

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, duplicate: Boolean(result.alreadyPaid) }));
    return;
  }

  if (req.method !== 'POST' || url.pathname !== ENDPOINT_PATH) {
    res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, error: 'not_found' }));
    return;
  }

  if (MAIL_API_KEY && req.headers['x-api-key'] !== MAIL_API_KEY) {
    res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, error: 'unauthorized' }));
    return;
  }

  let lead;
  try {
    lead = await readJsonBody(req);
  } catch (error) {
    const status = error.message === 'payload_too_large' ? 413 : 400;
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, error: error.message }));
    return;
  }

  if (!lead.name || !isValidEmail(lead.email)) {
    res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, error: 'invalid_lead' }));
    return;
  }

  const idempotencyKey = req.headers['idempotency-key'] || lead.idempotency_key;
  if (idempotencyKey) {
    pruneIdempotencyKeys();
    if (seenIdempotencyKeys.has(idempotencyKey)) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ ok: true, duplicate: true }));
      return;
    }
  }

  const record = {
    id: idempotencyKey || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    received_at: new Date().toISOString(),
    ...lead,
  };

  try {
    await appendLead(record);
  } catch (error) {
    console.error('Lead storage error:', error.message);
    res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: false, error: 'storage_failed' }));
    return;
  }

  if (idempotencyKey) {
    seenIdempotencyKeys.set(idempotencyKey, Date.now() + IDEMPOTENCY_TTL_MS);
  }

  // The form should not wait on SMTP: the lead is already safely on disk and
  // visible in the admin panel, email is just a best-effort extra notice.
  // Built from `record` (not the raw `lead` body) so the notification also
  // carries received_at and the repeat_lead flag appendLead just computed.
  sendMail('Lead email', () => buildEmail(record), {
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    replyTo: lead.email,
  });

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ ok: true, duplicate: false }));
});

server.listen(PORT, () => {
  console.log(`Mail server listening on port ${PORT}, endpoint ${ENDPOINT_PATH}`);
  console.log(`Templates: ${MAIL_TEMPLATE_VERSION}`);

  // Check the mailbox credentials on boot, so a broken SMTP login shows up in
  // the log right away instead of only when someone submits a form.
  transporter
    .verify()
    .then(() =>
      console.log(
        `SMTP ready: ${process.env.SMTP_HOST}:${process.env.SMTP_PORT || 465} as ${process.env.SMTP_USER}, from ${process.env.MAIL_FROM}, lead copies to ${process.env.MAIL_TO}`,
      ),
    )
    .catch((error) => console.error('SMTP NOT ready — emails will not be delivered:', error.message));
});
