import {
  Bookmark,
  MessageCircle,
  MoreHorizontal,
  Play,
  Share2,
  ThumbsUp,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SideAction } from './SideAction';

export function ReelCard({
  item,
  active,
  muted,
  setMuted,
  liked,
  toggleLike,
  saved,
  toggleSaved,
  onComments,
  onOpenAuthor,
}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      video
        .play()
        .then(() => setPlaying(true))
        .catch(() => {});
      return;
    }

    video.pause();
    setPlaying(false);
  }, [active]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) video.pause();
    else video.play().catch(() => {});
    setPlaying((value) => !value);
  };

  const share = async () => {
    const data = { title: item.title, text: item.text, url: window.location.href };
    if (navigator.share) await navigator.share(data);
    else await navigator.clipboard.writeText(data.url);
  };

  return (
    <div className="flex h-full min-w-0 items-center justify-center gap-2 min-[390px]:gap-3">
      <div
        onClick={togglePlayback}
        className="reel-video-shell relative shrink-0 overflow-hidden rounded-[12px] bg-black min-[390px]:rounded-[16px]"
      >
        <video
          ref={videoRef}
          src={item.video}
          poster={item.image}
          muted={muted}
          playsInline
          loop
          className="h-full w-full object-cover"
          onTimeUpdate={(event) => {
            const video = event.currentTarget;
            setProgress(video.duration ? video.currentTime / video.duration : 0);
          }}
        />

        {!playing && (
          <div className="absolute inset-0 grid place-items-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-black/35">
              <Play className="ml-1 fill-white text-white" />
            </span>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-3 right-3 min-[390px]:bottom-5 min-[390px]:left-4 min-[390px]:right-4 text-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label={`Открыть страницу автора ${item.author}`}
              onClick={(event) => {
                event.stopPropagation();
                if (item.authorId) onOpenAuthor?.(item.authorId);
              }}
              className={item.authorId ? 'transition hover:opacity-75' : 'cursor-default'}
            >
              <img src={item.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
            </button>
            <b className="text-[12px]">{item.handle}</b>
            <button type="button" className="rounded-full border border-white/70 px-3 py-1 text-[9px]">
              Подписаться
            </button>
          </div>
          <h2 className="mt-2 text-[15px] font-semibold min-[390px]:mt-3 min-[390px]:text-[18px]">{item.title}</h2>
          <p className="mt-1 line-clamp-2 text-[10px] leading-4 min-[390px]:text-[11px]">{item.text}</p>
          <p className="mt-2 line-clamp-1 text-[8px] opacity-80 min-[390px]:text-[9px]">{item.tags}</p>
        </div>
        <div
          className="absolute bottom-0 left-0 h-1 bg-[#f2d400]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="flex shrink-0 flex-col gap-2 self-end pb-4 min-[390px]:gap-3 min-[390px]:pb-5">
        <SideAction
          Icon={ThumbsUp}
          count={item.likes + (liked ? 1 : 0)}
          active={liked}
          onClick={() => toggleLike(item.id)}
          label="Нравится"
        />
        <SideAction
          Icon={Bookmark}
          count={item.saves + (saved ? 1 : 0)}
          active={saved}
          onClick={() => toggleSaved(item.id)}
          label="Сохранить"
        />
        <SideAction Icon={MessageCircle} count={item.comments} onClick={onComments} label="Комментарии" />
        <SideAction Icon={Share2} onClick={share} label="Поделиться" />
        <SideAction Icon={muted ? VolumeX : Volume2} onClick={() => setMuted(!muted)} label="Звук" />
        <SideAction Icon={MoreHorizontal} label="Ещё" />
      </div>
    </div>
  );
}
