import { ChevronLeft, ChevronRight } from 'lucide-react';

function SliderControls({ sliderRef }) {
  const move = (direction) => {
    const node = sliderRef.current;
    if (!node) return;
    node.scrollBy({
      left: direction * Math.max(node.clientWidth * 0.82, 280),
      behavior: 'smooth',
    });
  };

  return (
    <div className="hidden items-center gap-1 md:flex">
      <button
        type="button"
        onClick={() => move(-1)}
        aria-label="Прокрутить назад"
        className="slider-control grid h-8 w-8 place-items-center rounded-full border border-[#e2e2e2] bg-white transition hover:bg-[#f6f6f6]"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        type="button"
        onClick={() => move(1)}
        aria-label="Прокрутить вперёд"
        className="slider-control grid h-8 w-8 place-items-center rounded-full border border-[#e2e2e2] bg-white transition hover:bg-[#f6f6f6]"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export function HomeSectionHeader({ title, eyebrow, description, onAll, sliderRef }) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-x-4 gap-y-3">
      <div className="min-w-0 flex-1 basis-[260px]">
        {eyebrow && (
          <span className="mb-2 inline-flex rounded-full bg-[#ffe000] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.09em] text-[#181818]">
            {eyebrow}
          </span>
        )}
        <h2 className="text-[20px] font-semibold min-[390px]:text-[22px] tracking-[-0.35px] md:text-[24px]">{title}</h2>
        {description && (
          <p className="mt-1 max-w-[610px] text-[11px] leading-[1.55] text-[#777] md:text-[12px]">
            {description}
          </p>
        )}
      </div>
      <div className="ml-auto flex shrink-0 items-center gap-3">
        {sliderRef && <SliderControls sliderRef={sliderRef} />}
        {onAll && (
          <button
            type="button"
            onClick={onAll}
            className="shrink-0 pb-0.5 text-[12px] text-[#00aaf2]"
          >
            Смотреть все
          </button>
        )}
      </div>
    </div>
  );
}
