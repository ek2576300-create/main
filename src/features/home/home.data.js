import { blogs } from '../../data/blogs';
import { authors, courses } from '../../data/catalog';

const authorById = new Map(authors.map((author) => [author.id, author]));

export const homeCourses = courses.map((course) => {
  const author = authorById.get(course.authorId);
  return {
    courseId: course.id,
    image: course.cover,
    avatar: author?.avatar || course.cover,
    author: author?.name || 'AskHow',
    title: course.title,
    category: (course.tags || []).join(' '),
    description: course.description,
    duration: course.duration,
    price: course.price || 'Открыть курс',
    free: course.price === 'Бесплатно',
  };
});

export const homeBlogs = blogs;
