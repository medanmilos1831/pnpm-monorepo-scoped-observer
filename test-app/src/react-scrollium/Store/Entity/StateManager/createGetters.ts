import type { createState } from "./createState";

export function createGetters(state: ReturnType<typeof createState>) {
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
  };
}
