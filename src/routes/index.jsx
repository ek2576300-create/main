import { SITE_URL } from '../config/site';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAppContext } from '../app/AppContext';
import { HomePage } from '../pages/HomePage';

const TITLE = 'AskHow — микрокурсы и полезные материалы от экспертов';
const DESCRIPTION =
  'Выбирайте практические микрокурсы, читайте полезные материалы и смотрите короткие видео экспертов AskHow.';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { name: 'robots', content: 'index, follow, max-image-preview:large' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'ru_RU' },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:site_name', content: 'AskHow' },
      { property: 'og:image', content: `${SITE_URL}/images/home/hero-paradise.jpg` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: TITLE },
      { name: 'twitter:description', content: DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: SITE_URL }],
  }),
  component: HomeRoute,
});

function HomeRoute() {
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
