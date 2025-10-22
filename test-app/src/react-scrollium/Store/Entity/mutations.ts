import {
  ScrolliumAxis,
  ScrolliumDirection,
  ScrolliumEvents,
} from "../../types";
import { stateFn } from "./state";

export function mutations(state: ReturnType<typeof stateFn>) {
  return {
    setScrollPosition(position: number) {
      this.calculate(position);
      if (state.scrollTimeoutId) {
        clearTimeout(state.scrollTimeoutId);
      }

      state.scrollTimeoutId = setTimeout(() => {
        state.isScrolling = false;
        state.scrollTimeoutId = null;
        state.observer.dispatch(ScrolliumEvents.ON_SCROLL_STOP);
      }, 500);
      if (state.scrollTimeoutId) {
        clearTimeout(state.scrollTimeoutId);
      }
      state.observer.dispatch(ScrolliumEvents.ON_SCROLL);
    },
    setAxis(axis: ScrolliumAxis) {
      state.axis = axis;
      this.calculate(state.scrollPosition);
    },
    setClientSize: (size: number) => {
      state.clientSize = size;
    },
    setScrollSize: (size: number) => {
      state.scrollSize = size;
    },
    initializeElement(element: HTMLElement) {
      if (element) {
        state.element = element;
        const clientSize = Math.ceil(
          element![
            state.axis === ScrolliumAxis.VERTICAL
              ? "clientHeight"
              : "clientWidth"
          ] || 0
        );
        const maxScroll = Math.ceil(
          (element![
            state.axis === ScrolliumAxis.VERTICAL
              ? "scrollHeight"
              : "scrollWidth"
          ] || 0) - (clientSize || 0)
        );
        this.setClientSize(clientSize);
        this.setScrollSize(maxScroll);
      }
    },
    calculateDirection() {
      if (state.axis === ScrolliumAxis.HORIZONTAL) {
        if (state.scrollPosition < state.previousScrollPosition) {
          state.direction = ScrolliumDirection.LEFT;
        } else {
          state.direction = ScrolliumDirection.RIGHT;
        }
      } else {
        if (state.scrollPosition < state.previousScrollPosition) {
          state.direction = ScrolliumDirection.DOWN;
        } else {
          state.direction = ScrolliumDirection.UP;
        }
      }
    },
    calculateScrollBounds() {
      if (state.scrollPosition === 0) {
        state.isStart = true;
        state.isEnd = false;
      }
      if (state.scrollPosition === state.scrollSize) {
        state.isEnd = true;
        state.isStart = false;
      }
      if (state.scrollPosition > 0 && state.scrollPosition < state.scrollSize) {
        state.isStart = false;
        state.isEnd = false;
      }
    },
    calculateProgress() {
      const ratio =
        state.scrollSize > 0 ? state.scrollPosition / state.scrollSize : 0;
      const progress = Number((ratio * 100).toFixed(2));
      state.progress = Math.min(100, Math.max(1, progress));
    },
    createClient() {
      return {
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
    },
    calculate(position: number) {
      state.previousScrollPosition = state.scrollPosition;
      state.scrollPosition = Math.ceil(position as number);
      state.isScrolling = true;
      this.calculateDirection();
      this.calculateScrollBounds();
      this.calculateProgress();
    },
  };
}
