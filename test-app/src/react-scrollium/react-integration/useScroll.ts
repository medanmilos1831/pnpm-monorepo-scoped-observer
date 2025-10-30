import { useState, useSyncExternalStore } from "react";
import type { createStore } from "../Store/createStore";
import { ScrolliumPublicEvents } from "../types";

const useScroll = (store: ReturnType<typeof createStore>, id: string) => {
  const entity = store.getEntity(id);
  const getters = entity.stateManager.getters;
  const [onScroll] = useState(() => (notify: () => void) => {
    return entity.addEventListener(ScrolliumPublicEvents.ON_SCROLL, () => {
      notify();
    });
  });
  const [onScrollStop] = useState(() => (notify: () => void) => {
    return entity.addEventListener(ScrolliumPublicEvents.ON_SCROLL_STOP, () => {
      notify();
    });
  });
  useSyncExternalStore(onScroll, getters.getScrollPosition);
  useSyncExternalStore(onScrollStop, getters.getIsScrolling);
  return entity.client();
};

export { useScroll };
