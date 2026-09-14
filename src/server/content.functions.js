import { notFound } from '@tanstack/react-router';
import { authors, courses } from '../data/catalog.js';
import { reels } from '../data/reels.js';

export function getAuthors() {
  return { data: authors, meta: { total: authors.length, source: 'bundled-data' } };
}

export function getCourses() {
  return {
    data: { authors, courses },
    meta: { total: courses.length, source: 'bundled-data' },
  };
}

export function getAuthor({ data }) {
  const author = authors.find((item) => item.id === String(data?.authorId || ''));
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
  const course = courses.find((item) => item.id === String(data?.courseId || ''));
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
