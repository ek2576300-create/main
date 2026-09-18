import { Link } from '@tanstack/react-router';
import { useState } from 'react';

export function AdminKeyGate({ title, errorMessage, onSubmit }) {
  const [keyInput, setKeyInput] = useState('');

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center gap-4 px-4">
      <h1 className="text-lg font-semibold">{title}</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(keyInput);
        }}
        className="flex flex-col gap-3"
      >
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
      {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}
    </div>
  );
}

const ADMIN_TABS = [
  { to: '/admin/leads', label: 'Заявки' },
  { to: '/admin/content', label: 'Статьи авторов' },
];

export function AdminNav({ current }) {
  return (
    <nav className="flex items-center gap-1 rounded-full bg-[#f3f3f3] p-1 text-sm">
      {ADMIN_TABS.map((tab) => (
        <Link
          key={tab.to}
          to={tab.to}
          className={`rounded-full px-3 py-1.5 font-medium transition ${
            current === tab.to ? 'bg-white shadow-[0_1px_4px_rgba(0,0,0,.08)]' : 'text-[#666] hover:text-black'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
