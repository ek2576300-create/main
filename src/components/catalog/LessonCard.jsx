import { Clock3, LockKeyhole, Play } from 'lucide-react';

export function LessonCard({ lesson, variant = 'card', active = false, onOpen, unlocked = false }) {
  const isPlayer = variant === 'player';
  const isFree = Boolean(lesson.free) || unlocked;

  return (
    <article
      className={`min-w-0 ${isPlayer ? 'h-full' : 'motion-card flex h-full flex-col'} ${
        active && !isPlayer ? 'rounded-[14px] ring-2 ring-[#ffdc00] ring-offset-2' : ''
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={isFree && lesson.video ? `Смотреть: ${lesson.title}` : `Открыть: ${lesson.title}`}
        className={`group relative w-full max-w-full overflow-hidden bg-[#ededed] ${
          isPlayer
            ? 'aspect-[9/16] min-h-[430px] max-h-[680px] rounded-[17px]'
            : 'aspect-[4/5] rounded-[13px]'
        } text-left`}
      >
        <img
          src={lesson.image}
          alt={lesson.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            isPlayer
              ? 'from-black/75 via-black/10 to-black/5'
              : 'from-black/85 via-black/10 to-black/10'
          }`}
        />
        {isFree && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-[#22c55e] px-2.5 py-1 text-[8px] font-semibold text-white shadow-sm sm:left-3 sm:top-3">
            Бесплатный урок
          </span>
        )}
        {!isFree && (
          <span className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full border border-white/30 bg-black/35 text-white shadow-sm backdrop-blur-md sm:right-3 sm:top-3">
            <LockKeyhole size={15} />
          </span>
        )}
        {isPlayer && (
          <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/25 text-white shadow-[0_8px_30px_rgba(0,0,0,.2)] backdrop-blur-md sm:h-16 sm:w-16">
            <Play size={23} className="ml-1 fill-current" />
          </span>
        )}
        {isPlayer && (
          <div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5">
            <h3 className="max-w-[90%] text-[14px] font-semibold leading-[1.25] text-white sm:text-[17px]">
              {lesson.title}
            </h3>
            <p className="mt-2 hidden max-w-[90%] text-[10px] leading-[1.45] text-white/80 sm:line-clamp-2">
              {lesson.subtitle}
            </p>
            <div className="mt-3 flex items-center text-[8px] text-white sm:mt-4">
              <span className="inline-flex items-center gap-1">
                <Clock3 size={10} /> {lesson.duration}
              </span>
            </div>
          </div>
        )}
        {!isPlayer && (
          <div className="absolute inset-x-2.5 bottom-2.5 text-white">
            <div className="flex items-center justify-between gap-2 text-[8px] text-white/90">
              <span className="inline-flex items-center gap-1">
                <Clock3 size={10} /> {lesson.duration}
              </span>
              <span
                className={
                  isFree ? 'font-semibold text-[#ffea62]' : 'inline-flex items-center gap-1'
                }
              >
                {isFree ? (
                  'Открыт'
                ) : (
                  <>
                    <LockKeyhole size={10} /> Закрыт
                  </>
                )}
              </span>
            </div>
          </div>
        )}
      </button>
      {!isPlayer && (
        <button type="button" onClick={onOpen} className="flex flex-1 flex-col pt-3 text-left">
          <h3 className="line-clamp-2 min-h-[2.5em] text-[11px] font-semibold leading-[1.25] sm:text-[12px]">{lesson.title}</h3>
          <p className="mt-1 line-clamp-1 text-[8px] text-[#aaa]">{(lesson.tags || []).join(' ')}</p>
          <p className="mt-2 line-clamp-3 text-[9px] leading-[1.4] text-[#666]">{lesson.subtitle}</p>
        </button>
      )}
    </article>
  );
}
