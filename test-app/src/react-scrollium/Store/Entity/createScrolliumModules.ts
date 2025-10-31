import {
  ScrolliumAxis,
  ScrolliumPublicEvents,
  type ScrolliumPublicEventsType,
} from "../../types";
import { createModuleInstance } from "../../core/createModuleInstance";
import type { createScrolliumState } from "./createScrolliumState";

const createScrolliumModules = (
  state: ReturnType<typeof createScrolliumState>
) => {
  return createModuleInstance(state, {
    scroll(state) {
      return {
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
    commands(state) {
      return {
        scrollTo: (options?: ScrollToOptions) => {
          state.state.element?.scrollTo(options);
        },
        scrollToStart: (options?: ScrollOptions) => {
          const scrollPro =
            state.state.axis === ScrolliumAxis.VERTICAL ? "top" : "left";
          state.state.element?.scrollTo({
            [scrollPro]: 0,
            ...options,
          });
        },
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
    addEventListener(state) {
      return (
        event: `${ScrolliumPublicEventsType}`,
        callback: (payload: any) => void
      ) => {
        return state.observer.subscribe(event, ({ payload }) => {
          callback(payload);
        });
      };
    },
    clientApi(state) {
      return () => {
        return {
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
