import { useState, useSyncExternalStore } from "react";
import { Store } from "../Store/Store";
import { WizardStoreEvents } from "../types";
import { getWizardData } from "../utils";

const useWizardClient = (store: Store, id: string) => {
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
  return {
    ...store.getEntity(id).getters,
    addEventListener: store.getEntity(id).addEventListener,
  };
};

export { useWizardClient };
