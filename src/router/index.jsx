import { createRootRoute, createRoute, createRouter, useNavigate } from '@tanstack/react-router';
import { AppShell } from '../app/AppShell';
import { authors, courses } from '../data/catalog';
import { CoursePage } from '../pages/CoursePage';
import { Placeholder } from '../pages/Placeholder';
import { AuthorRoute } from '../routes/AuthorRoute';
import { CatalogRoute } from '../routes/CatalogRoute';
import { HomeRoute } from '../routes/HomeRoute';
import { PlaceholderRoute } from '../routes/PlaceholderRoute';
import { ReelsRoute } from '../routes/ReelsRoute';

const rootRoute = createRootRoute({
  component: AppShell,
  notFoundComponent: () => <Placeholder title="Страница не найдена" />,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomeRoute,
});

const reelsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/reels/$reelId',
  component: () => {
    const { reelId } = reelsRoute.useParams();
    return <ReelsRoute reelId={reelId} />;
  },
});

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/catalog',
  component: CatalogRoute,
});

const authorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/catalog/author/$authorId',
  component: () => {
    const { authorId } = authorRoute.useParams();
    return <AuthorRoute authorId={authorId} />;
  },
});

function LegacyCourseRoute() {
  const { courseId } = courseRoute.useParams();
  const navigate = useNavigate();
  const course = courses.find((item) => item.id === courseId);
  const author = authors.find((item) => item.id === course?.authorId);
  if (!course || !author) return <Placeholder title="Курс не найден" />;
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

const courseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/catalog/course/$courseId',
  component: LegacyCourseRoute,
});

const placeholderRoutes = [
  ['profile', 'Профиль'],
  ['favorites', 'Избранное'],
  ['purchases', 'Покупки'],
  ['settings', 'Настройки'],
  ['blogs', 'Каталог блогов'],
  ['sales', 'Инструменты продаж'],
  ['add', 'Добавить видео/курс'],
  ['about', 'О приложении'],
].map(([path, title]) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path: `/${path}`,
    component: () => <PlaceholderRoute title={title} />,
  }),
);

const routeTree = rootRoute.addChildren([
  homeRoute,
  reelsRoute,
  catalogRoute,
  authorRoute,
  courseRoute,
  ...placeholderRoutes,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
});
