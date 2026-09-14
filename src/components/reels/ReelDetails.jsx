export function ReelDetails({ item, onOpenAuthor }) {
  return (
    <aside className="hidden h-fit md:block">
      <div className="rounded-[12px] bg-[#f8f8f8] p-3">
        <div className="flex gap-3">
          <button
            type="button"
            aria-label={`Открыть страницу автора ${item.author}`}
            onClick={() => item.authorId && onOpenAuthor?.(item.authorId)}
            className={item.authorId ? 'transition hover:opacity-75' : 'cursor-default'}
          >
            <img src={item.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
          </button>
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-[15px] font-semibold">{item.author}</h3>
            <p className="text-[9px] text-[#777]">{item.handle}</p>
          </div>
        </div>
        <p className="mt-2 text-[11px] leading-[1.35]">{item.bio}</p>
      </div>
      <div className="mt-3 max-h-[calc(100vh-260px)] overflow-y-auto rounded-[12px] bg-[#f8f8f8] p-3">
        <h2 className="text-[17px] font-semibold">{item.articleTitle}</h2>
        <p className="mt-2 whitespace-pre-line text-[11px] leading-[1.48]">{item.article}</p>
        <p className="mt-4 text-[10px] text-[#8a8a8a]">{item.tags}</p>
      </div>
    </aside>
  );
}
