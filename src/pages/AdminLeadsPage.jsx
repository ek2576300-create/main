import { useEffect, useMemo, useState } from 'react';

const ADMIN_LEADS_ENDPOINT = import.meta.env.VITE_ADMIN_LEADS_ENDPOINT || '/mail-api/admin/leads';
const STORAGE_KEY = 'askhow-admin-key';

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('ru-RU');
}

export function AdminLeadsPage() {
  const [adminKey, setAdminKey] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) || '';
    } catch {
      return '';
    }
  });
  const [keyInput, setKeyInput] = useState('');
  const [leads, setLeads] = useState([]);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [search, setSearch] = useState('');
  const [paidFilter, setPaidFilter] = useState('all');

  async function loadLeads(key) {
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch(ADMIN_LEADS_ENDPOINT, {
        headers: { 'X-Admin-Key': key },
      });

      if (response.status === 401) {
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch {
          // ignore
        }
        setAdminKey('');
        setStatus('error');
        setErrorMessage('Неверный ключ доступа.');
        return;
      }

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      setLeads(Array.isArray(data.leads) ? data.leads : []);
      setStatus('ready');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Не удалось загрузить заявки');
    }
  }

  useEffect(() => {
    if (adminKey) loadLeads(adminKey);
  }, [adminKey]);

  function handleUnlock(event) {
    event.preventDefault();
    const trimmed = keyInput.trim();
    if (!trimmed) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, trimmed);
    } catch {
      // sessionStorage may be unavailable in privacy mode; the key still works for this load.
    }
    setAdminKey(trimmed);
  }

  function handleLogout() {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setAdminKey('');
    setLeads([]);
    setStatus('idle');
  }

  const filteredLeads = useMemo(() => {
    const query = search.trim().toLowerCase();
    return leads.filter((lead) => {
      if (paidFilter === 'paid' && !lead.paid) return false;
      if (paidFilter === 'unpaid' && lead.paid) return false;
      if (!query) return true;
      return [lead.name, lead.email, lead.course_title, lead.course_id, lead.source, lead.page_url]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query));
    });
  }, [leads, search, paidFilter]);

  if (!adminKey) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center gap-4 px-4">
        <h1 className="text-lg font-semibold">Админка заявок</h1>
        <form onSubmit={handleUnlock} className="flex flex-col gap-3">
          <input
            type="password"
            value={keyInput}
            onChange={(event) => setKeyInput(event.target.value)}
            placeholder="Ключ доступа"
            className="h-11 rounded-lg border border-[#e2e2e2] px-3 text-sm outline-none focus:border-[#ffdc00]"
          />
          <button
            type="submit"
            className="h-11 rounded-full bg-[#ffdc00] text-sm font-semibold transition hover:-translate-y-0.5"
          >
            Войти
          </button>
        </form>
        {status === 'error' && <p className="text-sm text-red-600">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-lg font-semibold">Заявки ({leads.length})</h1>
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Поиск по имени, email, курсу…"
            className="h-9 w-64 rounded-lg border border-[#e2e2e2] px-3 text-sm outline-none focus:border-[#ffdc00]"
          />
          <select
            value={paidFilter}
            onChange={(event) => setPaidFilter(event.target.value)}
            className="h-9 rounded-lg border border-[#e2e2e2] px-3 text-sm outline-none focus:border-[#ffdc00]"
          >
            <option value="all">Все заявки</option>
            <option value="paid">Оплаченные</option>
            <option value="unpaid">Неоплаченные</option>
          </select>
          <button
            type="button"
            onClick={() => loadLeads(adminKey)}
            className="h-9 rounded-full border border-[#e2e2e2] px-4 text-sm font-medium hover:bg-[#f7f7f7]"
          >
            Обновить
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="h-9 rounded-full border border-[#e2e2e2] px-4 text-sm font-medium hover:bg-[#f7f7f7]"
          >
            Выйти
          </button>
        </div>
      </div>

      {status === 'loading' && <p className="text-sm text-[#888]">Загрузка…</p>}
      {status === 'error' && <p className="text-sm text-red-600">{errorMessage}</p>}

      {status === 'ready' && (
        <div className="overflow-x-auto rounded-xl border border-[#eee]">
          <table className="w-full min-w-[820px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[#f7f7f7] text-xs uppercase tracking-wide text-[#888]">
                <th className="px-3 py-2">Дата</th>
                <th className="px-3 py-2">Имя</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">Курс</th>
                <th className="px-3 py-2">Цена</th>
                <th className="px-3 py-2">Источник</th>
                <th className="px-3 py-2">Страница</th>
                <th className="px-3 py-2">Рассылка</th>
                <th className="px-3 py-2">Оплата</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => (
                <tr key={lead.id || lead.idempotency_key || index} className="border-t border-[#f0f0f0]">
                  <td className="whitespace-nowrap px-3 py-2 text-[#666]">{formatDate(lead.received_at)}</td>
                  <td className="px-3 py-2 font-medium">{lead.name || '—'}</td>
                  <td className="px-3 py-2">{lead.email || '—'}</td>
                  <td className="px-3 py-2">{lead.course_title || lead.course_id || '—'}</td>
                  <td className="px-3 py-2">{lead.price ? `${lead.price} ${lead.currency || ''}`.trim() : '—'}</td>
                  <td className="px-3 py-2">{lead.source || '—'}</td>
                  <td className="max-w-[240px] truncate px-3 py-2 text-[#888]" title={lead.page_url}>
                    {lead.page_url || '—'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-2 text-center">
                    <input type="checkbox" checked={Boolean(lead.repeat_lead)} readOnly aria-label="Оставил заявку повторно" className="h-4 w-4 accent-[#ffdc00]" />
                  </td>
                  <td className="whitespace-nowrap px-3 py-2">
                    {lead.paid ? (
                      <span
                        className="inline-flex items-center rounded-full bg-[#e7f7ec] px-2.5 py-1 text-xs font-medium text-[#1c7a3f]"
                        title={lead.paid_at ? formatDate(lead.paid_at) : undefined}
                      >
                        Оплачено
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-[#f3f3f3] px-2.5 py-1 text-xs font-medium text-[#888]">
                        Не оплачено
                      </span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredLeads.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-3 py-6 text-center text-[#888]">
                    Заявок не найдено
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
