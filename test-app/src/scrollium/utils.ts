import type { createClient } from "./Store/Entity";
import type { ScrollState } from "./Store/Entity/ScrollState";
import { ScrolliumDirection } from "./types";

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

export function calucate(scroll: ScrollState, position: number) {
  scroll.previousScrollPosition = scroll.scrollPosition;
  scroll.scrollPosition = Math.ceil(position as number);
  scroll.isScrolling = true;
  if (scroll.scrollPosition > scroll.previousScrollPosition) {
    scroll.direction = ScrolliumDirection.DOWN;
  } else {
    scroll.direction = ScrolliumDirection.UP;
  }

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
  const ratio =
    scroll.scrollSize > 0 ? scroll.scrollPosition / scroll.scrollSize : 0;
  const progress = Number((ratio * 100).toFixed(2));
  scroll.progress = Math.min(100, Math.max(1, progress));
}
