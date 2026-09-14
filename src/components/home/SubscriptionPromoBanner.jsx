import { ArrowUpRight } from 'lucide-react';
import { Logo } from '../layout/Logo';
import { SUBSCRIPTION_URL } from '../../data/subscriptions';

export function SubscriptionPromoBanner() {
  return (
    <a
      href={SUBSCRIPTION_URL}
      className="group relative block overflow-hidden rounded-[22px] bg-[#06070d] text-white shadow-[0_16px_50px_rgba(4,6,20,.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_68px_rgba(4,6,20,.24)] min-[390px]:rounded-[24px]"
      aria-label="Получить доступ к базе решений AskHow Business"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(84,55,180,.24),transparent_28%),radial-gradient(circle_at_100%_50%,rgba(99,78,220,.16),transparent_28%),linear-gradient(90deg,#05060a_0%,#070810_46%,#171134_100%)]" />
      <div className="absolute -left-6 bottom-0 h-28 w-28 rounded-full bg-[#6236ff]/15 blur-3xl sm:h-36 sm:w-36" />
      <div className="absolute inset-y-0 right-0 hidden w-[42%] md:block">
        <img
          src="/images/home/business-magnifier.png"
          alt=""
          className="pointer-events-none absolute right-[-16%] top-1/2 w-[120%] -translate-y-1/2 object-contain opacity-70 transition duration-500 group-hover:scale-[1.02]"
        />
      </div>

      <div className="relative z-10 flex flex-col px-4 py-5 min-[390px]:px-5 sm:px-6 sm:py-6 md:min-h-[260px] md:flex-row md:items-center md:justify-between md:gap-8 md:px-8 md:py-8 lg:px-10">
        <div className="max-w-[640px]">
          <div className="mb-4 inline-flex [&_path]:fill-white">
            <Logo />
          </div>
          <h2 className="max-w-[620px] text-[28px] font-extrabold leading-[1.02] tracking-[-1px] min-[390px]:text-[31px] sm:text-[36px] lg:text-[42px] lg:tracking-[-1.6px]">
            Получите доступ к <span className="text-[#ffe000]">базе решений</span>
          </h2>
          <p className="mt-4 max-w-[560px] text-[14px] leading-[1.48] text-white/90 min-[390px]:text-[15px] sm:text-[16px] lg:text-[17px]">
            НДС, 115-ФЗ, договоры, проверки, онлайн-кассы и маркетинг — всё собрано в одной подписке для бизнеса.
          </p>
        </div>

        <span className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[#ffe14a] px-6 py-3 text-[15px] font-extrabold text-[#121212] shadow-[0_10px_30px_rgba(255,225,74,.25)] transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_42px_rgba(255,225,74,.35)] min-[390px]:text-[16px] sm:mt-7 sm:w-fit sm:min-w-[240px] sm:px-8 md:mt-0 lg:min-w-[280px] lg:text-[17px]">
          Получить доступ
          <ArrowUpRight size={18} strokeWidth={2.2} className="ml-2 shrink-0 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </a>
  );
}
