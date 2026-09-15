import { Check, LoaderCircle, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { trackEvent } from '../../utils/analytics';
import { savePaymentLead, submitMonetaPayment } from '../../utils/payment';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function PaymentModal({ open, course, source = 'course_page', onClose, onPayment, forceFree = false, onAccessGranted, allowResubmit = false }) {
  const [form, setForm] = useState({ name: '', email: '', accepted: false });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const closeButtonRef = useRef(null);
  const redirectingRef = useRef(false);

  useEffect(() => {
    if (!open) return undefined;
    setErrors({});
    setSubmitError('');
    setSubmitting(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();
    trackEvent('payment_form_open', { course_id: course?.id, course_title: course?.title, source });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [course?.id, course?.title, onClose, open, source]);

  // Paying navigates the whole tab away to MONETA. Coming back with the
  // browser Back button restores this page from the bfcache exactly as it
  // was left: a spinning "Сохраняем заявку…" button that can never resolve,
  // with the close button and the backdrop disabled — a dead end. Re-arm the
  // form as soon as the page is shown again.
  useEffect(() => {
    if (!open) return undefined;

    const rearm = () => {
      if (!redirectingRef.current) return;
      redirectingRef.current = false;
      setSubmitting(false);
    };
    const handlePageShow = (event) => {
      if (event.persisted) rearm();
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') rearm();
    };

    window.addEventListener('pageshow', handlePageShow);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [open]);

  if (!open || !course) return null;

  const isFree = forceFree || course.price === 'Бесплатно';
  const displayedPrice = !forceFree && course.price && course.price !== 'Бесплатно' ? course.price : null;
  const hasPayment = Boolean(course.payment?.merchantId && course.payment?.amount);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    setSubmitError('');
  };

  const validate = () => {
    const nextErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = 'Введите имя (минимум 2 символа).';
    if (!EMAIL_PATTERN.test(form.email.trim())) nextErrors.email = 'Введите корректный e-mail.';
    if (!form.accepted) nextErrors.accepted = 'Подтвердите согласие на обработку данных.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting || !validate()) return;
    if (!isFree && !hasPayment) {
      setSubmitError('Для этого курса ещё не настроены платёжные реквизиты. Напишите в поддержку AskHow.');
      return;
    }

    setSubmitting(true);
    setSubmitError('');
    try {
      await savePaymentLead({ course, name: form.name, email: form.email, source, allowResubmit });
      trackEvent('payment_form_success', { course_id: course.id, course_title: course.title, source });
      onPayment?.();
      if (isFree) {
        setSubmitting(false);
        if (onAccessGranted) {
          onAccessGranted();
          return;
        }
        // Opened from outside the course page (catalog/home/author card): land
        // on the course page itself, already unlocked — no separate "thanks" page.
        window.location.assign(`/catalog/course/${course.id}`);
        return;
      }
      trackEvent('payment_redirect', { course_id: course.id, course_title: course.title, course_price: course.price || null, source });
      redirectingRef.current = true;
      if (!submitMonetaPayment(course, { email: form.email })) throw new Error('Payment configuration is missing');
    } catch {
      redirectingRef.current = false;
      setSubmitError('Не удалось сохранить заявку. Проверьте соединение и попробуйте ещё раз. На оплату мы вас не перенаправили.');
      setSubmitting(false);
    }
  };

  return createPortal(
    <div className="modal-backdrop-enter fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-black/55 p-0 backdrop-blur-[2px] sm:items-center sm:px-4 sm:py-8" role="dialog" aria-modal="true" aria-labelledby="payment-modal-title">
      <button type="button" className="absolute inset-0 h-full w-full cursor-default" onClick={submitting ? undefined : onClose} aria-label="Закрыть форму оплаты" />
      <section className="modal-panel-enter modal-safe-panel relative z-10 max-h-[94dvh] w-full max-w-[540px] overflow-y-auto rounded-t-[24px] bg-white p-4 shadow-[0_28px_90px_rgba(0,0,0,.28)] min-[390px]:p-5 sm:rounded-[24px] sm:p-8">
        <button ref={closeButtonRef} type="button" disabled={submitting} onClick={onClose} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-[#f4f4f4] transition hover:bg-[#e9e9e9] disabled:opacity-50 min-[390px]:right-4 min-[390px]:top-4" aria-label="Закрыть"><X size={19} /></button>
        <span className="inline-flex rounded-full bg-[#fff5a8] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.08em]">{isFree ? 'Регистрация доступа' : 'Оплата через MONETA / PayAnyWay'}</span>
        <h2 id="payment-modal-title" className="mt-5 max-w-[430px] pr-8 text-[22px] font-semibold leading-[1.12] tracking-[-.025em] min-[390px]:text-[25px] sm:text-[30px]">{course.title}</h2>
        {displayedPrice && <p className="mt-3 text-[18px] font-semibold">Стоимость: {displayedPrice}</p>}

        <form className="mt-6" onSubmit={handleSubmit} noValidate>
          <label className="block text-[11px] font-semibold" htmlFor="payment-name">Имя</label>
          <input id="payment-name" name="name" autoComplete="name" value={form.name} onChange={(event) => updateField('name', event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'payment-name-error' : undefined} className={`mt-2 h-12 w-full rounded-[13px] border bg-white px-4 text-[13px] outline-none transition focus:border-black ${errors.name ? 'border-[#d93737]' : 'border-[#dedede]'}`} />
          {errors.name && <p id="payment-name-error" className="mt-1.5 text-[10px] text-[#c92e2e]">{errors.name}</p>}

          <label className="mt-4 block text-[11px] font-semibold" htmlFor="payment-email">E-mail</label>
          <input id="payment-email" name="email" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(event) => updateField('email', event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'payment-email-error' : undefined} className={`mt-2 h-12 w-full rounded-[13px] border bg-white px-4 text-[13px] outline-none transition focus:border-black ${errors.email ? 'border-[#d93737]' : 'border-[#dedede]'}`} />
          {errors.email && <p id="payment-email-error" className="mt-1.5 text-[10px] text-[#c92e2e]">{errors.email}</p>}

          <label className={`mt-5 flex cursor-pointer items-start gap-3 rounded-[16px] border p-4 ${errors.accepted ? 'border-[#d93737]' : 'border-[#e5e5e5]'}`}>
            <input type="checkbox" checked={form.accepted} onChange={(event) => updateField('accepted', event.target.checked)} className="sr-only" />
            <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border transition ${form.accepted ? 'border-[#181818] bg-[#181818] text-white' : 'border-[#b9b9b9] bg-white text-transparent'}`} aria-hidden="true"><Check size={14} strokeWidth={2.5} /></span>
            <span className="text-[11px] leading-[1.5] text-[#555]">Я согласен(на) на обработку персональных данных в соответствии с <a href="https://www.askhow.ru/privacy" target="_blank" rel="noopener noreferrer" className="font-medium text-black underline underline-offset-2">политикой конфиденциальности</a>.</span>
          </label>
          {errors.accepted && <p className="mt-1.5 text-[10px] text-[#c92e2e]">{errors.accepted}</p>}
          {submitError && <div role="alert" className="mt-4 rounded-[13px] bg-[#fff0f0] px-4 py-3 text-[11px] leading-[1.45] text-[#a42323]">{submitError}</div>}
          <button type="submit" disabled={submitting} className="pay-button-motion mt-5 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#ffdc00] px-6 text-[13px] font-semibold transition enabled:hover:shadow-[0_10px_24px_rgba(255,220,0,.35)] disabled:cursor-wait disabled:opacity-65">
            {submitting && <LoaderCircle size={17} className="animate-spin" />}
            {submitting ? 'Сохраняем заявку…' : isFree ? 'Получить доступ' : submitError ? 'Повторить попытку' : 'Сохранить данные и оплатить'}
          </button>
          <p className="mt-3 text-center text-[9px] leading-[1.45] text-[#8a8a8a]">Переход к оплате произойдёт только после успешного сохранения заявки.</p>
        </form>
      </section>
    </div>,
    document.body,
  );
}
