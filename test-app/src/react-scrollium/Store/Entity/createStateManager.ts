import {
  ScrolliumAxis,
  ScrolliumDirection,
  type ScrolliumProps,
} from "../../types";
import { createEntityBase } from "../createEntityBase";

export function createStateManager(props: ScrolliumProps) {
  return createEntityBase({
    id: props.id,
    state: {
      axis: props.axis ?? ScrolliumAxis.VERTICAL,
      scrollPosition: 0,
      previousScrollPosition: 0,
      isScrolling: false,
      scrollTimeoutId: null as number | null,
      id: props.id,
      isStart: true,
      isEnd: false,
      clientSize: 0 as number,
      scrollSize: 0 as number,
      progress: 0 as number,
      direction: ScrolliumDirection.NONE,
      element: null as HTMLElement | null,
      style: {
        height: "100%",
        width: "100%",
        overflow:
          props.axis === ScrolliumAxis.HORIZONTAL
            ? "auto hidden"
            : "hidden auto",
      },
    },
    mutations(state) {
      return {
        setScrollPosition(position: number) {
          this.calculate(position);
          this.setIsScrolling();
        },
        setIsScrolling(callback?: () => void) {
          if (state.scrollTimeoutId) {
            clearTimeout(state.scrollTimeoutId);
          }

          state.scrollTimeoutId = setTimeout(() => {
            state.isScrolling = false;
            state.scrollTimeoutId = null;
            if (callback) {
              callback();
            }
          }, 500);
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
          if (
            state.scrollPosition > 0 &&
            state.scrollPosition < state.scrollSize
          ) {
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
        calculate(position: number) {
          state.previousScrollPosition = state.scrollPosition;
          state.scrollPosition = Math.ceil(position as number);
          state.isScrolling = true;
          this.calculateDirection();
          this.calculateScrollBounds();
          this.calculateProgress();
        },
        cleanup() {
          if (state.scrollTimeoutId) {
            clearTimeout(state.scrollTimeoutId);
            state.scrollTimeoutId = null;
          }
        },
      };
    },
    getters(state) {
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
    },
  });
}
