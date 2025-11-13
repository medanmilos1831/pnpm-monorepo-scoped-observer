import { framework } from "@med1802/quantum-ui";
import {
  ScrolliumDirection,
  ScrolliumPublicEvents,
  type ScrolliumProps,
} from "./types";

interface IEntityState {
  scrollPosition: number;
  previousScrollPosition: number;
  isScrolling: boolean;
  scrollTimeoutId: number | null;
  id: string;
  isStart: boolean;
  isEnd: boolean;
  clientSize: number;
  scrollSize: number;
  progress: number;
  direction: ScrolliumDirection;
  element: HTMLElement | null;
  style: React.CSSProperties;
}

interface IEntityMutations {
  setScrollPosition: (position: number) => void;
  setIsScrolling: (callback?: () => void) => void;
  setClientSize: (size: number) => void;
  setScrollSize: (size: number) => void;
  initializeElement: (element: HTMLElement) => void;
  calculateDirection: () => void;
  calculateScrollBounds: () => void;
  calculateProgress: () => void;
  calculate: (position: number) => void;
  cleanup: () => void;
}

interface IEntityGetters {
  getScrollPosition: () => number;
  getIsStart: () => boolean;
  getIsEnd: () => boolean;
  getClientSize: () => number;
  getScrollSize: () => number;
  getProgress: () => number;
  getDirection: () => ScrolliumDirection;
  getIsScrolling: () => boolean;
  getId: () => string;
  getStyle: () => React.CSSProperties;
  getElement: () => HTMLElement | null;
}

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
          console.log(entity.getters.getElement());
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
