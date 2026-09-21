import { useEffect, useState } from 'react';

const CONTENT_ENDPOINT = import.meta.env.VITE_CONTENT_ENDPOINT || '/mail-api/content';

// The catalogue itself is bundled with the build, but articles are edited in
// the admin panel between deploys, so they are fetched at runtime. One request
// per page load is enough: the promise is cached and shared by every component
// that asks for it.
let contentPromise = null;

export function fetchPublishedArticles() {
  if (!contentPromise) {
    contentPromise = fetch(CONTENT_ENDPOINT)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => (Array.isArray(data?.articles) ? data.articles : []))
      .catch(() => {
        // A missing or unreachable content service must never take a page
        // down: the site simply shows what is bundled with the build. Clearing
        // the cache lets the next page try again.
        contentPromise = null;
        return [];
      });
  }
  return contentPromise;
}

export function usePublishedArticles() {
  const [state, setState] = useState({ articles: [], loading: true });

  useEffect(() => {
    let active = true;
    fetchPublishedArticles().then((articles) => {
      if (active) setState({ articles, loading: false });
    });
    return () => {
      active = false;
    };
  }, []);

  return state;
}

// An article the admin panel produced, in the shape the blog pages already
// expect from the bundled data.
export function toBlogEntry(article) {
  return {
    id: article.id,
    image: article.image || '/images/home/blog-style.jpg',
    title: article.title,
    category: article.category || 'Статьи',
    tags: article.tags || '',
    excerpt: article.excerpt || '',
    author: article.authorName || 'AskHow',
    publishedAt: article.publishedAt || '',
    readTime: article.readTime || '',
    lead: article.lead || '',
    sections: Array.isArray(article.sections) ? article.sections : [],
    conclusionTitle: article.conclusionTitle || '',
    conclusion: article.conclusion || '',
    url: article.url || '',
    authorId: article.authorId,
  };
}

// An article the panel hides: it carries nothing but its id, and it also takes
// the bundled article of the same id off the site.
function isHidden(article) {
  return Boolean(article.hidden);
}

// Published articles win over a bundled entry with the same id, so an article
// can be corrected — or taken down — in the panel without a deploy.
function mergeById(bundled, published) {
  const overrides = new Map(published.map((item) => [item.id, item]));
  const merged = bundled
    .map((item) => overrides.get(item.id) || item)
    .filter((item) => !isHidden(item));
  const extra = published.filter(
    (item) => !isHidden(item) && !bundled.some((entry) => entry.id === item.id),
  );
  return [...extra, ...merged];
}

export function mergeBlogs(bundledBlogs, articles) {
  return mergeById(
    bundledBlogs,
    articles.filter((article) => isHidden(article) || article.showInBlogs).map((article) => (isHidden(article) ? article : toBlogEntry(article))),
  );
}

export function authorArticles(articles, authorId) {
  return articles
    .filter((article) => !isHidden(article) && article.authorId === authorId && article.showOnAuthor !== false)
    .map(toBlogEntry);
}

export function findPublishedArticle(articles, articleId) {
  const article = articles.find((item) => item.id === articleId);
  return article && !isHidden(article) ? toBlogEntry(article) : null;
}

// True when the panel took this article off the site — including one that came
// with the build, which is why the bundled copy cannot simply be trusted.
export function isArticleHidden(articles, articleId) {
  const article = articles.find((item) => item.id === articleId);
  return Boolean(article && isHidden(article));
}

// The reverse of toBlogEntry: an article bundled with the build, in the shape
// the admin constructor edits. It is what lets the panel show — and take over —
// the blogs that ship inside the site itself.
export function fromBlogEntry(blog, authorId) {
  return {
    id: blog.id,
    authorId,
    title: blog.title || '',
    category: blog.category || '',
    tags: blog.tags || '',
    excerpt: blog.excerpt || '',
    image: blog.image || '',
    url: blog.url || '',
    authorName: blog.author || '',
    publishedAt: blog.publishedAt || '',
    readTime: blog.readTime || '',
    lead: blog.lead || '',
    sections: (blog.sections || []).map((section) => ({
      heading: section.heading || '',
      paragraphs: [...(section.paragraphs || [])],
      items: [...(section.items || [])],
    })),
    conclusionTitle: blog.conclusionTitle || '',
    conclusion: blog.conclusion || '',
    showOnAuthor: false,
    showInBlogs: true,
    draft: false,
  };
}
