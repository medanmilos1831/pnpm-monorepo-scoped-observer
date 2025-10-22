import { useContext, useState, useSyncExternalStore } from "react";
import { ScrolliumClientContext } from "../ScrolliumClientProvider";
import { ScrolliumStoreEvents } from "../../types";
import type { Store } from "../../Store";

const useScroll = (store: Store, id: string) => {
  const client = store.getEntity(id).client;
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
