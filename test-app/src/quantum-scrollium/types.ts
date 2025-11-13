export enum ScrolliumDirection {
  UP = "up",
  DOWN = "down",
  NONE = "none",
}
export interface ScrolliumProps {
  id: string;
  onScroll?: (params: any) => void;
}
export interface ScrolliumProps {
  id: string;
  onScroll?: (params: any) => void;
}

export enum ScrolliumPublicEvents {
  ON_SCROLL = "onScroll",
  ON_SCROLL_STOP = "onScrollStop",
}

export interface IEntityState {
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

export interface IEntityMutations {
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

export interface IEntityGetters {
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
