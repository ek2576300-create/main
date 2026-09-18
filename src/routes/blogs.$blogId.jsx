import { SITE_URL } from '../config/site';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { getBlogById } from '../data/blogs';
import { findPublishedArticle, usePublishedArticles } from '../features/content/published-content';
import { BlogArticlePage } from '../pages/BlogArticlePage';
import { Placeholder } from '../pages/Placeholder';


export const Route = createFileRoute('/blogs/$blogId')({
  head: ({ params }) => {
    const blog = getBlogById(params.blogId);
    if (!blog) return { meta: [{ title: 'Статья не найдена — AskHow' }] };

    return {
      meta: [
        { title: `${blog.title} — AskHow` },
        { name: 'description', content: blog.excerpt },
        { property: 'og:type', content: 'article' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:title', content: blog.title },
        { property: 'og:description', content: blog.excerpt },
        { property: 'og:url', content: `${SITE_URL}/blogs/${blog.id}` },
        { property: 'og:image', content: `${SITE_URL}${blog.image}` },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      links: [{ rel: 'canonical', href: `${SITE_URL}/blogs/${blog.id}` }],
      scripts: [
        {
          type: 'application/ld+json',
          children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: blog.title,
            description: blog.excerpt,
            image: `${SITE_URL}${blog.image}`,
            author: { '@type': 'Organization', name: blog.author },
            publisher: { '@type': 'Organization', name: 'AskHow' },
            mainEntityOfPage: `${SITE_URL}/blogs/${blog.id}`,
            inLanguage: 'ru-RU',
          }),
        },
      ],
    };
  },
  component: BlogArticleRoute,
});

function BlogArticleRoute() {
  const { blogId } = Route.useParams();
  const navigate = useNavigate();
  const { articles, loading } = usePublishedArticles();

  // Bundled articles render immediately; one written in the admin panel is
  // only known once the content request comes back, so nothing is declared
  // missing until it does.
  const blog = getBlogById(blogId) || findPublishedArticle(articles, blogId);

  if (!blog) return <Placeholder title={loading ? 'Загружаем статью…' : 'Статья не найдена'} />;

  return <BlogArticlePage blog={blog} onBack={() => navigate({ to: '/blogs' })} />;
}
