import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { searchSite } from "../../features/search/search.service";
import { SearchResults } from "../../features/search/SearchResults";
import { Logo } from "./Logo";
import { MobileSearchOverlay } from "./MobileSearchOverlay";

export function Topbar({
  query,
  setQuery,
  onMenu,
  mobileSearchOpen,
  onCloseMobileSearch,
}) {
  const navigate = useNavigate();
  const [focused, setFocused] = useState(false);
  const results = useMemo(
    () =>
      searchSite(query).filter(
        (result) => result.type === "course" || result.type === "author",
      ),
    [query],
  );
  const showResults = focused && query.trim().length >= 2;

  const openResult = (result) => {
    if (result.type === "course") {
      navigate({
        to: "/catalog/course/$courseId",
        params: { courseId: result.id },
      });
    } else if (result.type === "author") {
      navigate({
        to: "/catalog/author/$authorId",
        params: { authorId: result.id },
      });
    }

    setQuery("");
    setFocused(false);
    onCloseMobileSearch?.();
  };

  return (
    <>
      <header className="relative z-30 flex h-[60px] items-center px-3 min-[380px]:px-4 sm:px-5 lg:ml-[190px] lg:h-[70px] lg:px-[28px]">
        <div className="flex w-full items-center justify-between lg:hidden">
          <button
            type="button"
            onClick={onMenu}
            aria-label="Открыть меню"
            className="grid h-11 w-11 place-items-center rounded-full transition active:bg-[#f3f3f3]"
          >
            <Menu size={22} />
          </button>
          <Link
            to="/"
            aria-label="AskHow — на главную"
            className="absolute left-1/2 -translate-x-1/2"
          >
            <Logo />
          </Link>
          <div className="h-11 w-11" aria-hidden="true" />
        </div>

        <div className="relative mx-auto hidden h-[38px] w-full max-w-[1050px] lg:block">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => window.setTimeout(() => setFocused(false), 120)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && results[0]) openResult(results[0]);
            }}
            placeholder="Что ищем?"
            aria-label="Поиск по ключевым словам"
            className="search-field-motion h-full w-full rounded-full border border-[#bdbdbd] bg-white pl-4 pr-11 text-[11px] outline-none transition focus:border-[#858585]"
          />
          <Search
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999]"
            size={14}
          />

          {showResults && (
            <div className="popover-enter absolute left-0 right-0 top-[46px] max-h-[420px] overflow-y-auto rounded-[15px] border border-[#e6e6e6] bg-white p-2 shadow-[0_18px_60px_rgba(0,0,0,.14)]">
              <SearchResults
                query={query}
                results={results}
                onSelect={openResult}
              />
            </div>
          )}
        </div>
      </header>

      {mobileSearchOpen && (
        <MobileSearchOverlay
          query={query}
          setQuery={setQuery}
          results={results}
          onClose={onCloseMobileSearch}
          onSelect={openResult}
        />
      )}
    </>
  );
}
