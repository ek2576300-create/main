import { notFound } from '@tanstack/react-router';
import { authors, courses } from './catalog.js';
import { reels } from './reels.js';

// The catalogue is bundled with the frontend, so route loaders can read it
// directly. This keeps the app working on static hosting where /_serverFn
// endpoints do not exist.
export function getCourses() {
  return {
    data: { authors, courses },
    meta: { total: courses.length, source: 'bundled-data' },
  };
}

export function getAuthor({ data }) {
  const authorId = String(data?.authorId || '');
  const author = authors.find((item) => item.id === authorId);

  if (!author) throw notFound();

  return {
    data: {
      author,
      courses: courses.filter((course) => course.authorId === author.id),
    },
    meta: { source: 'bundled-data' },
  };
}

export function getCourse({ data }) {
  const courseId = String(data?.courseId || '');
  const course = courses.find((item) => item.id === courseId);

  if (!course) throw notFound();

  const author = authors.find((item) => item.id === course.authorId);
  if (!author) throw notFound();

  return {
    data: { course, author },
    meta: { source: 'bundled-data' },
  };
}

export function getReels() {
  const normalized = reels.map((reel) => ({
    ...reel,
    authorId: authors.find((author) => author.name === reel.author)?.id || null,
  }));

  return {
    data: normalized,
    meta: { total: normalized.length, source: 'bundled-data' },
  };
}
