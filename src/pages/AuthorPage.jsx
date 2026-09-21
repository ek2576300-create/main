import { useMemo, useState } from 'react';
import { CourseCatalogCard } from '../components/catalog/CourseCatalogCard';
import { HomeSectionHeader } from '../components/home/HomeSectionHeader';
import { PaymentModal } from '../components/payment/PaymentModal';
import { authorArticles, usePublishedArticles } from '../features/content/published-content';

function ArticleCards({ items }) {
  return (
    <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => {
        // An article written in the admin panel lives on the site itself; only
        // one that points somewhere else opens in a new tab.
        const external = Boolean(item.url);
        const href = item.url || `/blogs/${item.id}`;
        const summary = item.description || item.excerpt;

        return (
          <a
            key={item.id}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="motion-card overflow-hidden rounded-[16px] border border-[#e8e8e8] bg-white shadow-[0_8px_28px_rgba(0,0,0,.04)]"
          >
            {item.image && (
              <img src={item.image} alt={item.title || ''} className="aspect-video w-full object-cover" />
            )}
            <div className="p-4">
              <h3 className="text-[14px] font-semibold leading-[1.3]">{item.title}</h3>
              {summary && (
                <p className="mt-2 line-clamp-3 text-[10px] leading-[1.5] text-[#666]">{summary}</p>
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
}

export function AuthorPage({ author, courses, onOpenCourse }) {
  const [expanded, setExpanded] = useState(false);
  const [paymentCourse, setPaymentCourse] = useState(null);
  const { articles: published } = usePublishedArticles();
  // Articles bundled with the build plus whatever the admin panel has
  // published for this author since the last deploy.
  const articles = useMemo(
    () => [...(author.content?.articles || []), ...authorArticles(published, author.id)],
    [author.content?.articles, author.id, published],
  );

  return (
    <main className="px-3 pb-12 min-[380px]:px-4 sm:px-5 lg:ml-[190px] lg:px-[28px]">
      <div className="mx-auto max-w-[1050px] pt-2">
        <section className="grid gap-5 rounded-[16px] border border-[#e8e8e8] p-3.5 min-[390px]:p-4 sm:gap-6 sm:p-5 md:grid-cols-[230px_minmax(0,1fr)] md:rounded-[14px]">
          <img
            src={author.cover || author.avatar}
            alt={author.name}
            className="h-[240px] w-full rounded-[13px] object-cover object-center min-[420px]:h-[300px] md:h-[315px]"
          />
          <div className="py-1 md:pr-5">
            <h1 className="text-[28px] font-semibold leading-[1.1] tracking-[-.035em] min-[390px]:text-[31px] sm:text-[37px]">
              {author.name}
            </h1>
            <p className="mt-2 text-[12px] font-medium text-[#777]">{author.role}</p>
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
                <span
                  key={tag}
                  className="rounded-[3px] bg-[#eaf3ff] px-2.5 py-1 text-[9px] text-[#1683ff]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {courses.length > 0 && (
          <section className="mt-9 sm:mt-11">
            <HomeSectionHeader title="Курсы" />
            <div className="grid grid-cols-1 gap-x-3 gap-y-7 min-[380px]:grid-cols-2 min-[480px]:gap-x-4 sm:grid-cols-3 xl:grid-cols-4 xl:gap-y-8">
              {courses.map((course) => (
                <CourseCatalogCard
                  key={course.id}
                  course={course}
                  author={author}
                  onOpenCourse={onOpenCourse}
                  onBuyCourse={setPaymentCourse}
                />
              ))}
            </div>
          </section>
        )}

        {articles.length > 0 && (
          <section className="mt-9 sm:mt-11">
            <HomeSectionHeader title="Статьи" />
            <ArticleCards items={articles} />
          </section>
        )}

        <PaymentModal
          open={Boolean(paymentCourse)}
          course={paymentCourse}
          source="author_course_card"
          onClose={() => setPaymentCourse(null)}
        />
      </div>
    </main>
  );
}
