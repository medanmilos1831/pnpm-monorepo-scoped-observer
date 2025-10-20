import { Observer } from "./Observer";
import { ScrollModule } from "./ScrollModule";
import { ScrolliumEvents } from "../types";

export function createClient({ id }: { id: string }) {
  const observer = new Observer();
  const scroll = new ScrollModule({ id });
  return {
    setScrollPosition: (position: number) => {
      scroll.scrollPosition = position;
      observer.dispatch(ScrolliumEvents.ON_SCROLL, {
        id,
        position: (() => {
          if (position === 0) {
            return {
              isTop: true,
              isBottom: false,
            };
          }
          return position > 0 ? false : true;
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
    subscribe: (eventName: string, callback: (payload: any) => void) => {
      return observer.subscribe(eventName, callback);
    },
  };
}
