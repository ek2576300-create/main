import { SITE_URL } from '../config/site';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAppContext } from '../app/AppContext';
import { CatalogPage } from '../pages/CatalogPage';
import { getCourses } from '../server/content.functions';

const CATALOG_URL = `${SITE_URL}/catalog/`;
const TITLE = 'Каталог онлайн-курсов от экспертов — AskHow';
const DESCRIPTION =
  'Практические онлайн-курсы по бизнесу, карьере, продажам, финансам, PR, маркетингу и самопрезентации от экспертов AskHow.';

export const Route = createFileRoute('/catalog/')({
  loader: () => getCourses(),
  head: ({ loaderData }) => {
    const courses = loaderData?.data?.courses || [];
    const image = courses[0]?.seo?.image || `${SITE_URL}/images/authors/igor-malinin/brand-publicity-media-reputation.png`;

    const collectionSchema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${CATALOG_URL}#collection`,
      name: TITLE,
      description: DESCRIPTION,
      url: CATALOG_URL,
      inLanguage: 'ru-RU',
      isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'AskHow', url: SITE_URL },
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: courses.length,
        itemListElement: courses.map((course, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: course.seo.canonical,
          name: course.title,
          image: course.seo.image,
        })),
      },
    };

    return {
      meta: [
        { title: TITLE },
        { name: 'description', content: DESCRIPTION },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' },
        {
          name: 'keywords',
          content: 'онлайн-курсы, обучение, бизнес, карьера, продажи, маркетинг, финансы, AskHow',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:title', content: TITLE },
        { property: 'og:description', content: DESCRIPTION },
        { property: 'og:image', content: image },
        { property: 'og:url', content: CATALOG_URL },
        { property: 'og:site_name', content: 'AskHow' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: TITLE },
        { name: 'twitter:description', content: DESCRIPTION },
        { name: 'twitter:image', content: image },
      ],
      links: [{ rel: 'canonical', href: CATALOG_URL }],
      scripts: [{ type: 'application/ld+json', children: JSON.stringify(collectionSchema) }],
    };
  },
  component: CatalogRoute,
});

function CatalogRoute() {
  const {
    data: { courses, authors },
  } = Route.useLoaderData();
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
