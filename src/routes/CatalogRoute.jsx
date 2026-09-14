import { useNavigate } from '@tanstack/react-router';
import { useAppContext } from '../app/app-context';
import { authors, courses } from '../data/catalog';
import { CatalogPage } from '../pages/CatalogPages';

export function CatalogRoute() {
  const navigate = useNavigate();
  const { query } = useAppContext();

  return (
    <CatalogPage
      courses={courses}
      authors={authors}
      query={query}
      onOpenCourse={(courseId) =>
        navigate({ to: '/catalog/course/$courseId', params: { courseId } })
      }
      onOpenAuthor={(authorId) =>
        navigate({ to: '/catalog/author/$authorId', params: { authorId } })
      }
    />
  );
}
