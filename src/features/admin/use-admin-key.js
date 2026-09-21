import { useCallback, useState } from 'react';

// Both admin screens share one key, so unlocking the leads table also unlocks
// the article constructor for the rest of the session.
const STORAGE_KEY = 'askhow-admin-key';

function readStoredKey() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
}

export function useAdminKey() {
  const [adminKey, setAdminKey] = useState(readStoredKey);

  const saveKey = useCallback((value) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, trimmed);
    } catch {
      // sessionStorage may be unavailable in privacy mode; the key still works
      // for this page load.
    }
    setAdminKey(trimmed);
  }, []);

  const clearKey = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setAdminKey('');
  }, []);

  return { adminKey, saveKey, clearKey };
}
