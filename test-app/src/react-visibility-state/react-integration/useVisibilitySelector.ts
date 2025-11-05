import { useState, useSyncExternalStore } from "react";
import { VisibilityStoreEvents } from "../types";

const useVisibilitySelector = (
  { store, observer }: any,

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
