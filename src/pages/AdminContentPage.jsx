import { ArrowDown, ArrowUp, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { blogs } from '../data/blogs';
import { authors } from '../data/catalog';
import { AdminKeyGate, AdminNav } from '../features/admin/admin-session';
import { useAdminKey } from '../features/admin/use-admin-key';
import { slugify } from '../features/admin/slug';
import { fromBlogEntry } from '../features/content/published-content';

const ADMIN_CONTENT_ENDPOINT = import.meta.env.VITE_ADMIN_CONTENT_ENDPOINT || '/mail-api/admin/content';

// Articles for the main page that belong to the editorial team rather than to
// one of the course authors still need an owner in the list.
const EDITORIAL = { id: 'editorial', name: 'Полезные статьи' };

// Articles that ship inside the build (the ones the blog catalogue showed
// before this panel existed) are edited here too: they are listed alongside
// the stored ones, and saving writes the edited copy over the bundled one.
const BUNDLED_IDS = new Set(blogs.map((blog) => blog.id));

function bundledSeeds(stored) {
  const known = new Set(stored.map((article) => article.id));
  return blogs.filter((blog) => !known.has(blog.id)).map((blog) => fromBlogEntry(blog, EDITORIAL.id));
}

const INPUT_CLASS =
  'w-full rounded-lg border border-[#e2e2e2] px-3 py-2 text-sm outline-none transition focus:border-[#ffdc00]';

function createArticle(author) {
  return {
    id: '',
    authorId: author.id,
    title: '',
    category: '',
    tags: '',
    excerpt: '',
    image: '',
    url: '',
    authorName: author.name,
    publishedAt: '',
    readTime: '',
    lead: '',
    sections: [{ heading: '', paragraphs: [''], items: [] }],
    conclusionTitle: '',
    conclusion: '',
    showOnAuthor: true,
    showInBlogs: false,
    draft: true,
  };
}

function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#888]">{label}</span>
      <span className="mt-1.5 block">{children}</span>
      {hint && <span className="mt-1 block text-[11px] text-[#999]">{hint}</span>}
    </label>
  );
}

function Toggle({ label, checked, onChange, hint }) {
  return (
    <label className="flex items-start gap-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-4 w-4 accent-[#ffdc00]"
      />
      <span>
        <span className="block text-sm font-medium">{label}</span>
        {hint && <span className="block text-[11px] text-[#999]">{hint}</span>}
      </span>
    </label>
  );
}

function IconButton({ title, onClick, disabled, children }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      disabled={disabled}
      className="grid h-8 w-8 place-items-center rounded-lg border border-[#e6e6e6] text-[#666] transition hover:bg-[#f7f7f7] disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function SectionEditor({ section, index, total, onChange, onMove, onRemove }) {
  const update = (patch) => onChange({ ...section, ...patch });
  const updateAt = (key, position, value) => {
    const next = [...(section[key] || [])];
    next[position] = value;
    update({ [key]: next });
  };
  const removeAt = (key, position) => update({ [key]: section[key].filter((_, i) => i !== position) });
  const append = (key, value) => update({ [key]: [...(section[key] || []), value] });

  return (
    <div className="rounded-xl border border-[#eaeaea] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-[#888]">Блок {index + 1}</span>
        <div className="flex gap-1.5">
          <IconButton title="Выше" onClick={() => onMove(index - 1)} disabled={index === 0}>
            <ArrowUp size={15} />
          </IconButton>
          <IconButton title="Ниже" onClick={() => onMove(index + 1)} disabled={index === total - 1}>
            <ArrowDown size={15} />
          </IconButton>
          <IconButton title="Удалить блок" onClick={() => onRemove(index)}>
            <Trash2 size={15} />
          </IconButton>
        </div>
      </div>

      <div className="mt-3">
        <Field label="Подзаголовок">
          <input
            value={section.heading}
            onChange={(event) => update({ heading: event.target.value })}
            placeholder="1. С чего начать"
            className={INPUT_CLASS}
          />
        </Field>
      </div>

      <div className="mt-4 space-y-2">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#888]">Абзацы</span>
        {(section.paragraphs || []).map((paragraph, position) => (
          <div key={position} className="flex items-start gap-2">
            <textarea
              value={paragraph}
              onChange={(event) => updateAt('paragraphs', position, event.target.value)}
              rows={3}
              className={INPUT_CLASS}
            />
            <IconButton title="Удалить абзац" onClick={() => removeAt('paragraphs', position)}>
              <Trash2 size={15} />
            </IconButton>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append('paragraphs', '')}
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#1683ff]"
        >
          <Plus size={14} /> Добавить абзац
        </button>
      </div>

      <div className="mt-4 space-y-2">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-[#888]">Пункты списка</span>
        {(section.items || []).map((item, position) => (
          <div key={position} className="flex items-center gap-2">
            <input
              value={item}
              onChange={(event) => updateAt('items', position, event.target.value)}
              className={INPUT_CLASS}
            />
            <IconButton title="Удалить пункт" onClick={() => removeAt('items', position)}>
              <Trash2 size={15} />
            </IconButton>
          </div>
        ))}
        <button
          type="button"
          onClick={() => append('items', '')}
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#1683ff]"
        >
          <Plus size={14} /> Добавить пункт
        </button>
      </div>
    </div>
  );
}

function ArticleEditor({ article, author, authorOptions, onChange, onRemove }) {
  const update = (patch) => onChange({ ...article, ...patch });
  const bundled = BUNDLED_IDS.has(article.id);

  // While the id is still the one derived from the title, keep deriving it —
  // as soon as it is edited by hand it stays put.
  const handleTitle = (title) => {
    const autoId = !article.id || article.id === slugify(article.title);
    update({ title, id: autoId ? slugify(title) : article.id });
  };

  const updateSection = (index, section) =>
    update({ sections: article.sections.map((item, position) => (position === index ? section : item)) });

  const moveSection = (from, to) => {
    if (to < 0 || to >= article.sections.length) return;
    const sections = [...article.sections];
    const [moved] = sections.splice(from, 1);
    sections.splice(to, 0, moved);
    update({ sections });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold">{article.title || 'Новая статья'}</h2>
        <div className="flex items-center gap-2">
          {article.id && !article.draft && (
            <a
              href={`/blogs/${article.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e2e2] px-3 py-1.5 text-[12px] font-medium hover:bg-[#f7f7f7]"
            >
              Открыть на сайте <ExternalLink size={13} />
            </a>
          )}
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#f0d2d2] px-3 py-1.5 text-[12px] font-medium text-[#c92e2e] hover:bg-[#fff6f6]"
          >
            {bundled ? 'Скрыть' : 'Удалить'} <Trash2 size={13} />
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="md:col-span-2">
          <Field label="Заголовок">
            <input value={article.title} onChange={(event) => handleTitle(event.target.value)} className={INPUT_CLASS} />
          </Field>
        </div>

        <Field label="Адрес статьи" hint={article.id ? `/blogs/${article.id}` : 'Заполняется из заголовка'}>
          <input
            value={article.id}
            onChange={(event) => update({ id: slugify(event.target.value) })}
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="Автор" hint="Чья страница показывает эту статью">
          <select
            value={article.authorId}
            onChange={(event) => {
              const next = authorOptions.find((item) => item.id === event.target.value);
              // The signature follows the author unless it was changed by hand.
              const keepName = article.authorName && article.authorName !== author.name;
              update({ authorId: next.id, authorName: keepName ? article.authorName : next.name });
            }}
            className={INPUT_CLASS}
          >
            {authorOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Автор в подписи" hint="Как подписать статью на сайте">
          <input
            value={article.authorName}
            onChange={(event) => update({ authorName: event.target.value })}
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="Категория">
          <input
            value={article.category}
            onChange={(event) => update({ category: event.target.value })}
            placeholder="Маркетинг"
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="Теги" hint="Через пробел, например: #PR #СМИ">
          <input value={article.tags} onChange={(event) => update({ tags: event.target.value })} className={INPUT_CLASS} />
        </Field>

        <Field label="Дата публикации" hint="Как показывать в статье, например: 18 сентября 2026">
          <input
            value={article.publishedAt}
            onChange={(event) => update({ publishedAt: event.target.value })}
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="Время чтения" hint="Например: 6 минут">
          <input
            value={article.readTime}
            onChange={(event) => update({ readTime: event.target.value })}
            className={INPUT_CLASS}
          />
        </Field>

        <div className="md:col-span-2">
          <Field label="Обложка" hint="Путь на сайте (/images/…) или ссылка https://">
            <input value={article.image} onChange={(event) => update({ image: event.target.value })} className={INPUT_CLASS} />
          </Field>
          {article.image && (
            <img
              src={article.image}
              alt=""
              className="mt-2 h-32 w-full max-w-[280px] rounded-lg border border-[#eee] object-cover"
            />
          )}
        </div>

        <div className="md:col-span-2">
          <Field label="Краткое описание" hint="Показывается на карточке статьи">
            <textarea
              value={article.excerpt}
              onChange={(event) => update({ excerpt: event.target.value })}
              rows={2}
              className={INPUT_CLASS}
            />
          </Field>
        </div>

        <div className="md:col-span-2">
          <Field label="Вступление">
            <textarea
              value={article.lead}
              onChange={(event) => update({ lead: event.target.value })}
              rows={3}
              className={INPUT_CLASS}
            />
          </Field>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Текст статьи</h3>
          <button
            type="button"
            onClick={() => update({ sections: [...article.sections, { heading: '', paragraphs: [''], items: [] }] })}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e2e2] px-3 py-1.5 text-[12px] font-medium hover:bg-[#f7f7f7]"
          >
            <Plus size={14} /> Добавить блок
          </button>
        </div>
        {article.sections.map((section, index) => (
          <SectionEditor
            key={index}
            section={section}
            index={index}
            total={article.sections.length}
            onChange={(next) => updateSection(index, next)}
            onMove={(to) => moveSection(index, to)}
            onRemove={(position) => update({ sections: article.sections.filter((_, i) => i !== position) })}
          />
        ))}
        {article.sections.length === 0 && (
          <p className="rounded-xl bg-[#f7f7f7] px-4 py-6 text-center text-[12px] text-[#888]">
            Пока ни одного блока. Статья может состоять только из вступления.
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Заголовок вывода" hint="По умолчанию: «Коротко о главном»">
          <input
            value={article.conclusionTitle}
            onChange={(event) => update({ conclusionTitle: event.target.value })}
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="Внешняя ссылка" hint="Если заполнить, карточка у автора ведёт туда, а не на статью">
          <input value={article.url} onChange={(event) => update({ url: event.target.value })} className={INPUT_CLASS} />
        </Field>
        <div className="md:col-span-2">
          <Field label="Вывод">
            <textarea
              value={article.conclusion}
              onChange={(event) => update({ conclusion: event.target.value })}
              rows={3}
              className={INPUT_CLASS}
            />
          </Field>
        </div>
      </div>

      <div className="grid gap-3 rounded-xl bg-[#fafafa] p-4 md:grid-cols-3">
        <Toggle
          label="Показывать у автора"
          hint="Блок «Статьи» на странице автора"
          checked={article.showOnAuthor !== false}
          onChange={(value) => update({ showOnAuthor: value })}
        />
        <Toggle
          label="Показывать в блогах"
          hint="Каталог блогов и главная страница"
          checked={Boolean(article.showInBlogs)}
          onChange={(value) => update({ showInBlogs: value })}
        />
        <Toggle
          label={bundled ? 'Скрыта с сайта' : 'Черновик'}
          hint={
            bundled
              ? 'Статья из сборки сайта: снимите галочку, чтобы вернуть её'
              : 'Пока стоит галочка, на сайте статьи нет'
          }
          checked={Boolean(article.draft)}
          onChange={(value) => update({ draft: value })}
        />
      </div>
    </div>
  );
}

export function AdminContentPage() {
  const { adminKey, saveKey, clearKey } = useAdminKey();
  const [articles, setArticles] = useState([]);
  // Which articles the service already stores — the rest still come from the
  // build and become editable copies the first time the panel saves.
  const [storedIds, setStoredIds] = useState(() => new Set());
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [savedAt, setSavedAt] = useState('');
  const [dirty, setDirty] = useState(false);
  const [authorId, setAuthorId] = useState(authors[0]?.id || EDITORIAL.id);
  const [editingIndex, setEditingIndex] = useState(null);

  const authorOptions = useMemo(() => {
    const known = [...authors.map(({ id, name }) => ({ id, name })), EDITORIAL];
    // An article whose author was removed from the catalogue would otherwise
    // become unreachable in the panel.
    const orphans = articles
      .map((article) => article.authorId)
      .filter((id) => id && !known.some((author) => author.id === id))
      .map((id) => ({ id, name: id }));
    return [...known, ...new Map(orphans.map((item) => [item.id, item])).values()];
  }, [articles]);

  const author = authorOptions.find((item) => item.id === authorId) || authorOptions[0];

  const visibleIndexes = useMemo(
    () =>
      articles
        .map((article, index) => ({ article, index }))
        .filter(({ article }) => article.authorId === author?.id),
    [articles, author?.id],
  );

  const load = useCallback(async (key) => {
    setStatus('loading');
    setErrorMessage('');
    try {
      const response = await fetch(ADMIN_CONTENT_ENDPOINT, { headers: { 'X-Admin-Key': key } });
      if (response.status === 401) {
        clearKey();
        setStatus('error');
        setErrorMessage('Неверный ключ доступа.');
        return;
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const stored = Array.isArray(data.articles) ? data.articles : [];
      setArticles([...stored, ...bundledSeeds(stored)]);
      setStoredIds(new Set(stored.map((article) => article.id)));
      setDirty(false);
      setStatus('ready');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message || 'Не удалось загрузить статьи');
    }
  }, [clearKey]);

  useEffect(() => {
    if (adminKey) load(adminKey);
  }, [adminKey, load]);

  // A reload with unsaved edits would drop them silently.
  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  function updateArticle(index, next) {
    setArticles((current) => current.map((item, position) => (position === index ? next : item)));
    setDirty(true);
  }

  function addArticle() {
    setArticles((current) => [...current, createArticle(author)]);
    setEditingIndex(articles.length);
    setDirty(true);
  }

  function removeArticle(index) {
    const article = articles[index];
    const name = article.title || article.id || 'без названия';

    // An article that ships inside the build cannot be deleted from here — the
    // next deploy would bring it back. Hiding it is what actually takes it off
    // the site, and it stays in the panel so it can be returned.
    if (BUNDLED_IDS.has(article.id)) {
      if (!window.confirm(`«${name}» входит в сборку сайта и не удаляется. Скрыть её с сайта?`)) return;
      updateArticle(index, { ...article, draft: true });
      return;
    }

    if (!window.confirm(`Удалить статью «${name}»?`)) return;
    setArticles((current) => current.filter((_, position) => position !== index));
    setEditingIndex(null);
    setDirty(true);
  }

  async function save() {
    setStatus('saving');
    setErrorMessage('');
    try {
      const response = await fetch(ADMIN_CONTENT_ENDPOINT, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Key': adminKey },
        body: JSON.stringify({ articles }),
      });
      const data = await response.json().catch(() => ({}));

      if (response.status === 401) {
        clearKey();
        setStatus('error');
        setErrorMessage('Неверный ключ доступа.');
        return;
      }
      if (!response.ok) {
        setStatus('ready');
        setErrorMessage(data.message || `Не удалось сохранить (HTTP ${response.status})`);
        return;
      }

      const stored = Array.isArray(data.articles) ? data.articles : articles;
      setArticles(stored);
      setStoredIds(new Set(stored.map((article) => article.id)));
      setDirty(false);
      setSavedAt(new Date().toLocaleTimeString('ru-RU'));
      setStatus('ready');
    } catch (error) {
      setStatus('ready');
      setErrorMessage(error.message || 'Не удалось сохранить статьи');
    }
  }

  if (!adminKey) {
    return <AdminKeyGate title="Конструктор статей" errorMessage={errorMessage} onSubmit={saveKey} />;
  }

  return (
    <div className="px-4 py-8 lg:pl-[190px]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-lg font-semibold">Статьи авторов</h1>
            <AdminNav current="/admin/content" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {dirty && <span className="text-[12px] text-[#c98a00]">Есть несохранённые изменения</span>}
            {!dirty && savedAt && <span className="text-[12px] text-[#1c7a3f]">Сохранено в {savedAt}</span>}
            <button
              type="button"
              onClick={save}
              disabled={status === 'saving' || status === 'loading'}
              className="h-9 rounded-full bg-[#ffdc00] px-5 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
            >
              {status === 'saving' ? 'Сохраняем…' : 'Сохранить'}
            </button>
            <button
              type="button"
              onClick={() => load(adminKey)}
              className="h-9 rounded-full border border-[#e2e2e2] px-4 text-sm font-medium hover:bg-[#f7f7f7]"
            >
              Обновить
            </button>
            <button
              type="button"
              onClick={clearKey}
              className="h-9 rounded-full border border-[#e2e2e2] px-4 text-sm font-medium hover:bg-[#f7f7f7]"
            >
              Выйти
            </button>
          </div>
        </div>

        {errorMessage && <p className="mb-4 rounded-lg bg-[#fff0f0] px-4 py-3 text-sm text-[#a42323]">{errorMessage}</p>}
        {status === 'loading' && <p className="text-sm text-[#888]">Загрузка…</p>}

        {status !== 'loading' && (
          <div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
            <aside className="space-y-1">
              <span className="block px-3 text-[11px] font-semibold uppercase tracking-wide text-[#888]">Авторы</span>
              {authorOptions.map((item) => {
                const count = articles.filter((article) => article.authorId === item.id).length;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setAuthorId(item.id);
                      setEditingIndex(null);
                    }}
                    className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                      item.id === author?.id ? 'bg-[#fff5a8] font-semibold' : 'hover:bg-[#f7f7f7]'
                    }`}
                  >
                    <span className="truncate">{item.name}</span>
                    <span className="shrink-0 text-[11px] text-[#999]">{count}</span>
                  </button>
                );
              })}
            </aside>

            <section className="min-w-0">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-sm font-semibold text-[#666]">
                  {author?.name}: {visibleIndexes.length} статей
                </h2>
                <button
                  type="button"
                  onClick={addArticle}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#e2e2e2] px-4 py-2 text-[12px] font-medium hover:bg-[#f7f7f7]"
                >
                  <Plus size={14} /> Новая статья
                </button>
              </div>

              <div className="space-y-2">
                {visibleIndexes.map(({ article, index }) => (
                  <div key={index} className="rounded-xl border border-[#eaeaea]">
                    <button
                      type="button"
                      onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{article.title || 'Без названия'}</span>
                        <span className="block truncate text-[11px] text-[#999]">/blogs/{article.id || '…'}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5 text-[10px]">
                        {!storedIds.has(article.id) && BUNDLED_IDS.has(article.id) && (
                          <span className="rounded-full bg-[#eaf3ff] px-2 py-1 text-[#1683ff]">Из сборки</span>
                        )}
                        {article.draft && (
                          <span className="rounded-full bg-[#f3f3f3] px-2 py-1 text-[#888]">
                            {BUNDLED_IDS.has(article.id) ? 'Скрыта' : 'Черновик'}
                          </span>
                        )}
                        {article.showInBlogs && (
                          <span className="rounded-full bg-[#e7f7ec] px-2 py-1 text-[#1c7a3f]">В блогах</span>
                        )}
                      </span>
                    </button>
                    {editingIndex === index && (
                      <div className="border-t border-[#f0f0f0] p-4">
                        <ArticleEditor
                          article={article}
                          author={author}
                          authorOptions={authorOptions}
                          onChange={(next) => updateArticle(index, next)}
                          onRemove={() => removeArticle(index)}
                        />
                      </div>
                    )}
                  </div>
                ))}

                {visibleIndexes.length === 0 && (
                  <p className="rounded-xl bg-[#f7f7f7] px-4 py-10 text-center text-[13px] text-[#888]">
                    У этого автора пока нет статей. Нажмите «Новая статья».
                  </p>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
