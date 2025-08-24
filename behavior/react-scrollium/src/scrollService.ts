import { SCROLL_EVENTS } from './types';
import { ScrollInstance } from './ScrollInstance';

function getScrollState(store: ScrollInstance['store'], el: HTMLDivElement) {
  const y = el.scrollTop;
  const direction =
    y > store.getState().lastYRef
      ? 'down'
      : y < store.getState().lastYRef
      ? 'up'
      : 'none';

  const isTop = y === 0;
  const isBottom = y + el.clientHeight >= el.scrollHeight;
  const scrollableHeight = store.getState().scrollableHeight;
  const progress =
    scrollableHeight === 0 ? 100 : Math.round((y / scrollableHeight) * 100);

  return { direction, isTop, isBottom, progress };
}

function dispatchScroll(
  store: ScrollInstance['store'],
  state: ReturnType<typeof getScrollState>,
  eventType: SCROLL_EVENTS
) {
  store.action({ type: eventType, payload: state });
  if (state.isTop) store.action({ type: SCROLL_EVENTS.ON_TOP });
  if (state.isBottom) store.action({ type: SCROLL_EVENTS.ON_BOTTOM });
}

export function handleScroll(store: ScrollInstance['store']) {
  return (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const now = Date.now();

    if (now - store.getState().lastCallRef >= store.getState().throttleDelay) {
      store.getState().lastCallRef = now;
      const state = getScrollState(store, el);
      dispatchScroll(store, state, SCROLL_EVENTS.ON_SCROLL);
    }

    if (store.getState().stopTimerRef)
      clearTimeout(store.getState().stopTimerRef!);

    store.getState().stopTimerRef = setTimeout(() => {
      const state = getScrollState(store, el);
      dispatchScroll(store, state, SCROLL_EVENTS.ON_SCROLL_STOP);
    }, 150);
  };
}
