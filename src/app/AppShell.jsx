import { useRouterState } from '@tanstack/react-router';
import { useEffect, useMemo, useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { SiteFooter } from '../components/layout/SiteFooter';
import { AppContext } from './AppContext';

function getActiveSection(pathname) {
  if (pathname.startsWith('/catalog/author/')) return 'authors';
  if (pathname.startsWith('/catalog')) return 'catalog';
  if (pathname.startsWith('/authors')) return 'authors';
  if (pathname.startsWith('/reels')) return 'reels';
  if (pathname === '/') return 'home';
  return pathname.split('/')[1] || 'home';
}

export function AppShell({ children }) {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const activeSection = getActiveSection(pathname);
  const contextValue = useMemo(() => ({ query, setQuery }), [query]);

  useEffect(() => {
    if (!menuOpen && !mobileSearchOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen, mobileSearchOpen]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const syncLayoutMode = (event) => {
      if (!event.matches) return;
      setMenuOpen(false);
      setMobileSearchOpen(false);
    };

    if (desktop.matches) syncLayoutMode(desktop);
    desktop.addEventListener?.('change', syncLayoutMode);
    return () => desktop.removeEventListener?.('change', syncLayoutMode);
  }, []);

  const openMobileSearch = () => {
    setMenuOpen(false);
    setMobileSearchOpen(true);
  };

  const closeMobileSearch = () => {
    setMobileSearchOpen(false);
    setQuery('');
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Sidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearch={openMobileSearch}
        activeSection={activeSection}
      />
      <Topbar
        query={query}
        setQuery={setQuery}
        onMenu={() => setMenuOpen(true)}
        mobileSearchOpen={mobileSearchOpen}
        onCloseMobileSearch={closeMobileSearch}
      />
      <div key={pathname} className="page-transition">
        {children}
      </div>
      <SiteFooter />
    </AppContext.Provider>
  );
}
