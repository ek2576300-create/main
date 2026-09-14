import { useNavigate } from '@tanstack/react-router';
import { reels } from '../mocks/database';
import { ReelsPage } from '../pages/ReelsPage';

export function ReelsRoute({ reelId }) {
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
