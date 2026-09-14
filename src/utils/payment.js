const MONETA_ASSISTANT_URL = 'https://www.payanyway.ru/assistant.htm';
const MONETA_SUCCESS_URL = 'https://catalog.askhow.ru/thanks.html';
const MONETA_FAIL_URL = 'https://catalog.askhow.ru/payment-error.html';
const LEAD_ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT || '/mail-api/lead';

export function getPaymentLabel(course, compact = false) {
  if (course.price && course.price !== 'Бесплатно') {
    return compact ? `Оплатить · ${course.price}` : `Оплатить курс · ${course.price}`;
  }
  return 'Получить доступ';
}

function createTransactionId(courseId) {
  const random = Math.random().toString(36).slice(2, 10);
  return `askhow-${courseId}-${Date.now()}-${random}`.slice(0, 255);
}

export function submitMonetaPayment(course, { email } = {}) {
  const payment = course?.payment;
  if (!payment?.merchantId || !payment?.amount) return false;

  // Moneta just redirects the browser to whatever MNT_SUCCESS_URL we set, so we
  // tag it with who paid for what — thanks.html uses this to tell the backend
  // which lead to mark as paid and email.
  const successUrl = new URL(MONETA_SUCCESS_URL);
  successUrl.searchParams.set('course_id', course.id);
  if (email) successUrl.searchParams.set('email', email.trim().toLowerCase());

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
    MNT_FAIL_URL: MONETA_FAIL_URL,
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

export function isCourseUnlocked(courseId) {
  try {
    return sessionStorage.getItem(getUnlockKey(courseId)) === '1';
  } catch {
    return false;
  }
}

function markCourseUnlocked(courseId) {
  try {
    sessionStorage.setItem(getUnlockKey(courseId), '1');
  } catch {
    // sessionStorage may be unavailable in privacy mode; the visitor just re-fills the form.
  }
}

export async function savePaymentLead({ course, name, email, source = 'catalog' }) {
  const leadKey = getLeadKey(course.id, email);

  try {
    if (sessionStorage.getItem(leadKey) === 'saved') {
      return { ok: true, duplicate: true };
    }
  } catch {
    // sessionStorage may be unavailable in privacy mode; server idempotency still applies.
  }

  const idempotencyKey = `${course.id}:${email.trim().toLowerCase()}`;
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

  try {
    sessionStorage.setItem(leadKey, 'saved');
  } catch {
    // The successful server response is authoritative.
  }

  if (course.price === 'Бесплатно') markCourseUnlocked(course.id);

  return { ok: true, duplicate: false };
}
