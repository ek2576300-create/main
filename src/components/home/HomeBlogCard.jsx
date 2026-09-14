export function HomeBlogCard({ item, onOpenBlog }) {
  const openBlog = () => onOpenBlog(item.id);

  return (
    <article className="motion-card min-w-0">
      <button
        type="button"
        onClick={openBlog}
        className="group pressable block w-full overflow-hidden rounded-[13px] bg-[#f3f3f3] text-left"
        aria-label={`Открыть статью «${item.title}»`}
      >
        <img
          src={item.image}
          alt=""
          className="aspect-[1.65] w-full object-cover transition duration-300 group-hover:scale-[1.015]"
        />
      </button>
      <button type="button" onClick={openBlog} className="mt-3 text-left">
        <h3 className="text-[15px] font-semibold leading-tight">{item.title}</h3>
      </button>
      <p className="mt-1 text-[10px] font-medium text-[#777]">
        {item.category} · {item.readTime}
      </p>
      <p className="mt-3 text-[12px] leading-[1.4] text-[#555]">{item.excerpt}</p>
    </article>
  );
}
