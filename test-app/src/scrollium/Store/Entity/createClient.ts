import { Observer } from "./Observer";
import { ScrolliumEvents, type ScrolliumProps } from "../../types";
import { calucate } from "../../utils";
import { ScrollState } from "./ScrollState";

export function createClient(props: ScrolliumProps) {
  const observer = new Observer();
  const scroll = new ScrollState(props);

  return {
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
    getThrottle: () => {
      return scroll.throttle;
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
    setClientHeight: (height: number) => {
      scroll.clientHeight = height;
    },
    getClientHeight: () => {
      return scroll.clientHeight;
    },
    setScrollHeight: (height: number) => {
      scroll.scrollHeight = height;
    },
    getScrollHeight: () => {
      return scroll.scrollHeight;
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
