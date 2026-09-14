import { ArrowUpRight } from 'lucide-react';

export function SubscriptionCourseCard({ item }) {
  return (
    <a
      href={item.url}
      className="group motion-card flex h-full flex-col overflow-hidden rounded-[16px] sm:rounded-[18px] border border-white/80 bg-white text-left shadow-[0_2px_12px_rgba(0,0,0,.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(0,0,0,.10)]"
      aria-label={`${item.title}. Перейти на AskHow Business`}
    >
      <div className="relative aspect-[5/3] overflow-hidden bg-[#e9e9e7]">
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/5" />

        <span className="absolute left-3 top-3 max-w-[75%] rounded-full bg-white/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.07em] text-[#202020] shadow-sm backdrop-blur-sm">
          {item.category}
        </span>
        <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/95 text-[#111] shadow-sm transition duration-300 group-hover:rotate-45">
          <ArrowUpRight size={15} strokeWidth={1.8} />
        </span>
        <span className="absolute bottom-3 left-3 rounded-full bg-black/70 px-2.5 py-1 text-[9px] font-semibold tracking-[0.03em] text-white backdrop-blur-sm">
          AskHow Business
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3.5 min-[390px]:p-4">
        <h3 className="line-clamp-3 min-h-[54px] text-[15px] min-[390px]:min-h-[58px] min-[390px]:text-[16px] font-bold leading-[1.18] tracking-[-0.25px] text-[#181818]">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-2 min-h-[34px] text-[10px] min-[390px]:text-[11px] font-semibold leading-[1.45] text-[#505050]">
          {item.subtitle}
        </p>
        <p className="mt-3 line-clamp-3 min-h-[47px] text-[10px] min-[390px]:text-[11px] leading-[1.5] text-[#7a7a7a]">
          {item.description}
        </p>

        <span className="mt-auto flex items-center justify-between gap-3 pt-4 text-[11px] font-bold text-[#181818]">
          <span>Открыть по подписке</span>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#ffe000] transition group-hover:scale-105">
            <ArrowUpRight size={13} strokeWidth={2} />
          </span>
        </span>
      </div>
    </a>
  );
}
