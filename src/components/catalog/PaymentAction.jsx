import { getPaymentLabel } from '../../utils/payment';

export function PaymentAction({ course, onPay, className = '' }) {
  const isFree = course.price === 'Бесплатно';
  return (
    <button
      type="button"
      onClick={onPay}

      className={`grid h-11 w-full place-items-center rounded-full bg-[#ffdc00] text-[11px] font-medium shadow-[0_8px_14px_rgba(255,220,0,.2)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_20px_rgba(255,220,0,.3)] ${className}`}
    >
      {getPaymentLabel(course, true)}
    </button>
  );
}
