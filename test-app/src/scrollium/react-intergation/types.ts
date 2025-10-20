export enum ScrolliumEvents {
  ON_SCROLL = "onScroll",
}

export interface ScrolliumProps {
  id: string;
  onScroll?: (props: ScrolliumOnScrollProps) => void;
  throttle?: number;
}

export interface ScrolliumOnScrollProps {
  position: number;
  isTop: boolean;
  isBottom: boolean;
  clientHeight: number;
  scrollHeight: number;
}
