import { useCallback, useState } from 'react';

export function useLocalSet(key) {
  const [s, setS] = useState(() => new Set(JSON.parse(localStorage.getItem(key) || '[]')));
  const toggle = useCallback(
    (id) =>
      setS((p) => {
        const n = new Set(p);
        n.has(id) ? n.delete(id) : n.add(id);
        localStorage.setItem(key, JSON.stringify([...n]));
        return n;
      }),
    [key],
  );
  return [s, toggle];
}
