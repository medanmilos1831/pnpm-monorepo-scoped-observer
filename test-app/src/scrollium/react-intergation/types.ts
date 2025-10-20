import type { ScrolliumDirection } from "../Store/types";

export enum ScrolliumEvents {
  ON_SCROLL = "onScroll",
  ON_SCROLL_STOP = "onScrollStop",
}

export interface ScrolliumProps {
  id: string;
  onScroll?: (props: ScrolliumOnScrollProps) => void;
  throttle?: number;
}

export interface ScrolliumOnScrollProps {
  scrollPosition: number;
  isTop: boolean;
  isBottom: boolean;
  clientHeight: number;
  scrollHeight: number;
  progress: number;
  direction: ScrolliumDirection;
  id: string;
}
