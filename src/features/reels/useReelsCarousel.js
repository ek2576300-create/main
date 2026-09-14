import { useCallback, useEffect, useRef, useState } from 'react';

export function useReelsCarousel({ reels, startId, onRoute }) {
  const initialIndex = Math.max(
    0,
    reels.findIndex((reel) => reel.id === startId),
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [shift, setShift] = useState(0);
  const [animating, setAnimating] = useState(false);
  const touchStart = useRef(null);
  const wheelSum = useRef(0);
  const wheelTimer = useRef(null);
  const count = reels.length;
  const wrapIndex = useCallback((index) => (index + count) % count, [count]);

  const move = useCallback(
    (direction) => {
      if (animating || !direction) return;
      setAnimating(true);
      setShift(direction);
    },
    [animating],
  );

  const finishMove = () => {
    if (!shift) return;
    const nextIndex = wrapIndex(activeIndex + shift);
    setActiveIndex(nextIndex);
    onRoute?.(reels[nextIndex].id, true);
    setAnimating(false);
    setShift(0);
  };

  const onWheel = (event) => {
    event.preventDefault();
    if (animating) return;

    wheelSum.current += event.deltaY;
    clearTimeout(wheelTimer.current);
    wheelTimer.current = setTimeout(() => {
      wheelSum.current = 0;
    }, 140);

    if (Math.abs(wheelSum.current) >= 55) {
      const direction = wheelSum.current > 0 ? 1 : -1;
      wheelSum.current = 0;
      move(direction);
    }
  };

  const onTouchStart = (event) => {
    touchStart.current = event.touches[0]?.clientY ?? null;
  };

  const onTouchEnd = (event) => {
    if (touchStart.current == null || animating) return;
    const end = event.changedTouches[0]?.clientY ?? touchStart.current;
    const delta = touchStart.current - end;
    touchStart.current = null;
    if (Math.abs(delta) > 45) move(delta > 0 ? 1 : -1);
  };

  useEffect(() => () => clearTimeout(wheelTimer.current), []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        move(1);
      }
      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        move(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  const previousIndex = wrapIndex(activeIndex - 1);
  const nextIndex = wrapIndex(activeIndex + 1);
  const visibleIndexes = [previousIndex, activeIndex, nextIndex];
  const transform =
    shift === 1
      ? 'translate3d(0,-200%,0)'
      : shift === -1
        ? 'translate3d(0,0,0)'
        : 'translate3d(0,-100%,0)';

  return {
    activeIndex,
    current: reels[activeIndex],
    visibleIndexes,
    animating,
    transform,
    finishMove,
    onWheel,
    onTouchStart,
    onTouchEnd,
  };
}
