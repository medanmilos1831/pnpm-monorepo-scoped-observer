import { useState, useSyncExternalStore } from "react";
import {
  WizardInternalEvents,
  WizardPublicEvents,
  type StoreReturnType,
} from "../types";

const useWizard = (store: StoreReturnType, id: string) => {
  const entity = store.getters.getEntityById(id);
  const getters = entity.api.getGetters();
  const addEventListener = entity.api.getAddEventListener();
  const [subsciber] = useState(() => (notify: () => void) => {
    return addEventListener(WizardPublicEvents.ON_STEP_CHANGE, () => {
      notify();
    });
  });
  const [subsciberReset] = useState(() => (notify: () => void) => {
    return addEventListener(WizardPublicEvents.ON_RESET, () => {
      notify();
    });
  });
  const [subsciberUpdateSteps] = useState(() => (notify: () => void) => {
    return entity.api.getSubscribeInternal()(
      WizardInternalEvents.ON_STEPS_UPDATE,
      () => {
        notify();
      }
    );
  });
  useSyncExternalStore(subsciber, getters.getActiveStep);
  useSyncExternalStore(subsciberUpdateSteps, getters.getSteps);
  useSyncExternalStore(subsciberReset, getters.getSteps);
  return entity.api.getClient();
};

export { useWizard };
