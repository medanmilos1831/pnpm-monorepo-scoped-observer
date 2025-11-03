import { useState, useSyncExternalStore } from "react";
import { WizardStoreEvents, type IEntity } from "../types";
import { createStore } from "../Store/createStore";
import { createObserver } from "../core/observer";

const useWizardSelector = (
  {
    store,
    observer,
  }: {
    store: ReturnType<typeof createStore<IEntity>>;
    observer: ReturnType<typeof createObserver>;
  },
  id: string
) => {
  const [mount] = useState(() => {
    return (notify: () => void) => {
      return observer.subscribe(
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
