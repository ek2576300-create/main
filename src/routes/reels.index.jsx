import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/reels/')({
  beforeLoad: () => {
    throw redirect({
      to: '/reels/$reelId',
      params: { reelId: 'nature' },
      replace: true,
    });
  },
});
