import { ArrowLeft, CalendarDays, Clock3, UserRound } from 'lucide-react';

export function BlogArticlePage({ blog, onBack }) {
  return (
    <main className="px-3 pb-16 min-[380px]:px-4 sm:px-5 sm:pb-20 lg:ml-[190px] lg:px-[29px]">
      <article className="mx-auto max-w-[820px] pt-2">
        <button
          type="button"
          onClick={onBack}
          className="mb-5 inline-flex min-h-10 items-center items-center gap-2 text-[12px] text-[#555] transition hover:text-black"
        >
          <ArrowLeft size={15} />
          Вернуться в каталог блогов
        </button>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-[#777]">
          <span className="rounded-full bg-[#ffea67] px-3 py-1 font-medium text-black">
            {blog.category}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays size={13} />
            {blog.publishedAt}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock3 size={13} />
            {blog.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <UserRound size={13} />
            {blog.author}
          </span>
        </div>

        <h1 className="mt-5 text-[29px] font-semibold min-[390px]:text-[32px] sm:text-[38px] leading-[1.08] tracking-[-0.8px] md:text-[46px]">
          {blog.title}
        </h1>
        <p className="mt-5 max-w-[760px] text-[14px] leading-[1.65] min-[390px]:text-[15px] sm:text-[16px] text-[#555]">{blog.excerpt}</p>

        <img
          src={blog.image}
          alt={blog.title}
          className="mt-8 max-h-[520px] w-full rounded-[14px] min-[390px]:rounded-[18px] md:rounded-[20px] object-cover"
        />

        <div className="mt-8 text-[14px] min-[390px]:text-[15px] sm:mt-9 sm:text-[16px] leading-[1.75] text-[#292929]">
          <p className="text-[16px] font-medium min-[390px]:text-[17px] sm:text-[18px] leading-[1.65]">{blog.lead}</p>

          {blog.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-[22px] min-[390px]:text-[23px] sm:text-[25px] font-semibold leading-tight tracking-[-0.35px]">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="mt-4">
                  {paragraph}
                </p>
              ))}
              {section.items?.length ? (
                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#f0cb00]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <aside className="mt-9 rounded-[16px] bg-[#fff8c7] p-4 min-[390px]:p-5 sm:mt-10 sm:rounded-[18px] sm:p-6 md:p-8">
            <h2 className="text-[22px] font-semibold">Главное перед выходом</h2>
            <p className="mt-3">{blog.conclusion}</p>
          </aside>

          <p className="mt-8 text-[12px] text-[#999]">{blog.tags}</p>
        </div>
      </article>
    </main>
  );
}
