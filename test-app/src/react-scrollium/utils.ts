import type { ScrollState } from "./Store/Entity/ScrollState";
import { ScrolliumAxis, ScrolliumDirection } from "./types";

function calculateDirection(scroll: ScrollState) {
  if (scroll.axis === ScrolliumAxis.HORIZONTAL) {
    if (scroll.scrollPosition < scroll.previousScrollPosition) {
      scroll.direction = ScrolliumDirection.LEFT;
    } else {
      scroll.direction = ScrolliumDirection.RIGHT;
    }
  } else {
    if (scroll.scrollPosition < scroll.previousScrollPosition) {
      scroll.direction = ScrolliumDirection.DOWN;
    } else {
      scroll.direction = ScrolliumDirection.UP;
    }
  }
}

function calculateScrollBounds(scroll: ScrollState) {
  if (scroll.scrollPosition === 0) {
    scroll.isStart = true;
    scroll.isEnd = false;
  }
  if (scroll.scrollPosition === scroll.scrollSize) {
    scroll.isEnd = true;
    scroll.isStart = false;
  }
  if (scroll.scrollPosition > 0 && scroll.scrollPosition < scroll.scrollSize) {
    scroll.isStart = false;
    scroll.isEnd = false;
  }
}

function calculateProgress(scroll: ScrollState) {
  const ratio =
    scroll.scrollSize > 0 ? scroll.scrollPosition / scroll.scrollSize : 0;
  const progress = Number((ratio * 100).toFixed(2));
  scroll.progress = Math.min(100, Math.max(1, progress));
}

export function createClient(scroll: ScrollState) {
  return {
    getScrollPosition: () => scroll.scrollPosition,
    getIsStart: () => scroll.isStart,
    getIsEnd: () => scroll.isEnd,
    getClientSize: () => scroll.clientSize,
    getScrollSize: () => scroll.scrollSize,
    getProgress: () => scroll.progress,
    getDirection: () => scroll.direction,
    getIsScrolling: () => scroll.isScrolling,
    getId: () => scroll.id,
    subscribe: scroll.observer.subscribe,
  };
}

export function getScrolliumData(client: ReturnType<typeof createClient>) {
  return {
    scrollPosition: client.getScrollPosition(),
    isStart: client.getIsStart(),
    isEnd: client.getIsEnd(),
    clientSize: client.getClientSize(),
    scrollSize: client.getScrollSize(),
    progress: client.getProgress(),
    direction: client.getDirection(),
    isScrolling: client.getIsScrolling(),
    id: client.getId(),
  };
}

export function calculate(scroll: ScrollState, position: number) {
  scroll.previousScrollPosition = scroll.scrollPosition;
  scroll.scrollPosition = Math.ceil(position as number);
  scroll.isScrolling = true;
  calculateDirection(scroll);
  calculateScrollBounds(scroll);
  calculateProgress(scroll);
}
