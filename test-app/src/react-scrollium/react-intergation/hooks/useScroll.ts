import { useState, useSyncExternalStore } from "react";
import type { Store } from "../../Store";
import { ScrolliumStoreEvents } from "../../types";
import { createClient } from "../../utils";

const useScroll = (store: Store, id: string) => {
  const client = createClient(store.getEntity(id).client);
  const [subscriber] = useState(() => {
    return (notify: () => void) => {
      return client.subscribe(
        `${ScrolliumStoreEvents.CREATE_SCROLLIUM}-${id}`,
        notify
      );
    };
  });
  const [snapshot] = useState(() => {
    return () => store.entities.size;
  });
  const entity = useSyncExternalStore(subscriber, snapshot);
  return entity ? store.getEntity(id).client : undefined;
};

export { useScroll };
