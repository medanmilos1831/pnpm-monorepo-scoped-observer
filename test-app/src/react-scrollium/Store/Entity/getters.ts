import { stateFn } from "./state";

export function getters(state: ReturnType<typeof stateFn>) {
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
