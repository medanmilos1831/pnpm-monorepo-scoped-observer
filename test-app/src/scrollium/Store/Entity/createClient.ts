import { Observer } from "./Observer";
import { ScrollModule } from "./ScrollModule";
import { ScrolliumEvents } from "../types";

export function createClient({ id }: { id: string }) {
  const observer = new Observer();
  const scroll = new ScrollModule({ id });
  return {
    setScrollPosition: (position: number) => {
      scroll.scrollPosition = position;
      observer.dispatch(ScrolliumEvents.ON_SCROLL, { id, position });
    },
    getScrollPosition: () => {
      return scroll.scrollPosition;
    },
    subscribe: (eventName: string, callback: (payload: any) => void) => {
      return observer.subscribe(eventName, callback);
    },
  };
}
