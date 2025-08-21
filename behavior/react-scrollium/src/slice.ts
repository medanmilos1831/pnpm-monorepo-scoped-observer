import { createSlice } from '@scoped-observer/react-store';
import { SCROLL_EVENTS } from './types';

export function generateSlice() {
  return createSlice({
    scope: 'scroll',
    state: {
      scrollPosition: 0,
      direction: 'none' as 'up' | 'down' | 'none',
      isTop: true,
      isBottom: false,
      isScrolling: false,
    },
    onEvent: {
      [SCROLL_EVENTS.ON_SCROLL](
        state,
        payload: {
          y: number;
          direction: 'up' | 'down' | 'none';
          isTop: boolean;
          isBottom: boolean;
        }
      ) {
        return {
          ...state,
          scrollPosition: payload.y,
          direction: payload.direction,
          isTop: payload.isTop,
          isBottom: payload.isBottom,
          isScrolling: true,
        };
      },
      [SCROLL_EVENTS.ON_SCROLL_STOP](
        state,
        payload: {
          y: number;
          direction: 'up' | 'down' | 'none';
          isTop: boolean;
          isBottom: boolean;
        }
      ) {
        return {
          ...state,
          scrollPosition: payload.y,
          direction: payload.direction,
          isTop: payload.isTop,
          isBottom: payload.isBottom,
          isScrolling: false,
        };
      },
      [SCROLL_EVENTS.ON_TOP](state) {
        return {
          ...state,
          isTop: true,
          isBottom: false,
        };
      },
      [SCROLL_EVENTS.ON_BOTTOM](state) {
        return {
          ...state,
          isTop: false,
          isBottom: true,
        };
      },
    },
  });
}
