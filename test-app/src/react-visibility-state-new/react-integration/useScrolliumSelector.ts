import { useState, useSyncExternalStore } from "react";
import { createObserver } from "../core/observer";
import type { createStore } from "../Store/createStore";
import { VisibilityStoreEvents, type IEntity } from "../types";

const useVisibilitySelector = (
  {
    store,
    observer,
  }: {
    store: ReturnType<typeof createStore<IEntity>>;
    observer: ReturnType<typeof createObserver>;
  },
  id: string
) => {
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
