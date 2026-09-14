import { SITE_URL } from '../config/site';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { AppShell } from '../app/AppShell';
import { Placeholder } from '../pages/Placeholder';

const DEFAULT_TITLE = 'AskHow — практические онлайн-курсы от экспертов';
const DEFAULT_DESCRIPTION =
  'Практические курсы и полезные видео по бизнесу, карьере, маркетингу, продажам и развитию профессиональных навыков.';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: DEFAULT_TITLE },
      { name: 'description', content: DEFAULT_DESCRIPTION },
      { name: 'robots', content: 'noindex, nofollow' },
      { name: 'theme-color', content: '#ffdc00' },
      { name: 'color-scheme', content: 'light' },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'ru_RU' },
      { property: 'og:title', content: DEFAULT_TITLE },
      { property: 'og:description', content: DEFAULT_DESCRIPTION },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:site_name', content: 'AskHow' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: DEFAULT_TITLE },
      { name: 'twitter:description', content: DEFAULT_DESCRIPTION },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico', type: 'image/svg+xml' },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Organization',
              '@id': `${SITE_URL}/#organization`,
              name: 'AskHow',
              url: SITE_URL,
              email: 'info@askhow.ru',
              telephone: '+7-929-734-55-00',
            },
            {
              '@type': 'WebSite',
              '@id': `${SITE_URL}/#website`,
              name: 'AskHow',
              url: SITE_URL,
              inLanguage: 'ru-RU',
              publisher: { '@id': `${SITE_URL}/#organization` },
            },
          ],
        }),
      },
    ],
  }),
  component: RootComponent,
  errorComponent: () => <Placeholder title="Не удалось загрузить страницу" />,
  notFoundComponent: () => <Placeholder title="Страница не найдена" />,
});

function RootComponent() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
