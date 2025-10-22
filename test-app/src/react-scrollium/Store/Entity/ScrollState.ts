import {
  ScrolliumAxis,
  ScrolliumDirection,
  ScrolliumEvents,
  type ScrolliumProps,
} from "../../types";
import { calculate } from "../../utils";
import { Observer } from "./Observer";

class ScrollState {
  observer = new Observer();
  axis: ScrolliumAxis;
  scrollPosition: number;
  previousScrollPosition: number = 0;
  isScrolling: boolean = false;
  scrollTimeoutId: ReturnType<typeof setTimeout> | null = null;
  id: string;
  isStart: boolean = true;
  isEnd: boolean = false;
  clientSize!: number;
  scrollSize!: number;
  progress!: number;
  element!: HTMLElement;
  direction: ScrolliumDirection = ScrolliumDirection.NONE;
  constructor({ id, axis }: ScrolliumProps) {
    this.id = id;
    this.scrollPosition = 0;
    this.previousScrollPosition = 0;
    this.progress = 0;
    this.direction = ScrolliumDirection.NONE;
    this.axis = axis as ScrolliumAxis;
  }

  setAxis = (axis: ScrolliumAxis) => {
    this.axis = axis;
    calculate(this, this.scrollPosition);
  };
  setScrollPosition = (position: number) => {
    calculate(this, position);
    if (this.scrollTimeoutId) {
      clearTimeout(this.scrollTimeoutId);
    }

    this.scrollTimeoutId = setTimeout(() => {
      this.isScrolling = false;
      this.scrollTimeoutId = null;
      this.observer.dispatch(ScrolliumEvents.ON_SCROLL_STOP);
    }, 500);

    this.observer.dispatch(ScrolliumEvents.ON_SCROLL);
  };
  getAxis = () => this.axis;
  getScrollPosition = () => this.scrollPosition;
  getPreviousScrollPosition = () => this.previousScrollPosition;
  getIsScrolling = () => this.isScrolling;
  getScrollTimeoutId = () => this.scrollTimeoutId;
  getIsStart = () => this.isStart;
  getIsEnd = () => this.isEnd;
  getProgress = () => this.progress;
  getClientSize = () => this.clientSize;
  setClientSize = (size: number) => {
    this.clientSize = size;
  };
  setScrollSize = (size: number) => {
    this.scrollSize = size;
  };
  initializeElement = (element: HTMLElement) => {
    if (element) {
      this.element = element;
      const clientSize = Math.ceil(
        element![
          this.axis === ScrolliumAxis.VERTICAL ? "clientHeight" : "clientWidth"
        ] || 0
      );
      const maxScroll = Math.ceil(
        (element![
          this.axis === ScrolliumAxis.VERTICAL ? "scrollHeight" : "scrollWidth"
        ] || 0) - (clientSize || 0)
      );
      this.setClientSize(clientSize);
      this.setScrollSize(maxScroll);
    }
  };
}

export { ScrollState };
