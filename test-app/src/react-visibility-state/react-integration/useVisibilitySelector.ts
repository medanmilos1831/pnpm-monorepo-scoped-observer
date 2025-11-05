import { useState, useSyncExternalStore } from "react";
import { VisibilityStoreEvents } from "../types";
import { frameworkAPI } from "../framework/framework";

const useVisibilitySelector = (id: string) => {
  const store = frameworkAPI.getStore();
  const observer = frameworkAPI.getStoreObserver();
  const [mount] = useState(() => {
    return (notify: () => void) => {
      return observer.subscribe(
        `${VisibilityStoreEvents.CREATE_VISIBILITY}-${id}`,
        notify
      );
    };
  });
  const [snapshot] = useState(() => {
    return () => store.getters.hasEntity(id);
  });
  useSyncExternalStore(mount, snapshot);
  if (!store.getters.hasEntity(id)) return undefined;
  return store.getters.getEntityById(id).api.getClientEntity();
};

export { useVisibilitySelector };
