import { useState, useSyncExternalStore } from "react";
import { createStore } from "../Store/createStore";
import { WizardStoreEvents, type IEntity } from "../types";

const useWizardSelector = (
  store: ReturnType<typeof createStore<IEntity>>,
  id: string
) => {
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
  return store.getters.getEntityById(id).modules.clientApi().clientEntity;
};

export { useWizardSelector };
