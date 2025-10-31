import { useState, useSyncExternalStore } from "react";
import type { createStoreNew } from "../Store/createStoreNew";
import { ScrolliumStoreEvents, type IEntity } from "../types";

const useScrolliumSelector = (
  storeNew: ReturnType<typeof createStoreNew<IEntity>>,
  id: string
) => {
  const [mount] = useState(() => {
    return (notify: () => void) => {
      return storeNew.observer.subscribe(
        `${ScrolliumStoreEvents.CREATE_SCROLLIUM}-${id}`,
        notify
      );
    };
  });
  const [snapshot] = useState(() => {
    return () => storeNew.getters.hasEntity(id);
  });
  useSyncExternalStore(mount, snapshot);
  if (!storeNew.getters.hasEntity(id)) return undefined;
  return storeNew.getters.getEntityById(id).modules.clientApi().clientEntity;
};

export { useScrolliumSelector };
