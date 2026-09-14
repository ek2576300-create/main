export function AuthorButton({ author, onOpenAuthor, compact = false, inverse = false }) {
  if (!author) return null;

  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onOpenAuthor?.(author.id);
      }}
      className={`group/author inline-flex items-center text-left transition hover:opacity-75 ${
        compact
          ? 'gap-2'
          : 'max-w-[calc(100vw-48px)] gap-2.5 rounded-[12px] bg-white px-3 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,.08)] min-[390px]:gap-3 min-[390px]:px-4 min-[390px]:py-3'
      }`}
      aria-label={`Открыть страницу автора ${author.name}`}
    >
      <img
        src={author.avatar}
        alt={author.name}
        className={`${compact ? 'h-8 w-8' : 'h-9 w-9 min-[390px]:h-11 min-[390px]:w-11'} rounded-full object-cover ring-1 ring-black/5`}
      />
      <span className="min-w-0">
        <span
          className={`block truncate font-semibold ${compact ? 'text-[11px]' : 'text-[12px] min-[390px]:text-[14px]'} ${
            inverse ? 'text-white' : 'text-black'
          }`}
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
