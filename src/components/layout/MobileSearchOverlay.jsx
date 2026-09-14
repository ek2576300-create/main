import { ChevronLeft, Search } from 'lucide-react';
import { SearchResults } from '../../features/search/SearchResults';

export function MobileSearchOverlay({ query, setQuery, results, onClose, onSelect }) {
  return (
    <div className="mobile-search-enter mobile-search-shell fixed inset-0 z-[70] flex flex-col bg-white lg:hidden">
      <div className="flex h-[60px] shrink-0 items-center gap-2 border-b border-[#eeeeee] px-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Закрыть поиск"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full transition active:bg-[#f3f3f3]"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="relative min-w-0 flex-1">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && results[0]) onSelect(results[0]);
              if (event.key === 'Escape') onClose();
            }}
            placeholder="Поиск по ключевым словам"
            aria-label="Поиск по ключевым словам"
            className="search-field-motion h-11 min-[390px]:h-12 w-full rounded-full border border-[#d7d7d7] bg-[#f7f7f7] pl-4 pr-11 text-[14px] outline-none transition focus:border-[#999] focus:bg-white"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#777]" size={17} />
        </div>
      </div>

      <div className="mobile-search-results min-h-0 flex-1 overflow-y-auto px-3 pt-3 min-[390px]:px-4">
        <SearchResults query={query} results={results} mobile onSelect={onSelect} />
      </div>
    </div>
  );
}
