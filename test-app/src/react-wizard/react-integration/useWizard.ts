import { useState, useSyncExternalStore } from "react";
import { Store } from "../Store/Store";
import { WizardEvents } from "../types";
import { getWizardData } from "../utils";

const useWizard = (store: Store, id: string) => {
  const entity = store.getEntity(id);
  const [subsciber] = useState(() => (notify: () => void) => {
    return entity.addEventListener(WizardEvents.ON_STEP_CHANGE, () => {
      notify();
    });
  });
  useSyncExternalStore(subsciber, entity.getters.getActiveStep);
  return getWizardData(entity.getters);
};

export { useWizard };
