import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock3,
  FileSpreadsheet,
  FileText,
  Lock,
  Pause,
  Play,
  Video,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppContext } from '../app/AppContext';
import { AuthorButton } from '../components/catalog/AuthorButton';
import { LessonCard } from '../components/catalog/LessonCard';
import { PurchaseCta } from '../components/catalog/PurchaseCta';
import { PaymentModal } from '../components/payment/PaymentModal';
import { trackEvent } from '../utils/analytics';
import { getPaymentLabel, hasCourseLead, isCourseUnlocked, isFreeTeaser } from '../utils/payment';

const METRIC_STYLES = [
  { bg: 'bg-[#edf7ff]', iconBg: 'bg-[#16a7ff]', text: 'text-[#168fff]', icon: Clock3, label: 'Длительность' },
  { bg: 'bg-[#f7edff]', iconBg: 'bg-[#9028ed]', text: 'text-[#a43af5]', icon: BookOpen, label: 'Уроки' },
];

function Metric({ index, value }) {
  const visual = METRIC_STYLES[index];
  const Icon = visual.icon;
  return (
    <div className={`flex min-w-0 items-center gap-3 rounded-[10px] px-3 py-2.5 ${visual.bg}`}>
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-white ${visual.iconBg}`}><Icon size={15} /></span>
      <span className="min-w-0">
        <b className={`block truncate text-[13px] leading-tight ${visual.text}`}>{value}</b>
        <span className="mt-0.5 block text-[8px] text-[#999]">{visual.label}</span>
      </span>
    </div>
  );
}

function PreviewPoster({ course, lesson, onOpen }) {
  const poster = lesson?.image || lesson?.poster || course.cover;
  return (
    <button type="button" onClick={onOpen} className="group relative aspect-[9/14] w-full overflow-hidden rounded-[15px] bg-[#e8e8e8] text-left shadow-[0_12px_35px_rgba(0,0,0,.08)]" aria-label={`Перейти к preview курса «${course.title}»`}>
      <img src={poster} alt={course.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.015]" />
      <span className="absolute inset-0 bg-black/20" />
    </button>
  );
}

function InlineLessonVideo({ lesson, onPlay, onEnded, guardPlay, onNext, hasNext, unlocked }) {
  const videoRef = useRef(null);
  const draggingRef = useRef(false);
  // Some mobile browsers defer fetching even `preload="metadata"`, so
  // `video.duration` can still be NaN when someone drags the seek bar.
  // Remember the requested position and apply it once metadata arrives.
  const pendingSeekRef = useRef(null);
  const blobUrlRef = useRef(null);
  const rangeFallbackRef = useRef(false);
  const seekCheckRef = useRef({ timer: null, target: 0, ratio: 0 });
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Reset per-lesson playback state when the player switches lessons.
  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    pendingSeekRef.current = null;
    rangeFallbackRef.current = false;
    const seekCheck = seekCheckRef.current;
    return () => {
      window.clearTimeout(seekCheck.timer);
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    };
  }, [lesson.video]);

  // A server that answers video requests with 200 instead of 206 makes the
  // clip unseekable: the browser silently snaps currentTime back to zero, so
  // the bar looks broken and the lesson restarts. Downloading the file once
  // and playing it from a blob URL restores seeking whatever the host does.
  const loadSeekableCopy = async (ratio) => {
    const video = videoRef.current;
    if (!video || !lesson.video) return;
    const wasPlaying = !video.paused;
    try {
      const response = await fetch(lesson.video);
      if (!response.ok) return;
      const url = URL.createObjectURL(await response.blob());
      blobUrlRef.current = url;
      video.addEventListener(
        'loadedmetadata',
        () => {
          const { duration } = video;
          if (Number.isFinite(duration) && duration > 0) {
            video.currentTime = Math.min(ratio * duration, Math.max(duration - 0.25, 0));
          }
          if (wasPlaying) video.play().catch(() => {});
        },
        { once: true },
      );
      video.src = url;
      video.load();
    } catch {
      // Offline or blocked by CORS — keep the streamed source as it was.
    }
  };

  const seekTo = (ratio) => {
    const video = videoRef.current;
    if (!video) return;
    const { duration } = video;
    if (!Number.isFinite(duration) || duration <= 0) {
      pendingSeekRef.current = ratio;
      return;
    }
    pendingSeekRef.current = null;
    // Stay clear of the very end, otherwise dragging to the right edge fires
    // `ended` immediately and the lesson looks like it jumped back to zero.
    const target = Math.min(ratio * duration, Math.max(duration - 0.25, 0));
    video.currentTime = target;

    // Verify only the final position of a drag: checking every intermediate
    // step would mistake "the visitor kept dragging" for "the seek failed".
    if (rangeFallbackRef.current) return;
    const check = seekCheckRef.current;
    check.target = target;
    check.ratio = ratio;
    window.clearTimeout(check.timer);
    check.timer = window.setTimeout(() => {
      const current = videoRef.current;
      if (!current || rangeFallbackRef.current || draggingRef.current) return;
      if (Math.abs(current.currentTime - check.target) < 1.5) return;
      rangeFallbackRef.current = true;
      loadSeekableCopy(check.ratio);
    }, 700);
  };

  const startVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    guardPlay(() => video.play().catch(() => {}));
  };

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) guardPlay(() => video.play().catch(() => {}));
    else video.pause();
  };

  return (
    <article className="group relative aspect-[512/1000] w-full overflow-hidden rounded-[26px] bg-[#1b1b1b] shadow-[0_18px_48px_rgba(0,0,0,.16)]">
      <style>{`
        .askhow-video-progress {
          -webkit-touch-callout: none;
        }
        .askhow-video-progress::-webkit-slider-runnable-track {
          height: 5px;
          border-radius: 9999px;
          background: linear-gradient(to right, #fff 0 var(--video-progress), rgba(255,255,255,.35) var(--video-progress) 100%);
        }
        .askhow-video-progress::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          margin-top: -5.5px;
          border: 0;
          border-radius: 9999px;
          background: #fff;
          box-shadow: 0 1px 6px rgba(0,0,0,.35);
        }
        .askhow-video-progress:active::-webkit-slider-thumb { transform: scale(1.15); }
        .askhow-video-progress::-moz-range-track {
          height: 5px;
          border-radius: 9999px;
          background: rgba(255,255,255,.35);
        }
        .askhow-video-progress::-moz-range-progress {
          height: 5px;
          border-radius: 9999px;
          background: #fff;
        }
        .askhow-video-progress::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border: 0;
          border-radius: 9999px;
          background: #fff;
          box-shadow: 0 1px 6px rgba(0,0,0,.35);
        }
      `}</style>
      <video
        ref={videoRef}
        key={lesson.video}
        src={lesson.video}
        poster={lesson.image || lesson.poster}
        className="absolute inset-0 h-full w-full object-cover"
        playsInline
        preload="metadata"
        onClick={toggleVideo}
        onPlay={() => {
          setPlaying(true);
          onPlay();
        }}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={() => {
          if (pendingSeekRef.current == null) return;
          seekTo(pendingSeekRef.current);
        }}
        onTimeUpdate={(event) => {
          const video = event.currentTarget;
          // While the visitor drags — or while the element is still settling on
          // a seek — the bar must keep showing where they put it. Writing the
          // element's own (stale) time back here is what used to yank the
          // slider, and with it the playhead, back to the start.
          if (draggingRef.current || video.seeking) return;
          const { currentTime, duration } = video;
          if (!Number.isFinite(duration) || duration <= 0) return;
          setProgress(Math.min(currentTime / duration, 1));
        }}
        onEnded={() => {
          setPlaying(false);
          setProgress(1);
          onEnded();
        }}
      />

      {!playing && <span className="pointer-events-none absolute inset-0 bg-black/30" />}
      {!playing && <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-black/80 via-black/38 to-transparent" />}

      <div className="absolute left-[4.2%] right-[4.2%] top-[7.9%] z-30">
        <input
          type="range"
          min="0"
          max="1000"
          step="1"
          value={Math.round(progress * 1000)}
          onPointerDown={(event) => {
            event.stopPropagation();
            draggingRef.current = true;
            // Keep receiving the move/up events even if the finger slides off
            // the bar, so the drag never ends half-way in an unknown state.
            event.currentTarget.setPointerCapture?.(event.pointerId);
          }}
          onPointerUp={() => { draggingRef.current = false; }}
          onPointerCancel={() => { draggingRef.current = false; }}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => {
            const nextProgress = Number(event.currentTarget.value) / 1000;
            setProgress(nextProgress);
            seekTo(nextProgress);
          }}
          aria-label="Прогресс просмотра видео"
          className="askhow-video-progress h-[26px] w-full cursor-pointer touch-none select-none appearance-none bg-transparent"
          style={{ '--video-progress': `${progress * 100}%` }}
        />
      </div>

      <span className="pointer-events-none absolute left-[4.2%] top-[2.4%] z-20 rounded-[5px] bg-[#22c55e] px-3 py-1.5 text-[12px] font-medium leading-none text-white sm:text-[13px]">Бесплатно</span>

      {unlocked && hasNext && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          className="absolute right-[4.2%] top-[2.4%] z-40 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-[#181818] shadow-[0_6px_18px_rgba(0,0,0,.25)] backdrop-blur transition hover:bg-white sm:text-[11px]"
        >
          Смотреть следующий урок
          <ChevronRight size={13} />
        </button>
      )}

      {!playing && (
        <button
          type="button"
          onClick={toggleVideo}
          className="absolute left-1/2 top-[50.5%] z-20 grid h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-white/5 text-white backdrop-blur-[1px] transition hover:bg-white/10 active:scale-95"
          aria-label="Воспроизвести урок"
        >
          <Play size={24} className="ml-1 fill-current" />
        </button>
      )}

      {playing && (
        <button
          type="button"
          onClick={toggleVideo}
          className="absolute left-1/2 top-1/2 z-20 grid h-[58px] w-[58px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-black/25 text-white opacity-0 backdrop-blur-[1px] transition duration-200 group-hover:opacity-100 active:scale-95"
          aria-label="Поставить на паузу"
        >
          <Pause size={24} className="fill-current" />
        </button>
      )}

      {!playing && (
        <div className="absolute inset-x-[8.4%] bottom-[4.5%] z-20 text-white">
          <h3 className="text-[18px] font-semibold leading-[1.22] tracking-[-.01em] sm:text-[20px]">{lesson.title}</h3>
          {lesson.subtitle && <p className="mt-3 line-clamp-3 text-[12px] leading-[1.48] text-white/95 sm:text-[13px]">{lesson.subtitle}</p>}
          <button
            type="button"
            onClick={startVideo}
            className="mt-7 min-h-[58px] w-full rounded-full bg-[#ffdc00] px-6 text-[17px] font-medium text-[#181818] shadow-[0_10px_28px_rgba(0,0,0,.18)] transition hover:brightness-[.98] active:scale-[.99] sm:min-h-[62px] sm:text-[18px]"
          >
            Начать
          </button>
        </div>
      )}
    </article>
  );
}

// An unlocked free lesson whose video file has not been uploaded yet: show the
// lesson itself instead of bouncing the visitor back into the lead form.
function LessonComingSoon({ lesson, onNext, hasNext }) {
  return (
    <article className="relative aspect-[512/1000] w-full overflow-hidden rounded-[26px] bg-[#1b1b1b] shadow-[0_18px_48px_rgba(0,0,0,.16)]">
      <img src={lesson.image || lesson.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
      <span className="pointer-events-none absolute inset-0 bg-black/45" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      <span className="pointer-events-none absolute left-[4.2%] top-[2.4%] z-20 rounded-[5px] bg-[#22c55e] px-3 py-1.5 text-[12px] font-medium leading-none text-white sm:text-[13px]">Открыт</span>

      {hasNext && (
        <button
          type="button"
          onClick={onNext}
          className="absolute right-[4.2%] top-[2.4%] z-40 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold text-[#181818] shadow-[0_6px_18px_rgba(0,0,0,.25)] backdrop-blur transition hover:bg-white sm:text-[11px]"
        >
          Смотреть следующий урок
          <ChevronRight size={13} />
        </button>
      )}

      <div className="absolute inset-x-[8.4%] bottom-[4.5%] z-20 text-white">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-medium backdrop-blur">
          <Clock3 size={13} /> Видео скоро появится
        </span>
        <h3 className="mt-4 text-[18px] font-semibold leading-[1.22] tracking-[-.01em] sm:text-[20px]">{lesson.title}</h3>
        {lesson.subtitle && <p className="mt-3 line-clamp-3 text-[12px] leading-[1.48] text-white/95 sm:text-[13px]">{lesson.subtitle}</p>}
      </div>
    </article>
  );
}

const MATERIAL_TABS = [
  {
    type: 'pdf',
    label: 'PDF',
    icon: FileText,
    color: 'bg-[#fff0ef] text-[#dc3d35]',
    title: 'Материалы курса — PDF',
    url: '/materials/askhow-material.pdf',
  },
  {
    type: 'excel',
    label: 'Excel',
    icon: FileSpreadsheet,
    color: 'bg-[#eaf8ef] text-[#27814b]',
    title: 'Материалы курса — Excel',
    url: '/materials/askhow-material.xlsx',
  },
  {
    type: 'video',
    label: 'Видео',
    icon: Video,
    color: 'bg-[#fff4e8] text-[#b96b1d]',
    title: 'Материалы курса — Видео',
    url: '/videos/1.mp4',
  },
];

function MaterialPreviewModal({ material, onClose }) {
  useEffect(() => {
    if (!material) return undefined;
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
  }, [material, onClose]);

  if (!material) return null;
  return createPortal(
    <div className="modal-backdrop-enter fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-black/55 p-0 backdrop-blur-[2px] sm:items-center sm:px-4 sm:py-8" role="dialog" aria-modal="true" aria-labelledby="material-modal-title">
      <button type="button" className="absolute inset-0 h-full w-full cursor-default" onClick={onClose} aria-label="Закрыть материал" />
      <section className="modal-panel-enter modal-safe-panel relative z-10 max-h-[94dvh] w-full max-w-[640px] overflow-y-auto rounded-t-[24px] bg-white p-4 shadow-[0_28px_90px_rgba(0,0,0,.28)] min-[390px]:p-5 sm:rounded-[24px] sm:p-6">
        <button type="button" onClick={onClose} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-[#f4f4f4] transition hover:bg-[#e9e9e9] min-[390px]:right-4 min-[390px]:top-4" aria-label="Закрыть"><X size={19} /></button>
        <h3 id="material-modal-title" className="max-w-[440px] pr-8 text-[18px] font-semibold leading-[1.2] min-[390px]:text-[21px]">{material.title}</h3>

        {material.type === 'video' && (
          <video src={material.url} controls playsInline className="mt-5 aspect-video w-full rounded-[16px] bg-black" />
        )}

        {material.type === 'pdf' && (
          <>
            <iframe src={material.url} title={material.title} className="mt-5 h-[60vh] w-full rounded-[16px] border border-[#e5e5e5]" />
            <a href={material.url} target="_blank" rel="noopener noreferrer" className="pay-button-motion mt-4 flex min-h-11 w-full items-center justify-center rounded-full bg-[#ffdc00] px-6 text-[12px] font-semibold">Открыть PDF в новой вкладке</a>
          </>
        )}

        {material.type === 'excel' && (
          <div className="mt-5 flex flex-col items-center gap-4 rounded-[16px] bg-[#f7f7f7] px-6 py-12 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-[14px] bg-[#eaf8ef] text-[#27814b]"><FileSpreadsheet size={26} /></span>
            <p className="text-[11px] leading-[1.5] text-[#666]">Excel-таблицу нельзя открыть прямо в браузере — скачайте файл, чтобы посмотреть его.</p>
            <a href={material.url} download className="pay-button-motion flex min-h-11 w-full max-w-[280px] items-center justify-center rounded-full bg-[#ffdc00] px-6 text-[12px] font-semibold">Скачать Excel</a>
          </div>
        )}
      </section>
    </div>,
    document.body,
  );
}

// Materials are the reward for leaving contact details: until the form is
// filled the cards are visible but closed, and clicking one opens the form.
function MaterialsSection({ unlocked, onUnlock }) {
  const [activeMaterial, setActiveMaterial] = useState(null);
  return (
    <section className="mt-12 sm:mt-16">
      <h2 className="text-[31px] font-semibold tracking-[-.035em] sm:text-[38px]">Материалы курса</h2>
      <p className="mt-3 text-[12px] leading-[1.5] text-[#777]">
        {unlocked
          ? 'Материалы открыты — можно смотреть и скачивать.'
          : 'Заполните короткую форму, и материалы откроются на этой странице.'}
      </p>
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {MATERIAL_TABS.map((tab) => (
          <button
            key={tab.type}
            type="button"
            onClick={() => (unlocked ? setActiveMaterial(tab) : onUnlock())}
            className={`motion-card flex items-center gap-3 rounded-[15px] border px-5 py-4 text-left shadow-[0_8px_28px_rgba(0,0,0,.04)] transition ${unlocked ? 'border-[#e9e9e9] bg-white hover:border-[#d8d8d8]' : 'border-[#ececec] bg-[#fafafa] hover:border-[#dcdcdc]'}`}
          >
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[12px] ${unlocked ? tab.color : 'bg-[#f0f0f0] text-[#9a9a9a]'}`}>
              {unlocked ? <tab.icon size={20} /> : <Lock size={18} />}
            </span>
            <span className="min-w-0">
              <strong className="block text-[13px] font-semibold">{tab.label}</strong>
              <span className="mt-0.5 block text-[9px] text-[#888]">
                {unlocked ? 'Открыть материал' : 'Откроется после формы'}
              </span>
            </span>
          </button>
        ))}
      </div>
      <MaterialPreviewModal material={unlocked ? activeMaterial : null} onClose={() => setActiveMaterial(null)} />
    </section>
  );
}

function PaymentFailedModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
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
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div className="modal-backdrop-enter fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-black/55 p-0 backdrop-blur-[2px] sm:items-center sm:px-4 sm:py-8" role="dialog" aria-modal="true" aria-labelledby="payment-failed-title">
      <button type="button" className="absolute inset-0 h-full w-full cursor-default" onClick={onClose} aria-label="Закрыть" />
      <section className="modal-panel-enter modal-safe-panel relative z-10 w-full max-w-[440px] rounded-t-[24px] bg-white p-6 text-center shadow-[0_28px_90px_rgba(0,0,0,.28)] min-[390px]:p-7 sm:rounded-[24px]">
        <button type="button" onClick={onClose} className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-[#f4f4f4] transition hover:bg-[#e9e9e9] min-[390px]:right-4 min-[390px]:top-4" aria-label="Закрыть"><X size={19} /></button>
        <h2 id="payment-failed-title" className="mt-4 text-[22px] font-semibold leading-[1.2] sm:text-[25px]">Оплата не прошла</h2>
        <p className="mt-3 text-[11px] leading-[1.5] text-[#666]">Деньги не списаны или платёж был отменён. Попробуйте оплатить ещё раз.</p>
      </section>
    </div>,
    document.body,
  );
}

function UpdatesSection({ updates = [] }) {
  return (
    <section className="mt-12 sm:mt-16" style={{ display: 'none' }}>
      <h2 className="text-[31px] font-semibold tracking-[-.035em] sm:text-[38px]">Обновления</h2>
      <p className="mt-1 text-[9px] text-[#999]">{updates.length ? `${updates.length} изменений` : 'Новых обновлений пока нет'}</p>
      <div className="mt-7 border-l border-[#dedede] pl-5">
        {updates.length ? updates.map((update) => (
          <article key={update.id} className="relative mb-3 rounded-[13px] border border-[#e9e9e9] bg-white px-5 py-4 shadow-[0_3px_12px_rgba(0,0,0,.025)]">
            <span className="absolute -left-[25px] top-6 h-2.5 w-2.5 rounded-full bg-[#2b68ff] ring-4 ring-white" />
            <span className="rounded-full bg-[#eaf1ff] px-2 py-1 text-[8px] font-semibold text-[#2b68ff]">{update.type || 'Обновление'}</span>
            <h3 className="mt-3 text-[12px] font-semibold">{update.title}</h3>
            {update.description && <p className="mt-2 text-[9px] leading-[1.5] text-[#777]">{update.description}</p>}
          </article>
        )) : (
          <div className="relative rounded-[13px] border border-[#e9e9e9] bg-[#fafafa] px-5 py-5 text-[10px] text-[#888]">
            <span className="absolute -left-[25px] top-6 h-2.5 w-2.5 rounded-full bg-[#d2d2d2] ring-4 ring-white" />
            Здесь будут появляться новые уроки и материалы курса.
          </div>
        )}
      </div>
    </section>
  );
}

export function CoursePage({ course, author, onOpenAuthor }) {
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [paymentGate, setPaymentGate] = useState(null);
  const [purchaseCtaOpen, setPurchaseCtaOpen] = useState(false);
  const [lessonsExpanded, setLessonsExpanded] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(() => isCourseUnlocked(course.id));
  const [materialsUnlocked, setMaterialsUnlocked] = useState(
    () => hasCourseLead(course.id) || isCourseUnlocked(course.id),
  );
  const [activeLessonId, setActiveLessonId] = useState(null);
  const [paymentFailedOpen, setPaymentFailedOpen] = useState(false);
  const programRef = useRef(null);
  const viewedCourseRef = useRef(null);
  const previewStartedRef = useRef(null);
  const isFreeCourse = course.price === 'Бесплатно';
  const lessons = course.lessons || [];
  const previewLesson = lessons.find((lesson) => lesson.featured) || lessons[0] || null;
  const activeLesson = lessons.find((lesson) => lesson.id === activeLessonId) || previewLesson;
  const activeLessonIndex = activeLesson ? lessons.findIndex((lesson) => lesson.id === activeLesson.id) : -1;
  const nextLesson = activeLessonIndex >= 0 ? lessons[activeLessonIndex + 1] || null : null;
  const visibleLessons = lessonsExpanded ? lessons : lessons.slice(0, 6);
  const { setCourseCta } = useAppContext();

  useEffect(() => {
    setPaymentOpen(false);
    setPaymentGate(null);
    setPurchaseCtaOpen(false);
    setLessonsExpanded(false);
    setLeadCaptured(isCourseUnlocked(course.id));
    setMaterialsUnlocked(hasCourseLead(course.id) || isCourseUnlocked(course.id));
    setActiveLessonId(null);
    previewStartedRef.current = null;
    if (viewedCourseRef.current === course.id) return;
    viewedCourseRef.current = course.id;
    trackEvent('course_open', { course_id: course.id, course_title: course.title, course_price: course.price || null });
  }, [course.id, course.price, course.title]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('payment') !== 'failed') return;
    setPaymentOpen(false);
    setPaymentGate(null);
    setPaymentFailedOpen(true);
    trackEvent('payment_failed_view', { course_id: course.id, course_title: course.title });
    params.delete('payment');
    const nextSearch = params.toString();
    window.history.replaceState(null, '', `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}`);
  }, [course.id, course.title]);

  const openPayment = (source) => {
    setPurchaseCtaOpen(false);
    setPaymentGate(null);
    setPaymentOpen(true);
    trackEvent('buy_click', { course_id: course.id, course_title: course.title, course_price: course.price || null, source });
  };

  const requestVideoAccess = (source, action) => {
    if (leadCaptured) {
      action();
      return;
    }
    setPurchaseCtaOpen(false);
    setPaymentGate({
      onAccessGranted: () => {
        setLeadCaptured(true);
        setPaymentOpen(false);
        setPaymentGate(null);
        action();
      },
    });
    setPaymentOpen(true);
    trackEvent('video_access_form_open', { course_id: course.id, course_title: course.title, source });
  };

  const openFreeAccess = (source) => {
    if (isFreeCourse && leadCaptured) {
      setPurchaseCtaOpen(false);
      setPaymentGate({
        resubscribe: true,
        onAccessGranted: () => {
          setPaymentOpen(false);
          setPaymentGate(null);
        },
      });
      setPaymentOpen(true);
      trackEvent('newsletter_form_open', { course_id: course.id, course_title: course.title, source });
      return;
    }
    requestVideoAccess(source, () => {});
  };

  const openPreview = () => {
    window.requestAnimationFrame(() => programRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const showLessonInPlayer = (lesson) => {
    setActiveLessonId(lesson.id);
    if (lesson.url && !lesson.video) window.open(lesson.url, '_blank', 'noopener,noreferrer');
    else openPreview();
  };

  const openLesson = (lesson) => {
    // A free course is free: the lead form is the only gate, and once it has
    // been filled in every lesson opens straight in the player — including
    // lessons whose video file is not uploaded yet.
    if (isFreeCourse || lesson.free) {
      requestVideoAccess('lesson_video', () => showLessonInPlayer(lesson));
      return;
    }
    openPayment('locked_lesson_video');
    trackEvent('locked_lesson_click', { course_id: course.id, lesson_id: lesson.id });
  };

  const goToNextLesson = () => {
    if (!nextLesson) return;
    // The lesson is already unlocked (this button only shows once it is), so
    // this just switches the player — never the lead/payment form.
    trackEvent('next_lesson_click', { course_id: course.id, lesson_id: nextLesson.id });
    showLessonInPlayer(nextLesson);
  };

  const handlePreviewPlay = () => {
    if (!activeLesson || previewStartedRef.current === activeLesson.id) return;
    previewStartedRef.current = activeLesson.id;
    trackEvent('preview_start', { course_id: course.id, lesson_id: activeLesson.id });
  };

  const handlePreviewEnded = () => {
    if (!activeLesson) return;
    trackEvent('preview_complete', { course_id: course.id, lesson_id: activeLesson.id });
    // Someone who already opened the free course does not need a "get full
    // access" prompt after every lesson.
    if (isFreeCourse && leadCaptured) return;
    setPurchaseCtaOpen(true);
  };

  // The site footer is rendered once by AppShell for every page, so the
  // course page publishes its own CTA into shared context instead of the
  // footer hard-coding a course-agnostic button.
  useEffect(() => {
    setCourseCta({
      label: getPaymentLabel(course, false, leadCaptured),
      teaser: isFreeTeaser(course, leadCaptured),
      onClick: () => (isFreeCourse ? openFreeAccess('site_footer') : openPayment('site_footer')),
    });
    return () => setCourseCta(null);
  }, [course.id, course.price, course.title, isFreeCourse, leadCaptured, setCourseCta]);

  return (
    <main className="px-3 pb-12 min-[380px]:px-4 sm:px-5 lg:ml-[190px] lg:px-[28px]">
      <div className="mx-auto max-w-[1050px] pt-2">
        <section className="grid items-start gap-6 md:grid-cols-[250px_minmax(0,1fr)] md:gap-8 lg:grid-cols-[270px_minmax(0,1fr)] lg:gap-10">
          <PreviewPoster course={course} lesson={previewLesson} onOpen={openPreview} />
          <div className="min-w-0 py-1">
            <h1 className="max-w-[820px] text-[29px] font-semibold leading-[1.04] tracking-[-.04em] min-[390px]:text-[34px] sm:text-[41px] lg:text-[47px]">{course.title}</h1>
            <p className="mt-6 max-w-[820px] whitespace-pre-line text-[11px] leading-[1.7] text-[#555] sm:text-[12px]">{course.description}</p>
            <div className="mt-5"><AuthorButton author={author} onOpenAuthor={onOpenAuthor} compact /></div>
            {course.tags?.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{course.tags.map((tag) => <span key={tag} className="rounded-full bg-[#edf7ff] px-3 py-1.5 text-[9px] font-medium text-[#1683ff]">{tag}</span>)}</div>}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => (isFreeCourse ? openFreeAccess('course_header') : openPayment('course_header'))}
                className={`pay-button-motion min-h-11 w-full rounded-full px-6 text-[11px] font-semibold sm:w-auto sm:min-w-[240px] ${
                  isFreeTeaser(course, leadCaptured)
                    ? 'bg-[#22c55e] text-white shadow-[0_8px_22px_rgba(34,197,94,.28)]'
                    : 'bg-[#ffdd00] shadow-[0_8px_22px_rgba(255,221,0,.22)]'
                }`}
              >
                {getPaymentLabel(course, false, leadCaptured)}
              </button>
              <Metric index={0} value={course.duration || 'Уточняется'} />
              <Metric index={1} value={lessons.length || '—'} />
            </div>
          </div>
        </section>

        <section ref={programRef} className="mt-10 scroll-mt-5 sm:mt-12">
          {lessons.length > 0 && (
            <div className="mt-5 grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(280px,.92fr)_minmax(0,1.45fr)] lg:gap-7">
              <div className="min-w-0">
                {activeLesson.video ? (
                  <InlineLessonVideo
                    lesson={activeLesson}
                    onPlay={handlePreviewPlay}
                    onEnded={handlePreviewEnded}
                    guardPlay={(action) => requestVideoAccess('preview_video', action)}
                    onNext={goToNextLesson}
                    hasNext={Boolean(nextLesson)}
                    unlocked={isFreeCourse && leadCaptured}
                  />
                ) : isFreeCourse && leadCaptured ? (
                  <LessonComingSoon lesson={activeLesson} onNext={goToNextLesson} hasNext={Boolean(nextLesson)} />
                ) : (
                  <LessonCard lesson={activeLesson} course={course} variant="player" onOpen={() => openLesson(activeLesson)} unlocked={isFreeCourse && leadCaptured} />
                )}
              </div>
              <div className="min-w-0">
                <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-6 min-[460px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {visibleLessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} course={course} active={lesson.id === activeLesson.id} onOpen={() => openLesson(lesson)} unlocked={isFreeCourse && leadCaptured} />)}
                </div>
                {lessons.length > 6 && <button type="button" onClick={() => setLessonsExpanded((value) => !value)} className="mt-6 flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#f1f1f1] px-5 text-[10px] font-semibold">{lessonsExpanded ? 'Скрыть уроки' : 'Посмотреть все уроки'}{lessonsExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>}
              </div>
            </div>
          )}
        </section>

        <section className="mt-8 rounded-[15px] bg-[#f7f7f7] px-4 py-4 sm:px-5" style={{ display: 'none' }}>
          <p className="text-[10px] font-semibold">Вы завершили курс на {course.progress || 0}%</p>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-white"><span className="block h-full rounded-full bg-[#ffcf00]" style={{ width: `${Math.min(Math.max(course.progress || 0, 0), 100)}%` }} /></div>
        </section>

        <UpdatesSection updates={course.updates} />
        <MaterialsSection
          unlocked={materialsUnlocked}
          onUnlock={() => requestVideoAccess('course_materials', () => {})}
        />
        <PurchaseCta open={purchaseCtaOpen} course={course} unlocked={isFreeCourse && leadCaptured} onClose={() => setPurchaseCtaOpen(false)} onBuy={() => (isFreeCourse ? openFreeAccess('floating_cta') : openPayment('floating_cta'))} />
        <PaymentModal
          open={paymentOpen}
          course={course}
          source={paymentGate?.resubscribe ? 'newsletter_signup' : 'course_page'}
          onClose={() => { setPaymentOpen(false); setPaymentGate(null); }}
          onPayment={() => setMaterialsUnlocked(true)}
          forceFree={Boolean(paymentGate)}
          onAccessGranted={paymentGate?.onAccessGranted}
          allowResubmit={Boolean(paymentGate?.resubscribe)}
        />
        <PaymentFailedModal open={paymentFailedOpen} onClose={() => setPaymentFailedOpen(false)} />
      </div>
    </main>
  );
}
