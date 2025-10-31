import { useState, useSyncExternalStore } from "react";

import { type IEntity, ScrolliumPublicEvents } from "../types";
import type { createStore } from "../Store/createStore";

const useScroll = (
  store: ReturnType<typeof createStore<IEntity>>,
  id: string
) => {
  const entity = store.getters.getEntityById(id);
  const getters = entity.stateManager.getters;
  const [onScroll] = useState(() => (notify: () => void) => {
    return entity.modules.addEventListener(
      ScrolliumPublicEvents.ON_SCROLL,
      () => {
        notify();
      }
    );
  });
  const [onScrollStop] = useState(() => (notify: () => void) => {
    return entity.modules.addEventListener(
      ScrolliumPublicEvents.ON_SCROLL_STOP,
      () => {
        notify();
      }
    );
  });
  useSyncExternalStore(onScroll, getters.getScrollPosition);
  useSyncExternalStore(onScrollStop, getters.getIsScrolling);
  return entity.modules.clientApi().client;
};

export { useScroll };
