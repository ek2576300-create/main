import { Link } from "@tanstack/react-router";
import { BookOpen, Menu, Search, UsersRound } from "lucide-react";
import { Logo } from "./Logo";

const NAV_ITEMS = [
  { icon: BookOpen, label: "Каталог курсов", id: "catalog", to: "/catalog" },
  { icon: UsersRound, label: "Каталог авторов", id: "authors", to: "/authors" },
];

export function Sidebar({ open, onClose, onSearch, activeSection }) {
  return (
    <>
      <button
        type="button"
        aria-label="Закрыть меню"
        className={`fixed inset-0 z-40 bg-black/35 transition-opacity duration-300 lg:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`mobile-drawer fixed left-0 top-0 z-50 h-[100dvh] overflow-y-auto bg-white px-[18px] shadow-[18px_0_50px_rgba(0,0,0,.08)] transition-transform duration-[380ms] ease-[cubic-bezier(.22,.75,.25,1)] min-[390px]:px-[20px] lg:h-screen lg:w-[190px] lg:max-w-none lg:translate-x-0 lg:px-[20px] lg:py-[24px] lg:shadow-none ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="mb-[24px] flex items-center gap-[12px] lg:mb-[42px]">
          <button
            type="button"
            onClick={onClose}
            aria-label="Свернуть меню"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-[#777] transition hover:bg-[#f5f5f5] lg:hidden"
          >
            <Menu size={18} strokeWidth={1.6} />
          </button>
          <Link
            to="/"
            onClick={onClose}
            aria-label="AskHow — на главную"
            className="min-w-0"
          >
            <Logo />
          </Link>
        </div>

        <button
          type="button"
          onClick={onSearch}
          className="mb-5 flex min-h-[48px] w-full items-center gap-3 rounded-[12px] bg-[#f5f5f5] px-3 text-left text-[13px] font-medium text-[#222] transition active:scale-[.99] lg:hidden"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[8px] bg-white shadow-sm">
            <Search size={15} strokeWidth={1.8} />
          </span>
          <span className="min-w-0 flex-1">Поиск</span>
          <span className="text-[11px] font-normal text-[#999]">Что ищем?</span>
        </button>

        <nav className="space-y-[6px] lg:space-y-[8px]">
          {NAV_ITEMS.map(({ icon: Icon, label, id, to }) => {
            const isActive = activeSection === id;
            return (
              <Link
                key={id}
                to={to}
                onClick={onClose}
                className={`group nav-motion flex min-h-[44px] lg:min-h-[34px] w-full items-center gap-[10px] rounded-[9px] px-1.5 text-left text-[12px] transition ${
                  isActive
                    ? "font-semibold text-black"
                    : "text-[#333] hover:bg-[#f7f7f7] hover:text-black"
                }`}
              >
                <span
                  className={`grid h-[21px] w-[21px] shrink-0 place-items-center rounded-[6px] transition ${
                    isActive
                      ? "bg-[#ffe000]"
                      : "bg-transparent group-hover:bg-[#f0f0f0]"
                  }`}
                >
                  <Icon size={14} strokeWidth={1.65} />
                </span>
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
