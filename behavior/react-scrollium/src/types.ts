import { generateSlice } from './slice';

type ScrollObj = {
  getPosition: () => number;
  getDirection: () => 'up' | 'down' | 'none';
  isTop: () => boolean;
  isBottom: () => boolean;
  isScrolling: () => boolean;
};

type stateType = ReturnType<ReturnType<typeof generateSlice>['getState']>;

type itemsType = WeakMap<ScrollObj, ReturnType<typeof generateSlice>>;

enum SCROLL_EVENTS {
  ON_SCROLL = 'onScroll',
  ON_SCROLL_STOP = 'onScrollStop',
  ON_TOP = 'onTop',
  ON_BOTTOM = 'onBottom',
}

export { ScrollObj, stateType, itemsType, SCROLL_EVENTS };
