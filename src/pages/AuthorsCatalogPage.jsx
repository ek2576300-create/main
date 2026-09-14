import { useMemo } from 'react';

export function AuthorsCatalogPage({ authors, courses, query, onOpenAuthor, onOpenCourse }) {
  const filteredAuthors = useMemo(() => {
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
    <main className="px-3 pb-16 min-[380px]:px-4 sm:px-5 sm:pb-20 lg:ml-[190px] lg:px-[28px]">
      <div className="mx-auto max-w-[1050px] pt-2">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[27px] min-[390px]:text-[30px] font-semibold tracking-[-.025em]">Каталог авторов</h1>
            <p className="mt-2 max-w-[620px] text-[12px] text-[#777]">
              Эксперты AskHow и их практические курсы. Откройте карточку автора, чтобы посмотреть
              описание, видео, статьи и все доступные программы.
            </p>
          </div>
          <span className="text-[11px] text-[#777]">Найдено: {filteredAuthors.length}</span>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {filteredAuthors.map((author) => {
            const authorCourses = courses.filter((course) => course.authorId === author.id);
            const featuredCourse = authorCourses[0];

            return (
              <article
                key={author.id}
                className="motion-card overflow-hidden rounded-[14px] border border-[#e8e8e8] bg-white"
              >
                <button
                  type="button"
                  onClick={() => onOpenAuthor(author.id)}
                  className="group pressable relative block aspect-[1.55] w-full overflow-hidden bg-[#ededed] text-left"
                >
                  <img
                    src={author.cover || featuredCourse?.cover || author.avatar}
                    alt={author.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end gap-3 text-white">
                    <img
                      src={author.avatar}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-full border-2 border-white object-cover"
                    />
                    <div className="min-w-0">
                      <h2 className="line-clamp-3 text-[17px] font-semibold leading-tight">{author.name}</h2>
                      <p className="mt-1 line-clamp-2 text-[10px] text-white/80">{author.role}</p>
                    </div>
                  </div>
                </button>

                <div className="p-3.5 min-[390px]:p-4">
                  <p className="line-clamp-3 min-h-[54px] text-[11px] leading-[1.55] text-[#555]">
                    {author.description}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(author.tags || []).slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[3px] bg-[#eaf3ff] px-2 py-1 text-[8px] text-[#1683ff]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-[10px] text-[#777]">Курсов: {authorCourses.length}</span>
                    <button
                      type="button"
                      onClick={() => onOpenAuthor(author.id)}
                      className="pressable h-9 rounded-full bg-[#ffdc00] px-5 text-[10px] font-medium"
                    >
                      Смотреть автора
                    </button>
                  </div>
                  {featuredCourse && (
                    <button
                      type="button"
                      onClick={() => onOpenCourse(featuredCourse.id)}
                      className="mt-3 line-clamp-1 w-full text-left text-[10px] text-[#1683ff]"
                    >
                      Популярный курс: {featuredCourse.title}
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {filteredAuthors.length === 0 && (
          <div className="rounded-[16px] bg-[#f7f7f7] px-6 py-12 text-center text-[13px] text-[#777]">
            По вашему запросу авторы не найдены
          </div>
        )}
      </div>
    </main>
  );
}
