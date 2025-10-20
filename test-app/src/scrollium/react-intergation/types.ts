export enum ScrolliumEvents {
  ON_SCROLL = "onScroll",
}

export interface ScrolliumProps {
  id: string;
  onScroll?: (props: any) => void;
}
