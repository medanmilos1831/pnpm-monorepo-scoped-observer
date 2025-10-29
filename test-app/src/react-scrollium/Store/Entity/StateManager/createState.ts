import {
  ScrolliumDirection,
  type ScrolliumAxis,
  type ScrolliumProps,
} from "../../../types";

export function createState(props: ScrolliumProps) {
  return {
    axis: props.axis as ScrolliumAxis,
    scrollPosition: 0,
    previousScrollPosition: 0,
    isScrolling: false,
    scrollTimeoutId: null as number | null,
    id: props.id,
    isStart: true,
    isEnd: false,
    clientSize: 0 as number,
    scrollSize: 0 as number,
    progress: 0 as number,
    direction: ScrolliumDirection.NONE,
    element: null as HTMLElement | null,
  };
}
