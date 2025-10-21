import { Observer } from "./Observer";
import {
  ScrolliumAxis,
  ScrolliumEvents,
  type ScrolliumProps,
} from "../../types";
import { calculate } from "../../utils";
import { ScrollState } from "./ScrollState";

export function createClient(props: ScrolliumProps) {
  const observer = new Observer();
  const scroll = new ScrollState(props);

  return {
    // Axis management
    getAxis: () => scroll.axis,
    setAxis: (axis: ScrolliumAxis) => {
      scroll.axis = axis;
    },

    // Scroll position and actions
    setScrollPosition(position: number) {
      calculate(scroll, position);
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
    getScrollPosition: () => scroll.scrollPosition,
    scrollTo: (options?: ScrollToOptions) => {
      scroll.element?.scrollTo(options);
    },

    // Scroll state
    getIsScrolling: () => scroll.isScrolling,
    getDirection: () => scroll.direction,
    getIsStart: () => scroll.isStart,
    getIsEnd: () => scroll.isEnd,
    getProgress: () => scroll.progress,

    // Size management
    setClientSize: (size: number) => {
      scroll.clientSize = size;
    },
    getClientSize: () => scroll.clientSize,
    setScrollSize: (size: number) => {
      scroll.scrollSize = size;
    },
    getScrollSize: () => scroll.scrollSize,
    initializeElement(element: HTMLElement) {
      if (element) {
        scroll.element = element;
        const clientSize = Math.ceil(
          element![
            props.axis === ScrolliumAxis.VERTICAL
              ? "clientHeight"
              : "clientWidth"
          ] || 0
        );
        const maxScroll = Math.ceil(
          (element![
            props.axis === ScrolliumAxis.VERTICAL
              ? "scrollHeight"
              : "scrollWidth"
          ] || 0) - (clientSize || 0)
        );
        this.setClientSize(clientSize);
        this.setScrollSize(maxScroll);
      }
    },

    // Identity and events
    getId: () => scroll.id,
    subscribe: (eventName: string, callback: (payload: any) => void) => {
      return observer.subscribe(eventName, callback);
    },
  };
}
