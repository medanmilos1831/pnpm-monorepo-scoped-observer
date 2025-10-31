import {
  ScrolliumAxis,
  ScrolliumPublicEvents,
  type ScrolliumPublicEventsType,
} from "../../types";
import { createModuleInstance } from "../../core/createModuleInstance";
import type { createScrolliumState } from "./createScrolliumState";

/**
 * Creates scrollium modules for orchestration and side-effects.
 * 
 * Composes scroll event handlers, commands API, event listeners, and client API.
 * Modules handle side-effects (DOM interaction, event dispatching) while mutations
 * remain pure functions.
 * 
 * @param state - The scrollium state manager instance
 * 
 * @returns Module instance with scroll, commands, addEventListener, and clientApi
 * 
 * @example
 * ```ts
 * const stateManager = createScrolliumState({ id: "scroll-one" });
 * const modules = createScrolliumModules(stateManager);
 * 
 * // Handle scroll events
 * <div onScroll={modules.scroll.onScroll} />
 * 
 * // Programmatic control
 * modules.commands.scrollToEnd({ behavior: "smooth" });
 * ```
 */
const createScrolliumModules = (
  state: ReturnType<typeof createScrolliumState>
) => {
  return createModuleInstance(state, {
    /**
     * Scroll event handling module.
     * Processes scroll events and triggers mutations + events.
     */
    scroll(state) {
      return {
        /**
         * Handles scroll events from DOM elements.
         * Updates scroll position, manages debounce, and dispatches events.
         * 
         * @param e - React scroll event from DOM element
         */
        onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
          state.mutations.setScrollPosition(
            state.state.axis === ScrolliumAxis.VERTICAL
              ? (e.target as HTMLDivElement).scrollTop
              : (e.target as HTMLDivElement).scrollLeft
          );
          state.mutations.setIsScrolling(() => {
            state.observer.dispatch(ScrolliumPublicEvents.ON_SCROLL_STOP);
          });
          state.observer.dispatch(ScrolliumPublicEvents.ON_SCROLL);
        },
      };
    },
    /**
     * Programmatic scroll control module.
     * Provides API for programmatically controlling scroll position.
     */
    commands(state) {
      return {
        /**
         * Scrolls to a specific position using native scrollTo API.
         * 
         * @param options - ScrollToOptions (top, left, behavior)
         */
        scrollTo: (options?: ScrollToOptions) => {
          state.state.element?.scrollTo(options);
        },
        /**
         * Scrolls to the start of the container (position 0).
         * 
         * @param options - Additional scroll options (behavior, etc.)
         */
        scrollToStart: (options?: ScrollOptions) => {
          const scrollPro =
            state.state.axis === ScrolliumAxis.VERTICAL ? "top" : "left";
          state.state.element?.scrollTo({
            [scrollPro]: 0,
            ...options,
          });
        },
        /**
         * Scrolls to the end of the container (max scroll position).
         * 
         * @param options - Additional scroll options (behavior, etc.)
         */
        scrollToEnd: (options?: ScrollOptions) => {
          const scrollPro =
            state.state.axis === ScrolliumAxis.VERTICAL ? "top" : "left";
          state.state.element?.scrollTo({
            [scrollPro]: state.state.scrollSize,
            ...options,
          });
        },
      };
    },
    /**
     * Event subscription module.
     * Provides public API for subscribing to scrollium events.
     */
    addEventListener(state) {
      /**
       * Subscribes to scrollium public events.
       * 
       * @param event - Event name (onScroll, onScrollStop)
       * @param callback - Callback function to execute on event
       * @returns Unsubscribe function
       */
      return (
        event: `${ScrolliumPublicEventsType}`,
        callback: (payload: any) => void
      ) => {
        return state.observer.subscribe(event, ({ payload }) => {
          callback(payload);
        });
      };
    },
    /**
     * Client API module.
     * Provides serialized view of scroll state and entity access.
     */
    clientApi(state) {
      /**
       * Returns client API with serialized state and entity access.
       * 
       * @returns Object with client (POJO state) and clientEntity (methods)
       */
      return () => {
        return {
          /** Serialized scroll state (plain object) */
          client: {
            id: state.getters.getId(),
            scrollPosition: state.getters.getScrollPosition(),
            axis: state.getters.getAxis(),
            direction: state.getters.getDirection(),
            progress: state.getters.getProgress(),
            isStart: state.getters.getIsStart(),
            isEnd: state.getters.getIsEnd(),
            clientSize: state.getters.getClientSize(),
            scrollSize: state.getters.getScrollSize(),
            isScrolling: state.getters.getIsScrolling(),
          },
          /** Entity API with methods and getters */
          clientEntity: {
            addEventListener: this.addEventListener(state),
            commands: this.commands,
            getters: state.getters,
          },
        };
      };
    },
  });
};

export { createScrolliumModules };
