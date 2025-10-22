import { useState, useSyncExternalStore } from "react";
import type { Store } from "../Store";
import { ScrolliumStoreEvents } from "../types";
import { createClient } from "../utils";

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
  return entity ? store.getEntity(id).client.getters : undefined;
};

export { useScroll };
