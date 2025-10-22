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
    setScrollPosition: (this: any, position: number) => void;
    setAxis: (this: any, axis: ScrolliumAxis) => void;
    calculateDirection: (this: any) => void;
    calculateScrollBounds: () => void;
    calculateProgress: (this: any) => void;
    createClient: (this: any) => void;
    calculate: (this: any, position: number) => void;
  };
}
function slice(props: ScrolliumProps) {
  return {
    data: {
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
    },
    mutations: {
      setScrollPosition(this: any, position: number) {
        // this.mutations.calculate(position);
        // if (this.data.scrollTimeoutId) {
        //   clearTimeout(this.data.scrollTimeoutId);
        // }

        // this.data.scrollTimeoutId = setTimeout(() => {
        //   this.data.isScrolling = false;
        //   this.data.scrollTimeoutId = null;
        //   this.data.observer.dispatch(ScrolliumEvents.ON_SCROLL_STOP);
        // }, 500) as any;

        // this.data.observer.dispatch(ScrolliumEvents.ON_SCROLL);
      },
      setAxis(axis: ScrolliumAxis) {
        this.data.axis = axis;
      },
      calculateDirection() {
        if (this.data.axis === ScrolliumAxis.HORIZONTAL) {
          if (this.data.scrollPosition < this.data.previousScrollPosition) {
            this.data.direction = ScrolliumDirection.LEFT;
          } else {
            this.data.direction = ScrolliumDirection.RIGHT;
          }
        } else {
          if (this.data.scrollPosition < this.data.previousScrollPosition) {
            this.data.direction = ScrolliumDirection.DOWN;
          } else {
            this.data.direction = ScrolliumDirection.UP;
          }
        }
      },
      calculateScrollBounds() {
        // if (this.data.scrollPosition === 0) {
        //   this.data.isStart = true;
        //   this.data.isEnd = false;
        // }
        // if (this.data.scrollPosition === this.data.scrollSize) {
        //   this.data.isEnd = true;
        //   this.data.isStart = false;
        // }
        // if (
        //   this.data.scrollPosition > 0 &&
        //   this.data.scrollPosition < this.data.scrollSize
        // ) {
        //   this.data.isStart = false;
        //   this.data.isEnd = false;
        // }
      },
      calculateProgress() {
        const ratio =
          this.data.scrollSize > 0
            ? this.data.scrollPosition / this.data.scrollSize
            : 0;
        const progress = Number((ratio * 100).toFixed(2));
        this.data.progress = Math.min(100, Math.max(1, progress));
      },
      createClient() {
        return {
          getScrollPosition: () => this.data.scrollPosition,
          getIsStart: () => this.data.isStart,
          getIsEnd: () => this.data.isEnd,
          getClientSize: () => this.data.clientSize,
          getScrollSize: () => this.data.scrollSize,
          getProgress: () => this.data.progress,
          getDirection: () => this.data.direction,
          getIsScrolling: () => this.data.isScrolling,
          getId: () => this.data.id,
          subscribe: this.data.observer.subscribe,
        };
      },
      calculate(position: number) {
        this.data.previousScrollPosition = this.data.scrollPosition;
        this.data.scrollPosition = Math.ceil(position as number);
        this.data.isScrolling = true;
        this.mutations.calculateDirection();
        this.mutations.calculateScrollBounds();
        this.mutations.calculateProgress();
      },
    },
  } as Slice<any>;
}

export { slice };
