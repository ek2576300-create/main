import { useEffect, useState } from 'react';

const STORAGE_KEY = 'askhow-cookie-consent';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) !== '1') setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // localStorage may be unavailable in privacy mode; the banner just reappears next visit.
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Согласие на использование cookie"
      className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-[720px] rounded-[16px] border border-[#e8e8e8] bg-white p-4 shadow-[0_18px_50px_rgba(0,0,0,.14)] min-[390px]:inset-x-4 min-[390px]:p-5 sm:bottom-5 sm:left-5 sm:right-auto sm:mx-0"
    >
      <p className="text-[11px] leading-[1.55] text-[#555] sm:max-w-[420px]">
        Мы используем файлы cookie, чтобы сайт работал корректно и был удобнее для вас. Продолжая
        пользоваться сайтом, вы соглашаетесь с их использованием в соответствии с{' '}
        <a
          href="https://www.askhow.ru/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-black underline underline-offset-2"
        >
          политикой конфиденциальности
        </a>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={accept}
          className="h-10 rounded-full bg-[#ffdc00] px-6 text-[11px] font-semibold transition hover:shadow-[0_10px_24px_rgba(255,220,0,.35)]"
        >
          Хорошо
        </button>
      </div>
    </div>
  );
}
