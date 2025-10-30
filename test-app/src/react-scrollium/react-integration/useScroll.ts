import { useState, useSyncExternalStore } from "react";
import type { createStore } from "../Store/createStore";
import { ScrolliumEvents } from "../types";

const useScroll = (store: ReturnType<typeof createStore>, id: string) => {
  const entity = store.getEntity(id);
  const getters = entity.stateManager.getters;
  const [onScroll] = useState(() => (notify: () => void) => {
    return entity.addEventListener(ScrolliumEvents.ON_SCROLL, () => {
      console.log("onScroll");
      notify();
    });
  });
  const [onScrollStop] = useState(() => (notify: () => void) => {
    return entity.addEventListener(ScrolliumEvents.ON_SCROLL_STOP, () => {
      notify();
    });
  });
  useSyncExternalStore(onScroll, getters.getScrollPosition);
  useSyncExternalStore(onScrollStop, getters.getIsScrolling);
  // const entity = store.getEntity(id);
  // const getters = entity.stateManager.getters;
  // const [subsciber] = useState(() => (notify: () => void) => {
  //   return getters.subscribe(ScrolliumEvents.ON_SCROLL, () => {
  //     notify();
  //   });
  // });
  // const [subsciberStop] = useState(() => (notify: () => void) => {
  //   return getters.subscribe(ScrolliumEvents.ON_SCROLL_STOP, () => {
  //     notify();
  //   });
  // });
  // useSyncExternalStore(subsciber, getters.getScrollPosition);
  // useSyncExternalStore(subsciberStop, getters.getIsScrolling);
  return {};
};

export { useScroll };
