import {
  ScrolliumAxis,
  ScrolliumDirection,
  ScrolliumEvents,
  type ScrolliumProps,
} from "../types";
import { calculate, calculateNew } from "../utils";
import { Observer } from "./Entity/Observer";

interface Slice<T> {
  data: T;
  mutations: {
    [k: string]: (this: T, ...args: any[]) => void;
  };
}
function slice(props: ScrolliumProps) {
  const data = {
    observer: new Observer(),
    axis: props.axis,
    scrollPosition: 0,
    previousScrollPosition: 0,
    isScrolling: false,
    scrollTimeoutId: null,
    id: props.id,
    isStart: true,
    isEnd: false,
    clientSize: 0,
    scrollSize: 0,
    progress: 0,
    element: null,
    direction: ScrolliumDirection.NONE,
  };
  return {
    data,
    mutations: {
      setScrollPosition(position: number) {
        // calculate(this, position);
        // if (this.scrollTimeoutId) {
        //   clearTimeout(this.scrollTimeoutId);
        // }

        // this.scrollTimeoutId = setTimeout(() => {
        //   this.isScrolling = false;
        //   this.scrollTimeoutId = null;
        //   this.observer.dispatch(ScrolliumEvents.ON_SCROLL_STOP);
        // }, 500);

        this.observer.dispatch(ScrolliumEvents.ON_SCROLL);
      },
      setAxis(axis: ScrolliumAxis) {
        this.axis = axis;
      },
      calculateDirection() {
        if (this.axis === ScrolliumAxis.HORIZONTAL) {
          if (this.scrollPosition < this.previousScrollPosition) {
            this.direction = ScrolliumDirection.LEFT;
          } else {
            this.direction = ScrolliumDirection.RIGHT;
          }
        } else {
          if (this.scrollPosition < this.previousScrollPosition) {
            this.direction = ScrolliumDirection.DOWN;
          } else {
            this.direction = ScrolliumDirection.UP;
          }
        }
      },
      calculateScrollBounds() {
        if (this.scrollPosition === 0) {
          this.isStart = true;
          this.isEnd = false;
        }
        if (this.scrollPosition === this.scrollSize) {
          this.isEnd = true;
          this.isStart = false;
        }
        if (this.scrollPosition > 0 && this.scrollPosition < this.scrollSize) {
          this.isStart = false;
          this.isEnd = false;
        }
      },
      calculateProgress() {
        const ratio =
          this.scrollSize > 0 ? this.scrollPosition / this.scrollSize : 0;
        const progress = Number((ratio * 100).toFixed(2));
        this.progress = Math.min(100, Math.max(1, progress));
      },
      createClient() {
        return {
          getScrollPosition: () => this.scrollPosition,
          getIsStart: () => this.isStart,
          getIsEnd: () => this.isEnd,
          getClientSize: () => this.clientSize,
          getScrollSize: () => this.scrollSize,
          getProgress: () => this.progress,
          getDirection: () => this.direction,
          getIsScrolling: () => this.isScrolling,
          getId: () => this.id,
          subscribe: this.observer.subscribe,
        };
      },
      calculate(position: number) {
        this.previousScrollPosition = this.scrollPosition;
        this.scrollPosition = Math.ceil(position as number);
        this.isScrolling = true;
      },
    },
  } as Slice<typeof data>;
}

export { slice };
