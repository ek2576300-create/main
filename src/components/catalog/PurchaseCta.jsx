import { X } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export function PurchaseCta({ open, course, onClose, onBuy }) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, open]);

  if (!open || !course) return null;

  const hasPrice = course.price && course.price !== 'Бесплатно';

  return createPortal(
    <div className="pointer-events-none fixed inset-x-3 bottom-[max(12px,env(safe-area-inset-bottom))] z-[900] flex justify-center sm:inset-x-5 sm:bottom-5">
      <section
        className="pointer-events-auto relative flex w-full max-w-[760px] flex-col gap-4 rounded-[20px] border border-black/5 bg-white p-4 pr-12 shadow-[0_22px_70px_rgba(0,0,0,.24)] sm:flex-row sm:items-center sm:px-5 sm:py-4 sm:pr-14"
        role="status"
        aria-live="polite"
      >
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold leading-[1.2] sm:text-[17px]">
            Получите полный доступ к курсу
          </p>
          <p className="mt-1 line-clamp-1 text-[10px] text-[#777] sm:text-[11px]">{course.title}</p>
        </div>

        <button
          type="button"
          onClick={onBuy}
          className="pressable pay-button-motion min-h-12 shrink-0 rounded-full bg-[#ffdc00] px-6 text-[11px] font-semibold shadow-[0_10px_24px_rgba(255,220,0,.26)] sm:min-w-[190px]"
        >
          {hasPrice ? `Купить курс · ${course.price}` : 'Получить доступ'}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[#f2f2f2] text-[#555] transition hover:bg-[#e8e8e8]"
          aria-label="Закрыть предложение"
        >
          <X size={17} />
        </button>
      </section>
    </div>,
    document.body,
  );
}
