import { useMemo } from 'react';
import { ArrowRight, Clock3 } from 'lucide-react';
import { blogs } from '../data/blogs';
import { mergeBlogs, usePublishedArticles } from '../features/content/published-content';

function BlogCard({ item, onOpenBlog }) {
  return (
    <article className="motion-card min-w-0 overflow-hidden rounded-[16px] border border-[#ececec] bg-white">
      <button
        type="button"
        onClick={() => onOpenBlog(item.id)}
        className="group pressable block w-full overflow-hidden bg-[#f3f3f3] text-left"
        aria-label={`Открыть статью «${item.title}»`}
      >
        <img
          src={item.image}
          alt={item.title}
          className="aspect-[1.65] w-full object-cover transition duration-300 group-hover:scale-[1.015]"
        />
      </button>

      <div className="p-4 min-[390px]:p-5">
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#777]">
          <span className="font-medium text-[#111]">{item.category}</span>
          <span className="flex items-center gap-1">
            <Clock3 size={13} strokeWidth={1.7} />
            {item.readTime}
          </span>
        </div>

        <button type="button" onClick={() => onOpenBlog(item.id)} className="mt-3 text-left">
          <h2 className="text-[19px] font-semibold min-[390px]:text-[21px] leading-[1.18] tracking-[-0.3px]">
            {item.title}
          </h2>
        </button>
        <p className="mt-3 text-[12px] leading-[1.55] min-[390px]:text-[13px] text-[#555]">{item.excerpt}</p>
        <p className="mt-3 text-[10px] text-[#999]">{item.tags}</p>

        <button
          type="button"
          onClick={() => onOpenBlog(item.id)}
          className="pressable mt-5 inline-flex items-center gap-2 rounded-full bg-[#ffdd00] px-5 py-2.5 text-[12px] font-medium transition hover:brightness-95"
        >
          Читать статью
          <ArrowRight size={14} />
        </button>
      </div>
    </article>
  );
}

export function BlogsPage({ query, onOpenBlog }) {
  const { articles } = usePublishedArticles();
  const allBlogs = useMemo(() => mergeBlogs(blogs, articles), [articles]);

  const visibleBlogs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return allBlogs;

    return allBlogs.filter((item) =>
      `${item.title} ${item.category} ${item.tags} ${item.excerpt}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [allBlogs, query]);

  return (
    <main className="px-3 pb-16 min-[380px]:px-4 sm:px-5 sm:pb-20 lg:ml-[190px] lg:px-[29px]">
      <div className="mx-auto max-w-[1000px] pt-2">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[27px] min-[390px]:text-[30px] font-semibold tracking-[-.025em]">Каталог блогов</h1>
            <p className="mt-2 text-[12px] text-[#777]">
              Информационные статьи, инструкции и практические материалы от AskHow.
            </p>
          </div>
          <span className="shrink-0 text-[11px] text-[#777]">Найдено: {visibleBlogs.length}</span>
        </div>

        {visibleBlogs.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {visibleBlogs.map((item) => (
              <BlogCard key={item.id} item={item} onOpenBlog={onOpenBlog} />
            ))}
          </div>
        ) : (
          <div className="rounded-[16px] bg-[#f7f7f7] px-6 py-12 text-center text-[13px] text-[#777]">
            По вашему запросу статьи не найдены
          </div>
        )}
      </div>
    </main>
  );
}
