import { SITE_URL } from '../config/site';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAppContext } from '../app/AppContext';
import { AuthorsCatalogPage } from '../pages/AuthorsCatalogPage';
import { getCourses } from '../server/content.functions';

const AUTHORS_URL = `${SITE_URL}/authors`;

export const Route = createFileRoute('/authors')({
  loader: () => getCourses(),
  head: ({ loaderData }) => {
    const authors = loaderData?.data?.authors || [];
    return {
      meta: [
        { title: 'Каталог авторов и экспертов — AskHow' },
        { name: 'description', content: 'Каталог авторов AskHow: эксперты, преподаватели и создатели практических онлайн-курсов.' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Каталог авторов и экспертов — AskHow' },
        { property: 'og:url', content: AUTHORS_URL },
      ],
      links: [{ rel: 'canonical', href: AUTHORS_URL }],
      scripts: [{
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          numberOfItems: authors.length,
          itemListElement: authors.map((author, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: author.name,
            url: `${SITE_URL}/catalog/author/${author.id}`,
          })),
        }),
      }],
    };
  },
  component: AuthorsRoute,
});

function AuthorsRoute() {
  const { data: { authors, courses } } = Route.useLoaderData();
  const { query } = useAppContext();
  const navigate = useNavigate();

  return (
    <AuthorsCatalogPage
      authors={authors}
      courses={courses}
      query={query}
      onOpenAuthor={(authorId) => navigate({ to: '/catalog/author/$authorId', params: { authorId } })}
      onOpenCourse={(courseId) => navigate({ to: '/catalog/course/$courseId', params: { courseId } })}
    />
  );
}
