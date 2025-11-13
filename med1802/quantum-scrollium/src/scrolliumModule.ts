import { framework } from "@med1802/quantum-ui";

import {
  type IEntityMutations,
  type IEntityGetters,
  ScrolliumDirection,
  type IEntityState,
  type ScrolliumProps,
  ScrolliumPublicEvents,
} from "./types";

export interface IModelApiClient {
  initializeElement: IEntityMutations["initializeElement"];
  style: IEntityGetters["getStyle"];
  onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  subscribe: (
    eventName: string,
    callback: (payload: any) => void
  ) => () => void;
  commands: {
    scrollTo: (options?: ScrollToOptions) => void;
    scrollToStart: (options?: ScrollOptions) => void;
    scrollToEnd: (options?: ScrollOptions) => void;
  };
  onScrollWatcher: (notify: () => void) => () => void;
  getScrollPosition: () => number;
  onScrollStopWatcher: (notify: () => void) => () => void;
  getIsScrolling: () => boolean;
  getClient: () => {
    id: string;
    scrollPosition: number;
    direction: ScrolliumDirection;
    progress: number;
    isStart: boolean;
    isEnd: boolean;
    clientSize: number;
    scrollSize: number;
  };
}
const scrolliumModule = framework.createModule<
  IEntityState,
  IEntityMutations,
  IEntityGetters,
  IModelApiClient
>({
  name: "SCROLLIUM_CLIENT",
  entity: function (props: ScrolliumProps) {
    return {
      id: props.id,
      state: {
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
          overflow: "hidden auto",
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
          setClientSize: (size: number) => {
            state.clientSize = size;
          },
          setScrollSize: (size: number) => {
            state.scrollSize = size;
          },
          initializeElement(element: HTMLElement) {
            if (element) {
              state.element = element;
              const clientSize = Math.ceil(element!.clientHeight || 0);
              const maxScroll = Math.ceil(
                (element!.scrollHeight || 0) - (clientSize || 0)
              );
              this.setClientSize(clientSize);
              this.setScrollSize(maxScroll);
            }
          },
          calculateDirection() {
            if (state.scrollPosition < state.previousScrollPosition) {
              state.direction = ScrolliumDirection.UP;
            } else {
              state.direction = ScrolliumDirection.DOWN;
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
              state.scrollSize > 0
                ? state.scrollPosition / state.scrollSize
                : 0;
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
          getScrollPosition: () => state.scrollPosition,
          getIsStart: () => state.isStart,
          getIsEnd: () => state.isEnd,
          getClientSize: () => state.clientSize,
          getScrollSize: () => state.scrollSize,
          getProgress: () => state.progress,
          getDirection: () => state.direction,
          getIsScrolling: () => state.isScrolling,
          getId: () => state.id,
          getStyle: () => state.style,
          getElement: () => state.element,
        };
      },
    };
  },
  modelApiClient(entity, dispatch, subscribe) {
    const getClient = () => {
      return {
        id: entity.getters.getId(),
        scrollPosition: entity.getters.getScrollPosition(),
        direction: entity.getters.getDirection(),
        progress: entity.getters.getProgress(),
        isStart: entity.getters.getIsStart(),
        isEnd: entity.getters.getIsEnd(),
        clientSize: entity.getters.getClientSize(),
        scrollSize: entity.getters.getScrollSize(),
        isScrolling: entity.getters.getIsScrolling(),
      };
    };
    return {
      initializeElement: (element) =>
        entity.mutations.initializeElement(element),
      style: entity.getters.getStyle,
      subscribe,
      onScroll: (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        entity.mutations.setScrollPosition(
          (e.target as HTMLDivElement).scrollTop
        );
        entity.mutations.setIsScrolling(() => {
          dispatch(ScrolliumPublicEvents.ON_SCROLL_STOP, getClient());
        });
        dispatch(ScrolliumPublicEvents.ON_SCROLL, getClient());
      },
      commands: {
        scrollTo: (options?: ScrollToOptions) => {
          entity.state.element?.scrollTo(options);
        },
        scrollToStart: (options?: ScrollOptions) => {
          entity.getters.getElement()?.scrollTo({
            top: 0,
            left: 0,
            ...options,
          });
        },
        scrollToEnd: (options?: ScrollOptions) => {
          entity.getters.getElement()?.scrollTo({
            top: entity.state.scrollSize,
            left: entity.state.scrollSize,
            ...options,
          });
        },
      },
      getClient,
      onScrollWatcher: (notify: () => void) => {
        return subscribe(ScrolliumPublicEvents.ON_SCROLL, () => {
          notify();
        });
      },
      getScrollPosition: entity.getters.getScrollPosition,
      onScrollStopWatcher: (notify: () => void) => {
        return subscribe(ScrolliumPublicEvents.ON_SCROLL_STOP, () => {
          notify();
        });
      },
      getIsScrolling: entity.getters.getIsScrolling,
    };
  },
});

export { scrolliumModule };
