import { useNavigate } from '@tanstack/react-router';
import { useAppContext } from '../app/app-context';
import { HomePage } from '../pages/HomePage';

export function HomeRoute() {
  const navigate = useNavigate();
  const { query } = useAppContext();
  return (
    <HomePage
      query={query}
      onOpenCourse={(courseId) =>
        navigate({ to: '/catalog/course/$courseId', params: { courseId } })
      }
      onOpenCatalog={() => navigate({ to: '/catalog' })}
      onOpenBlog={(blogId) =>
        navigate({ to: '/blogs/$blogId', params: { blogId } })
      }
      onOpenReels={() => navigate({ to: '/reels' })}
      onOpenBlogs={() => navigate({ to: '/blogs' })}
    />
  );
}
