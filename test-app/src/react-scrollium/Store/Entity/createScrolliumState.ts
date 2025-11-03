import {
  SCROLLIUM_SCOPE,
  ScrolliumAxis,
  ScrolliumDirection,
  type ScrolliumProps,
} from "../../types";
import { createStoreInstance } from "../../core/createStoreInstance";

export function createScrolliumState(props: ScrolliumProps) {
  return createStoreInstance({
    id: SCROLLIUM_SCOPE,
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
              state.direction = ScrolliumDirection.UP;
            } else {
              state.direction = ScrolliumDirection.DOWN;
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
        /** @returns Current scroll axis (vertical or horizontal) */
        getAxis: () => state.axis,
        /** @returns Current scroll position in pixels */
        getScrollPosition: () => state.scrollPosition,
        /** @returns True if scroll is at the start (position 0) */
        getIsStart: () => state.isStart,
        /** @returns True if scroll is at the end (max scroll) */
        getIsEnd: () => state.isEnd,
        /** @returns Visible client/viewport size in pixels */
        getClientSize: () => state.clientSize,
        /** @returns Maximum scrollable size in pixels */
        getScrollSize: () => state.scrollSize,
        /** @returns Scroll progress percentage (1-100) */
        getProgress: () => state.progress,
        /** @returns Current scroll direction (up, down, left, right, none) */
        getDirection: () => state.direction,
        /** @returns True if currently scrolling (debounced 500ms) */
        getIsScrolling: () => state.isScrolling,
        /** @returns Entity identifier */
        getId: () => state.id,
        getStyle: () => state.style,
      };
    },
  });
}
