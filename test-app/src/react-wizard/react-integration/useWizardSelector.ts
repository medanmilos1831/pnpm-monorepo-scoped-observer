import { useState, useSyncExternalStore } from "react";
import { WizardStoreEvents, type StoreReturnType } from "../types";

const useWizardSelector = (store: StoreReturnType, id: string) => {
  const [mount] = useState(() => {
    return (notify: () => void) => {
      return store.observer.subscribe(
        `${WizardStoreEvents.CREATE_WIZARD}-${id}`,
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

export { useWizardSelector };
