import { useState, useSyncExternalStore } from "react";
import type { createStore } from "../Store/createStore";
import { ScrolliumStoreEvents, type IEntity } from "../types";

const useScrolliumSelector = (
  store: ReturnType<typeof createStore<IEntity>>,
  id: string
) => {
  const [mount] = useState(() => {
    return (notify: () => void) => {
      return store.observer.subscribe(
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
  return store.getters.getEntityById(id).modules.clientApi().clientEntity;
};

export { useScrolliumSelector };
