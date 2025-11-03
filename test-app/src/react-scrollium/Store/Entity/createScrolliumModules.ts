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
    // addEventListener(state) {
    //   return (
    //     event: `${ScrolliumPublicEventsType}`,
    //     callback: (payload: any) => void
    //   ) => {
    //     return observer.subscribe(event, ({ payload }) => {
    //       callback(payload);
    //     });
    //   };
    // },
    // clientApi(state) {
    //   return () => {
    //     return {
    //       client: {
    //         id: state.getters.getId(),
    //         scrollPosition: state.getters.getScrollPosition(),
    //         axis: state.getters.getAxis(),
    //         direction: state.getters.getDirection(),
    //         progress: state.getters.getProgress(),
    //         isStart: state.getters.getIsStart(),
    //         isEnd: state.getters.getIsEnd(),
    //         clientSize: state.getters.getClientSize(),
    //         scrollSize: state.getters.getScrollSize(),
    //         isScrolling: state.getters.getIsScrolling(),
    //       },
    //       clientEntity: {
    //         addEventListener: this.addEventListener(state),
    //         commands: this.commands,
    //         getters: state.getters,
    //       },
    //     };
    //   };
    // },
  });
};

export { createScrolliumModules };
