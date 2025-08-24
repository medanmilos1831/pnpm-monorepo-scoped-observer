type ScrollApi = {
  getPosition: () => number;
  getDirection: () => 'up' | 'down' | 'none';
  isTop: () => boolean;
  isBottom: () => boolean;
  isScrolling: () => boolean;
  scrollTop: (options?: ScrollToOptions) => void;
  elementHeight: () => number;
  scrollableHeight: () => number;
  scrollHeight: () => number;
  getProgress: () => number;
};

enum SCROLL_EVENTS {
  ON_SCROLL = 'onScroll',
  ON_SCROLL_STOP = 'onScrollStop',
  ON_TOP = 'onTop',
  ON_BOTTOM = 'onBottom',
  ON_CHANGE = 'onChange',
}

type configType = {
  throttleDelay?: number;
  scrollPosition?: number;
  behavior?: ScrollBehavior;
};
type configDefaultType = {
  throttleDelay: number;
  scrollPosition: number;
  behavior?: ScrollBehavior;
};

export { ScrollApi, SCROLL_EVENTS, configType, configDefaultType };
