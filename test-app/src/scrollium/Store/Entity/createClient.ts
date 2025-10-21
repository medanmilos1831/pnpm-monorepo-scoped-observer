import { Observer } from "./Observer";
import { ScrolliumEvents, type ScrolliumProps } from "../../types";
import { calucate } from "../../utils";
import { ScrollState } from "./ScrollState";

export function createClient(props: ScrolliumProps) {
  const observer = new Observer();
  const scroll = new ScrollState(props);

  return {
    getAxis: () => {
      return scroll.axis;
    },
    setScrollPosition(position: number) {
      calucate(scroll, position);
      if (scroll.scrollTimeoutId) {
        clearTimeout(scroll.scrollTimeoutId);
      }

      scroll.scrollTimeoutId = setTimeout(() => {
        scroll.isScrolling = false;
        scroll.scrollTimeoutId = null;
        observer.dispatch(ScrolliumEvents.ON_SCROLL_STOP);
      }, 500);

      observer.dispatch(ScrolliumEvents.ON_SCROLL);
    },
    getId: () => {
      return scroll.id;
    },
    getIsScrolling: () => {
      return scroll.isScrolling;
    },
    getDirection: () => {
      return scroll.direction;
    },
    scrollTo: (options?: ScrollToOptions) => {},
    getScrollPosition: () => {
      return scroll.scrollPosition;
    },
    setClientSize: (height: number) => {
      scroll.clientSize = height;
    },
    getClientSize: () => {
      return scroll.clientSize;
    },
    setScrollSize: (height: number) => {
      scroll.scrollSize = height;
    },
    getScrollSize: () => {
      return scroll.scrollSize;
    },
    getIsTop: () => {
      return scroll.isTop;
    },
    getIsBottom: () => {
      return scroll.isBottom;
    },
    getProgress: () => {
      return scroll.progress;
    },
    subscribe: (eventName: string, callback: (payload: any) => void) => {
      return observer.subscribe(eventName, callback);
    },
  };
}
