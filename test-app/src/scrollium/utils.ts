import type { createClient, ScrollModule } from "./Store/Entity";

export function getScrolliumData(client: ReturnType<typeof createClient>) {
  return {
    scrollPosition: client.getScrollPosition(),
    isTop: client.getIsTop(),
    isBottom: client.getIsBottom(),
    clientHeight: client.getClientHeight(),
    scrollHeight: client.getScrollHeight(),
    progress: client.getProgress(),
    direction: client.getDirection(),
    id: client.getId(),
  };
}

export function throttle<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let lastCall = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
}

export function createScrollHandler(
  client: any,
  onScroll?: (data: any) => void
) {
  return throttle((e: React.UIEvent<HTMLDivElement>) => {
    client?.setScrollPosition((e.target as HTMLDivElement).scrollTop);
    if (onScroll) {
      onScroll(getScrolliumData(client));
    }
  }, client.getThrottle());
}

export function calucate(scroll: ScrollModule) {
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
  const ratio =
    scroll.scrollHeight > 0 ? scroll.scrollPosition / scroll.scrollHeight : 0;
  const progress = Number((ratio * 100).toFixed(2));
  scroll.progress = Math.min(100, Math.max(1, progress));
}
