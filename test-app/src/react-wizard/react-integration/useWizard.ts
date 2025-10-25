import { useState, useSyncExternalStore } from "react";
import { Store } from "../Store/Store";
import { WizardEvents } from "../types";
import { getWizardData } from "../utils";
import { useWizardClient } from "./useWizardClient";

const useWizard = (store: Store, id: string) => {
  const getters = useWizardClient(store, id)!;
  const [subsciber] = useState(() => (notify: () => void) => {
    return getters.subscribe(WizardEvents.ON_STEP_CHANGE, () => {
      notify();
    });
  });
  useSyncExternalStore(subsciber, getters.getActiveStep);
  return getWizardData(getters);
};

export { useWizard };
