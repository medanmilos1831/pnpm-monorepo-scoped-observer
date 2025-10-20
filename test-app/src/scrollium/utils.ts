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
