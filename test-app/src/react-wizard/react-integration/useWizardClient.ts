import { useState, useSyncExternalStore } from "react";
import { createStore } from "../Store/createStore";
import { WizardStoreEvents } from "../types";

const useWizardClient = (store: ReturnType<typeof createStore>, id: string) => {
  const [mount] = useState(() => {
    return (notify: () => void) => {
      return store.subscribe(
        `${WizardStoreEvents.CREATE_WIZARD}-${id}`,
        notify
      );
    };
  });
  const [snapshot] = useState(() => {
    return () => store.entities.has(id);
  });
  useSyncExternalStore(mount, snapshot);
  if (!store.getEntity(id)) return undefined;
  const entity = store.getEntity(id);
  return {
    ...entity.getters,
    addEventListener: entity.addEventListener,
  };
};

export { useWizardClient };
