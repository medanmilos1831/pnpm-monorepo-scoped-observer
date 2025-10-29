import { useState, useSyncExternalStore } from "react";
import type { createStore } from "../Store/createStore";
import { ScrolliumEvents } from "../types";
import { getScrolliumData } from "../utils";

const useScrollPosition = (
  store: ReturnType<typeof createStore>,
  id: string
) => {
  const entity = store.getEntity(id);
  const getters = entity.stateManager.getters;
  const [subsciber] = useState(() => (notify: () => void) => {
    return getters.subscribe(ScrolliumEvents.ON_SCROLL, () => {
      notify();
    });
  });
  const [subsciberStop] = useState(() => (notify: () => void) => {
    return getters.subscribe(ScrolliumEvents.ON_SCROLL_STOP, () => {
      notify();
    });
  });
  useSyncExternalStore(subsciber, getters.getScrollPosition);
  useSyncExternalStore(subsciberStop, getters.getIsScrolling);
  return getScrolliumData(getters);
};

export { useScrollPosition };
