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
}

type configType = {
  scrollPosition?: number;
  behaviour?: ScrollBehavior;
  throttle?: number;
  stopDelay?: number;
};
type configDefaultType = {
  scrollPosition: number;
  behaviour: ScrollBehavior;
  throttle: number;
  stopDelay: number;
};

export { ScrollApi, SCROLL_EVENTS, configType, configDefaultType };
