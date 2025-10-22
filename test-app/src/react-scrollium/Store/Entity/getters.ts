import type { ScrollState } from "./ScrollState";

export function getters(state: ScrollState) {
  return {
    getAxis: () => state.axis,
    getScrollPosition: () => state.scrollPosition,
    getIsStart: () => state.isStart,
    getIsEnd: () => state.isEnd,
    getClientSize: () => state.clientSize,
    getScrollSize: () => state.scrollSize,
    getProgress: () => state.progress,
    getDirection: () => state.direction,
    getIsScrolling: () => state.isScrolling,
    getId: () => state.id,
    subscribe: state.observer.subscribe,
  };
}
