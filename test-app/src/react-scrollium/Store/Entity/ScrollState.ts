import {
  ScrolliumAxis,
  ScrolliumDirection,
  type ScrolliumProps,
} from "../../types";

class ScrollState {
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
}

export { ScrollState };
