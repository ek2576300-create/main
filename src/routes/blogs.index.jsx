import { SITE_URL } from '../config/site';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAppContext } from '../app/AppContext';
import { BlogsPage } from '../pages/BlogsPage';

export const Route = createFileRoute('/blogs/')({
  head: () => ({
    meta: [
      { title: 'Каталог блогов — AskHow' },
      {
        name: 'description',
        content: 'Информационные статьи, инструкции и практические материалы AskHow.',
      },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}/blogs` }],
  }),
  component: BlogsIndexRoute,
});

function BlogsIndexRoute() {
  const navigate = useNavigate();
  const { query } = useAppContext();

  return (
    <BlogsPage
      query={query}
      onOpenBlog={(blogId) =>
        navigate({ to: '/blogs/$blogId', params: { blogId } })
      }
    />
  );
}
