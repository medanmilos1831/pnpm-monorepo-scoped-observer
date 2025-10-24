import { useContext, useState, useSyncExternalStore } from "react";
import { Store } from "../Store/Store";
import { useWizardClient } from "./useWizardClient";
import { getWizardData } from "../utils";
import { WizardEvents } from "../types";

const useWizard = (
  store: Store,
  WizardContext: React.Context<{ id: string } | undefined>
) => {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("WizardContext not found");
  }
  const getters = useWizardClient(store, context.id)!;
  const [subsciber] = useState(() => (notify: () => void) => {
    return getters.subscribe(WizardEvents.ON_STEP_CHANGE, () => {
      notify();
    });
  });
  useSyncExternalStore(subsciber, getters.getActiveStep);
  return getWizardData(getters);
};

export { useWizard };
