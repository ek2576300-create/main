import { notFound, useNavigate } from '@tanstack/react-router';
import { authors, courses } from '../data/catalog';
import { AuthorPage } from '../pages/CatalogPages';

export function AuthorRoute({ authorId }) {
  const navigate = useNavigate();
  const author = authors.find((item) => item.id === authorId);

  if (!author) throw notFound();

  return (
    <AuthorPage
      author={author}
      courses={courses.filter((course) => course.authorId === author.id)}
      onOpenCourse={(courseId) =>
        navigate({ to: '/catalog/course/$courseId', params: { courseId } })
      }
      onOpenAuthor={(authorId) =>
        navigate({ to: '/catalog/author/$authorId', params: { authorId } })
      }
    />
  );
}
