import { getPaymentLabel, isCourseUnlocked, isFreeTeaser } from '../../utils/payment';

export function PaymentAction({ course, onPay, className = '' }) {
  const unlocked = isCourseUnlocked(course.id);
  const teaser = isFreeTeaser(course, unlocked);

  return (
    <button
      type="button"
      onClick={onPay}
      className={`grid h-11 w-full place-items-center rounded-full text-[11px] font-medium transition hover:-translate-y-0.5 ${
        teaser
          ? 'bg-[#22c55e] text-white shadow-[0_8px_14px_rgba(34,197,94,.25)] hover:shadow-[0_12px_20px_rgba(34,197,94,.35)]'
          : 'bg-[#ffdc00] shadow-[0_8px_14px_rgba(255,220,0,.2)] hover:shadow-[0_12px_20px_rgba(255,220,0,.3)]'
      } ${className}`}
    >
      {getPaymentLabel(course, true, unlocked)}
    </button>
  );
}
