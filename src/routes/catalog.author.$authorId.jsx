import { SITE_URL } from '../config/site';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AuthorPage } from '../pages/AuthorPage';
import { getAuthor } from '../server/content.functions';


export const Route = createFileRoute('/catalog/author/$authorId')({
  loader: ({ params }) => getAuthor({ data: { authorId: params.authorId } }),
  head: ({ loaderData }) => {
    const payload = loaderData?.data;
    if (!payload) return {};

    const { author, courses } = payload;
    const seo = author.seo;

    const personSchema = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': `${seo.canonical}#person`,
      name: author.name,
      url: seo.canonical,
      image: seo.image,
      description: author.description,
      jobTitle: author.role,
      knowsAbout: (author.tags || []).map((tag) => tag.replace(/^#/, '')),
      worksFor: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'AskHow',
        url: SITE_URL,
      },
    };

    const coursesSchema = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `Курсы автора ${author.name}`,
      numberOfItems: courses.length,
      itemListElement: courses.map((course, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: course.seo.canonical,
        name: course.title,
        image: course.seo.image,
      })),
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AskHow', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Каталог курсов', item: `${SITE_URL}/catalog/` },
        { '@type': 'ListItem', position: 3, name: author.name, item: seo.canonical },
      ],
    };

    return {
      meta: [
        { title: seo.title },
        { name: 'description', content: seo.description },
        { name: 'robots', content: seo.robots },
        { name: 'keywords', content: seo.keywords.join(', ') },
        { property: 'og:type', content: 'profile' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:title', content: seo.title },
        { property: 'og:description', content: seo.description },
        { property: 'og:image', content: seo.image },
        { property: 'og:image:alt', content: author.name },
        { property: 'og:url', content: seo.canonical },
        { property: 'og:site_name', content: 'AskHow' },
        { property: 'profile:username', content: author.name },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: seo.title },
        { name: 'twitter:description', content: seo.description },
        { name: 'twitter:image', content: seo.image },
      ],
      links: [{ rel: 'canonical', href: seo.canonical }],
      scripts: [
        { type: 'application/ld+json', children: JSON.stringify(personSchema) },
        { type: 'application/ld+json', children: JSON.stringify(coursesSchema) },
        { type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema) },
      ],
    };
  },
  component: AuthorRoute,
});

function AuthorRoute() {
  const {
    data: { author, courses },
  } = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <AuthorPage
      author={author}
      courses={courses}
      onOpenCourse={(courseId) =>
        navigate({ to: '/catalog/course/$courseId', params: { courseId } })
      }
      onOpenAuthor={(authorId) =>
        navigate({ to: '/catalog/author/$authorId', params: { authorId } })
      }
    />
  );
}
