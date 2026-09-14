import { Clock3 } from 'lucide-react';
import { PaymentAction } from './PaymentAction';

export function CourseCatalogCard({ course, author, onOpenCourse, onBuyCourse }) {
  const openCourse = () => onOpenCourse(course.id);
  // В каталоге и на странице автора обложкой курса всегда служит
  // изображение первого урока, чтобы карточка совпадала с самим курсом.
  const coverImage = course.lessons?.[0]?.image || course.cover;

  return (
    <article className="motion-card flex min-w-0 h-full flex-col">
      <button
        type="button"
        onClick={openCourse}
        className="group pressable relative block aspect-[3/4] w-full overflow-hidden rounded-[16px] sm:rounded-[14px] bg-[#ececec] text-left"
      >
        <img
          src={coverImage}
          alt={course.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" />
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-[9px] font-medium text-white">
          <Clock3 size={12} /> {course.duration || 'Продолжительность уточняется'}
        </span>
      </button>
      <button
        type="button"
        onClick={openCourse}
        className="mt-2 block w-full text-left"
      >
        <h3 className="line-clamp-3 min-h-[53px] text-[14px] font-semibold min-[380px]:text-[13px] leading-[1.25]">{course.title}</h3>
      </button>
      <button type="button" onClick={openCourse} className="mt-2 inline-flex w-fit items-center gap-2 text-left transition hover:opacity-75">
        <img src={author?.avatar || coverImage} alt="" className="h-8 w-8 rounded-full object-cover ring-1 ring-black/5" />
        <span className="text-[11px] font-semibold">{author?.name || 'AskHow'}</span>
      </button>
      <button type="button" onClick={openCourse} className="mt-2 min-h-[58px] w-full text-left">
        <p className="line-clamp-3 text-[10px] leading-[1.45] text-[#777]">{course.description}</p>
      </button>
      <PaymentAction course={course} onPay={() => onBuyCourse?.(course)} className="mt-auto" />
    </article>
  );
}
