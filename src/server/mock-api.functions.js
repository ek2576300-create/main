import { notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';

const API_DELAY_MS = 120;

async function waitForMockApi() {
  await new Promise((resolve) => setTimeout(resolve, API_DELAY_MS));
}

async function loadCatalogDatabase() {
  const database = await import('../mocks/catalog-database');
  await waitForMockApi();
  return database;
}

async function loadReelsDatabase() {
  const database = await import('../mocks/database');
  await waitForMockApi();
  return database;
}

export const getAuthors = createServerFn({ method: 'GET' }).handler(async () => {
  const { authors } = await loadCatalogDatabase();
  return { data: authors, meta: { total: authors.length, source: 'mock-api' } };
});

export const getCourses = createServerFn({ method: 'GET' }).handler(async () => {
  const { authors, courses } = await loadCatalogDatabase();
  return { data: { authors, courses }, meta: { total: courses.length, source: 'mock-api' } };
});

export const getAuthor = createServerFn({ method: 'GET' })
  .validator((data) => ({ authorId: String(data.authorId) }))
  .handler(async ({ data }) => {
    const { authors, courses } = await loadCatalogDatabase();
    const author = authors.find((item) => item.id === data.authorId);
    if (!author) throw notFound();
    const authorCourses = courses.filter((course) => course.authorId === author.id);
    return { data: { author, courses: authorCourses }, meta: { source: 'mock-api' } };
  });

export const getCourse = createServerFn({ method: 'GET' })
  .validator((data) => ({ courseId: String(data.courseId) }))
  .handler(async ({ data }) => {
    const { authors, courses } = await loadCatalogDatabase();
    const course = courses.find((item) => item.id === data.courseId);
    if (!course) throw notFound();
    const author = authors.find((item) => item.id === course.authorId);
    if (!author) throw notFound();
    return { data: { course, author }, meta: { source: 'mock-api' } };
  });

export const getReels = createServerFn({ method: 'GET' }).handler(async () => {
  const [{ reels }, { authors }] = await Promise.all([loadReelsDatabase(), loadCatalogDatabase()]);
  const normalized = reels.map((reel) => ({
    ...reel,
    authorId: authors.find((author) => author.name === reel.author)?.id || null,
  }));
  return { data: normalized, meta: { total: normalized.length, source: 'mock-api' } };
});
