import { useState, useSyncExternalStore } from "react";
import { ScrolliumStoreEvents } from "../types";
import type { createStore } from "../Store/createStore";

const useScrollClient = (store: ReturnType<typeof createStore>, id: string) => {
  const [mount] = useState(() => {
    return (notify: () => void) => {
      return store.subscribe(
        `${ScrolliumStoreEvents.CREATE_SCROLLIUM}-${id}`,
        notify
      );
    };
  });
  const [snapshot] = useState(() => {
    return () => store.entities.has(id);
  });
  useSyncExternalStore(mount, snapshot);
  if (!store.getEntity(id)) return undefined;
  return store.getEntityClient(id);
};

export { useScrollClient };
