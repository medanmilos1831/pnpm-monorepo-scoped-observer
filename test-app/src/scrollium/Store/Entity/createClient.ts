import { Observer } from "./Observer";
import { ScrollModule } from "./ScrollModule";
import { ScrolliumDirection, ScrolliumEvents } from "../types";
import type { ScrolliumProps } from "../../react-intergation/types";

export function createClient(props: ScrolliumProps) {
  const observer = new Observer();
  const scroll = new ScrollModule(props);
  return {
    setScrollPosition(position: number) {
      const previousScrollPosition = scroll.scrollPosition;
      scroll.scrollPosition = Math.ceil(position as number);
      if (scroll.scrollPosition > previousScrollPosition) {
        scroll.direction = ScrolliumDirection.DOWN;
      } else {
        scroll.direction = ScrolliumDirection.UP;
      }
      scroll.calucate();
      observer.dispatch(ScrolliumEvents.ON_SCROLL, {
        id: props.id,
        position: scroll.scrollPosition,
        direction: scroll.direction,
        isTop: scroll.isTop,
        isBottom: scroll.isBottom,
        clientHeight: scroll.clientHeight,
        scrollHeight: scroll.scrollHeight,
        progress: scroll.progress,
      });
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
