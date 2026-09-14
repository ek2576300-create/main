import { Clock3 } from 'lucide-react';

function CourseMetrics({ duration }) {
  return (
    <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-[10px] text-white">
      <span className="flex items-center gap-1">
        <Clock3 size={12} strokeWidth={1.8} />
        {duration || 'Уточняется'}
      </span>
    </div>
  );
}

export function HomeCourseCard({ item, onOpenCourse, onBuyCourse }) {
  const openCourse = () => onOpenCourse(item.courseId);

  return (
    <article className="motion-card flex min-w-0 flex-col">
      <button
        type="button"
        onClick={openCourse}
        className="group pressable relative aspect-[.66] overflow-hidden rounded-[13px] bg-[#f3f3f3] text-left"
        aria-label={`Открыть курс «${item.title}»`}
      >
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.015]"
        />
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/65 to-transparent" />
        <CourseMetrics duration={item.duration} />
      </button>

      <button type="button" onClick={openCourse} className="group/author mt-3 flex min-w-0 items-center gap-2 text-left transition hover:opacity-75">
        <img src={item.avatar} alt="" className="h-7 w-7 shrink-0 rounded-full object-cover transition duration-300 group-hover/author:scale-110" />
        <span className="truncate text-[12px] font-semibold text-[#202020] underline decoration-transparent underline-offset-2 transition group-hover/author:decoration-[#202020]">{item.author}</span>
      </button>

      <button type="button" onClick={openCourse} className="mt-2 text-left">
        <h3 className="line-clamp-3 min-h-[54px] text-[16px] font-semibold leading-[1.12] tracking-[-0.2px]">
          {item.title}
        </h3>
      </button>
      <p className="mt-1 line-clamp-1 text-[10px] text-[#999]">{item.category}</p>
      <button type="button" onClick={openCourse} className="mt-3 min-h-[60px] text-left">
        <p className="line-clamp-4 text-[12px] leading-[1.25] text-[#555]">{item.description}</p>
      </button>
      <button
        type="button"
        onClick={() => onBuyCourse(item.courseId)}
        className={`pressable mt-3 h-8 w-full rounded-full text-[12px] font-medium transition hover:-translate-y-0.5 hover:brightness-95 ${
          item.free ? 'bg-[#4fc748] text-white' : 'bg-[#ffdd00] text-black'
        }`}
      >
        {item.price}
      </button>
    </article>
  );
}
