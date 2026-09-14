import {
  Clock3,
  Eye,
  LockKeyhole,
  Play,
  Star,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { PaymentModal } from '../components/payment/PaymentModal';

function mergeAuthor(course, authors) {
  const author = authors.find((item) => item.id === course.authorId);
  return { course, author };
}

function AuthorButton({ author, onOpenAuthor, compact = false, inverse = false }) {
  if (!author) return null;
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onOpenAuthor?.(author.id);
      }}
      className={`group/author inline-flex items-center text-left transition hover:opacity-75 ${compact ? 'gap-2' : 'gap-3 rounded-[12px] bg-white px-4 py-3 shadow-[0_2px_10px_rgba(0,0,0,.08)]'}`}
      aria-label={`Открыть страницу автора ${author.name}`}
    >
      <img
        src={author.avatar}
        alt={author.name}
        className={`${compact ? 'h-8 w-8' : 'h-11 w-11'} rounded-full object-cover ring-1 ring-black/5`}
      />
      <span className="min-w-0">
        <span
          className={`block truncate font-semibold ${compact ? 'text-[11px]' : 'text-[14px]'} ${inverse ? 'text-white' : 'text-black'}`}
        >
          {author.name}
        </span>
        {!compact && (
          <span className={`mt-0.5 block text-[10px] ${inverse ? 'text-white/70' : 'text-[#777]'}`}>
            Краткая информация об авторе
          </span>
        )}
      </span>
    </button>
  );
}

function Metrics({ likes = null, saves = null }) {
  if (likes == null && saves == null) return null;
  return (
    <div className="flex items-center gap-3 text-[9px] text-white">
      {likes != null && (
        <span className="inline-flex items-center gap-1">
          <Eye size={11} strokeWidth={1.7} /> {likes}
        </span>
      )}
      {saves != null && (
        <span className="inline-flex items-center gap-1">
          <Star size={11} strokeWidth={1.7} /> {saves}
        </span>
      )}
    </div>
  );
}

function CourseCatalogCard({ course, author, onOpenCourse, onOpenAuthor }) {
  return (
    <article className="min-w-0">
      <button
        type="button"
        onClick={() => onOpenCourse(course.id)}
        className="group relative block aspect-[3/4] w-full overflow-hidden rounded-[14px] bg-[#ececec] text-left"
      >
        <img
          src={course.cover}
          alt={course.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/65 to-transparent" />
        <div className="absolute bottom-3 right-3">
          <Metrics likes={course.likes} saves={course.saves} />
        </div>
      </button>
      <button
        type="button"
        onClick={() => onOpenCourse(course.id)}
        className="mt-2 block w-full text-left"
      >
        <h3 className="line-clamp-2 text-[13px] font-semibold leading-[1.25]">{course.title}</h3>
      </button>
      <div className="mt-2">
        <AuthorButton author={author} onOpenAuthor={onOpenAuthor} compact />
      </div>
      <p className="mt-1 line-clamp-2 text-[9px] leading-[1.45] text-[#8a8a8a]">
        {(course.tags || []).join(' ')}
      </p>
    </article>
  );
}

export function CatalogPage({ courses, authors, query, onOpenCourse, onOpenAuthor }) {
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return courses;
    return courses.filter((course) => {
      const author = authors.find((item) => item.id === course.authorId);
      return [course.title, course.description, ...(course.tags || []), author?.name, author?.role]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(normalized);
    });
  }, [authors, courses, query]);

  return (
    <main className="px-4 pb-8 lg:ml-[190px] lg:px-[28px]">
      <div className="mx-auto max-w-[1050px] pt-2">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[30px] font-semibold tracking-[-.025em]">Каталог курсов</h1>
            <p className="mt-2 text-[12px] text-[#777]">
              Выберите курс. Нажатие на аватар автора открывает его отдельную страницу.
            </p>
          </div>
          <span className="text-[11px] text-[#777]">Найдено: {filtered.length}</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
          {filtered.map((course) => {
            const payload = mergeAuthor(course, authors);
            return (
              <CourseCatalogCard
                key={course.id}
                {...payload}
                onOpenCourse={onOpenCourse}
                onOpenAuthor={onOpenAuthor}
              />
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-[16px] bg-[#f7f7f7] px-6 py-12 text-center text-[13px] text-[#777]">
            По вашему запросу курсы не найдены
          </div>
        )}
      </div>
    </main>
  );
}

export function AuthorPage({ author, courses, onOpenCourse, onOpenAuthor }) {
  const [tab, setTab] = useState('courses');
  const [expanded, setExpanded] = useState(false);

  const content = useMemo(() => {
    if (tab === 'courses') return courses;
    return author.content?.[tab] || [];
  }, [author.content, courses, tab]);

  return (
    <main className="px-4 pb-8 lg:ml-[190px] lg:px-[28px]">
      <div className="mx-auto max-w-[1050px] pt-2">
        <section className="grid gap-6 rounded-[14px] border border-[#e8e8e8] p-4 sm:p-5 md:grid-cols-[230px_minmax(0,1fr)]">
          <img
            src={author.cover || author.avatar}
            alt={author.name}
            className="h-[300px] w-full rounded-[13px] object-cover object-center md:h-[315px]"
          />
          <div className="py-1 md:pr-5">
            <h1 className="text-[31px] font-semibold leading-[1.1] tracking-[-.035em] sm:text-[37px]">
              {author.name}
            </h1>
            <p
              className={`${expanded ? '' : 'line-clamp-4'} mt-5 max-w-[700px] text-[12px] leading-[1.55] text-[#555]`}
            >
              {author.description}
            </p>
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="mt-1 text-[10px] text-[#1683ff]"
            >
              {expanded ? 'Скрыть' : 'Подробнее'}
            </button>
            <div className="mt-5 flex flex-wrap gap-2">
              {(author.tags || []).map((tag) => (
                <span key={tag} className="rounded-[3px] bg-[#eaf3ff] px-2.5 py-1 text-[9px] text-[#1683ff]">
                  {tag}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="mt-6 h-11 w-full max-w-[300px] rounded-full bg-[#ffdc00] text-[12px] font-medium"
            >
              Подписаться
            </button>
          </div>
        </section>

        <div className="mt-4 inline-flex rounded-[14px] bg-[#f4f4f4] p-1">
          {[
            ['courses', 'Курсы'],
            ['videos', 'Видео'],
            ['articles', 'Статьи'],
          ].map(([id, label]) => (
            <button
              type="button"
              key={id}
              onClick={() => setTab(id)}
              className={`h-9 rounded-[11px] px-7 text-[10px] transition ${tab === id ? 'bg-[#ffdc00] font-medium' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>

        <section className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
          {content.map((item, index) => {
            const course = tab === 'courses' ? item : courses[index % Math.max(courses.length, 1)] || item;
            return (
              <CourseCatalogCard
                key={`${tab}-${item.id}`}
                course={{ ...item, id: course?.id || item.id }}
                author={author}
                onOpenCourse={(courseId) => courseId && onOpenCourse(courseId)}
                onOpenAuthor={onOpenAuthor}
              />
            );
          })}
        </section>

        {content.length === 0 && (
          <div className="mt-5 rounded-[14px] bg-[#f7f7f7] px-6 py-12 text-center text-[12px] text-[#777]">
            В этом разделе пока нет материалов
          </div>
        )}
      </div>
    </main>
  );
}

function LessonCard({ lesson, course }) {
  const isFeatured = Boolean(lesson.featured);
  return (
    <article className="min-w-0">
      <div
        className={`group relative w-full max-w-full overflow-hidden rounded-[14px] bg-[#ededed] ${isFeatured ? 'aspect-[.57]' : 'aspect-[.78]'}`}
      >
        <img
          src={lesson.image}
          alt={lesson.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
        {lesson.free && (
          <span className="absolute left-3 top-3 rounded-[3px] bg-[#ff4646] px-2 py-1 text-[8px] font-medium text-white">
            Бесплатно
          </span>
        )}
        {!lesson.free && (
          <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/35 text-white backdrop-blur-sm">
            <LockKeyhole size={17} />
          </span>
        )}
        {isFeatured && (
          <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/30 text-white backdrop-blur-sm">
            <Play size={20} className="ml-0.5 fill-current" />
          </span>
        )}
        <div className="absolute inset-x-3 bottom-3">
          {isFeatured && (
            <>
              <h3 className="text-[12px] font-semibold text-white">{lesson.title}</h3>
              <p className="mt-2 line-clamp-3 text-[9px] leading-[1.35] text-white/85">
                {lesson.subtitle}
              </p>
            </>
          )}
          <div className={`${isFeatured ? 'mt-4' : ''} flex items-center justify-between text-[8px] text-white`}>
            <span className="inline-flex items-center gap-1">
              <Clock3 size={10} /> {lesson.duration}
            </span>
            <Metrics likes={course.likes} saves={course.saves} />
          </div>
        </div>
      </div>
      {!isFeatured && (
        <div className="pt-2">
          <h3 className="text-[12px] font-semibold leading-[1.2]">{lesson.title}</h3>
          <p className="mt-1 line-clamp-1 text-[8px] text-[#999]">{(lesson.tags || []).join(' ')}</p>
          <p className="mt-2 line-clamp-2 text-[9px] leading-[1.35] text-[#666]">{lesson.subtitle}</p>
        </div>
      )}
    </article>
  );
}

function getPaymentLabel(course, compact = false) {
  if (course.price && course.price !== 'Бесплатно') {
    return compact ? `Оплатить · ${course.price}` : `Оплатить курс · ${course.price}`;
  }
  return 'Оплатить курс';
}

function ProgramAction({ course, onPay, className = '' }) {
  const classes = `grid h-11 w-full place-items-center rounded-full bg-[#ffdc00] text-[11px] font-medium shadow-[0_8px_14px_rgba(255,220,0,.2)] ${className}`;

  return (
    <button type="button" onClick={onPay} className={classes}>
      {getPaymentLabel(course, true)}
    </button>
  );
}

export function CoursePage({ course, author, onOpenAuthor }) {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const lessons = course.lessons || [];
  const materials = course.materials || [];
  const featuredLesson = lessons.find((lesson) => lesson.featured) || null;
  const regularLessons = featuredLesson
    ? lessons.filter((lesson) => lesson.id !== featuredLesson.id)
    : lessons;

  return (
    <main className="px-4 pb-8 lg:ml-[190px] lg:px-[28px]">
      <div className="mx-auto max-w-[1050px] pt-2">
        <div className="mb-4 flex flex-wrap gap-2">
          {(course.tags || []).map((tag) => (
            <span key={tag} className="rounded-[3px] bg-[#eaf3ff] px-2.5 py-1 text-[9px] text-[#1683ff]">
              {tag}
            </span>
          ))}
        </div>

        <section className="relative h-[265px] overflow-hidden rounded-[14px] sm:h-[330px]">
          <img src={course.cover} alt={course.title} className="h-full w-full object-cover" />
          <div className="absolute bottom-5 left-5">
            <AuthorButton author={author} onOpenAuthor={onOpenAuthor} />
          </div>
        </section>

        <h1 className="mt-7 max-w-[930px] text-[31px] font-semibold leading-[1.04] tracking-[-.035em] sm:text-[40px]">
          {course.title}
        </h1>
        <p className="mt-5 max-w-[1010px] whitespace-pre-line text-[11px] leading-[1.6] text-[#555]">
          {course.description}
        </p>

        {course.objectives?.length > 0 && (
          <section className="mt-7 max-w-[920px] rounded-[14px] bg-[#f8f8f8] px-5 py-5">
            <h2 className="text-[17px] font-semibold">Чему вы научитесь</h2>
            <ul className="mt-3 grid gap-2 text-[11px] leading-[1.5] text-[#555] sm:grid-cols-2">
              {course.objectives.map((objective) => (
                <li key={objective} className="flex gap-2">
                  <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ffdc00]" />
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex min-w-[175px] items-center gap-3">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#1d9bf0] text-white">
              <Clock3 size={16} />
            </span>
            <span>
              <b className="block text-[15px] text-[#1683ff]">{course.duration || 'Не указана'}</b>
              <span className="block text-[8px] text-[#1683ff]">Длительность курса</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => setPaymentOpen(true)}
            className="h-12 w-full max-w-[330px] rounded-full bg-[#ffdc00] text-[11px] font-medium shadow-[0_8px_14px_rgba(255,220,0,.24)]"
          >
            {getPaymentLabel(course)}
          </button>
        </div>

        <section className="mt-12">
          <h2 className="text-[31px] font-semibold tracking-[-.02em]">Программа курса</h2>
          {lessons.length > 0 ? (
            <div className="mt-5 grid min-w-0 items-start gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-x-10">
              {featuredLesson && (
                <div className="min-w-0">
                  <LessonCard lesson={featuredLesson} course={course} />
                  <ProgramAction course={course} onPay={() => setPaymentOpen(true)} className="mt-5" />
                </div>
              )}

              <div
                className={`grid min-w-0 grid-cols-2 items-start gap-x-4 gap-y-6 sm:grid-cols-3 ${featuredLesson ? '' : 'lg:col-span-2'}`}
              >
                {regularLessons.map((lesson) => (
                  <LessonCard key={lesson.id} lesson={lesson} course={course} />
                ))}
              </div>

              {!featuredLesson && (
                <ProgramAction course={course} onPay={() => setPaymentOpen(true)} className="lg:col-span-2 sm:max-w-[240px]" />
              )}
            </div>
          ) : (
            <>
              <div className="mt-5 rounded-[14px] border border-dashed border-[#d8d8d8] bg-[#fafafa] px-6 py-10 text-center">
                <p className="text-[12px] font-medium">Полная программа будет доступна после оплаты</p>
                <p className="mx-auto mt-2 max-w-[520px] text-[10px] leading-[1.5] text-[#777]">
                  После оплаты свяжитесь с нами в социальных сетях или дождитесь письма на адрес, указанный при оплате.
                </p>
              </div>
              <ProgramAction course={course} onPay={() => setPaymentOpen(true)} className="mt-5 sm:max-w-[240px]" />
            </>
          )}
        </section>

        {course.progress != null && (
          <section className="mt-12 rounded-[13px] bg-[#fafafa] px-5 py-4" style={{ display: 'none' }}>
            <p className="text-[9px]">Вы завершили курс на {course.progress}%</p>
            <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-white">
              <div
                className="h-full rounded-full bg-[#ffdc00]"
                style={{ width: `${Math.min(100, Math.max(0, course.progress))}%` }}
              />
            </div>
          </section>
        )}

        {materials.length > 0 && (
          <section className="mt-10">
            <h2 className="text-[31px] font-semibold tracking-[-.02em]">Материалы курса</h2>
            <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-4">
              {materials.map((material) => (
                <article key={material.id}>
                  <div className="aspect-[.78] overflow-hidden rounded-[13px] bg-[#eee]">
                    <img src={material.image} alt={material.title} className="h-full w-full object-cover" />
                  </div>
                  <p className="mt-3 text-[9px]">{material.title}</p>
                </article>
              ))}
            </div>
          </section>
        )}

        <PaymentModal
          open={paymentOpen}
          course={course}
          onClose={() => setPaymentOpen(false)}
        />
      </div>
    </main>
  );
}

export function AuthorsCatalogPage({ authors, courses, query, onOpenAuthor, onOpenCourse }) {
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return authors;
    return authors.filter((author) =>
      [author.name, author.role, author.description, ...(author.tags || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    );
  }, [authors, query]);

  return (
    <main className="px-4 pb-20 lg:ml-[190px] lg:px-[28px]">
      <div className="mx-auto max-w-[1050px] pt-2">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[30px] font-semibold tracking-[-.025em]">Каталог авторов</h1>
            <p className="mt-2 max-w-[620px] text-[12px] text-[#777]">
              Эксперты AskHow и их практические курсы. Откройте карточку автора, чтобы посмотреть
              описание, видео, статьи и все доступные программы.
            </p>
          </div>
          <span className="text-[11px] text-[#777]">Найдено: {filtered.length}</span>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((author) => {
            const authorCourses = courses.filter((course) => course.authorId === author.id);
            const featured = authorCourses[0];
            return (
              <article key={author.id} className="overflow-hidden rounded-[14px] border border-[#e8e8e8] bg-white">
                <button
                  type="button"
                  onClick={() => onOpenAuthor(author.id)}
                  className="group relative block aspect-[1.55] w-full overflow-hidden bg-[#ededed] text-left"
                >
                  <img
                    src={author.cover || featured?.cover || author.avatar}
                    alt={author.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3 text-white">
                    <img src={author.avatar} alt="" className="h-12 w-12 shrink-0 rounded-full border-2 border-white object-cover" />
                    <div className="min-w-0">
                      <h2 className="truncate text-[17px] font-semibold leading-tight">{author.name}</h2>
                      <p className="mt-1 line-clamp-1 text-[10px] text-white/80">{author.role}</p>
                    </div>
                  </div>
                </button>
                <div className="p-4">
                  <p className="line-clamp-3 min-h-[54px] text-[11px] leading-[1.55] text-[#555]">{author.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(author.tags || []).slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded-[3px] bg-[#eaf3ff] px-2 py-1 text-[8px] text-[#1683ff]">{tag}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-[10px] text-[#777]">Курсов: {authorCourses.length}</span>
                    <button type="button" onClick={() => onOpenAuthor(author.id)} className="h-9 rounded-full bg-[#ffdc00] px-5 text-[10px] font-medium">Смотреть автора</button>
                  </div>
                  {featured && (
                    <button type="button" onClick={() => onOpenCourse(featured.id)} className="mt-3 line-clamp-1 w-full text-left text-[10px] text-[#1683ff]">
                      Популярный курс: {featured.title}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-[16px] bg-[#f7f7f7] px-6 py-12 text-center text-[13px] text-[#777]">
            По вашему запросу авторы не найдены
          </div>
        )}
      </div>
    </main>
  );
}
