const TYPE_LABELS = {
  course: "Курс",
  author: "Автор",
};

export function SearchResults({ query, results, mobile = false, onSelect }) {
  if (query.trim().length < 2) {
    return mobile ? (
      <div className="px-1 py-6 text-[12px] leading-relaxed text-[#8b8b8b]">
        Введите минимум 2 символа. Поиск понимает опечатки, неправильную
        раскладку, близкие по смыслу слова и ищет по названиям, авторам, тегам и
        описаниям.
      </div>
    ) : null;
  }

  if (!results.length) {
    return (
      <div className="px-3 py-6 text-center text-[11px] leading-relaxed text-[#777]">
        Ничего не нашли. Попробуйте название темы, автора или ключевое слово —
        например «НДС», «маркетинг», «договор» или «ROMI».
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {results.map((result, index) => (
        <button
          key={`${result.type}-${result.id}`}
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onSelect(result)}
          style={{ "--search-delay": `${Math.min(index * 35, 210)}ms` }}
          className={`search-result-enter pressable flex w-full items-center gap-3 rounded-[12px] text-left transition hover:bg-[#f7f7f7] ${
            mobile ? "px-1.5 py-3 min-[390px]:px-2" : "px-2 py-2"
          }`}
        >
          <img
            src={result.image}
            alt=""
            className={`${mobile ? "h-11 w-11 min-[390px]:h-12 min-[390px]:w-12" : "h-10 w-10"} shrink-0 rounded-[10px] object-cover`}
          />
          <span className="min-w-0 flex-1">
            <span
              className={`${mobile ? "text-[12px] min-[390px]:text-[13px]" : "text-[12px]"} line-clamp-1 block font-semibold text-[#202020]`}
            >
              {result.title}
            </span>
            <span className="mt-0.5 flex min-w-0 items-center gap-2">
              <span className="line-clamp-1 block min-w-0 text-[10px] text-[#888]">
                {result.subtitle}
              </span>
              {result.correctedLayout && (
                <span className="shrink-0 rounded-full bg-[#fff7c7] px-1.5 py-0.5 text-[8px] font-medium text-[#7a6500]">
                  раскладка
                </span>
              )}
            </span>
          </span>
          <span className="flex shrink-0 flex-col items-end gap-0.5 text-right">
            <span className="text-[9px] font-medium text-[#666]">
              {TYPE_LABELS[result.type]}
            </span>
            <span
              className={`${mobile ? "hidden min-[420px]:block" : "block"} text-[8px] text-[#aaa]`}
            >
              {result.matchLabel}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
