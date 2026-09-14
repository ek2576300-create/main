import { ArrowUpRight } from 'lucide-react';
import { Logo } from '../layout/Logo';
import { SUBSCRIPTION_URL } from '../../data/subscriptions';

export function HomeHero() {
  return (
    <a
      href={SUBSCRIPTION_URL}
      className="group pressable relative block overflow-hidden rounded-[22px] bg-[#06070d] text-left text-white shadow-[0_18px_65px_rgba(4,6,20,.22)] min-[390px]:rounded-[24px]"
      aria-label="Получить доступ к базе решений AskHow Business"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(84,55,180,.32),transparent_28%),radial-gradient(circle_at_100%_10%,rgba(125,63,255,.18),transparent_24%),linear-gradient(90deg,#05060a_0%,#06060d_40%,#141033_100%)]" />
      <div className="absolute inset-y-0 right-0 hidden w-[50%] lg:block">
        <img
          src="/images/home/business-magnifier.png"
          alt=""
          className="pointer-events-none absolute right-[-7%] top-1/2 w-[102%] -translate-y-1/2 object-contain opacity-70 transition duration-500 group-hover:scale-[1.02] group-hover:translate-x-[-0.35%]"
        />
      </div>
      <img
        src="/images/home/business-magnifier.png"
        alt=""
        className="pointer-events-none absolute -right-10 -top-10 h-[288px] w-[288px] object-contain opacity-70 min-[390px]:-right-12 min-[390px]:-top-12 min-[390px]:h-[336px] min-[390px]:w-[336px] sm:-right-16 sm:-top-16 sm:h-[432px] sm:w-[432px] lg:hidden"
      />
      <div className="absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-[#5a2cff]/20 blur-3xl sm:h-48 sm:w-48" />
      <div className="absolute right-[18%] top-[12%] hidden h-20 w-20 rounded-full bg-[#6f4bff]/12 blur-3xl lg:block" />

      <div className="relative z-10 flex flex-col px-4 py-4 min-[390px]:px-5 min-[390px]:py-5 sm:px-7 sm:py-7 lg:min-h-[322px] lg:px-8 lg:py-6">
        <div className="[&_path]:fill-white">
          <Logo />
        </div>

        <div className="mt-7 max-w-[620px] lg:mt-7 lg:max-w-[530px]">
          <h1 className="max-w-[620px] text-[36px] font-extrabold leading-[0.98] tracking-[-1.6px] min-[390px]:text-[42px] sm:text-[50px] sm:tracking-[-2px] lg:text-[56px] lg:tracking-[-2.4px]">
            <span className="block">Замените штат</span>
            <span className="block">консультантов</span>
            <span className="mt-1 block text-[#ffe000]">одной подпиской</span>
          </h1>

          <p className="mt-4 max-w-[610px] text-[16px] leading-[1.34] text-white/92 min-[390px]:text-[17px] sm:mt-5 sm:text-[19px] sm:leading-[1.42] lg:mt-5 lg:text-[18px]">
            Пошаговые инструкции по <span className="text-[#73a7ff]">НДС</span>,{' '}
            <span className="text-[#73a7ff]">115-ФЗ</span>,{' '}
            <span className="text-[#73a7ff]">кадрам и маркетингу</span>. Закрывайте сложные вопросы быстрее, чем Google.
          </p>

          <span className="mt-6 inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#ffe14a] px-6 py-3 text-[15px] font-extrabold text-[#121212] shadow-[0_10px_30px_rgba(255,225,74,.25)] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_42px_rgba(255,225,74,.35)] min-[390px]:text-[16px] sm:mt-7 sm:min-h-[60px] sm:px-8 sm:text-[18px] lg:mt-5 lg:min-h-[52px] lg:px-7 lg:text-[16px]">
            Получить доступ к базе решений
            <ArrowUpRight size={18} strokeWidth={2.2} className="ml-2 shrink-0 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </a>
  );
}
