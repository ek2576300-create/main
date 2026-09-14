import { useState } from 'react';
import { CommentsModal } from '../components/reels/CommentsModal';
import { ReelCard } from '../components/reels/ReelCard';
import { ReelDetails } from '../components/reels/ReelDetails';
import { useReelsCarousel } from '../features/reels/useReelsCarousel';
import { useLocalSet } from '../hooks/useLocalSet';

export function ReelsPage({ reels, startId, onRoute, onOpenAuthor }) {
  const [muted, setMuted] = useState(true);
  const [liked, toggleLike] = useLocalSet('askhow-liked');
  const [saved, toggleSaved] = useLocalSet('askhow-saved');
  const [commentsFor, setCommentsFor] = useState(null);
  const carousel = useReelsCarousel({ reels, startId, onRoute });

  return (
    <main className="overflow-hidden lg:ml-[190px]">
      <div className="mx-auto grid h-[calc(100dvh-60px)] max-w-[850px] grid-cols-1 gap-2 px-2 min-[390px]:px-3 md:h-[calc(100dvh-74px)] md:grid-cols-[minmax(0,500px)_1fr] md:gap-5">
        <div
          className="reels-viewport"
          onWheel={carousel.onWheel}
          onTouchStart={carousel.onTouchStart}
          onTouchEnd={carousel.onTouchEnd}
        >
          <div
            className={`reels-virtual-track ${carousel.animating ? 'is-moving' : ''}`}
            style={{ transform: carousel.transform }}
            onTransitionEnd={carousel.finishMove}
          >
            {carousel.visibleIndexes.map((reelIndex, slot) => {
              const reel = reels[reelIndex];
              return (
                <section key={`${reel.id}-${slot}`} className="reels-virtual-slide">
                  <ReelCard
                    item={reel}
                    active={slot === 1 && !carousel.animating}
                    muted={muted}
                    setMuted={setMuted}
                    liked={liked.has(reel.id)}
                    toggleLike={toggleLike}
                    saved={saved.has(reel.id)}
                    toggleSaved={toggleSaved}
                    onComments={() => setCommentsFor(reel)}
                    onOpenAuthor={onOpenAuthor}
                  />
                </section>
              );
            })}
          </div>
        </div>

        <ReelDetails item={carousel.current} onOpenAuthor={onOpenAuthor} />
      </div>

      {commentsFor && (
        <CommentsModal
          item={commentsFor}
          onClose={() => setCommentsFor(null)}
          onOpenAuthor={onOpenAuthor}
        />
      )}
    </main>
  );
}
