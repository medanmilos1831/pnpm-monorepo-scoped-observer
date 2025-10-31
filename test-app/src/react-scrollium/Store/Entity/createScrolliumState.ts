import {
  SCROLLIUM_SCOPE,
  ScrolliumAxis,
  ScrolliumDirection,
  type ScrolliumProps,
} from "../../types";
import { createStoreInstance } from "../../core/createStoreInstance";

/**
 * Creates a scrollium state manager instance with scroll tracking logic.
 * 
 * Manages scroll position, direction, progress, boundaries, and scrolling state
 * with debounce mechanism. Provides pure mutations for state transformations
 * and getters for read-only access.
 * 
 * @param props - Scrollium configuration props
 * @param props.id - Unique identifier for the scroll instance
 * @param props.axis - Scroll axis direction (vertical or horizontal)
 * 
 * @returns Store instance with state, mutations, getters, and observer
 * 
 * @example
 * ```ts
 * const stateManager = createScrolliumState({
 *   id: "scroll-one",
 *   axis: "vertical"
 * });
 * 
 * // Update scroll position
 * stateManager.mutations.setScrollPosition(100);
 * 
 * // Get current progress
 * const progress = stateManager.getters.getProgress();
 * ```
 */
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
        /**
         * Sets the scroll position and triggers calculation pipeline.
         * Automatically calculates direction, bounds, progress, and scrolling state.
         * 
         * @param position - The new scroll position in pixels
         */
        setScrollPosition(position: number) {
          this.calculate(position);
          this.setIsScrolling();
        },
        /**
         * Manages the scrolling debounce state with 500ms timeout.
         * Clears previous timeout if called multiple times during scrolling.
         * 
         * @param callback - Optional callback to execute when scrolling stops
         */
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
        /**
         * Changes the scroll axis and recalculates current position.
         * 
         * @param axis - New scroll axis (vertical or horizontal)
         */
        setAxis(axis: ScrolliumAxis) {
          state.axis = axis;
          this.calculate(state.scrollPosition);
        },
        /**
         * Sets the visible client size (viewport size).
         * 
         * @param size - Client size in pixels
         */
        setClientSize: (size: number) => {
          state.clientSize = size;
        },
        /**
         * Sets the maximum scrollable size.
         * 
         * @param size - Maximum scroll size in pixels
         */
        setScrollSize: (size: number) => {
          state.scrollSize = size;
        },
        /**
         * Initializes the DOM element and calculates initial scroll metrics.
         * Reads element dimensions and sets up clientSize and scrollSize.
         * 
         * @param element - The DOM element to track
         */
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
        /**
         * Calculates scroll direction based on position change.
         * Compares current position with previous to determine UP/DOWN/LEFT/RIGHT.
         */
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
        /**
         * Determines if scroll is at start (0) or end (max scroll) boundaries.
         * Updates isStart and isEnd flags accordingly.
         */
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
        /**
         * Calculates scroll progress percentage (0-100%).
         * Ensures progress stays between 1% and 100% for UI consistency.
         * 
         * Formula: (scrollPosition / scrollSize) * 100
         */
        calculateProgress() {
          const ratio =
            state.scrollSize > 0 ? state.scrollPosition / state.scrollSize : 0;
          const progress = Number((ratio * 100).toFixed(2));
          state.progress = Math.min(100, Math.max(1, progress));
        },
        /**
         * Main calculation pipeline for scroll position updates.
         * Executes direction, bounds, and progress calculations.
         * 
         * @param position - New scroll position in pixels
         */
        calculate(position: number) {
          state.previousScrollPosition = state.scrollPosition;
          state.scrollPosition = Math.ceil(position as number);
          state.isScrolling = true;
          this.calculateDirection();
          this.calculateScrollBounds();
          this.calculateProgress();
        },
        /**
         * Cleans up pending timeouts and resets timeout ID.
         * Should be called on component unmount to prevent memory leaks.
         */
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
      };
    },
  });
}
