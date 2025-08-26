import { createSlice } from '@scoped-observer/react-store';
import { configDefaultType, SCROLL_EVENTS, ScrollApi } from './types';

export class ScrollInstance {
  store;
  api: ScrollApi;

  constructor(name: string, config: configDefaultType) {
    let self = this;

    this.store = createSlice({
      scope: name,
      state: {
        ...config,
        progress: 0,
        direction: 'none' as 'up' | 'down' | 'none',
        isTop: true,
        isBottom: false,
        isScrolling: false,
        element: null as null | HTMLDivElement,
        elementHeight: 0,
        scrollableHeight: 0,
        scrollHeight: 0,
        lastYRef: 0,
      },
      onEvent: {
        [SCROLL_EVENTS.ON_SCROLL](state, payload: any) {
          return { ...state, ...payload };
        },
        [SCROLL_EVENTS.ON_SCROLL_STOP](state, payload: any) {
          return { ...state, ...payload };
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

          if (key === 'behaviour') {
            return { ...state, behaviour: value as ScrollBehavior };
          }

          // THROTTLE I DELAY

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
        this.store.getState().element?.scrollTo({
          top: 0,
          behavior: this.store.getState().behaviour,
          ...options,
        });
      },
    };
    // console.log('state', this.store.getState());
  }
}
