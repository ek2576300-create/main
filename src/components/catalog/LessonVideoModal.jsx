import { X } from 'lucide-react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

export function LessonVideoModal({ lesson, onClose, onPlay, onEnded }) {
  useEffect(() => {
    if (!lesson) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lesson, onClose]);

  if (!lesson) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] grid place-items-center overflow-y-auto bg-black/75 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Видео: ${lesson.title}`}
    >
      <div className="flex max-h-[calc(100dvh-24px)] w-full max-w-[1040px] flex-col overflow-hidden rounded-[18px] bg-[#111] shadow-[0_24px_80px_rgba(0,0,0,.55)] sm:max-h-[calc(100dvh-48px)]">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-white sm:px-5">
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold sm:text-[15px]">{lesson.title}</p>
            <p className="mt-0.5 text-[10px] text-white/55">{lesson.duration}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            aria-label="Закрыть видео"
          >
            <X size={19} />
          </button>
        </div>

        <div className="aspect-video max-h-[calc(100dvh-86px)] w-full shrink bg-black sm:max-h-[calc(100dvh-110px)]">
          <video
            key={lesson.video}
            src={lesson.video}
            poster={lesson.poster || lesson.image}
            className="h-full w-full object-contain"
            controls
            autoPlay
            playsInline
            preload="metadata"
            onPlay={onPlay}
            onEnded={onEnded}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}
