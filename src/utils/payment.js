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

export function submitMonetaPayment(course, { email } = {}) {
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
    localStorage.setItem(leadKey, 'saved');
  } catch {
    // The successful server response is authoritative.
  }

  if (course.price === 'Бесплатно') markCourseUnlocked(course.id);

  return { ok: true, duplicate: false };
}
