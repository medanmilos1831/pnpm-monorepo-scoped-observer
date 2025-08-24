import { createSlice } from '@scoped-observer/react-store';
import {
  configDefaultType,
  configType,
  SCROLL_EVENTS,
  ScrollApi,
} from './types';

const defaultConfig: Required<
  Pick<configType, 'throttleDelay' | 'scrollPosition' | 'behavior'>
> = {
  throttleDelay: 16,
  scrollPosition: 0,
  behavior: 'smooth',
};

export class ScrollInstance {
  store;
  api: ScrollApi;

  constructor(name: string, config?: configType) {
    let self = this;

    const mergedConfig: configDefaultType = { ...defaultConfig, ...config };

    this.store = createSlice({
      scope: name,
      state: {
        ...mergedConfig,
        progress: 0,
        direction: 'none' as 'up' | 'down' | 'none',
        isTop: true,
        isBottom: false,
        isScrolling: false,
        element: null as null | HTMLDivElement,
        elementHeight: 0,
        scrollableHeight: 0,
        scrollHeight: 0,
        lastCallRef: 0,
        lastYRef: 0,
        stopTimerRef: null as ReturnType<typeof setTimeout> | null,
      },
      onEvent: {
        [SCROLL_EVENTS.ON_SCROLL](state, payload: any) {
          return { ...state, ...payload, isScrolling: true };
        },
        [SCROLL_EVENTS.ON_SCROLL_STOP](state, payload: any) {
          return { ...state, ...payload, isScrolling: false };
        },
        [SCROLL_EVENTS.ON_TOP](state) {
          return { ...state, isTop: true, isBottom: false };
        },
        [SCROLL_EVENTS.ON_BOTTOM](state) {
          return { ...state, isTop: false, isBottom: true };
        },
        onMount(state, payload) {
          return { ...state, ...payload };
        },
        onChange(
          state,
          {
            key,
            value,
          }: {
            key: keyof configDefaultType;
            value: number | ScrollBehavior;
          }
        ) {
          if (key === 'scrollPosition') {
            self.api.scrollTop({
              top: value as number,
            });
            return { ...state, scrollPosition: value as number };
          }

          if (key === 'throttleDelay') {
            self.store.getState().throttleDelay = value as number;
            return state;
          }

          if (key === 'behavior') {
            self.store.getState().behavior = value as ScrollBehavior;
            return state;
          }
          return state;
        },
      },
    });

    this.api = {
      getPosition: () => this.store.getState().scrollPosition,
      getDirection: () => this.store.getState().direction,
      isTop: () => this.store.getState().isTop,
      isBottom: () => this.store.getState().isBottom,
      isScrolling: () => this.store.getState().isScrolling,
      elementHeight: () => this.store.getState().elementHeight,
      scrollableHeight: () => this.store.getState().scrollableHeight,
      scrollHeight: () => this.store.getState().scrollHeight,
      getProgress: () => this.store.getState().progress,
      scrollTop: (options?: ScrollToOptions) => {
        this.store
          .getState()
          .element?.scrollTo({
            top: 0,
            behavior: this.store.getState().behavior,
            ...options,
          });
      },
    };
  }
}
