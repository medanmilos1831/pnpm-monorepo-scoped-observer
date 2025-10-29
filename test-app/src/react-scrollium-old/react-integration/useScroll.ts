import { useState, useSyncExternalStore } from "react";
import type { Store } from "../Store";
import { ScrolliumStoreEvents } from "../types";

const useScroll = (store: Store, id: string) => {
  const [subscriber] = useState(() => {
    return (notify: () => void) => {
      return store.subscribe(
        `${ScrolliumStoreEvents.CREATE_SCROLLIUM}-${id}`,
        notify
      );
    };
  });
  const [snapshot] = useState(() => {
    return () => store.entities.size;
  });
  const entity = useSyncExternalStore(subscriber, snapshot);
  return entity ? store.getEntity(id).getters : undefined;
};

export { useScroll };
