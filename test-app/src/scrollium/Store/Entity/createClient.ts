import { Observer } from "./Observer";
import { ScrollModule } from "./ScrollModule";
import { ScrolliumEvents } from "../types";

export function createClient({ id }: { id: string }) {
  const observer = new Observer();
  const scroll = new ScrollModule({ id });
  return {
    setScrollPosition(position: number) {
      scroll.scrollPosition = Math.ceil(position as number);

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
          return scroll.scrollPosition;
        })(),
      });
    },
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
    subscribe: (eventName: string, callback: (payload: any) => void) => {
      return observer.subscribe(eventName, callback);
    },
  };
}
