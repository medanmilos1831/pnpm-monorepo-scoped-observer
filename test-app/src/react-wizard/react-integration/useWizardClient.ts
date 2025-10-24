import { useState, useSyncExternalStore } from "react";
import { Store } from "../Store/Store";
import { WizardStoreEvents } from "../types";

const useWizardClient = (
  { subscribe, getEntity, entities }: Store,
  id: string
) => {
  const [mount] = useState(() => {
    return (notify: () => void) => {
      return subscribe(`${WizardStoreEvents.CREATE_WIZARD}-${id}`, notify);
    };
  });
  const [snapshot] = useState(() => {
    return () => entities.size;
  });
  const entity = useSyncExternalStore(mount, snapshot);
  return entity ? getEntity(id)?.getters : undefined;
};

export { useWizardClient };
