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
// product: a yellow AskHow header, a card body, and Telegram/MAX links in
// the footer so recipients always have a way to reach us.
function renderEmailShell({ preheader = '', title, bodyHtml }) {
  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f6f6f6;font-family:Arial,Helvetica,sans-serif;">
    <span style="display:none;font-size:1px;color:#f6f6f6;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f6f6;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 18px 50px rgba(0,0,0,.08);">
            <tr>
              <td style="background:#ffdc00;padding:22px 28px;">
                <span style="font-size:19px;font-weight:900;letter-spacing:-1px;color:#111;">AskHow</span>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 28px 28px;color:#181818;">
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:22px 28px 28px;border-top:1px solid #ececec;">
                <p style="margin:0 0 14px;font-size:12px;line-height:1.6;color:#777;">Мы на связи и рады помочь с любыми вопросами.</p>
                <a href="${TELEGRAM_URL}" style="display:inline-block;margin:0 10px 10px 0;padding:11px 18px;border-radius:999px;background:#111;color:#ffffff;font-size:12px;font-weight:700;text-decoration:none;">Канал в Telegram</a>
                <a href="${MAX_SUPPORT_URL}" style="display:inline-block;margin:0 10px 10px 0;padding:11px 18px;border-radius:999px;background:#f4f4f4;color:#111;font-size:12px;font-weight:700;text-decoration:none;">Поддержка в MAX</a>
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
  const rows = [
    ['Имя', lead.name],
    ['Email', lead.email],
    ['Курс', lead.course_title || lead.course_id || '—'],
    ['Цена', `${lead.price ?? '—'} ${lead.currency || ''}`.trim()],
    ['Источник', lead.source || '—'],
    ['Форма', lead.form_name || lead.form_id || '—'],
    ['Страница', lead.page_url || '—'],
    ['Время', lead.time || new Date().toISOString()],
  ];

  const bodyHtml = `
    <h1 style="margin:0 0 18px;font-size:20px;line-height:1.3;">Новая заявка на сайте</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:13px;line-height:1.6;">
      ${rows
        .map(
          ([label, value]) => `
        <tr>
          <td style="padding:7px 0;color:#888;width:110px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:7px 0;color:#181818;">${escapeHtml(value)}</td>
        </tr>`,
        )
        .join('')}
    </table>`;

  return {
    subject: `Новая заявка: ${lead.course_title || lead.course_id || 'без курса'}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
    html: renderEmailShell({
      title: 'Новая заявка — AskHow',
      preheader: `Новая заявка от ${lead.name || lead.email}`,
      bodyHtml,
    }),
  };
}

function buildThankYouEmail(lead) {
  const courseTitle = lead.course_title || lead.course_id || 'курс';
  const greeting = lead.name ? `Здравствуйте, ${lead.name}!` : 'Здравствуйте!';
  const priceLine = lead.price ? `Сумма: ${lead.price} ${lead.currency || ''}`.trim() : null;

  const bodyHtml = `
    <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;">${escapeHtml(greeting)}</h1>
    <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#333;">
      Спасибо за оплату курса «<strong>${escapeHtml(courseTitle)}</strong>».
    </p>
    ${priceLine ? `<p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#333;">${escapeHtml(priceLine)}</p>` : ''}
    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#333;">
      Мы уже готовим для вас доступ и в ближайшее время пришлём все детали на этот e-mail.
    </p>
    <a href="${SITE_URL}" style="display:inline-block;padding:14px 26px;border-radius:999px;background:#ffdc00;color:#111;font-size:13px;font-weight:700;text-decoration:none;">Перейти в каталог</a>`;

  return {
    subject: `Спасибо за оплату — ${courseTitle}`.slice(0, 180),
    text: [
      greeting,
      '',
      `Спасибо за оплату курса «${courseTitle}».`,
      priceLine,
      '',
      'Мы уже готовим для вас доступ и в ближайшее время пришлём все детали на этот e-mail.',
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
  const { subject, text, html } = buildEmail(lead);
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
