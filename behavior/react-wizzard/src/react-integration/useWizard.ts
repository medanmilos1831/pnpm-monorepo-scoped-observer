import { useState, useSyncExternalStore } from "react";
import { createStore } from "../Store/createStore";
import { WizardInternalEvents, WizardPublicEvents } from "../types";

const useWizard = (store: ReturnType<typeof createStore>, id: string) => {
  const entity = store.getEntity(id);
  const getters = entity.stateManager.getters;
  const [subsciber] = useState(() => (notify: () => void) => {
    return entity.addEventListener(WizardPublicEvents.ON_STEP_CHANGE, () => {
      notify();
    });
  });
  const [subsciberReset] = useState(() => (notify: () => void) => {
    return entity.addEventListener(WizardPublicEvents.ON_RESET, () => {
      notify();
    });
  });
  const [subsciberUpdateSteps] = useState(() => (notify: () => void) => {
    return entity.subscribeInternal(
      WizardInternalEvents.ON_STEPS_UPDATE,
      () => {
        notify();
      }
    );
  });
  useSyncExternalStore(subsciber, getters.getActiveStep);
  useSyncExternalStore(subsciberUpdateSteps, getters.getSteps);
  useSyncExternalStore(subsciberReset, getters.getSteps);
  return {
    activeStep: getters.getActiveStep(),
    nextStep: getters.getNextStep(),
    previousStep: getters.getPreviousStep(),
    isLast: getters.isLast(),
    isFirst: getters.isFirst(),
    steps: getters.getSteps(),
    wizardId: getters.getWizardId(),
  };
};

export { useWizard };
