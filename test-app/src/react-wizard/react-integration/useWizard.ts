import { useState, useSyncExternalStore } from "react";
import { createStore } from "../Store/createStore";
import {
  WizardInternalEvents,
  WizardPublicEvents,
  type IEntity,
} from "../types";

const useWizard = (
  store: ReturnType<typeof createStore<IEntity>>,
  id: string
) => {
  const entity = store.getters.getEntityById(id);
  const getters = entity.stateManager.getters;
  const [subsciber] = useState(() => (notify: () => void) => {
    return entity.modules.addEventListener(
      WizardPublicEvents.ON_STEP_CHANGE,
      () => {
        notify();
      }
    );
  });
  const [subsciberReset] = useState(() => (notify: () => void) => {
    return entity.modules.addEventListener(WizardPublicEvents.ON_RESET, () => {
      notify();
    });
  });
  const [subsciberUpdateSteps] = useState(() => (notify: () => void) => {
    return entity.modules
      .clientApi()
      .subscribeInternal(WizardInternalEvents.ON_STEPS_UPDATE, () => {
        notify();
      });
  });
  useSyncExternalStore(subsciber, getters.getActiveStep);
  useSyncExternalStore(subsciberUpdateSteps, getters.getSteps);
  useSyncExternalStore(subsciberReset, getters.getSteps);
  return entity.modules.clientApi().client;
};

export { useWizard };
