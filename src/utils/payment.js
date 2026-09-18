const MONETA_ASSISTANT_URL = 'https://www.payanyway.ru/assistant.htm';
const MONETA_SUCCESS_URL = 'https://catalog.askhow.ru/thanks.html';
const MONETA_FAIL_BASE_URL = 'https://catalog.askhow.ru/catalog/course';
const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT || '/mail-api/lead';

export function getPaymentLabel(course, compact = false, unlocked = false) {
  if (course.price && course.price !== 'Бесплатно') {
    return compact ? `Оплатить · ${course.price}` : `Оплатить курс · ${course.price}`;
  }
  return unlocked ? 'Получить рассылку' : 'Бесплатно';
}

// A free course's link/button turns green and reads "Бесплатно" before the
// visitor has left their details; once unlocked it goes back to the normal
// yellow "Получить рассылку" treatment.
export function isFreeTeaser(course, unlocked = false) {
  return Boolean(course?.price === 'Бесплатно' && !unlocked);
}

function createTransactionId(courseId) {
  const random = Math.random().toString(36).slice(2, 10);
  return `askhow-${courseId}-${Date.now()}-${random}`.slice(0, 255);
}

export function submitMonetaPayment(course, { email, name } = {}) {
  const payment = course?.payment;
  if (!payment?.merchantId || !payment?.amount) return false;

  // Moneta just redirects the browser to whatever MNT_SUCCESS_URL we set, so we
  // tag it with who paid for what — thanks.html uses this to tell the backend
  // which lead to mark as paid and email.
  const successUrl = new URL(MONETA_SUCCESS_URL);
  successUrl.searchParams.set('course_id', course.id);
  successUrl.searchParams.set('course_title', course.title);
  if (payment.amount) successUrl.searchParams.set('price', String(payment.amount));
  if (payment.currency) successUrl.searchParams.set('currency', payment.currency);
  if (email) successUrl.searchParams.set('email', email.trim().toLowerCase());
  // The page greets the buyer by name, exactly like the thank-you letter does
  // (the link back to the course it builds itself from course_id).
  if (name) successUrl.searchParams.set('name', name.trim());

  // Failed/cancelled payments send the visitor back to the course page itself
  // (not a standalone page) so CoursePage can close the payment form and show
  // the "payment failed" modal in place.
  const failUrl = new URL(`${MONETA_FAIL_BASE_URL}/${course.id}`);
  failUrl.searchParams.set('payment', 'failed');

  const fields = {
    MNT_ID: payment.merchantId,
    MNT_TRANSACTION_ID: createTransactionId(course.id),
    MNT_CURRENCY_CODE: payment.currency || 'RUB',
    MNT_AMOUNT: payment.amount,
    MNT_DESCRIPTION: course.title,
    MNT_CUSTOM1: payment.itemId ? `catalog_item_${payment.itemId}` : course.id,
    MNT_CUSTOM2: course.id,
    MNT_TEST_MODE: '0',
    MNT_SUCCESS_URL: successUrl.toString(),
    MNT_FAIL_URL: failUrl.toString(),
  };

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = MONETA_ASSISTANT_URL;
  form.style.display = 'none';

  Object.entries(fields).forEach(([name, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = String(value);
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
  return true;
}

function getLeadKey(courseId, email) {
  return `askhow-lead:${courseId}:${email.trim().toLowerCase()}`;
}

function getUnlockKey(courseId) {
  return `askhow-unlocked:${courseId}`;
}

// Unlock state lives in localStorage (not sessionStorage) so a visitor who
// filled the form once on this device stays unlocked — and keeps seeing the
// "next lesson" button — across browser restarts, not just the current tab.
export function isCourseUnlocked(courseId) {
  try {
    return localStorage.getItem(getUnlockKey(courseId)) === '1';
  } catch {
    return false;
  }
}

function markCourseUnlocked(courseId) {
  try {
    localStorage.setItem(getUnlockKey(courseId), '1');
  } catch {
    // localStorage may be unavailable in privacy mode; the visitor just re-fills the form.
  }
}

const PENDING_LEADS_KEY = 'askhow-pending-leads';

async function postLead(payload, idempotencyKey) {
  const response = await fetch(LEAD_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Lead request failed with status ${response.status}`);
  }
}

function rememberLeadSaved(leadKey) {
  try {
    localStorage.setItem(leadKey, 'saved');
  } catch {
    // The successful server response is authoritative.
  }
}

function readPendingLeads() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PENDING_LEADS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function queuePendingLead(payload, idempotencyKey) {
  try {
    const queue = readPendingLeads();
    localStorage.setItem(PENDING_LEADS_KEY, JSON.stringify([...queue.slice(-19), { payload, idempotencyKey }]));
  } catch {
    // Nothing else we can do — the visitor still gets their free access.
  }
}

// Leads that could not reach the backend are retried on the next page load,
// so an outage costs delivery time instead of the lead itself.
export async function flushPendingLeads() {
  const queue = readPendingLeads();
  if (queue.length === 0) return;

  const failed = [];
  for (const item of queue) {
    try {
      await postLead(item.payload, item.idempotencyKey);
    } catch {
      failed.push(item);
    }
  }

  try {
    if (failed.length) localStorage.setItem(PENDING_LEADS_KEY, JSON.stringify(failed));
    else localStorage.removeItem(PENDING_LEADS_KEY);
  } catch {
    // ignore
  }
}

export async function savePaymentLead({ course, name, email, source = 'catalog', allowResubmit = false }) {
  const leadKey = getLeadKey(course.id, email);

  if (!allowResubmit) {
    try {
      if (localStorage.getItem(leadKey) === 'saved') {
        return { ok: true, duplicate: true };
      }
    } catch {
      // localStorage may be unavailable in privacy mode; server idempotency still applies.
    }
  }

  // A resubmission (e.g. the "Получить рассылку" form shown to visitors who
  // already unlocked the course) is a deliberate new lead, not a retry of the
  // same request — give it its own idempotency key so the server doesn't
  // collapse it into the original submission.
  const idempotencyKey = allowResubmit
    ? `${course.id}:${email.trim().toLowerCase()}:${Date.now()}`
    : `${course.id}:${email.trim().toLowerCase()}`;
  const payload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    consent: true,
    course_id: course.id,
    course_title: course.title,
    price: course.payment?.amount || course.price || null,
    currency: course.payment?.currency || 'RUB',
    page_url: window.location.href,
    form_id: 'catalog-course-payment',
    form_name: 'Форма перед оплатой курса',
    source,
    site: 'catalog.askhow.ru',
    time: new Date().toISOString(),
    idempotency_key: idempotencyKey,
  };

  const isFree = course.price === 'Бесплатно';

  try {
    await postLead(payload, idempotencyKey);
  } catch (error) {
    // A paid course must not send anyone to checkout before the lead is
    // stored. A free one is different: the form is only a soft gate, so a
    // backend hiccup must never leave the visitor locked out of free
    // content — open it, keep the lead locally and retry it later.
    if (!isFree) throw error;
    queuePendingLead(payload, idempotencyKey);
    rememberLeadSaved(leadKey);
    markCourseUnlocked(course.id);
    return { ok: true, duplicate: false, delivered: false };
  }

  rememberLeadSaved(leadKey);
  if (isFree) markCourseUnlocked(course.id);

  return { ok: true, duplicate: false, delivered: true };
}
