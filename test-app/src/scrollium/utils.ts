import type { createClient } from "./Store/Entity";

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
  }, 16); // ~60fps
}
