import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CONTENT_FILE = process.env.CONTENT_FILE || path.join(__dirname, 'data', 'content.json');

// The admin panel sends the whole collection on every save, so the limits are
// what keeps a stray paste (or a broken client) from filling the disk.
export const CONTENT_LIMITS = {
  articles: 300,
  sections: 40,
  paragraphs: 60,
  items: 60,
  id: 90,
  short: 300,
  line: 1200,
  text: 6000,
};

class ContentError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ContentError';
  }
}

function text(value, max) {
  if (value === null || value === undefined) return '';
  if (typeof value !== 'string') throw new ContentError('Ожидалась строка');
  return value.trim().slice(0, max);
}

function list(value, max, map) {
  if (!Array.isArray(value)) return [];
  return value.slice(0, max).map(map).filter(Boolean);
}

// Ids end up in the article URL, so only the characters a slug may contain
// survive. The admin panel transliterates a Russian title before sending it;
// this is the guard, not the generator.
function slug(value) {
  return text(value, CONTENT_LIMITS.id)
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, CONTENT_LIMITS.id);
}

// Both an internal path (/blogs/…, /images/…) and an external https link are
// legitimate here; anything else (javascript:, data:) is not.
function link(value) {
  const url = text(value, CONTENT_LIMITS.line);
  if (!url) return '';
  if (url.startsWith('/') && !url.startsWith('//')) return url;
  if (/^https?:\/\//i.test(url)) return url;
  throw new ContentError(`Ссылка «${url}» должна начинаться с / или https://`);
}

function normalizeSection(raw) {
  if (!raw || typeof raw !== 'object') return null;
  const section = {
    heading: text(raw.heading, CONTENT_LIMITS.short),
    paragraphs: list(raw.paragraphs, CONTENT_LIMITS.paragraphs, (item) => text(item, CONTENT_LIMITS.text)),
    items: list(raw.items, CONTENT_LIMITS.items, (item) => text(item, CONTENT_LIMITS.line)),
  };
  if (!section.heading && !section.paragraphs.length && !section.items.length) return null;
  return section;
}

export function normalizeArticle(raw) {
  if (!raw || typeof raw !== 'object') throw new ContentError('Статья должна быть объектом');

  const id = slug(raw.id);
  const title = text(raw.title, CONTENT_LIMITS.short);
  const authorId = slug(raw.authorId);

  if (!id) throw new ContentError('У статьи должен быть идентификатор (латиница, цифры, дефис)');
  if (!title) throw new ContentError(`У статьи «${id}» должен быть заголовок`);
  if (!authorId) throw new ContentError(`У статьи «${id}» должен быть автор`);

  return {
    id,
    authorId,
    title,
    category: text(raw.category, CONTENT_LIMITS.short),
    tags: text(raw.tags, CONTENT_LIMITS.short),
    excerpt: text(raw.excerpt, CONTENT_LIMITS.line),
    image: link(raw.image),
    url: link(raw.url),
    authorName: text(raw.authorName, CONTENT_LIMITS.short),
    publishedAt: text(raw.publishedAt, CONTENT_LIMITS.short),
    readTime: text(raw.readTime, CONTENT_LIMITS.short),
    lead: text(raw.lead, CONTENT_LIMITS.text),
    sections: list(raw.sections, CONTENT_LIMITS.sections, normalizeSection),
    conclusionTitle: text(raw.conclusionTitle, CONTENT_LIMITS.short),
    conclusion: text(raw.conclusion, CONTENT_LIMITS.text),
    showOnAuthor: raw.showOnAuthor !== false,
    showInBlogs: Boolean(raw.showInBlogs),
    draft: Boolean(raw.draft),
    updated_at: new Date().toISOString(),
  };
}

export function normalizeArticles(raw) {
  if (!Array.isArray(raw)) throw new ContentError('Ожидался список статей');
  if (raw.length > CONTENT_LIMITS.articles) {
    throw new ContentError(`Слишком много статей (максимум ${CONTENT_LIMITS.articles})`);
  }

  const seen = new Set();
  return raw.map((item) => {
    const article = normalizeArticle(item);
    if (seen.has(article.id)) throw new ContentError(`Идентификатор «${article.id}» уже занят`);
    seen.add(article.id);
    return article;
  });
}

export async function readArticles() {
  try {
    const parsed = JSON.parse(await readFile(CONTENT_FILE, 'utf8'));
    return Array.isArray(parsed?.articles) ? parsed.articles : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

// One writer at a time, same as leads.json: the admin panel saves the whole
// collection, so two overlapping saves would otherwise interleave.
let writeQueue = Promise.resolve();

export function saveArticles(articles) {
  const task = writeQueue.then(async () => {
    const normalized = normalizeArticles(articles);
    await mkdir(path.dirname(CONTENT_FILE), { recursive: true });
    await writeFile(
      CONTENT_FILE,
      JSON.stringify({ updated_at: new Date().toISOString(), articles: normalized }, null, 2),
    );
    return normalized;
  });
  writeQueue = task.catch(() => {});
  return task;
}

// What the site itself may see: drafts stay in the admin panel until someone
// takes the tick off.
export function publishedArticles(articles) {
  return articles.filter((article) => !article.draft);
}

export function isContentError(error) {
  return error instanceof ContentError;
}
