const YANDEX_METRIKA_ID = 112288061;
const YANDEX_GOALS = new Set([
  'course_open',
  'preview_start',
  'preview_complete',
  'buy_click',
  'payment_form_open',
  'payment_form_success',
  'payment_redirect',
  'payment_success',
]);

export function trackEvent(eventName, payload = {}) {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    event: eventName,
    ...payload,
  };

  try {
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, payload);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(eventPayload);
    }

    if (YANDEX_GOALS.has(eventName) && typeof window.ym === 'function') {
      window.ym(YANDEX_METRIKA_ID, 'reachGoal', eventName, payload);
    }

    window.dispatchEvent(
      new CustomEvent('askhow:analytics', {
        detail: eventPayload,
      }),
    );

    if (import.meta.env.DEV) {
      console.debug('[analytics]', eventName, payload);
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[analytics] event was not sent', eventName, error);
    }
  }
}
