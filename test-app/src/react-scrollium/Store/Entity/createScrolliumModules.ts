import { ScrolliumAxis, ScrolliumPublicEvents } from "../../types";
import { createModuleInstance } from "../../core/createModuleInstance";
import type { createScrolliumState } from "./createScrolliumState";
import type { createObserver } from "../../core/observer";

const createScrolliumModules = (props: {
  stateManager: ReturnType<typeof createScrolliumState>;
  observer: ReturnType<typeof createObserver>;
}) => {
  return createModuleInstance(props, {
    scroll(value) {
      const state = value.stateManager;
      const observer = value.observer;
      return {
        onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
          state.mutations.setScrollPosition(
            state.state.axis === ScrolliumAxis.VERTICAL
              ? (e.target as HTMLDivElement).scrollTop
              : (e.target as HTMLDivElement).scrollLeft
          );
          state.mutations.setIsScrolling(() => {
            observer.dispatch(ScrolliumPublicEvents.ON_SCROLL_STOP);
          });
          observer.dispatch(ScrolliumPublicEvents.ON_SCROLL);
        },
      };
    },
    commands(value) {
      const { stateManager, observer } = value;
      return {
        scrollTo: (options?: ScrollToOptions) => {
          stateManager.state.element?.scrollTo(options);
        },
        scrollToStart: (options?: ScrollOptions) => {
          const scrollPro =
            stateManager.state.axis === ScrolliumAxis.VERTICAL ? "top" : "left";
          stateManager.state.element?.scrollTo({
            [scrollPro]: 0,
            ...options,
          });
        },
        scrollToEnd: (options?: ScrollOptions) => {
          const scrollPro =
            stateManager.state.axis === ScrolliumAxis.VERTICAL ? "top" : "left";
          stateManager.state.element?.scrollTo({
            [scrollPro]: stateManager.state.scrollSize,
            ...options,
          });
        },
      };
    },
  });
};

export { createScrolliumModules };
