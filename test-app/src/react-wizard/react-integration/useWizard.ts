import { useState, useSyncExternalStore } from "react";
import { createStore } from "../Store/createStore";

const useWizard = (store: ReturnType<typeof createStore>, id: string) => {
  const entity = store.getEntity(id);
  const [subsciber] = useState(() => (notify: () => void) => {
    return entity.addEventListener("onStepChange", () => {
      notify();
    });
  });
  const [subsciberUpdateSteps] = useState(() => (notify: () => void) => {
    return entity.subscribe("onStepsUpdate", () => {
      notify();
    });
  });
  const [subsciberReset] = useState(() => (notify: () => void) => {
    return entity.addEventListener("onReset", () => {
      notify();
    });
  });
  useSyncExternalStore(subsciber, entity.getters.getActiveStep);
  useSyncExternalStore(subsciberUpdateSteps, entity.getters.getSteps);
  useSyncExternalStore(subsciberReset, entity.getters.getSteps);
  return {
    activeStep: entity.getters.getActiveStep(),
    nextStep: entity.getters.getNextStep(),
    previousStep: entity.getters.getPreviousStep(),
    isLast: entity.getters.isLast(),
    isFirst: entity.getters.isFirst(),
    steps: entity.getters.getSteps(),
    wizardId: entity.getters.getWizardId(),
  };
};

export { useWizard };
