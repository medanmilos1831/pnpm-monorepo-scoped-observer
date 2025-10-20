import { Observer } from "./Observer";
import { ScrolliumDirection, ScrolliumEvents } from "../types";
import type { ScrolliumProps } from "../../react-intergation/types";
import { calucate } from "../../utils";
import { ScrollState } from "./ScrollState";

export function createClient(props: ScrolliumProps) {
  const observer = new Observer();
  const scroll = new ScrollState(props);

  return {
    setScrollPosition(position: number) {
      scroll.previousScrollPosition = scroll.scrollPosition;
      scroll.scrollPosition = Math.ceil(position as number);
      calucate(scroll);
      observer.dispatch(ScrolliumEvents.ON_SCROLL);
    },
    getId: () => {
      return scroll.id;
    },
    getThrottle: () => {
      return scroll.throttle;
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
