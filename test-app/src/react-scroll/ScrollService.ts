import { configDefaultType, SCROLL_EVENTS } from './types';
import { ScrollInstance } from './ScrollInstance';

//
// Utils
//
function throttle<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

//
// Default Config
//
export const defaultConfig: configDefaultType = {
  scrollPosition: 0,
  behaviour: 'smooth',
  throttle: 16,
  stopDelay: 250,
};

//
// Core Helpers
//
function getScrollMeta(el: HTMLDivElement, lastY: number) {
  const y = el.scrollTop;

  return {
    y,
    direction: y > lastY ? 'down' : y < lastY ? 'up' : 'none',
    isTop: y === 0,
    isBottom: y + el.clientHeight >= el.scrollHeight,
  };
}

function dispatchScrollEvents(
  store: ScrollInstance['store'],
  meta: ReturnType<typeof getScrollMeta>
) {
  const { y, direction, isTop, isBottom } = meta;
  const state = store.getState();

  // Calculate progress (0-100%)
  const progress =
    state.scrollableHeight > 0
      ? Math.min(
          100,
          Math.max(0, Math.round((y / state.scrollableHeight) * 100))
        )
      : 0;

  if (isTop) {
    store.action({ type: SCROLL_EVENTS.ON_TOP });
  }
  if (isBottom) {
    store.action({ type: SCROLL_EVENTS.ON_BOTTOM });
  }

  store.action({
    type: SCROLL_EVENTS.ON_SCROLL,
    payload: {
      isScrolling: true,
      scrollPosition: y,
      isTop,
      isBottom,
      direction,
      lastYRef: y,
      progress,
    },
  });
}

function dispatchScrollStop(store: ScrollInstance['store']) {
  store.action({
    type: SCROLL_EVENTS.ON_SCROLL_STOP,
    payload: {
      isScrolling: false,
      scrollPosition: store.getState().lastYRef,
    },
  });
}

//
// Main Scroll Handler
//
export function handleScroll(store: ScrollInstance['store']) {
  let stopTimer: ReturnType<typeof setTimeout> | null = null;

  const throttledHandler = throttle((e: any) => {
    const el = e.target as HTMLDivElement;
    const lastY = store.getState().lastYRef;
    const meta = getScrollMeta(el, lastY);

    dispatchScrollEvents(store, meta);
  }, store.getState().throttle);

  return (e: any) => {
    throttledHandler(e);

    if (stopTimer) clearTimeout(stopTimer);

    stopTimer = setTimeout(() => {
      dispatchScrollStop(store);
    }, store.getState().stopDelay);
  };
}
