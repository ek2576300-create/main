import { SITE_URL } from '../config/site';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { CoursePage } from '../pages/CoursePage';
import { getCourse } from '../server/content.functions';


export const Route = createFileRoute('/catalog/course/$courseId')({
  loader: ({ params }) => getCourse({ data: { courseId: params.courseId } }),
  head: ({ loaderData }) => {
    const payload = loaderData?.data;
    if (!payload) return {};

    const { course, author } = payload;
    const seo = course.seo;
    const courseUrl = seo.canonical;
    const authorUrl = `${SITE_URL}/catalog/author/${author.id}`;
    const offerPrice = course.price === 'Бесплатно'
      ? '0'
      : course.price?.replace(/[^0-9]/g, '') || null;

    const courseSchema = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      '@id': `${courseUrl}#course`,
      name: course.title,
      description: course.description,
      url: courseUrl,
      image: seo.image,
      inLanguage: 'ru-RU',
      courseCode: course.sourceCourseId || course.id,
      keywords: seo.keywords.join(', '),
      provider: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'AskHow',
        url: SITE_URL,
      },
      author: {
        '@type': 'Person',
        '@id': `${authorUrl}#person`,
        name: author.name,
        url: authorUrl,
        image: author.seo?.image,
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: course.duration || undefined,
      },
      sameAs: course.sourceUrl || undefined,
      offers: offerPrice
        ? {
            '@type': 'Offer',
            price: offerPrice,
            priceCurrency: 'RUB',
            availability: 'https://schema.org/InStock',
            url: course.sourceUrl || courseUrl,
          }
        : undefined,
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AskHow', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Каталог курсов', item: `${SITE_URL}/catalog/` },
        { '@type': 'ListItem', position: 3, name: course.title, item: courseUrl },
      ],
    };

    return {
      meta: [
        { title: seo.title },
        { name: 'description', content: seo.description },
        { name: 'robots', content: seo.robots },
        { name: 'keywords', content: seo.keywords.join(', ') },
        { name: 'author', content: author.name },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:title', content: seo.title },
        { property: 'og:description', content: seo.description },
        { property: 'og:image', content: seo.image },
        { property: 'og:image:alt', content: course.title },
        { property: 'og:url', content: courseUrl },
        { property: 'og:site_name', content: 'AskHow' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: seo.title },
        { name: 'twitter:description', content: seo.description },
        { name: 'twitter:image', content: seo.image },
      ],
      links: [{ rel: 'canonical', href: courseUrl }],
      scripts: [
        { type: 'application/ld+json', children: JSON.stringify(courseSchema) },
        { type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema) },
      ],
    };
  },
  component: CourseRoute,
});

function CourseRoute() {
  const {
    data: { course, author },
  } = Route.useLoaderData();
  const navigate = useNavigate();

  return (
    <CoursePage
      course={course}
      author={author}
      onOpenAuthor={(authorId) =>
        navigate({ to: '/catalog/author/$authorId', params: { authorId } })
      }
    />
  );
}
