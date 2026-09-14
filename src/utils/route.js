export function parseRoute() {
  const p = location.pathname.replace(/\/+$/, '') || '/';
  const parts = p.split('/').filter(Boolean);
  if (parts[0] === 'reels') return { page: 'reels', id: parts[1] };
  if (parts[0] === 'catalog' && parts[1] === 'author' && parts[2])
    return { page: 'author', id: parts[2] };
  if (p === '/catalog') return { page: 'catalog' };
  return { page: p === '/' ? 'home' : p.slice(1) };
}
