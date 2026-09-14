import { createServer } from 'node:http';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = Number(process.env.MAIL_PORT || process.env.PORT || 3020);
const ENDPOINT_PATH = process.env.MAIL_ENDPOINT_PATH || '/api/lead';
const PAID_PATH = process.env.MAIL_PAID_PATH || '/api/lead/paid';
const ADMIN_LEADS_PATH = process.env.ADMIN_LEADS_PATH || '/api/admin/leads';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const MAIL_API_KEY = process.env.MAIL_API_KEY || '';
const ADMIN_KEY = process.env.ADMIN_KEY || '';
const LEADS_FILE = process.env.LEADS_FILE || path.join(__dirname, 'data', 'leads.json');
const MAX_BODY_BYTES = 64 * 1024;
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let received = 0;
    const chunks = [];
    req.on('data', (chunk) => {
      received += chunk.length;
      if (received > MAX_BODY_BYTES) {
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

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[char]);
}

// Shared chrome so every outgoing email looks like it came from the same
// product: a yellow AskHow header, an optional accent strip under it, a card
// body, and Telegram/MAX links in the footer so recipients always have a way
// to reach us.
function renderEmailShell({ preheader = '', title, eyebrow = '', bodyHtml }) {
  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f4f2;font-family:Arial,Helvetica,sans-serif;">
    <span style="display:none;font-size:1px;color:#f3f4f2;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f2;padding:28px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:22px;overflow:hidden;box-shadow:0 20px 55px rgba(0,0,0,.09);">
            <tr>
              <td style="background:linear-gradient(135deg,#ffe14d,#ffdc00);padding:24px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="font-size:20px;font-weight:900;letter-spacing:-1px;color:#111;">🎓 AskHow</td>
                    ${eyebrow ? `<td align="right" style="font-size:11px;font-weight:700;color:#6b5900;">${eyebrow}</td>` : ''}
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 28px 28px;color:#181818;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:22px 28px 28px;border-top:1px solid #ececec;background:#fafafa;">
                <p style="margin:0 0 14px;font-size:12px;line-height:1.6;color:#777;">Мы на связи и рады помочь с любыми вопросами.</p>
                <a href="${TELEGRAM_URL}" style="display:inline-block;margin:0 10px 10px 0;padding:11px 18px;border-radius:999px;background:#111;color:#ffffff;font-size:12px;font-weight:700;text-decoration:none;">✈️ Канал в Telegram</a>
                <a href="${MAX_SUPPORT_URL}" style="display:inline-block;margin:0 10px 10px 0;padding:11px 18px;border-radius:999px;background:#ffffff;border:1px solid #e2e2e2;color:#111;font-size:12px;font-weight:700;text-decoration:none;">💬 Поддержка в MAX</a>
                <p style="margin:16px 0 0;font-size:10px;line-height:1.6;color:#aaa;">ООО «АСКХАУ» · <a href="${SITE_URL}" style="color:#aaa;">${SITE_URL.replace('https://', '')}</a></p>
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
  const rows = [
    ['👤', 'Имя', lead.name],
    ['📧', 'Email', lead.email],
    ['📚', 'Курс', lead.course_title || lead.course_id || '—'],
    ['💰', 'Цена', isFree ? 'Бесплатно' : `${lead.price ?? '—'} ${lead.currency || ''}`.trim()],
    ['🔗', 'Источник', lead.source || '—'],
    ['📝', 'Форма', lead.form_name || lead.form_id || '—'],
    ['🌐', 'Страница', lead.page_url || '—'],
    ['🕒', 'Время', lead.received_at || lead.time || new Date().toISOString()],
  ];

  const badges = [
    isFree
      ? '<span style="display:inline-block;margin:0 8px 8px 0;padding:5px 12px;border-radius:999px;background:#e8f9ef;color:#1c7a3f;font-size:11px;font-weight:700;">🆓 Бесплатный курс</span>'
      : '<span style="display:inline-block;margin:0 8px 8px 0;padding:5px 12px;border-radius:999px;background:#fff6cf;color:#8a6d00;font-size:11px;font-weight:700;">💳 Платный курс</span>',
    lead.repeat_lead
      ? '<span style="display:inline-block;margin:0 8px 8px 0;padding:5px 12px;border-radius:999px;background:#edf7ff;color:#1683ff;font-size:11px;font-weight:700;">🔁 Повторная заявка (рассылка)</span>'
      : '',
  ]
    .filter(Boolean)
    .join('');

  const bodyHtml = `
    <h1 style="margin:0 0 6px;font-size:21px;line-height:1.3;">📩 Новая заявка на сайте</h1>
    <p style="margin:0 0 16px;font-size:13px;line-height:1.6;color:#777;">Кто-то только что оставил заявку в каталоге AskHow.</p>
    <div style="margin:0 0 18px;">${badges}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;line-height:1.6;background:#fafafa;border-radius:14px;">
      ${rows
        .map(
          ([icon, label, value]) => `
        <tr>
          <td style="padding:9px 0 9px 16px;width:26px;vertical-align:top;">${icon}</td>
          <td style="padding:9px 8px;color:#888;width:100px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:9px 16px 9px 0;color:#181818;font-weight:600;">${escapeHtml(value)}</td>
        </tr>`,
        )
        .join('')}
    </table>
    <a href="${SITE_URL}/admin/leads" style="display:inline-block;margin-top:20px;padding:13px 24px;border-radius:999px;background:#ffdc00;color:#111;font-size:13px;font-weight:700;text-decoration:none;">Открыть заявки в админке →</a>`;

  return {
    subject: `📩 Новая заявка: ${lead.course_title || lead.course_id || 'без курса'}`,
    text: rows.map(([icon, label, value]) => `${icon} ${label}: ${value}`).join('\n'),
    html: renderEmailShell({
      title: 'Новая заявка — AskHow',
      preheader: `Новая заявка от ${lead.name || lead.email}`,
      eyebrow: isFree ? 'Бесплатный курс' : 'Платный курс',
      bodyHtml,
    }),
  };
}

function buildThankYouEmail(lead) {
  const courseTitle = lead.course_title || lead.course_id || 'курс';
  const greeting = lead.name ? `Здравствуйте, ${lead.name}!` : 'Здравствуйте!';
  const priceLine = lead.price ? `${lead.price} ${lead.currency || ''}`.trim() : null;

  const steps = [
    ['1', 'Оплата получена', 'Мы уже видим вашу оплату в системе — всё прошло успешно.'],
    ['2', 'Готовим доступ', 'В ближайшее время пришлём на этот e-mail всё необходимое для начала обучения.'],
    ['3', 'Учитесь в своём темпе', 'Возвращайтесь в каталог в любое удобное время — курс уже открыт для вас.'],
  ];

  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding-bottom:6px;">
          <div style="display:inline-block;width:56px;height:56px;border-radius:999px;background:linear-gradient(135deg,#34d979,#1fb45f);color:#ffffff;font-size:26px;line-height:56px;text-align:center;">✓</div>
        </td>
      </tr>
    </table>
    <h1 style="margin:16px 0 0;font-size:24px;line-height:1.3;text-align:center;">🎉 ${escapeHtml(greeting)}</h1>
    <p style="margin:12px auto 0;max-width:420px;font-size:14px;line-height:1.6;color:#333;text-align:center;">
      Спасибо за оплату курса «<strong>${escapeHtml(courseTitle)}</strong>».
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0 0;background:#f7faf8;border:1px solid #e4f3ea;border-radius:16px;">
      <tr>
        <td style="padding:16px 18px;font-size:13px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding:5px 0;color:#888;">📚 Курс</td>
              <td align="right" style="padding:5px 0;font-weight:700;">${escapeHtml(courseTitle)}</td>
            </tr>
            ${
              priceLine
                ? `<tr><td style="padding:5px 0;color:#888;border-top:1px dashed #dfe8e2;">💳 Оплачено</td><td align="right" style="padding:5px 0;font-weight:700;border-top:1px dashed #dfe8e2;">${escapeHtml(priceLine)}</td></tr>`
                : ''
            }
            <tr>
              <td style="padding:5px 0;color:#888;border-top:1px dashed #dfe8e2;">📧 E-mail</td>
              <td align="right" style="padding:5px 0;font-weight:700;border-top:1px dashed #dfe8e2;">${escapeHtml(lead.email || '—')}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0 0;">
      ${steps
        .map(
          ([n, title, text]) => `
        <tr>
          <td style="padding:8px 0;vertical-align:top;width:34px;">
            <div style="width:26px;height:26px;border-radius:999px;background:#fff6cf;color:#8a6d00;font-size:12px;font-weight:800;line-height:26px;text-align:center;">${n}</div>
          </td>
          <td style="padding:8px 0 8px 10px;vertical-align:top;">
            <p style="margin:0;font-size:13px;font-weight:700;color:#111;">${escapeHtml(title)}</p>
            <p style="margin:2px 0 0;font-size:12px;line-height:1.55;color:#666;">${escapeHtml(text)}</p>
          </td>
        </tr>`,
        )
        .join('')}
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
      <tr>
        <td align="center">
          <a href="${SITE_URL}" style="display:inline-block;padding:14px 28px;border-radius:999px;background:#ffdc00;color:#111;font-size:13px;font-weight:700;text-decoration:none;">🎓 Перейти в каталог</a>
        </td>
      </tr>
    </table>`;

  return {
    subject: `🎉 Спасибо за оплату — ${courseTitle}`.slice(0, 180),
    text: [
      greeting,
      '',
      `Спасибо за оплату курса «${courseTitle}».`,
      priceLine ? `Оплачено: ${priceLine}` : null,
      '',
      '1) Оплата получена — мы уже видим её в системе.',
      '2) Готовим доступ — пришлём детали на этот e-mail в ближайшее время.',
      '3) Учитесь в своём темпе — курс уже открыт в каталоге.',
      '',
      `Канал в Telegram: ${TELEGRAM_URL}`,
      `Поддержка в MAX: ${MAX_SUPPORT_URL}`,
      '',
      'Команда AskHow',
    ]
      .filter(Boolean)
      .join('\n'),
    html: renderEmailShell({
      title: 'Спасибо за оплату — AskHow',
      preheader: `Спасибо за оплату курса «${courseTitle}»`,
      eyebrow: 'Оплата подтверждена',
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

  if (req.method === 'GET' && url.pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, service: 'mail-server' }));
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
      const { subject, text, html } = buildThankYouEmail(result.lead);
      transporter
        .sendMail({ from: process.env.MAIL_FROM, to: result.lead.email, subject, text, html })
        .then((info) => console.log('Thank-you email delivered:', info.messageId))
        .catch((error) => console.error('Thank-you email error:', error.message));
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
  const { subject, text, html } = buildEmail(record);
  transporter
    .sendMail({ from: process.env.MAIL_FROM, to: process.env.MAIL_TO, replyTo: lead.email, subject, text, html })
    .then((info) => console.log('Email delivered:', info.messageId))
    .catch((error) => console.error('Email delivery error:', error.message));

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ ok: true, duplicate: false }));
});

server.listen(PORT, () => {
  console.log(`Mail server listening on port ${PORT}, endpoint ${ENDPOINT_PATH}`);
});
