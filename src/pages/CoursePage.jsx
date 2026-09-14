import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock3,
  FileSpreadsheet,
  FileText,
  Play,
  Video,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AuthorButton } from '../components/catalog/AuthorButton';
import { LessonCard } from '../components/catalog/LessonCard';
import { PurchaseCta } from '../components/catalog/PurchaseCta';
import { PaymentModal } from '../components/payment/PaymentModal';
import { trackEvent } from '../utils/analytics';
import { getPaymentLabel, isCourseUnlocked } from '../utils/payment';

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

function InlineLessonVideo({ lesson, onPlay, onEnded, guardPlay }) {
  const videoRef = useRef(null);
  const seekingRef = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

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
    <article className="relative aspect-[512/1000] w-full overflow-hidden rounded-[26px] bg-[#1b1b1b] shadow-[0_18px_48px_rgba(0,0,0,.16)]">
      <style>{`
        .askhow-video-progress::-webkit-slider-runnable-track {
          height: 5px;
          border-radius: 9999px;
          background: linear-gradient(to right, #fff 0 var(--video-progress), rgba(255,255,255,.35) var(--video-progress) 100%);
        }
        .askhow-video-progress::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          margin-top: -4.5px;
          border: 0;
          border-radius: 9999px;
          background: #fff;
          box-shadow: 0 1px 5px rgba(0,0,0,.25);
          opacity: 0;
        }
        .askhow-video-progress:focus::-webkit-slider-thumb,
        .askhow-video-progress:active::-webkit-slider-thumb,
        .askhow-video-progress:hover::-webkit-slider-thumb { opacity: 1; }
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
          width: 14px;
          height: 14px;
          border: 0;
          border-radius: 9999px;
          background: #fff;
          box-shadow: 0 1px 5px rgba(0,0,0,.25);
          opacity: 0;
        }
        .askhow-video-progress:focus::-moz-range-thumb,
        .askhow-video-progress:active::-moz-range-thumb,
        .askhow-video-progress:hover::-moz-range-thumb { opacity: 1; }
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
        onTimeUpdate={(event) => {
          if (seekingRef.current) return;
          const { currentTime, duration } = event.currentTarget;
          setProgress(duration ? Math.min(currentTime / duration, 1) : 0);
        }}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
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
            seekingRef.current = true;
          }}
          onPointerUp={() => { seekingRef.current = false; }}
          onPointerCancel={() => { seekingRef.current = false; }}
          onBlur={() => { seekingRef.current = false; }}
          onClick={(event) => event.stopPropagation()}
          onChange={(event) => {
            const nextProgress = Number(event.currentTarget.value) / 1000;
            setProgress(nextProgress);
            const video = videoRef.current;
            if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
            video.currentTime = Math.min(nextProgress * video.duration, Math.max(video.duration - 0.05, 0));
          }}
          aria-label="Прогресс просмотра видео"
          className="askhow-video-progress h-[18px] w-full cursor-pointer appearance-none bg-transparent"
          style={{ '--video-progress': `${progress * 100}%` }}
        />
      </div>

      <span className="pointer-events-none absolute left-[4.2%] top-[2.4%] z-20 rounded-[5px] bg-[#ff3030] px-3 py-1.5 text-[12px] font-medium leading-none text-white sm:text-[13px]">Бесплатно</span>

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

function MaterialsSection() {
  const [activeMaterial, setActiveMaterial] = useState(null);
  return (
    <section className="mt-12 sm:mt-16">
      <h2 className="text-[31px] font-semibold tracking-[-.035em] sm:text-[38px]">Материалы курса</h2>
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {MATERIAL_TABS.map((tab) => (
          <button
            key={tab.type}
            type="button"
            onClick={() => setActiveMaterial(tab)}
            className="motion-card flex items-center gap-3 rounded-[15px] border border-[#e9e9e9] bg-white px-5 py-4 text-left shadow-[0_8px_28px_rgba(0,0,0,.04)] transition hover:border-[#d8d8d8]"
          >
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[12px] ${tab.color}`}><tab.icon size={20} /></span>
            <span className="min-w-0">
              <strong className="block text-[13px] font-semibold">{tab.label}</strong>
              <span className="mt-0.5 block text-[9px] text-[#888]">Открыть материал</span>
            </span>
          </button>
        ))}
      </div>
      <MaterialPreviewModal material={activeMaterial} onClose={() => setActiveMaterial(null)} />
    </section>
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
  const programRef = useRef(null);
  const viewedCourseRef = useRef(null);
  const previewStartedRef = useRef(null);
  const isFreeCourse = course.price === 'Бесплатно';
  const lessons = course.lessons || [];
  const previewLesson = lessons.find((lesson) => lesson.featured) || lessons[0] || null;
  const visibleLessons = lessonsExpanded ? lessons : lessons.slice(0, 6);

  useEffect(() => {
    setPaymentOpen(false);
    setPaymentGate(null);
    setPurchaseCtaOpen(false);
    setLessonsExpanded(false);
    setLeadCaptured(isCourseUnlocked(course.id));
    previewStartedRef.current = null;
    if (viewedCourseRef.current === course.id) return;
    viewedCourseRef.current = course.id;
    trackEvent('course_open', { course_id: course.id, course_title: course.title, course_price: course.price || null });
  }, [course.id, course.price, course.title]);

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
    requestVideoAccess(source, () => {});
  };

  const openPreview = () => {
    window.requestAnimationFrame(() => programRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const openLesson = (lesson) => {
    if ((isFreeCourse || lesson.free) && (lesson.video || lesson.url)) {
      requestVideoAccess('lesson_video', () => {
        if (lesson.url && !lesson.video) window.open(lesson.url, '_blank', 'noopener,noreferrer');
        else openPreview();
      });
      return;
    }
    openPayment('locked_lesson_video');
    trackEvent('locked_lesson_click', { course_id: course.id, lesson_id: lesson.id });
  };

  const handlePreviewPlay = () => {
    if (!previewLesson || previewStartedRef.current === previewLesson.id) return;
    previewStartedRef.current = previewLesson.id;
    trackEvent('preview_start', { course_id: course.id, lesson_id: previewLesson.id });
  };

  const handlePreviewEnded = () => {
    if (!previewLesson) return;
    trackEvent('preview_complete', { course_id: course.id, lesson_id: previewLesson.id });
    setPurchaseCtaOpen(true);
  };

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
              <button type="button" onClick={() => (isFreeCourse ? openFreeAccess('course_header') : openPayment('course_header'))} className="pay-button-motion min-h-11 w-full rounded-full bg-[#ffdd00] px-6 text-[11px] font-semibold shadow-[0_8px_22px_rgba(255,221,0,.22)] sm:w-auto sm:min-w-[240px]">{getPaymentLabel(course)}</button>
              <Metric index={0} value={course.duration || 'Уточняется'} />
              <Metric index={1} value={lessons.length || '—'} />
            </div>
          </div>
        </section>

        <section ref={programRef} className="mt-10 scroll-mt-5 sm:mt-12">
          {lessons.length > 0 && (
            <div className="mt-5 grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(280px,.92fr)_minmax(0,1.45fr)] lg:gap-7">
              <div className="min-w-0">
                {previewLesson.video ? <InlineLessonVideo lesson={previewLesson} onPlay={handlePreviewPlay} onEnded={handlePreviewEnded} guardPlay={(action) => requestVideoAccess('preview_video', action)} /> : <LessonCard lesson={previewLesson} course={course} variant="player" onOpen={() => openLesson(previewLesson)} unlocked={isFreeCourse && leadCaptured} />}
              </div>
              <div className="min-w-0">
                <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-6 min-[460px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {visibleLessons.map((lesson) => <LessonCard key={lesson.id} lesson={lesson} course={course} active={lesson.id === previewLesson.id} onOpen={() => openLesson(lesson)} unlocked={isFreeCourse && leadCaptured} />)}
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
        <MaterialsSection />
        <PurchaseCta open={purchaseCtaOpen} course={course} onClose={() => setPurchaseCtaOpen(false)} onBuy={() => (isFreeCourse ? openFreeAccess('floating_cta') : openPayment('floating_cta'))} />
        <PaymentModal
          open={paymentOpen}
          course={course}
          source="course_page"
          onClose={() => { setPaymentOpen(false); setPaymentGate(null); }}
          forceFree={Boolean(paymentGate)}
          onAccessGranted={paymentGate?.onAccessGranted}
        />
      </div>
    </main>
  );
}
