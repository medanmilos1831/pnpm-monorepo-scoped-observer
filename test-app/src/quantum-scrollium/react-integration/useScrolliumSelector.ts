import { useState, useSyncExternalStore } from "react";
import type { createStore } from "../Store/createStore";
import { ScrolliumStoreEvents, type IEntity } from "../types";
import { createObserver } from "../core/observer";

const useScrolliumSelector = (
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
        `${ScrolliumStoreEvents.CREATE_SCROLLIUM}-${id}`,
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

export { useScrolliumSelector };
