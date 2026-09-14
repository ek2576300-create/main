import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ReelsPage } from '../pages/ReelsPage';
import { getReels } from '../server/content.functions';

export const Route = createFileRoute('/reels/$reelId')({
  loader: () => getReels(),
  component: ReelsRoute,
});

function ReelsRoute() {
  const { reelId } = Route.useParams();
  const { data: reels } = Route.useLoaderData();
  const navigate = useNavigate();
  return (
    <ReelsPage
      reels={reels}
      startId={reelId}
      onRoute={(nextReelId, replace) =>
        navigate({
          to: '/reels/$reelId',
          params: { reelId: nextReelId },
          replace,
          resetScroll: false,
        })
      }
      onOpenAuthor={(authorId) =>
        navigate({ to: '/catalog/author/$authorId', params: { authorId } })
      }
    />
  );
}
