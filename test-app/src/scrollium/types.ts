export enum ScrolliumStoreEvents {
  CREATE_SCROLLIUM = "createScrollium",
}

export const SCROLLIUM_STORE_SCOPE = "scrollium-store" as const;
export const SCROLLIUM_SCOPE = "scrollium" as const;

export enum ScrolliumEvents {
  ON_SCROLL = "onScroll",
  ON_SCROLL_STOP = "onScrollStop",
}

export enum ScrolliumDirection {
  UP = "up",
  DOWN = "down",
  NONE = "none",
}

export enum ScrolliumAxis {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}
export interface ScrolliumProps {
  id: string;
  onScroll?: (props: ScrolliumOnScrollProps) => void;
  axis?: `${ScrolliumAxis}`;
}

export interface ScrolliumOnScrollProps {
  scrollPosition: number;
  isTop: boolean;
  isBottom: boolean;
  clientSize: number;
  scrollSize: number;
  progress: number;
  direction: ScrolliumDirection;
  id: string;
}
