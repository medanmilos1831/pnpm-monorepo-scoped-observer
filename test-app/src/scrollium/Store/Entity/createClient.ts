import { Observer } from "./Observer";
import { ScrollModule } from "./ScrollModule";
import { ScrolliumDirection, ScrolliumEvents } from "../types";

export function createClient({ id }: { id: string }) {
  const observer = new Observer();
  const scroll = new ScrollModule({ id });
  return {
    setScrollPosition(position: number) {
      const previousScrollPosition = scroll.scrollPosition;
      scroll.scrollPosition = Math.ceil(position as number);
      if (scroll.scrollPosition > previousScrollPosition) {
        scroll.direction = ScrolliumDirection.DOWN;
      } else {
        scroll.direction = ScrolliumDirection.UP;
      }
      observer.dispatch(ScrolliumEvents.ON_SCROLL, {
        id,
        position: (() => {
          if (scroll.scrollPosition === 0) {
            scroll.isTop = true;
            scroll.isBottom = false;
          }
          if (scroll.scrollPosition === scroll.scrollHeight) {
            scroll.isBottom = true;
            scroll.isTop = false;
          }
          if (
            scroll.scrollPosition > 0 &&
            scroll.scrollPosition < scroll.scrollHeight
          ) {
            scroll.isTop = false;
            scroll.isBottom = false;
          }
          const ratio =
            scroll.scrollHeight > 0
              ? scroll.scrollPosition / scroll.scrollHeight
              : 0;
          const progress = Number((ratio * 100).toFixed(2));
          scroll.progress = Math.min(100, Math.max(1, progress));
          return scroll.scrollPosition;
        })(),
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
